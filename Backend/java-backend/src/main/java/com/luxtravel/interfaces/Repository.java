package com.luxtravel.interfaces;

import com.luxtravel.exceptions.NotFoundException;
import java.util.List;

public interface Repository<T, ID> {
    T findById(ID id) throws NotFoundException;
    List<T> findAll();
    List<T> findAll(int page, int size);
    T save(T entity);
    void delete(ID id) throws NotFoundException;
    long count();
}
