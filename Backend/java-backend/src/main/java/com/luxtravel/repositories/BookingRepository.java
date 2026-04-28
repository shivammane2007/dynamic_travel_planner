package com.luxtravel.repositories;

import com.luxtravel.exceptions.DatabaseException;
import com.luxtravel.models.Booking;
import com.zaxxer.hikari.HikariDataSource;

import java.math.BigDecimal;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

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
        b.setTripId(rs.getLong("trip_id"));
        b.setUserId(rs.getLong("user_id"));
        String type = rs.getString("booking_type");
        if (type != null) b.setBookingType(Booking.BookingType.valueOf(type));
        b.setProvider(rs.getString("provider"));
        b.setReferenceCode(rs.getString("reference_code"));
        b.setAmount(rs.getBigDecimal("amount"));
        b.setCurrency(rs.getString("currency"));
        Date bookingDate = rs.getDate("booking_date");
        if (bookingDate != null) b.setBookingDate(bookingDate.toLocalDate());
        String status = rs.getString("status");
        if (status != null) b.setStatus(Booking.Status.valueOf(status));
        Timestamp ca = rs.getTimestamp("created_at");
        if (ca != null) b.setCreatedAt(ca.toLocalDateTime());
        Timestamp ua = rs.getTimestamp("updated_at");
        if (ua != null) b.setUpdatedAt(ua.toLocalDateTime());
        return b;
    }

    @Override
    protected String buildInsertSql(Booking entity) {
        return "INSERT INTO bookings (trip_id, user_id, booking_type, provider, reference_code, amount, currency, booking_date, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    }

    @Override
    protected void bindInsertParams(PreparedStatement ps, Booking b) throws SQLException {
        ps.setLong(1, b.getTripId());
        ps.setLong(2, b.getUserId());
        ps.setString(3, b.getBookingType() != null ? b.getBookingType().name() : null);
        ps.setString(4, b.getProvider());
        ps.setString(5, b.getReferenceCode());
        ps.setBigDecimal(6, b.getAmount());
        ps.setString(7, b.getCurrency() != null ? b.getCurrency() : "USD");
        if (b.getBookingDate() != null) ps.setDate(8, Date.valueOf(b.getBookingDate())); else ps.setNull(8, Types.DATE);
        ps.setString(9, b.getStatus() != null ? b.getStatus().name() : "PENDING");
    }

    @Override
    protected String buildUpdateSql(Booking entity) {
        return "UPDATE bookings SET trip_id=?, user_id=?, booking_type=?, provider=?, reference_code=?, amount=?, currency=?, booking_date=?, status=? WHERE id=?";
    }

    @Override
    protected void bindUpdateParams(PreparedStatement ps, Booking b) throws SQLException {
        ps.setLong(1, b.getTripId());
        ps.setLong(2, b.getUserId());
        ps.setString(3, b.getBookingType() != null ? b.getBookingType().name() : null);
        ps.setString(4, b.getProvider());
        ps.setString(5, b.getReferenceCode());
        ps.setBigDecimal(6, b.getAmount());
        ps.setString(7, b.getCurrency() != null ? b.getCurrency() : "USD");
        if (b.getBookingDate() != null) ps.setDate(8, Date.valueOf(b.getBookingDate())); else ps.setNull(8, Types.DATE);
        ps.setString(9, b.getStatus() != null ? b.getStatus().name() : "PENDING");
        ps.setLong(10, b.getId());
    }

    public List<Booking> findByTripId(Long tripId) {
        return queryList("SELECT * FROM bookings WHERE trip_id = ? ORDER BY id DESC", tripId);
    }

    public List<Booking> findByStatus(String status) {
        return queryList("SELECT * FROM bookings WHERE status = ? ORDER BY id DESC", status.toUpperCase());
    }

    public List<Booking> findByTripIdAndStatus(Long tripId, String status) {
        String sql = "SELECT * FROM bookings WHERE trip_id = ? AND status = ? ORDER BY id DESC";
        List<Booking> results = new ArrayList<>();
        try (Connection conn = getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setLong(1, tripId);
            ps.setString(2, status.toUpperCase());
            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) results.add(mapRow(rs));
            }
        } catch (SQLException e) {
            throw new DatabaseException("Error fetching bookings", e);
        }
        return results;
    }

    private List<Booking> queryList(String sql, Object param) {
        List<Booking> results = new ArrayList<>();
        try (Connection conn = getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setObject(1, param);
            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) results.add(mapRow(rs));
            }
        } catch (SQLException e) {
            throw new DatabaseException("Error querying bookings", e);
        }
        return results;
    }
}
