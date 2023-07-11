import Image from "next/image";

export const Empty = () => {
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
};
