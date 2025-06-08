import { useQuery } from "@tanstack/react-query";
import { APISuccessResponse, DiscountRate } from "../../lib/types";
import { QUERY_KEYS } from "../../lib/queryKeys";
import { API } from "../../lib/API";

export default function useRoomTypeQuery() {
  const discountRateQuery = useQuery({
    queryFn: () =>
      API.get<APISuccessResponse<{ discountRates: DiscountRate[] }>>(
        "/discount"
      ),
    queryKey: [QUERY_KEYS.ROOM_TYPES],
  });

  console.log("Discount Rate Query Data:", discountRateQuery.data);

  const discountRateData: DiscountRate[] = discountRateQuery.data?.data || [];

  return {
    discountRateData,
    isLoading: discountRateQuery.isLoading,
    isError: discountRateQuery.isError,
  };
}
