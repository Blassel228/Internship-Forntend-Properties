import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createGuest } from "../Api/apiGuest.tsx";
import { GuestCreate } from "../Types/types.tsx";

function useCreateGuest() {
  return useMutation({
    mutationFn: (guest: GuestCreate) => createGuest(guest)
  });
}

export default useCreateGuest;
