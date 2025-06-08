import { useMutation, useQueryClient } from "@tanstack/react-query";
import { APIErrorResponse } from "../../lib/types";
import { API } from "../../lib/API";
import toast from "react-hot-toast";
import { QUERY_KEYS } from "@/lib/queryKeys";

// 1. Mutation for adding a new food item
export function useAddFoodItemMutation() {
  const queryClient = useQueryClient();

  const addFoodItemMutation = useMutation({
    mutationFn: (payload: any) => API.post("/restaurant/items", payload),
    onSuccess: () => {
      toast.success("Food item added successfully!");
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.FOOD_ITEMS],
      });
    },
    onError: (err: APIErrorResponse) => {
      console.error("Error adding food item", err);
      toast.error("Failed to add food item!");
    },
  });

  return { addFoodItemMutation };
}

// 2. Mutation for updating a food item
export function useUpdateFoodItemMutation() {
  const queryClient = useQueryClient();

  const updateFoodItemMutation = useMutation({
    mutationFn: (payload: { id: number; data: any }) =>
      API.patch(`/restaurant/items/${payload.id}`, payload.data),
    onSuccess: () => {
      toast.success("Food item updated successfully!");
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.FOOD_ITEMS],
      });
    },
    onError: (err: APIErrorResponse) => {
      console.error("Error updating food item", err);
      toast.error("Failed to update food item!");
    },
  });

  return { updateFoodItemMutation };
}

// 3. Mutation for adding a new food order
export function useAddFoodOrderMutation() {
  const queryClient = useQueryClient();

  const addFoodOrderMutation = useMutation({
    mutationFn: (payload: any) => API.post("/restaurant/orders", payload),
    onSuccess: () => {
      toast.success("Food order added successfully!");
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.FOOD_ORDERS],
      });
    },
    onError: (err: APIErrorResponse) => {
      console.error("Error adding food order", err);
      toast.error("Failed to add food order!");
    },
  });

  return { addFoodOrderMutation };
}

// 4. Mutation for updating the status of a food order
export function useUpdateFoodOrderStatusMutation() {
  const queryClient = useQueryClient();

  const updateFoodOrderStatusMutation = useMutation({
    mutationFn: (payload: { id: string; status: string }) =>
      API.patch("/restaurant/orders/status", payload),
    onSuccess: () => {
      toast.success("Food order status updated!");
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.FOOD_ORDERS],
      });
    },
    onError: (err: APIErrorResponse) => {
      console.error("Error updating food order status", err);
      toast.error("Failed to update food order status!");
    },
  });

  return { updateFoodOrderStatusMutation };
}
