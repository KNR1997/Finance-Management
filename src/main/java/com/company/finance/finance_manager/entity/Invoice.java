package com.company.finance.finance_manager.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class Invoice extends TimeAuditModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String companyName;

    private String invoiceNumber; // Todo -> DocNumber

    private Double value; // Todo -> DocTotal

    private EStatus fgsStatus;

    private EStatus financeStatus;

    private String territory;  // Todo -> CardCode

    private String remarks;

    private String location;

    private String createdUser;

//    private LocalDateTime DocDate;

}
