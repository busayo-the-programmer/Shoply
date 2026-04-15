import { useEffect, useState } from "react";
import axiosInstance from "../../../api/instance";

export const useGetAdminController = () => {
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [vendors, setVendors] = useState([]);
    const [products, setProducts] = useState([]);

    async function getAdminStats() {
        setLoading(true);
        try {
            const fetchUsers = await axiosInstance.get('/admin/users');
            setUsers(fetchUsers.data);
            const fetchVendors = await axiosInstance.get('/admin/vendors');
            setVendors(fetchVendors.data);
            const fetchProducts = await axiosInstance.get('/admin/products');
            setProducts(fetchProducts.data);
        } catch (error) {
            console.log(error, "error fetching stats");
            
        } finally {
            setLoading(false);
        }
}
    useEffect(() => {
        getAdminStats();
    }, [])

    return { loading, users, vendors, products }
}