package com.company.finance.finance_manager.controller;

import com.company.finance.finance_manager.dto.InvoiceDTO;
import com.company.finance.finance_manager.dto.PaginatedResponse;
import com.company.finance.finance_manager.dto.UpdateInvoiceDTO;
import com.company.finance.finance_manager.entity.Invoice;
import com.company.finance.finance_manager.service.InvoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequestMapping("/api/invoices")
public class InvoiceController {

    @Autowired
    private InvoiceService invoiceService;

    @GetMapping
    public ResponseEntity<PaginatedResponse<Invoice>> getAllInvoices(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sort,
            @RequestParam(defaultValue = "desc") String direction,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String fgsStatus,
            @RequestParam(required = false) String financeStatus,
            @RequestParam(required = false) String start_date,
            @RequestParam(required = false) String end_date
    ) {
        Sort sortOrder = Sort.by(Sort.Direction.fromString(direction), sort);
        Pageable pageable = PageRequest.of(page, size, sortOrder);

        Page<Invoice> invoicePage = invoiceService.getAllInvoices(pageable, search, fgsStatus, financeStatus, start_date, end_date);

        PaginatedResponse<Invoice> response = new PaginatedResponse<>(invoicePage);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getInvoiceById(@PathVariable Integer id) {
        Invoice invoice = invoiceService.getInvoiceById(id);

        return ResponseEntity.ok(invoice);
    }

    @PostMapping
    public ResponseEntity<Invoice> createCourse(@RequestBody InvoiceDTO invoiceDTO) {
        Invoice invoice = invoiceService.createInvoice(invoiceDTO);
        URI location = URI.create("/courses/" + invoice.getInvoiceNumber()); // assuming course has getSlug()
        return ResponseEntity.created(location).body(invoice);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Invoice> updateCourse(@PathVariable Integer id, @RequestBody UpdateInvoiceDTO updateDto) {
        Invoice response = invoiceService.updateInvoice(id, updateDto);
        return ResponseEntity.ok(response);
    }
}
