package com.luxtravel.interfaces;

import java.util.List;
import java.util.Map;

public interface Searchable<T> {
    List<T> search(String query);
    List<T> filter(Map<String, String> filters);
}
