import AdminDashboardContent from "@/components/modules/Dashboord/AdminDashboardContent"
import { getDashboardData } from "@/services/dashboard.service"
import { ApiResponse } from "@/types/api.types"
import { IAdminDashboardData } from "@/types/dashboard.types"
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"

const AdminDashboardPage =async () => {

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey:["admin-dashboard-data"],
    queryFn: getDashboardData
  })

   const dashboardData = queryClient.getQueryData(["admin-dashboard-data"]) as ApiResponse<IAdminDashboardData>;

  console.log(dashboardData.data, "Dashboard Data from Page Component");

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AdminDashboardContent/>
    </HydrationBoundary>
  )
}

export default AdminDashboardPage