import { Metadata } from "next"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"

import Image from "next/image";

export const metadata: Metadata = {
  title: "Music App",
  description: "Example music app using the components.",
}

export default function HomePage() {
  const { getUser } = getKindeServerSession();

  const user = getUser();

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <div className="relative h-72 w-72">
        <Image src="/empty.png" fill alt="Empty" />
      </div>
      <p className="text-muted-foreground text-center">
        You don&apos;t have any projects yet. <br /> Please create one.
      </p>
    </div>
  );
}
