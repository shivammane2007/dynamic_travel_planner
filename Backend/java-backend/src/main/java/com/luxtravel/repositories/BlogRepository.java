package com.luxtravel.repositories;

import com.luxtravel.models.Blog;
import com.zaxxer.hikari.HikariDataSource;
import java.sql.*;

public class BlogRepository extends BaseRepository<Blog> {
    public BlogRepository(HikariDataSource dataSource) {
        super(dataSource);
    }

    @Override
    protected String getTableName() { return "blogs"; }

    @Override
    protected Blog mapRow(ResultSet rs) throws SQLException {
        Blog b = new Blog();
        b.setId(rs.getLong("id"));
        b.setTitle(rs.getString("title"));
        b.setCategory(rs.getString("category"));
        b.setImageUrl(rs.getString("image_url"));
        b.setContent(rs.getString("content"));
        b.setAuthor(rs.getString("author"));
        return b;
    }

    @Override
    protected String buildInsertSql(Blog entity) {
        return "INSERT INTO blogs (title, category, image_url, content, author) VALUES (?, ?, ?, ?, ?)";
    }

    @Override
    protected void bindInsertParams(PreparedStatement ps, Blog b) throws SQLException {
        ps.setString(1, b.getTitle());
        ps.setString(2, b.getCategory());
        ps.setString(3, b.getImageUrl());
        ps.setString(4, b.getContent());
        ps.setString(5, b.getAuthor());
    }

    @Override
    protected String buildUpdateSql(Blog entity) {
        return "UPDATE blogs SET title=?, category=?, image_url=?, content=?, author=? WHERE id=?";
    }

    @Override
    protected void bindUpdateParams(PreparedStatement ps, Blog b) throws SQLException {
        bindInsertParams(ps, b);
        ps.setLong(6, b.getId());
    }
}
