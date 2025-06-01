package com.company.finance.finance_manager.repository;

import com.company.finance.finance_manager.entity.Invoice;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface InvoiceRepository extends JpaRepository<Invoice, Integer>, JpaSpecificationExecutor<Invoice> {
    Page<Invoice> findByCompanyNameContainingIgnoreCase(String companyName, Pageable pageable);
}
