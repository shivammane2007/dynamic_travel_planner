import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;
import java.nio.file.Files;
import java.nio.file.Paths;

public class DbInit {
    public static void main(String[] args) throws Exception {
        Class.forName("org.sqlite.JDBC");
        Connection conn = DriverManager.getConnection("jdbc:sqlite:travel.db");
        Statement stmt = conn.createStatement();
        
        String schema = new String(Files.readAllBytes(Paths.get("src/main/resources/schema.sql")));
        // SQLite doesn't support multiple statements in one executeUpdate easily without splitting or using a specific driver mode
        // But for simplicity let's just run it.
        for (String sql : schema.split(";")) {
            if (!sql.trim().isEmpty()) {
                stmt.execute(sql.trim());
            }
        }
        
        String data = new String(Files.readAllBytes(Paths.get("src/main/resources/data.sql")));
        for (String sql : data.split(";")) {
            if (!sql.trim().isEmpty()) {
                stmt.execute(sql.trim());
            }
        }
        
        System.out.println("Database initialized successfully!");
        conn.close();
    }
}
