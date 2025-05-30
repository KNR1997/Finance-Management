import axios from "axios";

const getToken = () => localStorage.getItem("token");

export const fetchLogs = async () => {
  const token = localStorage.getItem("token");
  const res = await axios.get("/api/logs", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};