import { useQuery } from "@tanstack/react-query";
import { UserPaginator, UserQueryOptions } from "../types";
import { API_ENDPOINTS } from "./client/api-endpoints";
import { UserClient } from "./client/user";
import { mapPaginatorData } from "../utils/data-mappers";

export const useUsersQuery = (
  params: Partial<UserQueryOptions>,
  options: any = {}
) => {
  const { data, error, isLoading } = useQuery<UserPaginator, Error>(
    [API_ENDPOINTS.USERS, params],
    ({ queryKey, pageParam }) =>
      UserClient.paginated(Object.assign({}, queryKey[1], pageParam)),
    {
      keepPreviousData: true,
      ...options,
    }
  );

  return {
    users: data?.content ?? [],
    paginatorInfo: mapPaginatorData(data),
    error,
    loading: isLoading,
  };
};