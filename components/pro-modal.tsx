"use client";

import Image from "next/image";
import { CheckCircle, Zap } from "lucide-react";

import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useProModal } from "@/hooks/use-pro-modal";

const items = [
  {
    label: "Chatbot",
    src: "/chat.png",
  },
  {
    label: "Mail Writer",
    src: "/mail.png",
  },
  {
    label: "Blog Writer",
    src: "/blog.png",
  },
  {
    label: "Photo Generator",
    src: "/photo.png",
  },
]

export const ProModal = () => {
  const proModal = useProModal();

  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
            <div className="relative w-20 h-20">
              <Image
                src="/pro.png"
                alt="Pro"
                fill
              />
            </div>
            <div className="flex items-center gap-x-2 font-bold text-xl">
              Upgrade to
              <Badge variant="premium" className="uppercase text-sm py-1">
                pro
              </Badge>
            </div>
          </DialogTitle>
          <DialogDescription className="text-center pt-2 space-y-4 text-zinc-900 font-semibold">
            {items.map((item) => (
              <div 
                key={item.src} 
                className="py-2 flex items-center justify-between">
                <div className="flex items-center gap-x-2">
                  <div className="w-8 h-8 relative">
                    <Image
                      fill
                      src={item.src}
                      alt={item.label}
                    />
                  </div>
                  {item.label}
                </div>
                <CheckCircle className="text-primary w-5 h-5" />
              </div>
            ))}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button size="lg" variant="premium" className="w-full">
            Upgrade for $19.99 / month
            <Zap className="w-4 h-4 ml-2 fill-white" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
