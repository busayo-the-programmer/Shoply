import { useQuery } from "@tanstack/react-query"
import axiosInstance from "../../../api/instance"

async function getAllUsers(){
    const res = await axiosInstance.get('/admin/users')
    return res.data
    
}
export const useGetAllUsers = () => {
    const { data: users = [], isLoading: loading, error } = useQuery({
        queryKey: ['admin-users'],
        queryFn: getAllUsers,
    })
    return { users, loading, error }
}