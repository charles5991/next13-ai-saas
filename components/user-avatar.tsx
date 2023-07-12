import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const UserAvatar = () => {
  const { getUser } = getKindeServerSession();

  const user = getUser();
  const name = user.given_name || "";

  const firstNameInitial = name?.charAt(0);

  return (
    <Avatar className="h-8 w-8">
      <AvatarFallback>{firstNameInitial}</AvatarFallback>
    </Avatar>
  );
};
