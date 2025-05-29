// services/userService.ts
import axios from "axios";

const getToken = () => localStorage.getItem("token");

export const createUser = async (input: any) => {
  const token = getToken();
  const res = await axios.post("http://localhost:8080/api/users", input, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const updateUser = async ({ id, input }: { id: string; input: any }) => {
  const token = getToken();
  const res = await axios.put(`http://localhost:8080/api/users/${id}`, input, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
