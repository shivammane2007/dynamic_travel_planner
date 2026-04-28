package com.luxtravel.models;

import java.math.BigDecimal;
import java.sql.Date;
import java.sql.Timestamp;

public class Booking extends BaseModel {
    private Long userId;
    private Long packageId;
    private int travelers;
    private BigDecimal totalPrice;
    private Timestamp bookingDate;
    private Date travelDate;
    private String status;

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    
    public Long getPackageId() { return packageId; }
    public void setPackageId(Long packageId) { this.packageId = packageId; }
    
    public int getTravelers() { return travelers; }
    public void setTravelers(int travelers) { this.travelers = travelers; }
    
    public BigDecimal getTotalPrice() { return totalPrice; }
    public void setTotalPrice(BigDecimal totalPrice) { this.totalPrice = totalPrice; }
    
    public Timestamp getBookingDate() { return bookingDate; }
    public void setBookingDate(Timestamp bookingDate) { this.bookingDate = bookingDate; }
    
    public Date getTravelDate() { return travelDate; }
    public void setTravelDate(Date travelDate) { this.travelDate = travelDate; }
    
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
