import { useMutation } from "@tanstack/react-query";
import { APIErrorResponse } from "../../lib/types";
import { API } from "../../lib/API";
import toast from "react-hot-toast";

// RoomTypePayload for adding and updating room types
export type RoomTypePayload = {
  name: string;
  description: string;
  basePrice: number;
  capacity: number;
  maxOccupancy: number;
  amenities: string[];
};

export default function useRoomTypeMutation() {
  const handleSuccess = () => {
    toast.success("Action successful!");
  };

  // *** Room Type CRUD Operations ***

  const addRoomTypeMutation = useMutation({
    mutationFn: (payload: RoomTypePayload) =>
      API.post("/rooms/room-types", payload),
    onSuccess: handleSuccess,
    onError: (err: APIErrorResponse) => {
      console.error("Add room type error", err);
      toast.error(err.response?.data?.message || "Adding room type failed!");
    },
  });

  const updateRoomTypeMutation = useMutation({
    mutationFn: (payload: RoomTypePayload & { id: number }) =>
      API.patch(`/rooms/room-types/${payload.id}`, payload),
    onSuccess: handleSuccess,
    onError: (err: APIErrorResponse) => {
      console.error("Update room type error", err);
      toast.error(err.response?.data?.message || "Updating room type failed!");
    },
  });

  const deleteRoomTypeMutation = useMutation({
    mutationFn: (id: number) => API.delete(`/rooms/room-types/${id}`),
    onSuccess: () => {
      toast.success("Room type deleted successfully!");
    },
    onError: (err: APIErrorResponse) => {
      console.error("Delete room type error", err);
      toast.error(err.response?.data?.message || "Deleting room type failed!");
    },
  });

  return {
    addRoomTypeMutation,
    updateRoomTypeMutation,
    deleteRoomTypeMutation,
  };
}
