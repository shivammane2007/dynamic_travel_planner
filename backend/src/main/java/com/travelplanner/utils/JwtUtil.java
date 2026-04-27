package com.travelplanner.utils;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Map;

public final class JwtUtil {
    private static final String SECRET = System.getenv().getOrDefault("JWT_SECRET", "dynamic-travel-planner-secret-key-dynamic-travel-planner");
    private static final long EXPIRY_MS = 24L * 60L * 60L * 1000L;
    private static final Base64.Encoder URL_ENCODER = Base64.getUrlEncoder().withoutPadding();
    private static final Base64.Decoder URL_DECODER = Base64.getUrlDecoder();

    private JwtUtil() {
    }

    public static String generateToken(int userId, String email, String name) {
        long issuedAt = System.currentTimeMillis();
        long expiration = issuedAt + EXPIRY_MS;
        String headerJson = JsonUtil.toJson(Map.of("alg", "HS256", "typ", "JWT"));
        String payloadJson = JsonUtil.toJson(Map.of(
            "sub", String.valueOf(userId),
            "email", email,
            "name", name,
            "iat", issuedAt,
            "exp", expiration
        ));

        String header = URL_ENCODER.encodeToString(headerJson.getBytes(StandardCharsets.UTF_8));
        String payload = URL_ENCODER.encodeToString(payloadJson.getBytes(StandardCharsets.UTF_8));
        String signature = sign(header + "." + payload);
        return header + "." + payload + "." + signature;
    }

    public static Integer validateTokenAndGetUserId(String token) {
        try {
            String[] parts = token.split("\\.");
            if (parts.length != 3) {
                return null;
            }
            String signedData = parts[0] + "." + parts[1];
            if (!sign(signedData).equals(parts[2])) {
                return null;
            }

            String payloadJson = new String(URL_DECODER.decode(parts[1]), StandardCharsets.UTF_8);
            Map<String, Object> claims = JsonUtil.fromJson(payloadJson);
            long exp = ((Number) claims.get("exp")).longValue();
            if (exp < System.currentTimeMillis()) {
                return null;
            }
            return Integer.parseInt(String.valueOf(claims.get("sub")));
        } catch (Exception exception) {
            return null;
        }
    }

    private static String sign(String value) {
        try {
            Mac mac = Mac.getInstance("HmacSHA256");
            mac.init(new SecretKeySpec(SECRET.getBytes(StandardCharsets.UTF_8), "HmacSHA256"));
            return URL_ENCODER.encodeToString(mac.doFinal(value.getBytes(StandardCharsets.UTF_8)));
        } catch (Exception exception) {
            throw new IllegalStateException("Unable to sign token", exception);
        }
    }
}
