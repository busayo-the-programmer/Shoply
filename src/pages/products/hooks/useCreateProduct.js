import axiosInstance from '../../../api/instance'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

const createProductFn = async (productData) => {
  const res = await axiosInstance.post('/products/create', productData)
  return res.data.product
}

export const useCreateProduct = () => {
  const navigate = useNavigate()

  const { mutateAsync: createProduct, isPending: loading, error } = useMutation({
    mutationFn: createProductFn,
    onSuccess: () => {
      alert('Product created successfully!')
      navigate('/products')
    },
  })

  return { createProduct, loading, error }
}