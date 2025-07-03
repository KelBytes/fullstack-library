import { Session } from "next-auth";
import React from "react";

const Header = ({ session }: { session: Session }) => {
  return (
    <header className="admin-header">
      <div>
        <h2>{session?.user?.name}</h2>
        <p className="text-base text-slate-500">
          Monitor your library, manage books, and more.
        </p>
      </div>

      <p>Search</p>
    </header>
  );
};

export default Header;
