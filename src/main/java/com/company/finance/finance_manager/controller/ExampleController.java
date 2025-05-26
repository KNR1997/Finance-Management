package com.company.finance.finance_manager.controller;

import com.company.finance.finance_manager.dto.ExampleItem;
import com.company.finance.finance_manager.service.ExampleService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ExampleController {
    private final ExampleService exampleService;

    public ExampleController(ExampleService exampleService) {
        this.exampleService = exampleService;
    }

    @GetMapping("/api/items")
    public List<ExampleItem> getItems() {
        return exampleService.getAllItems();
    }
}
