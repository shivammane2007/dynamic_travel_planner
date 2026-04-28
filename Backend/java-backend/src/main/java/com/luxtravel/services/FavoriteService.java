package com.luxtravel.services;

import com.luxtravel.models.Favorite;
import com.luxtravel.repositories.FavoriteRepository;
import java.util.List;

public class FavoriteService {
    private final FavoriteRepository repository;

    public FavoriteService(FavoriteRepository repository) {
        this.repository = repository;
    }

    public Favorite addFavorite(Favorite favorite) {
        return repository.save(favorite);
    }
    
    public void removeFavorite(long id) {
        repository.delete(id);
    }
}
