import Image from "next/image";

import { Separator } from "@/components/ui/separator";

interface HeadingProps {
  title: string;
  description: string;
  src: string;
}

export const Heading = ({
  title,
  description,
  src
}: HeadingProps) => {
  return (
    <>
      <div className="px-4 lg:px-8 flex items-center gap-x-2">
        <div className="relative h-20 w-20">
          <Image fill alt="Icon" src={src} />
        </div>
        <div>
          <h2 className="text-3xl font-bold">{title}</h2>
          <p className="text-sm text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
      <Separator className="my-8" />
    </>
  );
};
