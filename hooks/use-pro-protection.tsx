import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useProModal } from "@/hooks/use-pro-modal";

const isSubscribed = false;

export const useProProtection = () => {
  const router = useRouter();
  const onOpen = useProModal((state) => state.onOpen);
  
  useEffect(() => {
    if (!isSubscribed) {
      router.push('/dashboard');
      onOpen();
    }
  }, [router, onOpen]);
};
