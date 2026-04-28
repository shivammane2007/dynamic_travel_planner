package com.luxtravel.repositories;

import com.luxtravel.exceptions.DatabaseException;
import com.luxtravel.exceptions.NotFoundException;
import com.luxtravel.models.User;
import com.zaxxer.hikari.HikariDataSource;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class UserRepository extends BaseRepository<User> {

    public UserRepository(HikariDataSource dataSource) {
        super(dataSource);
    }

    @Override
    protected String getTableName() { return "users"; }

    @Override
    protected User mapRow(ResultSet rs) throws SQLException {
        User u = new User();
        u.setId(rs.getLong("id"));
        u.setName(rs.getString("name"));
        u.setEmail(rs.getString("email"));
        u.setPassword(rs.getString("password"));
        String role = rs.getString("role");
        if (role != null) u.setRole(User.Role.valueOf(role));
        Timestamp createdAt = rs.getTimestamp("created_at");
        if (createdAt != null) u.setCreatedAt(createdAt.toLocalDateTime());
        Timestamp updatedAt = rs.getTimestamp("updated_at");
        if (updatedAt != null) u.setUpdatedAt(updatedAt.toLocalDateTime());
        return u;
    }

    @Override
    protected String buildInsertSql(User entity) {
        return "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";
    }

    @Override
    protected void bindInsertParams(PreparedStatement ps, User u) throws SQLException {
        ps.setString(1, u.getName());
        ps.setString(2, u.getEmail());
        ps.setString(3, u.getPassword());
        ps.setString(4, u.getRole() != null ? u.getRole().name() : "USER");
    }

    @Override
    protected String buildUpdateSql(User entity) {
        return "UPDATE users SET name=?, email=?, password=?, role=? WHERE id=?";
    }

    @Override
    protected void bindUpdateParams(PreparedStatement ps, User u) throws SQLException {
        ps.setString(1, u.getName());
        ps.setString(2, u.getEmail());
        ps.setString(3, u.getPassword());
        ps.setString(4, u.getRole() != null ? u.getRole().name() : "USER");
        ps.setLong(5, u.getId());
    }

    public Optional<User> findByEmail(String email) {
        String sql = "SELECT * FROM users WHERE email = ?";
        try (Connection conn = getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, email);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) return Optional.of(mapRow(rs));
            }
        } catch (SQLException e) {
            throw new DatabaseException("Error finding user by email", e);
        }
        return Optional.empty();
    }

    public boolean existsByEmail(String email) {
        return findByEmail(email).isPresent();
    }
}
