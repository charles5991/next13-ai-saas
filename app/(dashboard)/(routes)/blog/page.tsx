"use client";

import { Heading } from "@/components/heading";
import { useProProtection } from "@/hooks/use-pro-protection";

const BlogPage = () => {
  useProProtection();

  return ( 
    <div>
      <Heading
        title="Blog Writer"
        description="Create your best blog post yet."
        src="/blog.png"
      />
      <div className="px-4 lg:px-8">
        
      </div>
    </div>
   );
}
 
export default BlogPage;
