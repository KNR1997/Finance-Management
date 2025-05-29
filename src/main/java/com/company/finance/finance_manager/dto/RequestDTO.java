package com.company.finance.finance_manager.dto;

import com.company.finance.finance_manager.entity.ERequestType;
import com.company.finance.finance_manager.entity.EStatus;
import lombok.Data;

@Data
public class RequestDTO {
    private Integer id;

    private Integer invoiceId;

    private ERequestType requestType;

    private EStatus status;

}
