import { Session } from "next-auth";
import React from "react";
import { Input } from "../ui/input";
import Image from "next/image";
import LogOut from "./LogOut";

const Header = ({ session }: { session: Session }) => {
  return (
    <header className="admin-header">
      <div>
        <div className="flex items-center gap-3">
          <h2>{session?.user?.name}</h2>
          <LogOut />
        </div>

        <p className="text-base text-slate-500">
          Monitor your library, manage books, and more.
        </p>
      </div>

      <div className="admin-search">
        <Image
          src={"/icons/admin/search.svg"}
          width={28}
          height={28}
          alt="search"
        />

        <Input
          className="admin-search_input"
          placeholder="Search users, books by title, author, or genre."
        />
      </div>
    </header>
  );
};

export default Header;
