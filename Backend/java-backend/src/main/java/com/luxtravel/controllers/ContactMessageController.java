package com.luxtravel.controllers;

import com.luxtravel.models.ContactMessage;
import com.luxtravel.services.ContactMessageService;
import io.javalin.Javalin;
import io.javalin.http.Context;
import java.sql.Timestamp;

public class ContactMessageController extends BaseController {
    private final ContactMessageService service;

    public ContactMessageController(Javalin app, ContactMessageService service) {
        super(app);
        this.service = service;
    }

    @Override
    public void registerRoutes() {
        app.post("/api/contact", this::createMessage);
        app.get("/api/contact", this::getAllMessages);
        app.delete("/api/contact/{id}", this::deleteMessage);
    }

    private void getAllMessages(Context ctx) {
        ctx.json(service.getAllMessages());
    }

    private void deleteMessage(Context ctx) {
        try {
            long id = Long.parseLong(ctx.pathParam("id"));
            service.deleteMessage(id);
            ctx.status(204);
        } catch (Exception e) {
            ctx.status(400).json("{\"error\": \"Invalid ID\"}");
        }
    }

    private void createMessage(Context ctx) {
        try {
            ContactMessage msg = ctx.bodyAsClass(ContactMessage.class);
            msg.setSentAt(new Timestamp(System.currentTimeMillis()));
            ContactMessage saved = service.saveMessage(msg);
            ctx.status(201).json(saved);
        } catch (Exception e) {
            ctx.status(400).json("{\"error\": \"Invalid request body\"}");
        }
    }
}
