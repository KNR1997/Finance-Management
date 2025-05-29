package com.company.finance.finance_manager.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Request extends TimeAuditModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "invoice_id")
    private Invoice invoice;

    private ERequestType requestType;

    private EStatus status;

    @ManyToOne
    @JoinColumn(name = "created_by")
    private User created_by;

    @ManyToOne
    @JoinColumn(name = "accepted_by")
    private User accepted_by;

}
