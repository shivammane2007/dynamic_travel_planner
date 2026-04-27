package com.travelplanner.repositories.impl;

import com.travelplanner.models.User;
import com.travelplanner.repositories.UserRepository;

import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicInteger;

public class UserRepositoryImpl implements UserRepository {
    private final AtomicInteger sequence = new AtomicInteger(1);
    private final Map<Integer, User> users = new LinkedHashMap<>();

    @Override
    public User save(String name, String email, String password) {
        int id = sequence.getAndIncrement();
        User user = new User(id, name, email.toLowerCase(), password);
        users.put(id, user);
        return user;
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return users.values().stream().filter(user -> user.getEmail().equalsIgnoreCase(email)).findFirst();
    }

    @Override
    public Optional<User> findById(int id) {
        return Optional.ofNullable(users.get(id));
    }
}
