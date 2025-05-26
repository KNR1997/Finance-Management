package com.company.finance.finance_manager.service;

import com.company.finance.finance_manager.dto.InvoiceDTO;
import com.company.finance.finance_manager.entity.Invoice;
import com.company.finance.finance_manager.repository.InvoiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InvoiceService {

    @Autowired
    private InvoiceRepository invoiceRepository;

    public List<Invoice> getAllInvoices() {
        return invoiceRepository.findAll();
    }

    public Invoice createInvoice(InvoiceDTO invoiceDTO) {
        Invoice invoice = new Invoice();

        invoice.setInvoiceNumber(invoiceDTO.getInvoiceNumber());
        invoice.setStatus(invoiceDTO.getStatus());

        return invoiceRepository.save(invoice);
    }
}
