import { Navigate, Outlet } from "react-router";
import { userStore } from "../features/store/user.store";



export default function PrivateRoute() {

  const { user, access_token }  = userStore();
    const isAuthenticated = !!user

  //   if (isLoading) {
  //   return (
  //     <div className="flex items-center justify-center min-h-screen">
  //       <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
  //     </div>
  //   );
  // }

 if(!access_token && !user) {
 return <Navigate to='/'/>
 }

 if(isAuthenticated)
    return <Outlet />
}
