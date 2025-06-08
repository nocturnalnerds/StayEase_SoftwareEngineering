import { useMutation, useQueryClient } from "@tanstack/react-query";
import { APIErrorResponse } from "../../lib/types";
import { API } from "../../lib/API";
import toast from "react-hot-toast";
import { QUERY_KEYS } from "@/lib/queryKeys";

// UserPayload for adding and updating users
export type UserPayload = {
  id?: string;
  email: string;
  name: string;
  password: string;
  phone: string;
  role: string;
};

export default function useUserMutation() {
  const queryClient = useQueryClient();

  const handleSuccessStaff = () => {
    toast.success("Action successful!");
    queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.STAFFS],
    });
  };

  const handleSuccessGuest = () => {
    toast.success("Action successful!");
    queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.GUESTS],
    });
  };

  // *** User CRUD Operations ***

  const addUserMutation = useMutation({
    mutationFn: (payload: UserPayload) =>
      API.post("/users-management/users", payload),
    onSuccess: handleSuccessGuest,
    onError: (err: APIErrorResponse) => {
      console.error("Add user error", err);
      toast.error(err.response?.data?.message || "Adding user failed!");
    },
  });

  const updateUserMutation = useMutation({
    mutationFn: (payload: UserPayload & { id: string }) =>
      API.put(`/users-management/users/${payload.id}`, payload),
    onSuccess: handleSuccessGuest,
    onError: (err: APIErrorResponse) => {
      console.error("Update user error", err);
      toast.error(err.response?.data?.message || "Updating user failed!");
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: (id: string) => API.delete(`/users-management/users/${id}`),
    onSuccess: handleSuccessGuest,
    onError: (err: APIErrorResponse) => {
      console.error("Delete user error", err);
      toast.error(err.response?.data?.message || "Deleting user failed!");
    },
  });

  // *** Staff CRUD Operations ***

  const addStaffMutation = useMutation({
    mutationFn: (payload: UserPayload) =>
      API.post("/users-management/staff", payload),
    onSuccess: handleSuccessStaff,
    onError: (err: APIErrorResponse) => {
      console.error("Add staff error", err);
      toast.error(err.response?.data?.message || "Adding staff failed!");
    },
  });

  const updateStaffMutation = useMutation({
    mutationFn: (payload: UserPayload & { id: string }) =>
      API.put(`/users-management/staff/${payload.id}`, payload),
    onSuccess: handleSuccessStaff,
    onError: (err: APIErrorResponse) => {
      console.error("Update staff error", err);
      toast.error(err.response?.data?.message || "Updating staff failed!");
    },
  });

  const deleteStaffMutation = useMutation({
    mutationFn: (id: number) => API.delete(`/users-management/staff/${id}`),
    onSuccess: handleSuccessStaff,
    onError: (err: APIErrorResponse) => {
      console.error("Delete staff error", err);
      toast.error(err.response?.data?.message || "Deleting staff failed!");
    },
  });

  return {
    addUserMutation,
    updateUserMutation,
    deleteUserMutation,
    addStaffMutation,
    updateStaffMutation,
    deleteStaffMutation,
  };
}
