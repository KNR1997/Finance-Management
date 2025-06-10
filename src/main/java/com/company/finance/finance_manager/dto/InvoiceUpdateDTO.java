package com.company.finance.finance_manager.dto;

import com.company.finance.finance_manager.entity.EInvoiceType;
import com.company.finance.finance_manager.entity.EStatus;
import lombok.Data;

@Data
public class InvoiceUpdateDTO {
    private EStatus fgsStatus;

    private EStatus financeStatus;

    private String remarks;

    private EInvoiceType invoiceType;
}
