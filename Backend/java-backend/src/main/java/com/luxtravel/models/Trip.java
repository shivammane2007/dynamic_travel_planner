package com.luxtravel.models;

import com.luxtravel.interfaces.Exportable;
import com.luxtravel.utils.JsonUtil;

import java.math.BigDecimal;
import java.time.LocalDate;

public class Trip extends BaseModel implements Exportable {
    public enum Status { PLANNED, CONFIRMED, ONGOING, COMPLETED, CANCELLED }

    private Long userId;
    private Long destinationId;
    private String title;
    private LocalDate startDate;
    private LocalDate endDate;
    private Status status = Status.PLANNED;
    private BigDecimal budget;
    private String notes;

    public Trip() {}

    @Override
    public String getTableName() { return "trips"; }

    @Override
    public boolean validate() {
        return userId != null && destinationId != null
                && title != null && !title.trim().isEmpty()
                && startDate != null && endDate != null
                && !endDate.isBefore(startDate);
    }

    @Override
    public String toCsv() {
        return String.join(",",
                String.valueOf(getId()),
                String.valueOf(userId),
                String.valueOf(destinationId),
                title != null ? "\"" + title + "\"" : "",
                startDate != null ? startDate.toString() : "",
                endDate != null ? endDate.toString() : "",
                status != null ? status.name() : "",
                budget != null ? budget.toString() : "",
                notes != null ? "\"" + notes.replace("\"", "\"\"") + "\"" : ""
        );
    }

    @Override
    public String toJson() {
        return JsonUtil.toJson(this);
    }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public Long getDestinationId() { return destinationId; }
    public void setDestinationId(Long destinationId) { this.destinationId = destinationId; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public LocalDate getStartDate() { return startDate; }
    public void setStartDate(LocalDate startDate) { this.startDate = startDate; }

    public LocalDate getEndDate() { return endDate; }
    public void setEndDate(LocalDate endDate) { this.endDate = endDate; }

    public Status getStatus() { return status; }
    public void setStatus(Status status) { this.status = status; }

    public BigDecimal getBudget() { return budget; }
    public void setBudget(BigDecimal budget) { this.budget = budget; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
}
