package com.luxtravel.repositories;

import com.luxtravel.models.Hotel;
import com.zaxxer.hikari.HikariDataSource;
import java.sql.*;

public class HotelRepository extends BaseRepository<Hotel> {
    public HotelRepository(HikariDataSource dataSource) {
        super(dataSource);
    }

    @Override
    protected String getTableName() { return "hotels"; }

    @Override
    protected Hotel mapRow(ResultSet rs) throws SQLException {
        Hotel h = new Hotel();
        h.setId(rs.getLong("id"));
        h.setPackageId(rs.getLong("package_id"));
        h.setHotelName(rs.getString("hotel_name"));
        h.setCity(rs.getString("city"));
        h.setRating(rs.getBigDecimal("rating"));
        h.setPricePerNight(rs.getBigDecimal("price_per_night"));
        h.setAmenities(rs.getString("amenities"));
        h.setImageUrl(rs.getString("image_url"));
        h.setLocation(rs.getString("location"));
        return h;
    }

    @Override
    protected String buildInsertSql(Hotel entity) {
        return "INSERT INTO hotels (package_id, hotel_name, city, rating, price_per_night, amenities, image_url, location) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    }

    @Override
    protected void bindInsertParams(PreparedStatement ps, Hotel h) throws SQLException {
        if (h.getPackageId() != null) ps.setLong(1, h.getPackageId()); else ps.setNull(1, Types.BIGINT);
        ps.setString(2, h.getHotelName());
        ps.setString(3, h.getCity());
        ps.setBigDecimal(4, h.getRating());
        ps.setBigDecimal(5, h.getPricePerNight());
        ps.setString(6, h.getAmenities());
        ps.setString(7, h.getImageUrl());
        ps.setString(8, h.getLocation());
    }

    @Override
    protected String buildUpdateSql(Hotel entity) {
        return "UPDATE hotels SET package_id=?, hotel_name=?, city=?, rating=?, price_per_night=?, amenities=?, image_url=?, location=? WHERE id=?";
    }

    @Override
    protected void bindUpdateParams(PreparedStatement ps, Hotel h) throws SQLException {
        bindInsertParams(ps, h);
        ps.setLong(9, h.getId());
    }
}
