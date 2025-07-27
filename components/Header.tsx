import Image from "next/image";
import { signOut } from "@/auth";
import Link from "next/link";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { getFirstName, getInitials } from "@/lib/utils";
import { Session } from "next-auth";
import HeaderLink from "./HeaderLink";
import { Button } from "./ui/button";

const Header = ({ session }: { session: Session }) => {
  return (
    <header className="my-10 flex justify-between gap-5">
      <Link href="/" className="flex items-center gap-2">
        <Image src="/icons/logo.svg" alt="logo" width={40} height={40} />
        <p className="text-white font-bold text-xl max-md:hidden">BookWise</p>
      </Link>

      <ul className="flex flex-row items-center gap-8 text-[#d6e0ff]">
        <li className="max-md:hidden">
          <HeaderLink destination="Home" path="/" />
        </li>
        <li>
          <HeaderLink destination="Search" path="/search" />
        </li>
        <li className="flex items-center justify-center gap-4">
          <Link href="/my-profile" className="flex items-center gap-1">
            <Avatar>
              <AvatarFallback className="bg-amber-100 text-black">
                {getInitials(session?.user?.name || "IN")}
              </AvatarFallback>
            </Avatar>
            <p className="font-bold max-md:hidden">
              {getFirstName(session?.user?.name || "User")}
            </p>
          </Link>
        </li>
        <li>
          <form
            action={async () => {
              "use server";

              await signOut();
            }}
            className="hover:cursor-pointer"
          >
            <Button variant={"ghost"} type="submit">
              <Image
                src={"/icons/logout.svg"}
                alt="logout"
                width={20}
                height={20}
              />

              <span>Logout</span>
            </Button>
          </form>
        </li>
      </ul>
    </header>
  );
};

export default Header;
