package com.luxtravel.repositories;

import com.luxtravel.models.ManualTrip;
import com.zaxxer.hikari.HikariDataSource;
import java.sql.*;

public class ManualTripRepository extends BaseRepository<ManualTrip> {
    public ManualTripRepository(HikariDataSource dataSource) {
        super(dataSource);
    }

    @Override
    protected String getTableName() { return "manual_trips"; }

    @Override
    protected ManualTrip mapRow(ResultSet rs) throws SQLException {
        ManualTrip m = new ManualTrip();
        m.setId(rs.getLong("id"));
        m.setUserId(rs.getLong("user_id"));
        m.setSourceCity(rs.getString("source_city"));
        m.setDestinationCity(rs.getString("destination_city"));
        m.setTravelers(rs.getInt("travelers"));
        m.setBudget(rs.getString("budget"));
        m.setTravelMode(rs.getString("travel_mode"));
        m.setHotelType(rs.getString("hotel_type"));
        m.setTripDate(rs.getDate("trip_date"));
        m.setReturnDate(rs.getDate("return_date"));
        m.setGeneratedPlan(rs.getString("generated_plan"));
        return m;
    }

    @Override
    protected String buildInsertSql(ManualTrip entity) {
        return "INSERT INTO manual_trips (user_id, source_city, destination_city, travelers, budget, travel_mode, hotel_type, trip_date, return_date, generated_plan) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    }

    @Override
    protected void bindInsertParams(PreparedStatement ps, ManualTrip m) throws SQLException {
        if (m.getUserId() != null) ps.setLong(1, m.getUserId()); else ps.setNull(1, Types.BIGINT);
        ps.setString(2, m.getSourceCity());
        ps.setString(3, m.getDestinationCity());
        ps.setInt(4, m.getTravelers());
        ps.setString(5, m.getBudget());
        ps.setString(6, m.getTravelMode());
        ps.setString(7, m.getHotelType());
        ps.setDate(8, m.getTripDate());
        ps.setDate(9, m.getReturnDate());
        ps.setString(10, m.getGeneratedPlan());
    }

    @Override
    protected String buildUpdateSql(ManualTrip entity) {
        return "UPDATE manual_trips SET user_id=?, source_city=?, destination_city=?, travelers=?, budget=?, travel_mode=?, hotel_type=?, trip_date=?, return_date=?, generated_plan=? WHERE id=?";
    }

    @Override
    protected void bindUpdateParams(PreparedStatement ps, ManualTrip m) throws SQLException {
        bindInsertParams(ps, m);
        ps.setLong(11, m.getId());
    }
}
