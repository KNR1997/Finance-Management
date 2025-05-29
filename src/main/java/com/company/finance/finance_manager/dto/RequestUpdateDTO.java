package com.company.finance.finance_manager.dto;

import com.company.finance.finance_manager.entity.ERequestType;
import com.company.finance.finance_manager.entity.EResponse;
import lombok.Data;

@Data
public class RequestUpdateDTO {
    private Integer id;

    private Integer invoiceId;

    private ERequestType requestType;

    private EResponse response;

}
