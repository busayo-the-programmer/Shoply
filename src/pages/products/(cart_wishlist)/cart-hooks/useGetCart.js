
import axiosInstance from '../../../../api/instance'
import { useQuery } from '@tanstack/react-query'

async function fetchCart() {
  const res = await axiosInstance.get('/cart')
  return res.data
}
export const useGetCart = () => {
  const {data, isPending: loading, error, refetch } = useQuery({
    queryKey: ['cart'],
    queryFn: fetchCart,
  })
  return { cart: data, items: data?.items || [], loading, error, refetch }
}