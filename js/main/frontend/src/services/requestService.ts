import axios from "axios";
import { CreateRequestInput } from "../types";

const getToken = () => localStorage.getItem("token");

export const fetchRequests = async () => {
  const token = localStorage.getItem("token");
  const res = await axios.get("/api/requests", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const createRequest = async (input: CreateRequestInput) => {
  const token = getToken();
  const res = await axios.post(`http://localhost:8080/api/requests`, input, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const updateRequest = async ({
  id,
  input,
}: {
  id: number;
  input: any;
}) => {
  const token = getToken();
  const res = await axios.put(
    `http://localhost:8080/api/requests/${id}`,
    input,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data;
};
