package com.luxtravel.repositories;

import com.luxtravel.exceptions.DatabaseException;
import com.luxtravel.exceptions.NotFoundException;
import com.luxtravel.interfaces.Repository;
import com.luxtravel.models.BaseModel;
import com.zaxxer.hikari.HikariDataSource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Abstract base repository implementing the Template Method Pattern.
 * All concrete repositories inherit HikariCP pooling and generic CRUD helpers.
 * Subclasses fill in row-mapping and SQL building logic.
 */
public abstract class BaseRepository<T extends BaseModel> implements Repository<T, Long> {
    protected final Logger log = LoggerFactory.getLogger(getClass());
    protected final HikariDataSource dataSource;

    public BaseRepository(HikariDataSource dataSource) {
        this.dataSource = dataSource;
    }

    /** Template Method — map a ResultSet row to entity T */
    protected abstract T mapRow(ResultSet rs) throws SQLException;

    /** Template Method — build INSERT SQL for entity */
    protected abstract String buildInsertSql(T entity);

    /** Template Method — bind INSERT PreparedStatement parameters */
    protected abstract void bindInsertParams(PreparedStatement ps, T entity) throws SQLException;

    /** Template Method — build UPDATE SQL for entity */
    protected abstract String buildUpdateSql(T entity);

    /** Template Method — bind UPDATE PreparedStatement parameters */
    protected abstract void bindUpdateParams(PreparedStatement ps, T entity) throws SQLException;

    /** Template Method — the table name managed by this repository */
    protected abstract String getTableName();

    protected Connection getConnection() throws SQLException {
        return dataSource.getConnection();
    }

    @Override
    public T findById(Long id) throws NotFoundException {
        String sql = "SELECT * FROM " + getTableName() + " WHERE id = ?";
        try (Connection conn = getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setLong(1, id);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    return mapRow(rs);
                }
            }
        } catch (SQLException e) {
            throw new DatabaseException("Error fetching " + getTableName() + " by id=" + id, e);
        }
        throw new NotFoundException(getTableName() + " with id=" + id + " not found");
    }

    @Override
    public List<T> findAll() {
        String sql = "SELECT * FROM " + getTableName() + " ORDER BY id DESC";
        List<T> results = new ArrayList<>();
        try (Connection conn = getConnection();
             PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {
            while (rs.next()) {
                results.add(mapRow(rs));
            }
        } catch (SQLException e) {
            throw new DatabaseException("Error fetching all from " + getTableName(), e);
        }
        return results;
    }

    @Override
    public List<T> findAll(int page, int size) {
        if (size > 100) size = 100;
        int offset = (page - 1) * size;
        String sql = "SELECT * FROM " + getTableName() + " ORDER BY id DESC LIMIT ? OFFSET ?";
        List<T> results = new ArrayList<>();
        try (Connection conn = getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, size);
            ps.setInt(2, offset);
            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) {
                    results.add(mapRow(rs));
                }
            }
        } catch (SQLException e) {
            throw new DatabaseException("Error paginating " + getTableName(), e);
        }
        return results;
    }

    @Override
    public T save(T entity) {
        if (entity.getId() == null) {
            return insert(entity);
        } else {
            return update(entity);
        }
    }

    private T insert(T entity) {
        String sql = buildInsertSql(entity);
        try (Connection conn = getConnection();
             PreparedStatement ps = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            bindInsertParams(ps, entity);
            ps.executeUpdate();
            try (ResultSet keys = ps.getGeneratedKeys()) {
                if (keys.next()) {
                    entity.setId(keys.getLong(1));
                }
            }
        } catch (SQLException e) {
            throw new DatabaseException("Error inserting into " + getTableName(), e);
        }
        return entity;
    }

    private T update(T entity) {
        String sql = buildUpdateSql(entity);
        try (Connection conn = getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            bindUpdateParams(ps, entity);
            ps.executeUpdate();
        } catch (SQLException e) {
            throw new DatabaseException("Error updating " + getTableName() + " id=" + entity.getId(), e);
        }
        return entity;
    }

    @Override
    public void delete(Long id) throws NotFoundException {
        // verify existence first
        findById(id);
        String sql = "DELETE FROM " + getTableName() + " WHERE id = ?";
        try (Connection conn = getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setLong(1, id);
            ps.executeUpdate();
        } catch (SQLException e) {
            throw new DatabaseException("Error deleting from " + getTableName() + " id=" + id, e);
        }
    }

    @Override
    public long count() {
        String sql = "SELECT COUNT(*) FROM " + getTableName();
        try (Connection conn = getConnection();
             PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {
            if (rs.next()) return rs.getLong(1);
        } catch (SQLException e) {
            throw new DatabaseException("Error counting " + getTableName(), e);
        }
        return 0;
    }
}
