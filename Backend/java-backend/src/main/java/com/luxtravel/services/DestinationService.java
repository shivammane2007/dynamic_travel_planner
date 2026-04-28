package com.luxtravel.services;

import com.luxtravel.exceptions.ValidationException;
import com.luxtravel.models.Destination;
import com.luxtravel.repositories.DestinationRepository;

import java.util.List;
import java.util.Map;

public class DestinationService extends BaseService<Destination, DestinationRepository> {

    public DestinationService(DestinationRepository repository) {
        super(repository);
    }

    public List<Destination> search(String query) {
        return repository.search(query);
    }

    public List<Destination> filter(Map<String, String> filters) {
        return repository.filter(filters);
    }

    public List<Destination> findAllPaginated(int page, int size, String search, String priceLevel) {
        return repository.findAllPaginated(page, size, search, priceLevel);
    }

    public long countFiltered(String search, String priceLevel) {
        return repository.countFiltered(search, priceLevel);
    }
}
