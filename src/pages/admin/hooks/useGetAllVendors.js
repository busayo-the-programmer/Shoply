import { useQuery } from "@tanstack/react-query"
import axiosInstance from "../../../api/instance"

async function getAllVendors(){
    const res = await axiosInstance.get('/vendor')
    return res.data.vendors
}
async function getVendorById(id){
    const res = await axiosInstance.get(`/vendor/${id}`)
    return res.data.vendor
}

export const useGetVendorById = (id) => {
    const { data: vendor, isLoading: loading, error } = useQuery({
        queryKey: ['vendor', id],   
        queryFn: () => getVendorById(id),
        enabled: !!id, 
    })
    return { vendor, loading, error }
}

export const useGetAllVendors = () => {
    const { data: vendors = [], isLoading: loading, error } = useQuery({
        queryKey: ['vendors'],
        queryFn: getAllVendors,
    })
    return { vendors, loading, error }
}