import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import { useEffect, useState } from "react";
import InvoiceList from "../../components/invoice/invoice-list";
import axios from "axios";
import UserList from "../../components/user/user-list";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchInvoices = async () => {
      if (token) {
        try {
          const res = await axios.get("/api/users", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUsers(res.data);
        } catch (err) {
          console.error("Invalid token");
          localStorage.removeItem("token");
        }
      }
      setLoading(false);
    };
    fetchInvoices();
  }, []);

  return (
    <>
      <PageMeta
        title="React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Users" />
      <div className="space-y-6">
        <UserList users={users} />
      </div>
    </>
  );
}
