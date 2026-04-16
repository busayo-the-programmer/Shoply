import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../pages/landing page";
import About from "../pages/landing page/About";
import { Register } from "../pages/auth/register";
import Login from "../pages/auth/Login";
import Allproducts from "../pages/products/Allproducts";
import ProductLayout from "../pages/products/Layout";
import Createproducts from "../pages/products/Createproducts";
import ProductDetails from "../pages/products/ProductDetails";
import Cart from "../pages/products/(cart_wishlist)/cart";
import Wishlist from "../pages/products/(cart_wishlist)/wishlist";
import DashboardLayout from "../pages/dashboard/Dashboardlayout";
import Layout from "../pages/landing page/Layout";
import VendorLayout from "../pages/vendor/dashboard/VendorLayout";
import { VendorProducts } from "../pages/vendor/dashboard/Products";
import Profile from "../pages/dashboard/Profile";
import UpdateProductdata from "../pages/vendor/dashboard/Updateproducts";
import DashboardIndex from "./Dashboardindex";
import VendorDetails from "../pages/admin/VendorDetails";
import Vendors from "../pages/admin/Vendors";
import Users from "../pages/admin/Users";
import ManageProducts from "../pages/admin/ManageProducts";
import CheckoutPage from "../pages/products/(cart_wishlist)/Checkout";
import VendorApplication from "../pages/vendor/Application-form";


 export const routes = createBrowserRouter([
    {path: '/', Component: Layout, children: [
        {index: true, Component: LandingPage},
        {path: 'about', Component: About }
        
    ]},

    {path: '/auth', children: [
        {path: 'register', Component: Register},
        {path: 'login', Component: Login}
    ]},
    {path: 'vendor', children: [
        {path: 'apply', Component: VendorApplication},
    ]},
    {path: '/products', Component: ProductLayout, children: [
        {index: true, Component: Allproducts},
        {path: 'create', Component: Createproducts },
        {path: ':id', Component: ProductDetails},
        {path: 'cart', Component: Cart},
        {path: 'wishlist', Component: Wishlist},
        {path: 'checkout', Component: CheckoutPage},

    ]},
  
    {
  path: 'dashboard',
  Component: DashboardLayout,
  children: [
    { index: true, Component: DashboardIndex},
    {
      path: 'vendor',
      children: [
        // {index: true, Component: VendorLayout},
        { path: 'products', Component: VendorLayout },
        { path: 'update/:id', Component: UpdateProductdata },
        { path: 'store', Component: VendorProducts },
      ]
    },
    {
      path: 'admin',
      children: [
        { path: 'vendor-details/:id', Component: VendorDetails },
        { path: 'vendors', Component: Vendors },
        {path: 'users', Component: Users},
        {path: 'products', Component: ManageProducts}
      ]
    },
    {path: 'profile', Component: Profile}
  ]
}


 ]);