package com.company.finance.finance_manager.service;

import com.company.finance.finance_manager.dto.InvoiceDTO;
import com.company.finance.finance_manager.dto.UpdateInvoiceDTO;
import com.company.finance.finance_manager.entity.ERequestType;
import com.company.finance.finance_manager.entity.EStatus;
import com.company.finance.finance_manager.entity.Invoice;
import com.company.finance.finance_manager.exception.ResourceNotFoundException;
import com.company.finance.finance_manager.repository.InvoiceRepository;
import com.company.finance.finance_manager.repository.InvoiceStatusAuditRepository;
import com.company.finance.finance_manager.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class InvoiceService {

    @Autowired
    private InvoiceRepository invoiceRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private InvoiceStatusAuditService invoiceStatusAuditService;

    @Autowired
    private InvoiceStatusAuditRepository auditRepository;

    public List<Invoice> getAllInvoices() {
        return invoiceRepository.findAll();
    }

    public Invoice getInvoiceById(Integer id) {
        return invoiceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Invoice not found with id: " + id));
    }

    public Invoice createInvoice(InvoiceDTO invoiceDTO) {
        Invoice invoice = new Invoice();

        invoice.setCompanyName(invoiceDTO.getCompanyName());
        invoice.setInvoiceNumber(invoiceDTO.getInvoiceNumber());
        invoice.setValue(invoiceDTO.getValue());
        invoice.setFgsStatus(EStatus.PENDING);
        invoice.setTerritoryStatus(EStatus.PENDING);

        return invoiceRepository.save(invoice);
    }

    public Invoice updateInvoice(Integer id, UpdateInvoiceDTO updateInvoiceDTO) {
        Invoice invoice = invoiceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Invoice not found with ID: " + id));

        String currentUser = getCurrentUsername(); // Fetch from SecurityContext or Auth

        // FGS Status change
        if (updateInvoiceDTO.getFgsStatus() != null && !Objects.equals(invoice.getFgsStatus(), updateInvoiceDTO.getFgsStatus())) {
            invoiceStatusAuditService.saveStatusAudit(
                    invoice.getInvoiceNumber(),
                    "fgsStatus",
                    String.valueOf(invoice.getFgsStatus()),
                    String.valueOf(updateInvoiceDTO.getFgsStatus()),
                    currentUser);

            invoice.setFgsStatus(updateInvoiceDTO.getFgsStatus());
        }

        // Territory Status change
        if (updateInvoiceDTO.getTerritoryStatus() != null && !Objects.equals(invoice.getTerritoryStatus(), updateInvoiceDTO.getTerritoryStatus())) {
            invoiceStatusAuditService.saveStatusAudit(
                    invoice.getInvoiceNumber(),
                    "territoryStatus",
                    String.valueOf(invoice.getTerritoryStatus()),
                    String.valueOf(updateInvoiceDTO.getTerritoryStatus()),
                    currentUser);

            invoice.setTerritoryStatus(updateInvoiceDTO.getTerritoryStatus());
        }

        return invoiceRepository.save(invoice);
    }


    private String getCurrentUsername() {
        // Example using Spring Security
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication != null ? authentication.getName() : "SYSTEM";
    }
}
