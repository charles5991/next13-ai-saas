import Image from "next/image";
import { Montserrat } from 'next/font/google'
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/server";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const poppins = Montserrat ({ weight: '600', subsets: ['latin']  })

export const Sidebar = () => {
  const routes = [
    {
      label: 'Chat',
      icon: '/chat.png',
      active: false,
      href: '/',
    },
    {
      label: 'Image Generator',
      icon: '/image.png',
      active: false,
      href: '/image',
      premium: true,
    },
    {
      label: 'Blog Writer',
      icon: '/blog.png',
      active: false,
      href: '/blog',
      premium: true,
    },
    {
      label: 'Email Writer',
      icon: '/mail.png',
      active: false,
      href: '/email',
      premium: true,
    }
  ]

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
      <div className="px-3 py-2 flex-1">
        <div className="flex items-center pl-3 mb-14">
          <div className="relative h-10 w-10 mr-4">
            <Image fill alt="Logo" src="/nira.png" />
          </div>
          <h1 className={cn("text-3xl font-bold", poppins.className)}>
            Genius
          </h1>
        </div>
        <div className="space-y-1">
          {routes.map((route) => (
            <div
              key={route.label} 
              className={cn(
                "group flex p-3 w-full justify-start font-semibold cursor-pointer hover:text-white transition",
                route.active ? "text-white" : "text-zinc-500"
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
            </div>
          ))}
        </div>
      </div>
      <div className="px-3 py-2">
        <LogoutLink>
          <Button variant="secondary" className="w-full">
            Logout
          </Button>
        </LogoutLink>
      </div>
    </div>
  )
}