package com.travelplanner.services;

import com.travelplanner.models.User;
import com.travelplanner.repositories.UserRepository;
import com.travelplanner.utils.JwtUtil;
import com.travelplanner.utils.PasswordUtil;

import java.util.Map;

public class AuthService {
    private final UserRepository userRepository;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Map<String, Object> signup(Map<String, Object> payload) {
        String name = String.valueOf(payload.get("name"));
        String email = String.valueOf(payload.get("email")).toLowerCase();
        String password = String.valueOf(payload.get("password"));

        if (userRepository.findByEmail(email).isPresent()) {
            return Map.of("success", false, "message", "Email already exists");
        }

        User user = userRepository.save(name, email, PasswordUtil.hash(password));
        String token = JwtUtil.generateToken(user.getId(), user.getEmail(), user.getName());

        return Map.of(
            "success", true,
            "token", token,
            "user", Map.of("id", user.getId(), "name", user.getName(), "email", user.getEmail())
        );
    }

    public Map<String, Object> login(Map<String, Object> payload) {
        String email = String.valueOf(payload.get("email")).toLowerCase();
        String password = String.valueOf(payload.get("password"));
        return userRepository.findByEmail(email)
            .filter(user -> PasswordUtil.matches(password, user.getPassword()))
            .<Map<String, Object>>map(user -> Map.of(
                "success", true,
                "token", JwtUtil.generateToken(user.getId(), user.getEmail(), user.getName()),
                "user", Map.of("id", user.getId(), "name", user.getName(), "email", user.getEmail())
            ))
            .orElse(Map.of("success", false, "message", "Invalid email or password"));
    }
}
