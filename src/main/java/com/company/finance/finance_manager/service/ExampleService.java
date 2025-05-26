package com.company.finance.finance_manager.service;

import com.company.finance.finance_manager.dto.ExampleItem;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class ExampleService {
    public List<ExampleItem> getAllItems() {
        return Arrays.asList(
                new ExampleItem(1L, "Item 1", "Description for item 1"),
                new ExampleItem(2L, "Item 2", "Description for item 2"),
                new ExampleItem(3L, "Item 3", "Description for item 3")
        );
    }
}
