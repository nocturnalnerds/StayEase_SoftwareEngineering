import { useQuery } from "@tanstack/react-query";
import { APISuccessResponse, Reservation } from "../../lib/types";
import { QUERY_KEYS } from "../../lib/queryKeys";
import { API } from "../../lib/API";

export default function useReservationQuery() {
  const reservationQuery = useQuery({
    queryFn: () =>
      API.get<APISuccessResponse<Reservation[]>>("/front-office/reservations"),
    queryKey: [QUERY_KEYS.RESERVATIONS],
  });

  const dashboardQuery = useQuery({
    queryFn: () =>
      API.get<APISuccessResponse<any>>("/front-office/dashboard-stats"),
    queryKey: [QUERY_KEYS.RESERVATION_DASHBOARD],
  });

  const reservationData: Reservation[] =
    reservationQuery.data?.data.reservations || [];
  const dashboardData = dashboardQuery.data?.data || [];

  return {
    reservationData,
    reservationQuery,
    dashboardData,
    dashboardQuery,
    isLoading: reservationQuery.isLoading,
    isError: reservationQuery.isError,
  };
}
