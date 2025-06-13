import { useMutation, useQueryClient } from "@tanstack/react-query";
import { APIErrorResponse } from "../../lib/types";
import { API } from "../../lib/API";
import toast from "react-hot-toast";
import { QUERY_KEYS } from "@/lib/queryKeys";

// RoomPayload for adding and updating rooms
export type RoomPayload = {
  id?: number;
  roomTypeId: number;
  roomNumber: string;
  floor: number;
  notes?: string;
};

export default function useRoomMutation() {
  const queryClient = useQueryClient();

  const handleSuccess = () => {
    toast.success("Action successful!");

    queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.ROOMS],
    });
  };

  // *** Room CRUD Operations ***

  const addRoomMutation = useMutation({
    mutationFn: (payload: RoomPayload) => API.post("/rooms/rooms", payload),
    onSuccess: handleSuccess,
    onError: (err: APIErrorResponse) => {
      console.error("Add room error", err);
      toast.error(err.response?.data?.message || "Adding room failed!");
    },
  });

  const updateRoomMutation = useMutation({
    mutationFn: (payload: RoomPayload & { id: number }) =>
      API.patch(`/rooms/rooms/${payload.id}`, payload),
    onSuccess: handleSuccess,
    onError: (err: APIErrorResponse) => {
      console.error("Update room error", err);
      toast.error(err.response?.data?.message || "Updating room failed!");
    },
  });

  const deleteRoomMutation = useMutation({
    mutationFn: (id: number) => API.delete(`/rooms/rooms/${id}`),
    onSuccess: handleSuccess,
    onError: (err: APIErrorResponse) => {
      console.error("Delete room error", err);
      toast.error(err.response?.data?.message || "Deleting room failed!");
    },
  });

  // *** Update Room Status ***
  const updateRoomStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) =>
      API.patch(`/rooms/rooms/${id}/status`, { status }),
    onSuccess: () => {
      toast.success("Room status updated successfully!");
    },
    onError: (err: APIErrorResponse) => {
      console.error("Update room status error", err);
      toast.error(
        err.response?.data?.message || "Updating room status failed!"
      );
    },
  });

  return {
    addRoomMutation,
    updateRoomMutation,
    deleteRoomMutation,
    updateRoomStatusMutation,
  };
}
