package com.luxtravel.repositories;

import com.luxtravel.models.Package;
import com.zaxxer.hikari.HikariDataSource;
import java.sql.*;

public class PackageRepository extends BaseRepository<Package> {
    public PackageRepository(HikariDataSource dataSource) {
        super(dataSource);
    }

    @Override
    protected String getTableName() { return "packages"; }

    @Override
    protected Package mapRow(ResultSet rs) throws SQLException {
        Package p = new Package();
        p.setId(rs.getLong("id"));
        p.setTitle(rs.getString("title"));
        p.setSlug(rs.getString("slug"));
        p.setCity(rs.getString("city"));
        p.setCountry(rs.getString("country"));
        p.setDescription(rs.getString("description"));
        p.setDurationDays(rs.getInt("duration_days"));
        p.setMinPeople(rs.getInt("min_people"));
        p.setMaxPeople(rs.getInt("max_people"));
        p.setPricePerPerson(rs.getBigDecimal("price_per_person"));
        p.setRating(rs.getBigDecimal("rating"));
        p.setReviewsCount(rs.getInt("reviews_count"));
        p.setHeroImage(rs.getString("hero_image"));
        p.setGalleryImages(rs.getString("gallery_images"));
        p.setHighlights(rs.getString("highlights"));
        p.setItinerary(rs.getString("itinerary"));
        p.setCategory(rs.getString("category"));
        return p;
    }

    @Override
    protected String buildInsertSql(Package entity) {
        return "INSERT INTO packages (title, slug, city, country, description, duration_days, min_people, max_people, price_per_person, rating, reviews_count, hero_image, gallery_images, highlights, itinerary, category) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    }

    @Override
    protected void bindInsertParams(PreparedStatement ps, Package p) throws SQLException {
        ps.setString(1, p.getTitle());
        ps.setString(2, p.getSlug());
        ps.setString(3, p.getCity());
        ps.setString(4, p.getCountry());
        ps.setString(5, p.getDescription());
        ps.setInt(6, p.getDurationDays());
        ps.setInt(7, p.getMinPeople());
        ps.setInt(8, p.getMaxPeople());
        ps.setBigDecimal(9, p.getPricePerPerson());
        ps.setBigDecimal(10, p.getRating());
        ps.setInt(11, p.getReviewsCount());
        ps.setString(12, p.getHeroImage());
        ps.setString(13, p.getGalleryImages());
        ps.setString(14, p.getHighlights());
        ps.setString(15, p.getItinerary());
        ps.setString(16, p.getCategory());
    }

    @Override
    protected String buildUpdateSql(Package entity) {
        return "UPDATE packages SET title=?, slug=?, city=?, country=?, description=?, duration_days=?, min_people=?, max_people=?, price_per_person=?, rating=?, reviews_count=?, hero_image=?, gallery_images=?, highlights=?, itinerary=?, category=? WHERE id=?";
    }

    @Override
    protected void bindUpdateParams(PreparedStatement ps, Package p) throws SQLException {
        bindInsertParams(ps, p);
        ps.setLong(17, p.getId());
    }
}
