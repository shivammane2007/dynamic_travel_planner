package com.luxtravel.repositories;

import com.luxtravel.exceptions.DatabaseException;
import com.luxtravel.models.Itinerary;
import com.zaxxer.hikari.HikariDataSource;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class ItineraryRepository extends BaseRepository<Itinerary> {

    public ItineraryRepository(HikariDataSource dataSource) {
        super(dataSource);
    }

    @Override
    protected String getTableName() { return "itineraries"; }

    @Override
    protected Itinerary mapRow(ResultSet rs) throws SQLException {
        Itinerary i = new Itinerary();
        i.setId(rs.getLong("id"));
        i.setTripId(rs.getLong("trip_id"));
        i.setDayNumber(rs.getInt("day_number"));
        i.setTitle(rs.getString("title"));
        i.setDescription(rs.getString("description"));
        i.setLocation(rs.getString("location"));
        Time startTime = rs.getTime("start_time");
        if (startTime != null) i.setStartTime(startTime.toLocalTime());
        Time endTime = rs.getTime("end_time");
        if (endTime != null) i.setEndTime(endTime.toLocalTime());
        i.setActivityType(rs.getString("activity_type"));
        Timestamp ca = rs.getTimestamp("created_at");
        if (ca != null) i.setCreatedAt(ca.toLocalDateTime());
        Timestamp ua = rs.getTimestamp("updated_at");
        if (ua != null) i.setUpdatedAt(ua.toLocalDateTime());
        return i;
    }

    @Override
    protected String buildInsertSql(Itinerary entity) {
        return "INSERT INTO itineraries (trip_id, day_number, title, description, location, start_time, end_time, activity_type) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    }

    @Override
    protected void bindInsertParams(PreparedStatement ps, Itinerary i) throws SQLException {
        ps.setLong(1, i.getTripId());
        ps.setInt(2, i.getDayNumber());
        ps.setString(3, i.getTitle());
        ps.setString(4, i.getDescription());
        ps.setString(5, i.getLocation());
        if (i.getStartTime() != null) ps.setTime(6, Time.valueOf(i.getStartTime())); else ps.setNull(6, Types.TIME);
        if (i.getEndTime() != null) ps.setTime(7, Time.valueOf(i.getEndTime())); else ps.setNull(7, Types.TIME);
        ps.setString(8, i.getActivityType());
    }

    @Override
    protected String buildUpdateSql(Itinerary entity) {
        return "UPDATE itineraries SET trip_id=?, day_number=?, title=?, description=?, location=?, start_time=?, end_time=?, activity_type=? WHERE id=?";
    }

    @Override
    protected void bindUpdateParams(PreparedStatement ps, Itinerary i) throws SQLException {
        ps.setLong(1, i.getTripId());
        ps.setInt(2, i.getDayNumber());
        ps.setString(3, i.getTitle());
        ps.setString(4, i.getDescription());
        ps.setString(5, i.getLocation());
        if (i.getStartTime() != null) ps.setTime(6, Time.valueOf(i.getStartTime())); else ps.setNull(6, Types.TIME);
        if (i.getEndTime() != null) ps.setTime(7, Time.valueOf(i.getEndTime())); else ps.setNull(7, Types.TIME);
        ps.setString(8, i.getActivityType());
        ps.setLong(9, i.getId());
    }

    public List<Itinerary> findByTripId(Long tripId) {
        String sql = "SELECT * FROM itineraries WHERE trip_id = ? ORDER BY day_number, id";
        List<Itinerary> results = new ArrayList<>();
        try (Connection conn = getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setLong(1, tripId);
            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) results.add(mapRow(rs));
            }
        } catch (SQLException e) {
            throw new DatabaseException("Error fetching itinerary for trip=" + tripId, e);
        }
        return results;
    }
}
