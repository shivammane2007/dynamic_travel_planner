package com.luxtravel.repositories;

import com.luxtravel.exceptions.DatabaseException;
import com.luxtravel.models.Trip;
import com.zaxxer.hikari.HikariDataSource;

import java.math.BigDecimal;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class TripRepository extends BaseRepository<Trip> {

    public TripRepository(HikariDataSource dataSource) {
        super(dataSource);
    }

    @Override
    protected String getTableName() { return "trips"; }

    @Override
    protected Trip mapRow(ResultSet rs) throws SQLException {
        Trip t = new Trip();
        t.setId(rs.getLong("id"));
        t.setUserId(rs.getLong("user_id"));
        t.setDestinationId(rs.getLong("destination_id"));
        t.setTitle(rs.getString("title"));
        Date startDate = rs.getDate("start_date");
        if (startDate != null) t.setStartDate(startDate.toLocalDate());
        Date endDate = rs.getDate("end_date");
        if (endDate != null) t.setEndDate(endDate.toLocalDate());
        String status = rs.getString("status");
        if (status != null) t.setStatus(Trip.Status.valueOf(status));
        BigDecimal budget = rs.getBigDecimal("budget");
        t.setBudget(budget);
        t.setNotes(rs.getString("notes"));
        Timestamp createdAt = rs.getTimestamp("created_at");
        if (createdAt != null) t.setCreatedAt(createdAt.toLocalDateTime());
        Timestamp updatedAt = rs.getTimestamp("updated_at");
        if (updatedAt != null) t.setUpdatedAt(updatedAt.toLocalDateTime());
        return t;
    }

    @Override
    protected String buildInsertSql(Trip entity) {
        return "INSERT INTO trips (user_id, destination_id, title, start_date, end_date, status, budget, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    }

    @Override
    protected void bindInsertParams(PreparedStatement ps, Trip t) throws SQLException {
        ps.setLong(1, t.getUserId());
        ps.setLong(2, t.getDestinationId());
        ps.setString(3, t.getTitle());
        ps.setDate(4, Date.valueOf(t.getStartDate()));
        ps.setDate(5, Date.valueOf(t.getEndDate()));
        ps.setString(6, t.getStatus() != null ? t.getStatus().name() : "PLANNED");
        if (t.getBudget() != null) ps.setBigDecimal(7, t.getBudget()); else ps.setNull(7, Types.DECIMAL);
        ps.setString(8, t.getNotes());
    }

    @Override
    protected String buildUpdateSql(Trip entity) {
        return "UPDATE trips SET user_id=?, destination_id=?, title=?, start_date=?, end_date=?, status=?, budget=?, notes=? WHERE id=?";
    }

    @Override
    protected void bindUpdateParams(PreparedStatement ps, Trip t) throws SQLException {
        ps.setLong(1, t.getUserId());
        ps.setLong(2, t.getDestinationId());
        ps.setString(3, t.getTitle());
        ps.setDate(4, Date.valueOf(t.getStartDate()));
        ps.setDate(5, Date.valueOf(t.getEndDate()));
        ps.setString(6, t.getStatus() != null ? t.getStatus().name() : "PLANNED");
        if (t.getBudget() != null) ps.setBigDecimal(7, t.getBudget()); else ps.setNull(7, Types.DECIMAL);
        ps.setString(8, t.getNotes());
        ps.setLong(9, t.getId());
    }

    public List<Trip> findByUserId(Long userId) {
        String sql = "SELECT * FROM trips WHERE user_id = ? ORDER BY id DESC";
        List<Trip> results = new ArrayList<>();
        try (Connection conn = getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setLong(1, userId);
            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) results.add(mapRow(rs));
            }
        } catch (SQLException e) {
            throw new DatabaseException("Error fetching trips for user=" + userId, e);
        }
        return results;
    }

    public List<Trip> findByStatus(String status) {
        String sql = "SELECT * FROM trips WHERE status = ? ORDER BY id DESC";
        List<Trip> results = new ArrayList<>();
        try (Connection conn = getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, status.toUpperCase());
            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) results.add(mapRow(rs));
            }
        } catch (SQLException e) {
            throw new DatabaseException("Error fetching trips by status=" + status, e);
        }
        return results;
    }

    public List<Trip> findByUserIdAndStatus(Long userId, String status) {
        String sql = "SELECT * FROM trips WHERE user_id = ? AND status = ? ORDER BY id DESC";
        List<Trip> results = new ArrayList<>();
        try (Connection conn = getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setLong(1, userId);
            ps.setString(2, status.toUpperCase());
            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) results.add(mapRow(rs));
            }
        } catch (SQLException e) {
            throw new DatabaseException("Error fetching trips", e);
        }
        return results;
    }
}
