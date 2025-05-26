package com.company.finance.finance_manager.controller;

import com.company.finance.finance_manager.dto.InvoiceDTO;
import com.company.finance.finance_manager.entity.Invoice;
import com.company.finance.finance_manager.service.InvoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/invoices")
public class InvoiceController {

    @Autowired
    private InvoiceService invoiceService;


    @GetMapping
    public ResponseEntity<List<Invoice>> getAllInvoices() {
        List<Invoice> invoiceList = invoiceService.getAllInvoices();
        return ResponseEntity.ok(invoiceList);
    }

    @PostMapping
    public ResponseEntity<Invoice> createCourse(@RequestBody InvoiceDTO invoiceDTO) {
        Invoice invoice = invoiceService.createInvoice(invoiceDTO);
        URI location = URI.create("/courses/" + invoice.getInvoiceNumber()); // assuming course has getSlug()
        return ResponseEntity.created(location).body(invoice);
    }
}
