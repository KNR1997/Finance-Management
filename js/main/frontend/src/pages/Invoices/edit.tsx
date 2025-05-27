import { useParams } from "react-router-dom";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import CreateOrUpdateUserForm from "../../components/user/user-form";
import { useEffect, useState } from "react";
import axios from "axios";
import CreateOrUpdateInvoiceForm from "../../components/invoice/invoice-form";

export default function EditInvoicePage() {
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const [invoice, setInvoice] = useState();

  // Fetch user data if editing
  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:8080/api/invoices/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setInvoice(res.data);
        })
        .catch(() => {
          alert("Failed to load user");
        });
    }
  }, [id]);

  console.log("invoice: ", invoice);

  return (
    <>
      <PageBreadcrumb pageTitle="Edit Invoice" />
      {invoice && <CreateOrUpdateInvoiceForm initialValues={invoice} />}
    </>
  );
}
