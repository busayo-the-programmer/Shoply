import { useQuery } from "@tanstack/react-query"
import axiosInstance from "../../../api/instance"

async function Manageproducts() {
    const res = await axiosInstance.get('/admin/products')
    return res.data
}

export const useGetProducts = () => {
    const { data: products = [], isLoading: loading, error } = useQuery({
        queryKey: ['admin-products'],
        queryFn: Manageproducts,
    })
    return { products, loading, error }
}