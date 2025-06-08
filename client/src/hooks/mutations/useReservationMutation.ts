import { useMutation, useQueryClient } from "@tanstack/react-query";
import { APIErrorResponse } from "../../lib/types";
import { API } from "../../lib/API";
import toast from "react-hot-toast";
import { QUERY_KEYS } from "@/lib/queryKeys";

// ReservationPayload for adding and updating reservations
export type ReservationPayload = {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  roomId: number;
  adults: number;
  children: number;
  specialRequest?: string;
  checkInDate: string;
  checkOutDate: string;
  discountRateId?: number;
};

export default function useReservationMutation() {
  const queryClient = useQueryClient();

  const handleSuccess = () => {
    toast.success("Action successful!");

    queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.RESERVATIONS],
    });
  };

  // *** Reservation CRUD Operations ***

  const addReservation = useMutation({
    mutationFn: (payload: ReservationPayload) =>
      API.post("/front-office/reservation", payload),
    onSuccess: handleSuccess,
    onError: (err: APIErrorResponse) => {
      console.error("Add reservation error", err);
      toast.error(err.response?.data?.message || "Adding reservation failed!");
    },
  });

  const updateReservation = useMutation({
    mutationFn: (payload: ReservationPayload & { id: number }) =>
      API.patch(`/front-office/reservation`, payload),
    onSuccess: handleSuccess,
    onError: (err: APIErrorResponse) => {
      console.error("Update reservation error", err);
      toast.error(
        err.response?.data?.message || "Updating reservation failed!"
      );
    },
  });

  const deleteReservation = useMutation({
    mutationFn: (id: number) => API.delete(`/front-office/reservation/${id}`),
    onSuccess: handleSuccess,
    onError: (err: APIErrorResponse) => {
      console.error("Delete reservation error", err);
      toast.error(
        err.response?.data?.message || "Deleting reservation failed!"
      );
    },
  });

  // *** Update Reservation Payment Status ***
  const updatePaymentStatus = useMutation({
    mutationFn: ({
      reservationId,
      paymentStatus,
      paymentMethod,
    }: {
      reservationId: number;
      paymentStatus: string;
      paymentMethod: string;
    }) =>
      API.patch(`/front-office/reservation/payment-status`, {
        reservationId,
        paymentStatus,
        paymentMethod,
      }),
    onSuccess: () => {
      toast.success("Payment status updated successfully!");
    },
    onError: (err: APIErrorResponse) => {
      console.error("Update payment status error", err);
      toast.error(
        err.response?.data?.message || "Updating payment status failed!"
      );
    },
  });

  // *** Update Reservation Check-in Status ***
  const updateCheckInStatus = useMutation({
    mutationFn: ({
      reservationId,
      checkInStatus,
    }: {
      reservationId: number;
      checkInStatus: string;
    }) =>
      API.patch(`/front-office/reservation/checkin-status`, {
        reservationId,
        checkInStatus,
      }),
    onSuccess: () => {
      toast.success("Check-in status updated successfully!");
    },
    onError: (err: APIErrorResponse) => {
      console.error("Update check-in status error", err);
      toast.error(
        err.response?.data?.message || "Updating check-in status failed!"
      );
    },
  });

  return {
    addReservation,
    updateReservation,
    deleteReservation,
    updatePaymentStatus,
    updateCheckInStatus,
  };
}
