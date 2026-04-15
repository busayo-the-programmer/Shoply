import { useParams } from "react-router-dom";
import axiosInstance from "../../../api/instance";
import { useQuery } from "@tanstack/react-query";


 async function getProductdetails(id) {
     const res = await axiosInstance.get(`/products/${id}`)
    return res.data
 }

export const useGetSingleProducts = (id) => {
    const {data, isPending: loading, error } = useQuery({
        queryKey: ['product', id],
        queryFn: () => getProductdetails(id),
        enabled: !!id,
    })
    return { product: data, loading, error }
}
