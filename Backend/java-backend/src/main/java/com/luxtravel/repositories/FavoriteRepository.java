package com.luxtravel.repositories;

import com.luxtravel.models.Favorite;
import com.zaxxer.hikari.HikariDataSource;
import java.sql.*;

public class FavoriteRepository extends BaseRepository<Favorite> {
    public FavoriteRepository(HikariDataSource dataSource) {
        super(dataSource);
    }

    @Override
    protected String getTableName() { return "favorites"; }

    @Override
    protected Favorite mapRow(ResultSet rs) throws SQLException {
        Favorite f = new Favorite();
        f.setId(rs.getLong("id"));
        f.setUserId(rs.getLong("user_id"));
        f.setPackageId(rs.getLong("package_id"));
        return f;
    }

    @Override
    protected String buildInsertSql(Favorite entity) {
        return "INSERT INTO favorites (user_id, package_id) VALUES (?, ?)";
    }

    @Override
    protected void bindInsertParams(PreparedStatement ps, Favorite f) throws SQLException {
        ps.setLong(1, f.getUserId());
        ps.setLong(2, f.getPackageId());
    }

    @Override
    protected String buildUpdateSql(Favorite entity) {
        return "UPDATE favorites SET user_id=?, package_id=? WHERE id=?";
    }

    @Override
    protected void bindUpdateParams(PreparedStatement ps, Favorite f) throws SQLException {
        bindInsertParams(ps, f);
        ps.setLong(3, f.getId());
    }
}
