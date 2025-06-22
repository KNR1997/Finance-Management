package com.company.finance.finance_manager.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class InvoiceMiddleware {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String docNumber;

    private String docDate;

    private String cardCode;

    private String docTotal;

    private String wareHouse;

    private String userSign;

}
