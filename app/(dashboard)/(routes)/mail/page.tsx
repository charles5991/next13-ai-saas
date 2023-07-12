"use client";

import { Heading } from "@/components/heading";
import { useProProtection } from "@/hooks/use-pro-protection";

const MailPage = () => {
  useProProtection();

  return ( 
    <div>
      <Heading
        title="Mail Writer"
        description="Create your best email yet."
        src="/mail.png"
      />
      <div className="px-4 lg:px-8">
        
      </div>
    </div>
   );
}
 
export default MailPage;
