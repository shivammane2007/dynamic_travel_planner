package com.luxtravel.models;

public class User extends BaseModel {
    public enum Role { ADMIN, USER }

    private String name;
    private String email;
    private String password; // BCrypt hashed
    private Role role = Role.USER;

    public User() {}

    public User(String name, String email, String password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

    @Override
    public String getTableName() { return "users"; }

    @Override
    public boolean validate() {
        return name != null && !name.trim().isEmpty()
                && email != null && email.contains("@")
                && password != null && !password.trim().isEmpty();
    }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }
}
