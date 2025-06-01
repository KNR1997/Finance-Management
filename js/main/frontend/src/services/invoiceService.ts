import axios from "axios";
import { InvoiceQueryOptions } from "../types";
import { HttpClient } from "../data/client/http-client";

const getToken = () => localStorage.getItem("token");

export const fetchInvoices = async (options?: Partial<InvoiceQueryOptions>) => {
  const token = localStorage.getItem("token");

  const {
    page = 1,
    orderBy = "created_at",
    sortedBy = "desc",
    companyName,
    financeStatus,
    fgsStatus,
  } = options || {};

  const res = await axios.get("/api/invoices", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      page: page - 1, // Spring Boot pagination is zero-based
      size: 10, // You can make this dynamic if needed
      // sort: `${orderBy}`,
      // search: HttpClient.formatSearchParams({
      //   companyName,
      //   financeStatus,
      //   fgsStatus,
      // }),
    },
  });
  return res.data;
};

export const updateInvoice = async ({
  id,
  input,
}: {
  id: number;
  input: any;
}) => {
  const token = getToken();
  const res = await axios.put(
    `http://localhost:8080/api/invoices/${id}`,
    input,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data;
};
