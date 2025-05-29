import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../components/ui/loader/loader";
import ErrorMessage from "../../components/ui/error-message";
import { fetchRequests } from "../../services/requestService";
import RequestList from "../../components/request/request-list";

export default function Requests() {
  const {
    data: requests = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["requests"],
    queryFn: fetchRequests,
  });

  if (isLoading) return <Loader text="Loading..." />;
  if (isError) return <ErrorMessage message={error.message} />;

  return (
    <>
      <PageMeta
        title="React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Requests" />
      <div className="space-y-6">
        <RequestList requests={requests} />
      </div>
    </>
  );
}
