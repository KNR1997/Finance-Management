import { useParams } from "react-router";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import { useEffect, useState } from "react";
import axios from "axios";
import CreateOrUpdateRequestForm from "../../components/request/request-form";

export default function EditRequestPage() {
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const [request, setRequest] = useState();

  // Fetch request data if editing
  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:8080/api/requests/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setRequest(res.data);
        })
        .catch(() => {
          alert("Failed to load request");
        });
    }
  }, [id]);

  console.log('request: ', request)

  return (
    <>
      <PageBreadcrumb pageTitle="Edit Request" />
      {request && <CreateOrUpdateRequestForm initialValues={request} />}
    </>
  );
}
