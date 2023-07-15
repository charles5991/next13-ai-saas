import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation";

import prismadb from "@/lib/prismadb";

export const getCount = async () => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const userRequestCount = await prismadb.userRequestCount.findUnique({
    where: {
      userId
    }
  });

  if (!userRequestCount) {
    return 0;
  }

  return userRequestCount.count;
};
