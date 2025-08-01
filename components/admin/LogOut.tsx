import { Button } from "../ui/button";
import Image from "next/image";
import { signOut } from "@/auth";

const LogOut = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
      className="hover:cursor-pointer"
    >
      <Button variant={"outline"} type="submit">
        <Image src={"/icons/logout.svg"} alt="logout" width={20} height={20} />
        <span>Log Out</span>
      </Button>
    </form>
  );
};

export default LogOut;
