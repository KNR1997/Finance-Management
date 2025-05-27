export interface Invoice {
  id: number;
  invoiceNumber: string;
  value: number;
  fgsStatus: InvoiceStatus;
  territoryStatus: InvoiceStatus;
}

export enum InvoiceStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED"
}

export enum ERole {
  ROLE_ADMIN = "ROLE_ADMIN",
  ROLE_USER = "ROLE_USER"
}

export interface Role {
  id: number;
  name: string
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  roles: Role[]
}