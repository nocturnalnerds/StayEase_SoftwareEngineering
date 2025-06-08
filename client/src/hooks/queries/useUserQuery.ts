import { useQuery } from "@tanstack/react-query";
import { APISuccessResponse, Staff, User } from "../../lib/types";
import { QUERY_KEYS } from "../../lib/queryKeys";
import { API } from "../../lib/API";

export default function useUserQuery() {
  const guestQuery = useQuery({
    queryFn: () =>
      API.get<APISuccessResponse<User[]>>("/users-management/users"),
    queryKey: [QUERY_KEYS.GUESTS],
  });

  const staffQuery = useQuery({
    queryFn: () =>
      API.get<APISuccessResponse<Staff[]>>("/users-management/staff"),
    queryKey: [QUERY_KEYS.STAFFS],
  });

  const guestsData: User[] = guestQuery.data?.data ?? [];
  const staffsData: Staff[] = staffQuery.data?.data ?? [];

  return {
    guestsData,
    guestQuery,
    staffsData,
    staffQuery,
    isLoading: guestQuery.isLoading,
    isError: guestQuery.isError,
  };
}
