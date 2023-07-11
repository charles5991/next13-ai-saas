import { UserNavigation } from "@/components/user-navigation";

const Navbar = () => {
  return ( 
    <div className="flex items-center p-4 justify-end">
      <UserNavigation />
    </div>
   );
}
 
export default Navbar;