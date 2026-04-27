package com.travelplanner.repositories;

import com.travelplanner.models.User;

import java.util.Optional;

public interface UserRepository {
    User save(String name, String email, String password);
    Optional<User> findByEmail(String email);
    Optional<User> findById(int id);
}
