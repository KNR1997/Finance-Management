package com.company.finance.finance_manager.controller;

import com.company.finance.finance_manager.entity.InvoiceStatusAudit;
import com.company.finance.finance_manager.service.InvoiceStatusAuditService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/logs")
public class InvoiceStatusAuditController {

    @Autowired
    private InvoiceStatusAuditService auditService;

    @GetMapping
    public ResponseEntity<List<InvoiceStatusAudit>> getAllInvoices() {
        List<InvoiceStatusAudit> invoiceStatusAudits = auditService.getAllInvoices();
        return ResponseEntity.ok(invoiceStatusAudits);
    }
}
