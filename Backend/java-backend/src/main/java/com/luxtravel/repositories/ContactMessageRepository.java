package com.luxtravel.repositories;

import com.luxtravel.models.ContactMessage;
import com.zaxxer.hikari.HikariDataSource;
import java.sql.*;

public class ContactMessageRepository extends BaseRepository<ContactMessage> {
    public ContactMessageRepository(HikariDataSource dataSource) {
        super(dataSource);
    }

    @Override
    protected String getTableName() { return "contact_messages"; }

    @Override
    protected ContactMessage mapRow(ResultSet rs) throws SQLException {
        ContactMessage c = new ContactMessage();
        c.setId(rs.getLong("id"));
        c.setFullName(rs.getString("full_name"));
        c.setEmail(rs.getString("email"));
        c.setSubject(rs.getString("subject"));
        c.setMessage(rs.getString("message"));
        c.setSentAt(rs.getTimestamp("sent_at"));
        return c;
    }

    @Override
    protected String buildInsertSql(ContactMessage entity) {
        return "INSERT INTO contact_messages (full_name, email, subject, message, sent_at) VALUES (?, ?, ?, ?, ?)";
    }

    @Override
    protected void bindInsertParams(PreparedStatement ps, ContactMessage c) throws SQLException {
        ps.setString(1, c.getFullName());
        ps.setString(2, c.getEmail());
        ps.setString(3, c.getSubject());
        ps.setString(4, c.getMessage());
        ps.setTimestamp(5, c.getSentAt());
    }

    @Override
    protected String buildUpdateSql(ContactMessage entity) {
        return "UPDATE contact_messages SET full_name=?, email=?, subject=?, message=?, sent_at=? WHERE id=?";
    }

    @Override
    protected void bindUpdateParams(PreparedStatement ps, ContactMessage c) throws SQLException {
        bindInsertParams(ps, c);
        ps.setLong(6, c.getId());
    }
}
