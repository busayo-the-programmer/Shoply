import { useState } from 'react'
import axiosInstance from '../../../api/instance'
import { useNavigate } from 'react-router-dom'

export const useCreateProduct = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [product, setProduct] = useState(null);
  const navigate = useNavigate()

  async function createProduct(productData) {
    setLoading(true)
    setError(null)
    try {
      const res = await axiosInstance.post('/products/create', productData)
      console.log(res)
      setProduct(res.data.product)
      alert('Product created successfully!')
      navigate('/products')
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create product')
    } finally {
      setLoading(false)
    }
  }

  return { createProduct, loading, error, product }
}