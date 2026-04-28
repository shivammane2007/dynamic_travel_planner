package com.luxtravel.utils;

import io.github.cdimascio.dotenv.Dotenv;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.nio.file.Files;
import java.nio.file.Paths;

public class EnvUtil {
    private static final Logger log = LoggerFactory.getLogger(EnvUtil.class);
    private static Dotenv dotenv;

    public static void load() {
        try {
            // Find root .env file by going one level up from java-backend, 
            // since java-backend is a subdirectory and .env is at the root.
            String rootDir = System.getProperty("user.dir");
            if (rootDir.endsWith("java-backend")) {
                rootDir = rootDir.substring(0, rootDir.length() - "/java-backend".length());
            }
            if (Files.exists(Paths.get(rootDir, ".env"))) {
                dotenv = Dotenv.configure()
                        .directory(rootDir)
                        .ignoreIfMissing()
                        .load();
                log.info("Loaded .env file from " + rootDir);
            } else {
                // fallback to current directory
                dotenv = Dotenv.configure().ignoreIfMissing().load();
                log.info("Loaded .env from current working directory");
            }
        } catch (Exception e) {
            log.warn("Could not load .env file, relying on system environment variables", e);
            dotenv = null;
        }
    }

    public static String get(String key) {
        if (dotenv != null) {
            String val = dotenv.get(key);
            if (val != null) return val;
        }
        return System.getenv(key);
    }

    public static String get(String key, String defaultValue) {
        String val = get(key);
        return val != null ? val : defaultValue;
    }
}
