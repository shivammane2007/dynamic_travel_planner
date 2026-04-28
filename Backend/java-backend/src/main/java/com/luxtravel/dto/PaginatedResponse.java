package com.luxtravel.dto;

import java.util.List;

public class PaginatedResponse<T> {
    private List<T> items;
    private long total;
    private int page;
    private int size;
    private int totalPages;

    public PaginatedResponse(List<T> items, long total, int page, int size) {
        this.items = items;
        this.total = total;
        this.page = page;
        this.size = size;
        this.totalPages = size > 0 ? (int) Math.ceil((double) total / size) : 0;
    }

    public List<T> getItems() { return items; }
    public long getTotal() { return total; }
    public int getPage() { return page; }
    public int getSize() { return size; }
    public int getTotalPages() { return totalPages; }
}
