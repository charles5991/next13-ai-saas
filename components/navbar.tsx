import { UserButton } from "@clerk/nextjs";

import { MobileSidebar } from "@/components/mobile-sidebar";
import { getCount } from "@/actions/get-count";

const Navbar = async () => {
  const requestCount = await getCount();

  return ( 
    <div className="flex items-center p-4">
      <MobileSidebar requestCount={requestCount} />
      <div className="flex w-full justify-end">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
   );
}
 
export default Navbar;