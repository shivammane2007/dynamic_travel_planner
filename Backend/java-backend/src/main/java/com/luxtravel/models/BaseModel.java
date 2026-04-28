package com.luxtravel.models;

import java.time.LocalDateTime;

public abstract class BaseModel {
    private Long id;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    // Subclasses declare which DB table they belong to
    public abstract String getTableName();

    // Polymorphic validation — each model validates its own required fields
    public abstract boolean validate();
}
