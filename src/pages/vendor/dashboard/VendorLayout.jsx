import React from 'react'
import { useGetVendorStats } from '../hooks/useGetVendorStats'
import VendorAnalyticsCards from './Cards'

const VendorLayout = () => {
  const {products} = useGetVendorStats( )
  return (
    <div><VendorAnalyticsCards /></div>
  )
}

export default VendorLayout