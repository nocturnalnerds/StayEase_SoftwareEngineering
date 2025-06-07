import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { APISuccessResponse, User } from "../../lib/types";
import { AxiosResponse } from "axios";
import { QUERY_KEYS } from "../../lib/queryKeys";
import { API } from "../../lib/API";
import toast from "react-hot-toast";
import { UseFormSetError } from "react-hook-form";

export type RegisterPayload = {
  email: string;
  password: string;
  confirmPassword?: string;
  username: string;
  phone: string;
};

type LoginPayload = {
  email: string;
  password: string;
};

export default function useAuthMutation(
  setError: UseFormSetError<LoginPayload | RegisterPayload>
) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleLoginSuccess = (
    response: AxiosResponse<
      APISuccessResponse<{ token: string; userData: User }>
    >
  ) => {
    const { token, userData } = response.data.data;
    localStorage.setItem("token", token);

    toast.success("Login successful!");

    queryClient.setQueryData([QUERY_KEYS.USERS], {
      data: { data: userData },
    });

    navigate("/movies");
  };

  const loginMutation = useMutation({
    mutationFn: (payload: LoginPayload) => API.post(`auth/login`, payload),
    onSuccess: handleLoginSuccess,
    onError: (err) => {
      console.error("Login error", err);
      toast.error("Login failed!");
    },
  });

  const registerMutation = useMutation({
    mutationFn: (payload: RegisterPayload) =>
      API.post("auth/register", payload),
    onSuccess: handleLoginSuccess,
    onError: (err) => {
      setError("email", { message: "Email already exists" });
      setError("password", { message: "Password is required" });
      setError("username", { message: "Name is required" });
      setError("phone", { message: "Phone number is required" });

      console.error("Register error", err);
      toast.error("Registration failed!");
    },
  });

  return { loginMutation, registerMutation };
}

