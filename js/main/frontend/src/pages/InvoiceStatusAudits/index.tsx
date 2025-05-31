import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../components/ui/loader/loader";
import ErrorMessage from "../../components/ui/error-message";
import { fetchLogs } from "../../services/LogService";
import LogList from "../../components/log/log-list";

export default function Logs() {
  const {
    data: logs = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["logs"],
    queryFn: fetchLogs,
  });

  if (isLoading) return <Loader text="Loading..." />;
  if (isError) return <ErrorMessage message={error.message} />;

  return (
    <>
      <PageMeta
        title="React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Logs" />
      <div className="space-y-6">
        <LogList logs={logs} />
      </div>
    </>
  );
}
