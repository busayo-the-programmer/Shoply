import { useEffect, useState } from "react";
import axiosInstance from "../../../api/instance";

export const useGetVendorStats = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productLenght, setproductLenght] = useState(0);
  const [totalWorth, setTotalWorth] = useState(0);

  async function getVendorProducts() {
    setLoading(true);
    try {
      const vendorProducts = await axiosInstance.get("/vendor/products");
      const productList = vendorProducts.data.products
      setProducts(productList);
      console.log(productList);
      
      setproductLenght(parseInt(productList.length));

      const total = productList.reduce(
        (acc, product) => acc + product.price,
        0,
      );
      setTotalWorth(total);
    } catch (error) {
      console.log(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getVendorProducts();
  }, []);
  return { products, productLenght, loading, totalWorth };
};
