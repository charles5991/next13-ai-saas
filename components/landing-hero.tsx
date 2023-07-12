"use client";

import TypewriterComponent from "typewriter-effect";
import Image from "next/image";

import { Button } from "@/components/ui/button";

export const LandingHero = () => {
  return (
    <div className="text-white font-bold py-36 text-center space-y-5 relative">
      <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
        <h1>The Best AI Tool for</h1>
        <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          <TypewriterComponent
            options={{
              strings: [
                "Chatbot.",
                "Photo Generation.",
                "Blog Writing.",
                "Mail Writing."
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      </div>
      <div className="text-sm md:text-xl font-light text-zinc-400">
        Create content using AI 10x faster.
      </div>
      <Button variant="premium" className="md:text-lg p-4 md:p-6 rounded-full font-semibold">
        Start Creating For Free
      </Button>
      <div className="text-zinc-400 text-xs md:text-sm font-normal">
        No credit card required.
      </div>
      <div className="absolute md:left-20 md:top-10 left-10 top-5 -rotate-6 animate-pulse">
        <div className="w-20 h-20 relative">
          <Image src="/chat.png" fill alt="Chat" />
        </div> 
      </div>
      <div className="absolute md:right-20 md:bottom-20 right-10 bottom-10 rotate-12  animate-pulse">
        <div className="w-20 h-20 relative">
          <Image src="/mail.png" fill alt="Mail" />
        </div>
      </div>
      <div className="absolute md:right-20 md:top-10 right-10 top-5 rotate-45 animate-pulse">
        <div className="w-20 h-20 relative">
          <Image src="/photo.png" fill alt="Photo" />
        </div>
      </div>
      <div className="absolute md:left-20 md:bottom-20 left-10 bottom-10 -rotate-12 animate-pulse">
        <div className="w-20 h-20 relative">
          <Image src="/blog.png" fill alt="Blog" />
        </div>
      </div>
    </div>
  );
};
