import { useMutation } from "@tanstack/react-query";
import { API } from "../../lib/API";
import { toast } from "react-hot-toast";
import { ContactProps } from "../../lib/types";
import { UseFormSetError } from "react-hook-form";

export default function useContactMutation(
  setError: UseFormSetError<ContactProps>
) {
  const contactMutation = useMutation({
    mutationFn: (payload: ContactProps) => API.post("/contact", payload),
    onSuccess: () => {
      toast.success("Message sent successfully!");
    },
    onError: (err) => {
      console.error("Contact form submission error", err);
      toast.error("Failed to send message!");
      setError("message", { message: "An error occurred" });
    },
  });

  return { contactMutation };
}
