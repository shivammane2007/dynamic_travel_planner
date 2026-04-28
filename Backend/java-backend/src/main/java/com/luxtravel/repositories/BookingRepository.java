package com.luxtravel.repositories;

import com.luxtravel.models.Booking;
import com.zaxxer.hikari.HikariDataSource;
import java.sql.*;

public class BookingRepository extends BaseRepository<Booking> {
    public BookingRepository(HikariDataSource dataSource) {
        super(dataSource);
    }

    @Override
    protected String getTableName() { return "bookings"; }

    @Override
    protected Booking mapRow(ResultSet rs) throws SQLException {
        Booking b = new Booking();
        b.setId(rs.getLong("id"));
        b.setUserId(rs.getLong("user_id"));
        b.setPackageId(rs.getLong("package_id"));
        b.setTravelers(rs.getInt("travelers"));
        b.setTotalPrice(rs.getBigDecimal("total_price"));
        b.setBookingDate(rs.getTimestamp("booking_date"));
        b.setTravelDate(rs.getDate("travel_date"));
        b.setStatus(rs.getString("status"));
        return b;
    }

    @Override
    protected String buildInsertSql(Booking entity) {
        return "INSERT INTO bookings (user_id, package_id, travelers, total_price, booking_date, travel_date, status) VALUES (?, ?, ?, ?, ?, ?, ?)";
    }

    @Override
    protected void bindInsertParams(PreparedStatement ps, Booking b) throws SQLException {
        ps.setLong(1, b.getUserId());
        ps.setLong(2, b.getPackageId());
        ps.setInt(3, b.getTravelers());
        ps.setBigDecimal(4, b.getTotalPrice());
        ps.setTimestamp(5, b.getBookingDate());
        ps.setDate(6, b.getTravelDate());
        ps.setString(7, b.getStatus());
    }

    @Override
    protected String buildUpdateSql(Booking entity) {
        return "UPDATE bookings SET user_id=?, package_id=?, travelers=?, total_price=?, booking_date=?, travel_date=?, status=? WHERE id=?";
    }

    @Override
    protected void bindUpdateParams(PreparedStatement ps, Booking b) throws SQLException {
        bindInsertParams(ps, b);
        ps.setLong(8, b.getId());
    }
}
