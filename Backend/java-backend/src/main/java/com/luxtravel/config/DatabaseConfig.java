package com.luxtravel.config;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import com.luxtravel.utils.EnvUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.sql.Connection;
import java.sql.Statement;
import java.util.Properties;

public class DatabaseConfig {
    private static final Logger log = LoggerFactory.getLogger(DatabaseConfig.class);
    private static HikariDataSource dataSource;

    public static HikariDataSource createPool() {
        if (dataSource != null) {
            return dataSource;
        }

        try {
            Properties props = new Properties();
            try (InputStream in = DatabaseConfig.class.getClassLoader().getResourceAsStream("application.properties")) {
                if (in != null) {
                    props.load(in);
                } else {
                    log.warn("application.properties not found");
                }
            }

            HikariConfig config = new HikariConfig();
            
            // Allow env vars to override properties file
            String url = EnvUtil.get("DB_URL");
            if (url == null || url.isEmpty()) {
                String host = EnvUtil.get("DB_HOST", "localhost");
                String port = EnvUtil.get("DB_PORT", "3306");
                String dbName = EnvUtil.get("DB_NAME", "lux_travel");
                url = "jdbc:mysql://" + host + ":" + port + "/" + dbName + "?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true";
            }
            
            config.setJdbcUrl(url);
            config.setUsername(EnvUtil.get("DB_USER", props.getProperty("db.username", "root")));
            config.setPassword(EnvUtil.get("DB_PASSWORD", props.getProperty("db.password", "")));
            config.setMaximumPoolSize(Integer.parseInt(EnvUtil.get("DB_POOL_SIZE", props.getProperty("db.pool.size", "10"))));

            // MySQL-specific performance optimizations
            config.addDataSourceProperty("cachePrepStmts", "true");
            config.addDataSourceProperty("prepStmtCacheSize", "250");
            config.addDataSourceProperty("prepStmtCacheSqlLimit", "2048");

            dataSource = new HikariDataSource(config);
            log.info("Database connection pool created successfully");
            return dataSource;
        } catch (Exception e) {
            log.error("Failed to initialize database connection pool", e);
            throw new RuntimeException("Database initialization failed", e);
        }
    }

    public static void runMigrations(HikariDataSource ds) {
        try (InputStream in = DatabaseConfig.class.getClassLoader().getResourceAsStream("schema.sql")) {
            if (in == null) {
                log.warn("schema.sql not found, skipping migrations.");
                return;
            }

            String schema = new String(in.readAllBytes(), StandardCharsets.UTF_8);
            
            // Basic split by semicolon. Note: This simple split might fail if semicolons are inside strings
            // But for the given schema.sql, it should be fine.
            String[] statements = schema.split(";");

            try (Connection conn = ds.getConnection();
                 Statement stmt = conn.createStatement()) {
                
                for (String sql : statements) {
                    if (sql.trim().isEmpty()) continue;
                    stmt.execute(sql.trim());
                }
                log.info("Database migrations applied successfully");
            }
        } catch (Exception e) {
            log.error("Failed to run migrations", e);
            throw new RuntimeException("Migration failed", e);
        }
    }
}
