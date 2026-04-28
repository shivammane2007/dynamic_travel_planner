package com.luxtravel.models;

import java.math.BigDecimal;
import java.time.LocalDate;

public class Booking extends BaseModel {
    public enum BookingType { FLIGHT, HOTEL, CAR, ACTIVITY, PACKAGE }
    public enum Status { PENDING, CONFIRMED, CANCELLED, REFUNDED }

    private Long tripId;
    private Long userId;
    private BookingType bookingType;
    private String provider;
    private String referenceCode;
    private BigDecimal amount;
    private String currency = "USD";
    private LocalDate bookingDate;
    private Status status = Status.PENDING;

    public Booking() {}

    @Override
    public String getTableName() { return "bookings"; }

    @Override
    public boolean validate() {
        return tripId != null && userId != null
                && bookingType != null
                && amount != null && amount.compareTo(BigDecimal.ZERO) >= 0;
    }

    public Long getTripId() { return tripId; }
    public void setTripId(Long tripId) { this.tripId = tripId; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public BookingType getBookingType() { return bookingType; }
    public void setBookingType(BookingType bookingType) { this.bookingType = bookingType; }

    public String getProvider() { return provider; }
    public void setProvider(String provider) { this.provider = provider; }

    public String getReferenceCode() { return referenceCode; }
    public void setReferenceCode(String referenceCode) { this.referenceCode = referenceCode; }

    public BigDecimal getAmount() { return amount; }
    public void setAmount(BigDecimal amount) { this.amount = amount; }

    public String getCurrency() { return currency; }
    public void setCurrency(String currency) { this.currency = currency; }

    public LocalDate getBookingDate() { return bookingDate; }
    public void setBookingDate(LocalDate bookingDate) { this.bookingDate = bookingDate; }

    public Status getStatus() { return status; }
    public void setStatus(Status status) { this.status = status; }
}
