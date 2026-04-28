package com.luxtravel.repositories;

import com.luxtravel.exceptions.DatabaseException;
import com.luxtravel.exceptions.NotFoundException;
import com.luxtravel.interfaces.Searchable;
import com.luxtravel.models.Destination;
import com.zaxxer.hikari.HikariDataSource;

import java.math.BigDecimal;
import java.sql.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class DestinationRepository extends BaseRepository<Destination> implements Searchable<Destination> {

    public DestinationRepository(HikariDataSource dataSource) {
        super(dataSource);
    }

    @Override
    protected String getTableName() { return "destinations"; }

    @Override
    protected Destination mapRow(ResultSet rs) throws SQLException {
        Destination d = new Destination();
        d.setId(rs.getLong("id"));
        d.setName(rs.getString("name"));
        d.setCountry(rs.getString("country"));
        d.setCity(rs.getString("city"));
        d.setDescription(rs.getString("description"));
        d.setImageUrl(rs.getString("image_url"));
        d.setClimate(rs.getString("climate"));
        d.setBestSeason(rs.getString("best_season"));
        BigDecimal rating = rs.getBigDecimal("rating");
        d.setRating(rating);
        String priceLevel = rs.getString("price_level");
        if (priceLevel != null) d.setPriceLevel(Destination.PriceLevel.valueOf(priceLevel));
        Timestamp createdAt = rs.getTimestamp("created_at");
        if (createdAt != null) d.setCreatedAt(createdAt.toLocalDateTime());
        Timestamp updatedAt = rs.getTimestamp("updated_at");
        if (updatedAt != null) d.setUpdatedAt(updatedAt.toLocalDateTime());
        return d;
    }

    @Override
    protected String buildInsertSql(Destination entity) {
        return "INSERT INTO destinations (name, country, city, description, image_url, climate, best_season, rating, price_level) " +
               "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    }

    @Override
    protected void bindInsertParams(PreparedStatement ps, Destination d) throws SQLException {
        ps.setString(1, d.getName());
        ps.setString(2, d.getCountry());
        ps.setString(3, d.getCity());
        ps.setString(4, d.getDescription());
        ps.setString(5, d.getImageUrl());
        ps.setString(6, d.getClimate());
        ps.setString(7, d.getBestSeason());
        if (d.getRating() != null) ps.setBigDecimal(8, d.getRating()); else ps.setNull(8, Types.DECIMAL);
        ps.setString(9, d.getPriceLevel() != null ? d.getPriceLevel().name() : "MID");
    }

    @Override
    protected String buildUpdateSql(Destination entity) {
        return "UPDATE destinations SET name=?, country=?, city=?, description=?, image_url=?, climate=?, best_season=?, rating=?, price_level=? WHERE id=?";
    }

    @Override
    protected void bindUpdateParams(PreparedStatement ps, Destination d) throws SQLException {
        ps.setString(1, d.getName());
        ps.setString(2, d.getCountry());
        ps.setString(3, d.getCity());
        ps.setString(4, d.getDescription());
        ps.setString(5, d.getImageUrl());
        ps.setString(6, d.getClimate());
        ps.setString(7, d.getBestSeason());
        if (d.getRating() != null) ps.setBigDecimal(8, d.getRating()); else ps.setNull(8, Types.DECIMAL);
        ps.setString(9, d.getPriceLevel() != null ? d.getPriceLevel().name() : "MID");
        ps.setLong(10, d.getId());
    }

    // --- Searchable<Destination> ---

    @Override
    public List<Destination> search(String query) {
        String sql = "SELECT * FROM destinations WHERE name LIKE ? OR country LIKE ? OR city LIKE ? OR description LIKE ? ORDER BY id DESC";
        List<Destination> results = new ArrayList<>();
        String like = "%" + query + "%";
        try (Connection conn = getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, like);
            ps.setString(2, like);
            ps.setString(3, like);
            ps.setString(4, like);
            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) results.add(mapRow(rs));
            }
        } catch (SQLException e) {
            throw new DatabaseException("Error searching destinations", e);
        }
        return results;
    }

    @Override
    public List<Destination> filter(Map<String, String> filters) {
        StringBuilder sql = new StringBuilder("SELECT * FROM destinations WHERE 1=1");
        List<Object> params = new ArrayList<>();

        if (filters.containsKey("priceLevel")) {
            sql.append(" AND price_level = ?");
            params.add(filters.get("priceLevel").toUpperCase());
        }
        if (filters.containsKey("country")) {
            sql.append(" AND country = ?");
            params.add(filters.get("country"));
        }
        if (filters.containsKey("climate")) {
            sql.append(" AND climate = ?");
            params.add(filters.get("climate"));
        }
        sql.append(" ORDER BY id DESC");

        List<Destination> results = new ArrayList<>();
        try (Connection conn = getConnection();
             PreparedStatement ps = conn.prepareStatement(sql.toString())) {
            for (int i = 0; i < params.size(); i++) {
                ps.setObject(i + 1, params.get(i));
            }
            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) results.add(mapRow(rs));
            }
        } catch (SQLException e) {
            throw new DatabaseException("Error filtering destinations", e);
        }
        return results;
    }

    public List<Destination> findAllPaginated(int page, int size, String search, String priceLevel) {
        if (size > 100) size = 100;
        int offset = (page - 1) * size;

        StringBuilder sql = new StringBuilder("SELECT * FROM destinations WHERE 1=1");
        List<Object> params = new ArrayList<>();

        if (search != null && !search.trim().isEmpty()) {
            sql.append(" AND (name LIKE ? OR country LIKE ? OR city LIKE ?)");
            String like = "%" + search + "%";
            params.add(like); params.add(like); params.add(like);
        }
        if (priceLevel != null && !priceLevel.trim().isEmpty()) {
            sql.append(" AND price_level = ?");
            params.add(priceLevel.toUpperCase());
        }
        sql.append(" ORDER BY id DESC LIMIT ? OFFSET ?");
        params.add(size);
        params.add(offset);

        List<Destination> results = new ArrayList<>();
        try (Connection conn = getConnection();
             PreparedStatement ps = conn.prepareStatement(sql.toString())) {
            for (int i = 0; i < params.size(); i++) ps.setObject(i + 1, params.get(i));
            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) results.add(mapRow(rs));
            }
        } catch (SQLException e) {
            throw new DatabaseException("Error listing destinations", e);
        }
        return results;
    }

    public long countFiltered(String search, String priceLevel) {
        StringBuilder sql = new StringBuilder("SELECT COUNT(*) FROM destinations WHERE 1=1");
        List<Object> params = new ArrayList<>();
        if (search != null && !search.trim().isEmpty()) {
            sql.append(" AND (name LIKE ? OR country LIKE ? OR city LIKE ?)");
            String like = "%" + search + "%";
            params.add(like); params.add(like); params.add(like);
        }
        if (priceLevel != null && !priceLevel.trim().isEmpty()) {
            sql.append(" AND price_level = ?");
            params.add(priceLevel.toUpperCase());
        }
        try (Connection conn = getConnection();
             PreparedStatement ps = conn.prepareStatement(sql.toString())) {
            for (int i = 0; i < params.size(); i++) ps.setObject(i + 1, params.get(i));
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) return rs.getLong(1);
            }
        } catch (SQLException e) {
            throw new DatabaseException("Error counting destinations", e);
        }
        return 0;
    }
}
