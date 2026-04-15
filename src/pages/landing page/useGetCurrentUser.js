import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import axiosInstance from "../../api/instance"

async function fetchUser() {
  const res = await axiosInstance.get('/auth/get-current-user')
  return res.data
}

export const useGetCurrentUser = () => {
  const navigate = useNavigate()

  const { data: currentUser, isLoading } = useQuery({
    queryKey: ['currentUser'],
    queryFn: fetchUser,
    retry: false, // don't retry on 401/404
  })

  useEffect(() => {
    if (isLoading) return

    if (!currentUser && window.location.pathname.startsWith("/dashboard")) {
      navigate("/auth/login")
    } else if (currentUser && window.location.pathname.startsWith("/auth")) {
      navigate("/dashboard")
    }
  }, [isLoading, currentUser, navigate])

  return { currentUser, isLoading }
}