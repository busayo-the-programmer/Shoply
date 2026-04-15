import { useMutation, useQueryClient } from "@tanstack/react-query"
import axiosInstance from "../../../../api/instance"

// Hook (one for both)
export const useUpdateCartQuantity = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ productId, quantity }) =>
      axiosInstance.patch(`/cart/${productId}`, { quantity }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart'] }),
  });
};


export const useAddToCart = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, quantity = 1 }) =>
      axiosInstance.post(`/cart/${id}`, { quantity }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"]
      })
    },
  })
}

export const useRemoveCartItem = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id) =>
      axiosInstance.delete(`/cart/${id}`),

    onSuccess: () => {
      queryClient.invalidateQueries(['cart'])
    },
  })
}


export const useClearCart = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () =>
      axiosInstance.delete(`/cart`),

    onSuccess: () => {
      queryClient.invalidateQueries(['cart'])
    },
  })
}