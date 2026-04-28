package com.luxtravel.repositories;

import com.luxtravel.exceptions.DatabaseException;
import com.luxtravel.models.DashboardStats;
import com.zaxxer.hikari.HikariDataSource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class DashboardRepository {
    private final Logger log = LoggerFactory.getLogger(getClass());
    private final HikariDataSource dataSource;

    public DashboardRepository(HikariDataSource dataSource) {
        this.dataSource = dataSource;
    }

    private long getCount(String table) throws SQLException {
        String sql = "SELECT COUNT(*) FROM " + table;
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {
            if (rs.next()) {
                return rs.getLong(1);
            }
        }
        return 0;
    }

    public DashboardStats getStats() {
        DashboardStats stats = new DashboardStats();
        try {
            stats.setTotalUsers(getCount("users"));
            stats.setTotalBookings(getCount("bookings"));
            stats.setTotalPackages(getCount("packages"));
            stats.setTotalFavorites(getCount("favorites"));
            stats.setTotalContactMessages(getCount("contact_messages"));
            stats.setTotalManualTrips(getCount("manual_trips"));

            // Pending bookings
            String pendingSql = "SELECT COUNT(*) FROM bookings WHERE status = 'PENDING'";
            try (Connection conn = dataSource.getConnection();
                 PreparedStatement ps = conn.prepareStatement(pendingSql);
                 ResultSet rs = ps.executeQuery()) {
                if (rs.next()) stats.setPendingBookings(rs.getLong(1));
            }

            // Total Revenue
            String revenueSql = "SELECT SUM(total_price) FROM bookings WHERE status = 'CONFIRMED'";
            try (Connection conn = dataSource.getConnection();
                 PreparedStatement ps = conn.prepareStatement(revenueSql);
                 ResultSet rs = ps.executeQuery()) {
                if (rs.next()) stats.setTotalRevenue(rs.getDouble(1));
            }
        } catch (SQLException e) {
            throw new DatabaseException("Error aggregating dashboard stats", e);
        }
        return stats;
    }

    public List<Map<String, Object>> getRevenueTrends() {
        // Example grouping by month for current year
        String sql = "SELECT DATE_FORMAT(booking_date, '%b') as month, SUM(total_price) as revenue " +
                     "FROM bookings WHERE status = 'CONFIRMED' " +
                     "GROUP BY month ORDER BY min(booking_date) ASC LIMIT 12";
        List<Map<String, Object>> trends = new ArrayList<>();
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {
            while (rs.next()) {
                Map<String, Object> map = new HashMap<>();
                map.put("month", rs.getString("month"));
                map.put("revenue", rs.getDouble("revenue"));
                trends.add(map);
            }
        } catch (SQLException e) {
            throw new DatabaseException("Error aggregating revenue trends", e);
        }
        return trends;
    }

    public List<Map<String, Object>> getRecentActivities() {
        // Unified query fetching recent bookings and contact messages
        // In a real large-scale system, you might poll this from an event bus, but UNION ALL is fine here.
        String sql = "(SELECT 'Booking' as type, CONCAT('New booking for package ', package_id) as description, booking_date as date " +
                     "FROM bookings ORDER BY booking_date DESC LIMIT 5) " +
                     "UNION ALL " +
                     "(SELECT 'Message' as type, CONCAT('New inquiry from ', full_name) as description, sent_at as date " +
                     "FROM contact_messages ORDER BY sent_at DESC LIMIT 5) " +
                     "ORDER BY date DESC LIMIT 10";

        List<Map<String, Object>> activities = new ArrayList<>();
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {
            while (rs.next()) {
                Map<String, Object> map = new HashMap<>();
                map.put("type", rs.getString("type"));
                map.put("description", rs.getString("description"));
                map.put("date", rs.getTimestamp("date").toString());
                activities.add(map);
            }
        } catch (SQLException e) {
            throw new DatabaseException("Error aggregating recent activities", e);
        }
        return activities;
    }
}
