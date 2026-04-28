package com.luxtravel.services;

import com.luxtravel.exceptions.ValidationException;
import com.luxtravel.models.BaseModel;
import com.luxtravel.repositories.BaseRepository;

import java.util.List;

/**
 * Abstract base service — all concrete services extend this.
 * Encapsulates shared lifecycle hooks: beforeSave validation.
 */
public abstract class BaseService<T extends BaseModel, R extends BaseRepository<T>> {
    protected final R repository;

    public BaseService(R repository) {
        this.repository = repository;
    }

    /** Hook method — subclasses override for custom pre-save logic */
    protected void beforeSave(T entity) throws ValidationException {
        if (!entity.validate()) {
            throw new ValidationException("Validation failed for " + entity.getTableName());
        }
    }

    public T create(T entity) throws ValidationException {
        beforeSave(entity);
        return repository.save(entity);
    }

    public T update(Long id, T entity) throws ValidationException {
        // ensure entity exists first
        repository.findById(id);
        entity.setId(id);
        beforeSave(entity);
        return repository.save(entity);
    }

    public T findById(Long id) {
        return repository.findById(id);
    }

    public List<T> findAll() {
        return repository.findAll();
    }

    public void delete(Long id) {
        repository.delete(id);
    }

    public long count() {
        return repository.count();
    }
}
