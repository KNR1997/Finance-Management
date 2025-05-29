import axios from "axios";

const getToken = () => localStorage.getItem("token");

export const fetchInvoices = async () => {
  const token = localStorage.getItem("token");
  const res = await axios.get("/api/invoices", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const updateInvoice = async ({ id, input }: { id: number; input: any }) => {
  const token = getToken();
  const res = await axios.put(`http://localhost:8080/api/invoices/${id}`, input, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};