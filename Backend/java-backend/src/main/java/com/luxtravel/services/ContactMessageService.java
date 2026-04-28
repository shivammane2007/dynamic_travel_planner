package com.luxtravel.services;

import com.luxtravel.models.ContactMessage;
import com.luxtravel.repositories.ContactMessageRepository;

public class ContactMessageService {
    private final ContactMessageRepository repository;

    public ContactMessageService(ContactMessageRepository repository) {
        this.repository = repository;
    }

    public ContactMessage saveMessage(ContactMessage message) {
        return repository.save(message);
    }

    public java.util.List<ContactMessage> getAllMessages() {
        return repository.findAll();
    }

    public void deleteMessage(Long id) {
        repository.delete(id);
    }
}
