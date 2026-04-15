import { useQuery } from "@tanstack/react-query"
import axiosInstance from "../../../../api/instance"

async function fetchWishlist() {
  const res = await axiosInstance.get("/wishlist")
  return res.data
}

export const useGetWishlist = () => {
  const { data, isPending: loading, error, refetch } = useQuery({
    queryKey: ["wishlist"],
    queryFn: fetchWishlist,
  })

  return {
    wishlist: data,
    products: data?.products || [],
    loading,
    error,
    refetch,
  }
}