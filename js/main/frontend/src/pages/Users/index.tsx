import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import axios from "axios";
import UserList from "../../components/user/user-list";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../components/ui/loader/loader";
import ErrorMessage from "../../components/ui/error-message";

const fetchUsers = async () => {
  const token = localStorage.getItem("token");
  const res = await axios.get("/api/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export default function Users() {
  const {
    data: users = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  if (isLoading) return <Loader text="Loading..." />;
  if (isError) return <ErrorMessage message={error.message} />;

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
