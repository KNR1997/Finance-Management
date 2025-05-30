export interface Invoice {
  id: number;
  companyName: string;
  invoiceNumber: string;
  value: number;
  fgsStatus: EStatus;
  territoryStatus: EStatus;
}

export interface Log {
  id: number;
  invoiceNumber: number;
  statusField: string;
  oldValue: string;
  newValue: string;
  updatedBy: string;
  updatedAt: string;
}

export enum EStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
}

export enum ERequestType {
  FG_REQUEST = "FG_REQUEST",
  FINANCE_REQUEST = "FINANCE_REQUEST",
}

export enum ERole {
  ROLE_ADMIN = "ROLE_ADMIN",
  ROLE_FINISH_GOOD_HEAD = "ROLE_FINISH_GOOD_HEAD",
  ROLE_FINISH_GOOD = "ROLE_FINISH_GOOD",
  ROLE_FINANCE_HEAD = "ROLE_FINANCE_HEAD",
  ROLE_FINANCE = "ROLE_FINANCE",
}

export interface Role {
  id: number;
  name: string;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  roles: Role[];
}

export interface Request {
  id: number;
  invoiceId: number;
  invoiceNumber: string;
  requestType: ERequestType;
  status: EStatus;
}

export interface CreateRequestInput {
  invoiceId: number;
  requestType: string;
}
