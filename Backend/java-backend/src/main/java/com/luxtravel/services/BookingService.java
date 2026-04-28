package com.luxtravel.services;

import com.luxtravel.exceptions.NotFoundException;
import com.luxtravel.exceptions.ValidationException;
import com.luxtravel.models.Booking;
import com.luxtravel.repositories.BookingRepository;
import com.luxtravel.repositories.TripRepository;

import java.util.List;

public class BookingService extends BaseService<Booking, BookingRepository> {
    private final TripRepository tripRepository;

    public BookingService(BookingRepository repository, TripRepository tripRepository) {
        super(repository);
        this.tripRepository = tripRepository;
    }

    @Override
    protected void beforeSave(Booking booking) throws ValidationException {
        super.beforeSave(booking);
        // Validate FK: trip must exist
        try {
            tripRepository.findById(booking.getTripId());
        } catch (NotFoundException e) {
            throw new ValidationException("Trip not found: " + booking.getTripId());
        }
    }

    public List<Booking> findByTripId(Long tripId) {
        return repository.findByTripId(tripId);
    }

    public List<Booking> findByStatus(String status) {
        return repository.findByStatus(status);
    }

    public List<Booking> findByTripIdAndStatus(Long tripId, String status) {
        return repository.findByTripIdAndStatus(tripId, status);
    }
}
