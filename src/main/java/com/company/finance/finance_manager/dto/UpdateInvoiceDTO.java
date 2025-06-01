package com.company.finance.finance_manager.dto;

import com.company.finance.finance_manager.entity.EStatus;
import lombok.Data;

@Data
public class UpdateInvoiceDTO {
    private EStatus fgsStatus;

    private EStatus financeStatus;
}
