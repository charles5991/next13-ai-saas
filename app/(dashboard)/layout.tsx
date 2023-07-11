import Navbar from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";

const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return ( 
    <div className="h-full">
      <div className="relative">
        <div className="hidden h-screen md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-80 bg-gray-900">
          <Sidebar />
        </div>
        <div className="flex flex-col flex-1 h-screen md:pl-72">
          <Navbar />
          {children}
        </div>
      </div>
    </div>
   );
}
 
export default DashboardLayout;
