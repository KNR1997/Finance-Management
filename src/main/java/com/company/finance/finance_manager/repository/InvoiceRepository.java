package com.company.finance.finance_manager.repository;

import com.company.finance.finance_manager.entity.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InvoiceRepository extends JpaRepository<Invoice, Long> {
}
