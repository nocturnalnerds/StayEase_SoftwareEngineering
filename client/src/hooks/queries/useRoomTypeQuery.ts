import { useQuery } from "@tanstack/react-query";
import { APISuccessResponse, RoomType } from "../../lib/types";
import { QUERY_KEYS } from "../../lib/queryKeys";
import { API } from "../../lib/API";

export default function useRoomTypeQuery() {
  const roomTypeQuery = useQuery({
    queryFn: () =>
      API.get<APISuccessResponse<{ rooms: RoomType[] }>>("/rooms/room-types"),
    queryKey: [QUERY_KEYS.ROOM_TYPES],
  });

  const roomTypeData: RoomType[] = roomTypeQuery.data?.data || [];

  return {
    roomTypeData,
    isLoading: roomTypeQuery.isLoading,
    isError: roomTypeQuery.isError,
  };
}
