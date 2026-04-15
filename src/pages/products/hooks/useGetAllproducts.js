import { useQuery } from '@tanstack/react-query'
import axiosInstance from '../../../api/instance'

async function getAllProducts() {
  const res = await axiosInstance.get('/products')
  return res.data.products
}

export const useGetAllProducts = () => {
  const { data: products = [], isLoading: loading , error} = useQuery({
    queryKey: ['products'],
    queryFn: getAllProducts,
  })

  return { products, loading, error }
}