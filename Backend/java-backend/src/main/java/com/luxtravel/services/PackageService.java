package com.luxtravel.services;

import com.luxtravel.models.Package;
import com.luxtravel.repositories.PackageRepository;
import java.util.List;
import java.util.Optional;

public class PackageService {
    private final PackageRepository repository;

    public PackageService(PackageRepository repository) {
        this.repository = repository;
    }

    public List<Package> getAllPackages() {
        // Here we could add pagination/filtering like in DestinationService
        // But for simplicity we return all
        return repository.findAll();
    }

    public Optional<Package> getPackageById(long id) {
        return repository.findById(id);
    }
    
    // We can also add getPackageBySlug etc.
}
