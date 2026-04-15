import { useMutation, useQueryClient } from "@tanstack/react-query"
import axiosInstance from "../../../../api/instance"

export const useToggleWishlist = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (productId) =>
      axiosInstance.post(`/wishlist/${productId}`),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["wishlist"]
      })
    }
  })
}