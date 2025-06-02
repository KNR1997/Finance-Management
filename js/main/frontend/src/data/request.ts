import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { InvoicePaginator, InvoiceQueryOptions } from "../types";
import { API_ENDPOINTS } from "./client/api-endpoints";
import { mapPaginatorData } from "../utils/data-mappers";
import { InvoiceClient } from "./client/invoice";
import { toast } from "react-toastify";
import { RequestClient } from "./client/request";
import { useNavigate } from "react-router";

// export const useInvoicesQuery = (
//   params: Partial<InvoiceQueryOptions>,
//   options: any = {}
// ) => {
//   const { data, error, isLoading } = useQuery<InvoicePaginator, Error>(
//     [API_ENDPOINTS.INVOICES, params],
//     ({ queryKey, pageParam }) =>
//       InvoiceClient.paginated(Object.assign({}, queryKey[1], pageParam)),
//     {
//       keepPreviousData: true,
//       ...options,
//     }
//   );

//   return {
//     invoices: data?.content ?? [],
//     paginatorInfo: mapPaginatorData(data),
//     error,
//     loading: isLoading,
//   };
// };

export const useCreateRequestMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation(RequestClient.create, {
    onSuccess: async () => {
      navigate("/requests");
      toast.success("Successfully created!");
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.REQUESTS);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });
};

// export const useUpdateInvoiceMutation = () => {
//   const queryClient = useQueryClient();
//   return useMutation(InvoiceClient.update, {
//     onSuccess: async () => {
//       toast.success("Successfully updated!");
//     },
//     // Always refetch after error or success:
//     onSettled: () => {
//       queryClient.invalidateQueries(API_ENDPOINTS.INVOICES);
//     },
//     onError: (error: any) => {
//       toast.error(error?.response?.data?.message);
//     },
//   });
// };
