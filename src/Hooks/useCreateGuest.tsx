import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createGuest } from "../Api/apiGuest.tsx";

import { GuestCreateIn } from "../Types/Guest.tsx";

function useCreateGuest() {
  return useMutation({
    mutationFn: (guestIn: GuestCreateIn) => createGuest(guestIn),
  });
}

export default useCreateGuest;
