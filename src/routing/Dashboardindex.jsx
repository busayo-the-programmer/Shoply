// DashboardIndex.jsx

import AdminLayout from "../pages/admin/AdminLayout"
import { useGetCurrentUser } from "../pages/landing page/useGetCurrentUser"
import VendorLayout from "../pages/vendor/dashboard/VendorLayout"

const DashboardIndex = () => {
  const { currentUser } = useGetCurrentUser()

  if (!currentUser) return <p>Loading...</p>

  if (currentUser.role === 'vendor') return <VendorLayout />
  if (currentUser.role === 'admin') return <AdminLayout />

  return <p>Unauthorized</p>
}

export default DashboardIndex