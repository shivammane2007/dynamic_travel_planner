package com.luxtravel.services;

import com.luxtravel.models.Blog;
import com.luxtravel.repositories.BlogRepository;
import java.util.List;
import java.util.Optional;

public class BlogService {
    private final BlogRepository repository;

    public BlogService(BlogRepository repository) {
        this.repository = repository;
    }

    public List<Blog> getAllBlogs() {
        return repository.findAll();
    }

    public Optional<Blog> getBlogById(long id) {
        return repository.findById(id);
    }
}
