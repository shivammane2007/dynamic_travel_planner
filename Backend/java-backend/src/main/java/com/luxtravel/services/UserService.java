package com.luxtravel.services;

import com.luxtravel.exceptions.ValidationException;
import com.luxtravel.models.User;
import com.luxtravel.repositories.UserRepository;
import org.mindrot.jbcrypt.BCrypt;

import java.util.Optional;

public class UserService extends BaseService<User, UserRepository> {

    public UserService(UserRepository repository) {
        super(repository);
    }

    @Override
    protected void beforeSave(User user) throws ValidationException {
        super.beforeSave(user);
        if (!com.luxtravel.utils.ValidationUtil.isValidEmail(user.getEmail())) {
            throw new ValidationException("Invalid email address");
        }
    }

    /** Register: validates, checks duplicate email, hashes password, saves */
    public User register(User user) throws ValidationException {
        beforeSave(user);
        if (repository.existsByEmail(user.getEmail())) {
            throw new ValidationException("Email already registered: " + user.getEmail());
        }
        // BCrypt hash the password before persisting
        user.setPassword(BCrypt.hashpw(user.getPassword(), BCrypt.gensalt()));
        return repository.save(user);
    }

    /** Login: verify email + BCrypt password. Returns user without password field on success. */
    public User login(String email, String rawPassword) throws ValidationException {
        Optional<User> opt = repository.findByEmail(email);
        if (opt.isEmpty()) {
            throw new ValidationException("Invalid email or password");
        }
        User user = opt.get();
        if (!BCrypt.checkpw(rawPassword, user.getPassword())) {
            throw new ValidationException("Invalid email or password");
        }
        // Mask password from response
        user.setPassword(null);
        return user;
    }

    public User findByEmail(String email) {
        return repository.findByEmail(email)
                .orElseThrow(() -> new com.luxtravel.exceptions.NotFoundException("User not found: " + email));
    }
}
