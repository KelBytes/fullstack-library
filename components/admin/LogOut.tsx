import { Button } from "../ui/button";
import Image from "next/image";
import { signOut } from "@/auth";

const LogOut = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signOut(); // Sign out the user
        // The signOut function is expected to handle the sign-out process,
        // such as clearing the session and redirecting the user to the sign-in page.
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
