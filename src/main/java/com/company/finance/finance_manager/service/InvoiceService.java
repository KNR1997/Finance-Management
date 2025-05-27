package com.company.finance.finance_manager.service;

import com.company.finance.finance_manager.dto.InvoiceDTO;
import com.company.finance.finance_manager.dto.UpdateInvoiceDTO;
import com.company.finance.finance_manager.entity.EStatus;
import com.company.finance.finance_manager.entity.Invoice;
import com.company.finance.finance_manager.entity.User;
import com.company.finance.finance_manager.exception.ResourceNotFoundException;
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

    public Invoice getInvoiceById(Long id) {
        return invoiceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Invoice not found with id: " + id));
    }

    public Invoice createInvoice(InvoiceDTO invoiceDTO) {
        Invoice invoice = new Invoice();

        invoice.setInvoiceNumber(invoiceDTO.getInvoiceNumber());
        invoice.setValue(invoiceDTO.getValue());
        invoice.setFgsStatus(EStatus.PENDING);
        invoice.setTerritoryStatus(EStatus.PENDING);

        return invoiceRepository.save(invoice);
    }

    public Invoice updateInvoice(Long id, UpdateInvoiceDTO updateInvoiceDTO) {
        Invoice invoice = invoiceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Invoice not found with ID: " + id));

        invoice.setFgsStatus(updateInvoiceDTO.getFgsStatus());
        invoice.setTerritoryStatus(updateInvoiceDTO.getTerritoryStatus());

        return invoiceRepository.save(invoice);
    }
}
