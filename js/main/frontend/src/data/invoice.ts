import { useQuery } from "@tanstack/react-query";
import { InvoicePaginator, InvoiceQueryOptions } from "../types";
import { API_ENDPOINTS } from "./client/api-endpoints";
import { mapPaginatorData } from "../utils/data-mappers";
import { InvoiceClient } from "./client/invoice";

// export const useInvoicesQuery = (options: Partial<InvoiceQueryOptions>) => {
//   const { data, isLoading, isError, error } = useQuery({
//     queryKey: [API_ENDPOINTS.INVOICES, options],
//     queryFn: () => fetchInvoices(options),
//     // keepPreviousData: true, // keeps previous data while fetching new
//   });

//   return {
//     invoices: data?.content ?? [],
//     paginatorInfo: mapPaginatorData(data),
//     isError: isError,
//     error,
//     loading: isLoading,
//   };
// };

export const useInvoicesQuery = (
  params: Partial<InvoiceQueryOptions>,
  options: any = {}
) => {
  const { data, error, isLoading } = useQuery<InvoicePaginator, Error>(
    [API_ENDPOINTS.INVOICES, params],
    ({ queryKey, pageParam }) =>
      InvoiceClient.paginated(Object.assign({}, queryKey[1], pageParam)),
    {
      keepPreviousData: true,
      ...options,
    }
  );

  return {
    invoices: data?.content ?? [],
    paginatorInfo: mapPaginatorData(data),
    error,
    loading: isLoading,
  };
};
