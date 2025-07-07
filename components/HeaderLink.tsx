"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const HeaderLink = ({
  destination,
  path,
}: {
  destination: string;
  path: string;
}) => {
  const pathname = usePathname();
  return (
    <Link
      href={path}
      className={cn(
        "hover:text-[#eed1ac]",
        pathname === path && "text-[#eed1ac]"
      )}
    >
      {destination}
    </Link>
  );
};

export default HeaderLink;
