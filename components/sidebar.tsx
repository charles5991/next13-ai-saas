"use client";

import Link from "next/link";
import Image from "next/image";
import { Montserrat } from 'next/font/google'
import { Zap } from "lucide-react";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useProModal } from "@/hooks/use-pro-modal";

const poppins = Montserrat ({ weight: '600', subsets: ['latin'] });

const routes = [
  {
    label: 'Home',
    icon: '/home.png',
    href: '/dashboard',
  },
  {
    label: 'Mail Writer',
    icon: '/mail.png',
    active: false,
    href: '/mail',
    premium: false,
  },
  {
    label: 'Chat',
    icon: '/chat.png',
    href: '/chat',
    premium: true,
  },
  {
    label: 'Photo Generator',
    icon: '/photo.png',
    href: '/photo',
    premium: true,
  },
  {
    label: 'Blog Writer',
    icon: '/blog.png',
    href: '/blog',
    premium: true,
  },
];

export const Sidebar = () => {
  const pathname = usePathname();
  const proModal = useProModal();

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
      <div className="px-3 py-2 flex-1">
        <Link href="/" className="flex items-center pl-3 mb-14">
          <div className="relative h-8 w-8 mr-4">
            <Image fill alt="Logo" src="/logo.png" />
          </div>
          <h1 className={cn("text-2xl font-bold", poppins.className)}>
            Genius
          </h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href} 
              href={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-semibold cursor-pointer hover:text-white transition",
                pathname === route.href ? "text-white" : "text-zinc-400"
              )}
            >
              <div className="flex items-center flex-1">
                <div className="relative h-8 w-8 mr-4 group-hover:scale-125 transition duration-150">
                  <Image alt="Icon" src={route.icon} fill />
                </div>
                {route.label}
              </div>
              {route.premium && (
                <Badge variant="premium" className="font-bold uppercase p-2">
                  pro
                </Badge>
              )}
            </Link>
          ))}
        </div>
      </div>
      <div className="px-3 py-2">
        <Button onClick={proModal.onOpen} variant="premium" className="w-full">
          Upgrade
          <Zap className="w-4 h-4 ml-2 fill-white" />
        </Button>
      </div>
    </div>
  )
}