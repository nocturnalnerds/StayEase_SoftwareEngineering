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

  const roomIdQuery = useQuery({
    queryFn: ({ roomNo }: { roomNo: string }) =>
      API.get<APISuccessResponse<Room>>(`/rooms/rooms/${roomNo}`),
    enabled: false,
  });

  const roomData: Room[] = roomQuery.data?.data ?? [];
  const dashboardData = dashboardQuery.data?.data ?? [];
  const roomIdData: int | undefined = roomIdQuery.data?.data ?? undefined;

  return {
    roomData,
    roomQuery,
    dashboardData,
    dashboardQuery,
    roomIdData,
    roomIdQuery,
    isLoading: roomQuery.isLoading,
    isError: roomQuery.isError,
  };
}
