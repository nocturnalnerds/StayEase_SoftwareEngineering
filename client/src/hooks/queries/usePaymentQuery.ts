import { useQuery } from "@tanstack/react-query";
import { APISuccessResponse, Payment } from "../../lib/types";
import { QUERY_KEYS } from "../../lib/queryKeys";
import { API } from "../../lib/API";

export default function usePaymentQuery() {
  const paymentQuery = useQuery({
    queryFn: () =>
      API.get<APISuccessResponse<{ payments: Payment[] }>>("/payment/all"),
    queryKey: [QUERY_KEYS.PAYMENTS],
  });

  console.log("Payment Query Data:", paymentQuery.data);

  const paymentData: Payment[] = paymentQuery.data?.data?.payments || [];

  return {
    paymentData,
    isLoading: paymentQuery.isLoading,
    isError: paymentQuery.isError,
  };
}
