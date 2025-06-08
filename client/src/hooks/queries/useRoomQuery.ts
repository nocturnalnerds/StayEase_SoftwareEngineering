import { useQuery } from "@tanstack/react-query";
import { APISuccessResponse, Room } from "../../lib/types";
import { QUERY_KEYS } from "../../lib/queryKeys";
import { API } from "../../lib/API";

export default function useRoomQuery() {
  const roomQuery = useQuery({
    queryFn: () => API.get<APISuccessResponse<Room[]>>("/rooms/rooms"),
    queryKey: [QUERY_KEYS.ROOMS],
  });

  const dashboardQuery = useQuery({
    queryFn: () => API.get<APISuccessResponse<Room[]>>("/rooms/roomDashboard"),
    queryKey: [QUERY_KEYS.ROOM_DASHBOARD],
  });

  const roomData: Room[] = roomQuery.data?.data ?? [];
  const dashboardData = dashboardQuery.data?.data ?? [];

  return {
    roomData,
    roomQuery,
    dashboardData,
    dashboardQuery,
    isLoading: roomQuery.isLoading,
    isError: roomQuery.isError,
  };
}
