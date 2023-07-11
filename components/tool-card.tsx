import Image from "next/image";

import { 
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ToolCardProps {
  src: string,
  href: string,
  title: string,
  description: string,
  premium?: boolean;
}

export const ToolCard = ({
  src,
  href,
  title,
  description,
  premium
}: ToolCardProps) => {
  return (
    <Card className="group cursor-pointer">
      <CardHeader>
        <CardTitle className="text-lg font-bold flex items-center">
        <div className="relative h-8 w-8 mr-2 group-hover:scale-125 transition duration-150">
          <Image alt="Icon" src={src} fill />
        </div>
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
        {premium && (
          <CardContent className="p-0">
            <Badge variant="premium" className="uppercase">pro</Badge>
          </CardContent>
        )}
      </CardHeader>
    </Card>
  );
};
