"use client";

import { Button } from "../ui/button";
import Image from "next/image";
import { toast } from "@/hooks/use-toast";
import { deleteUser } from "@/lib/admin/actions/user";

const DeleteUser = ({ id }: { id: string }) => {
  const handleUserDelete = async (id: string) => {
    try {
      const result = await deleteUser({ userId: id }); // Call the deleteUser action with the user id
      // The deleteUser action is expected to return a result object with a success property and a message property.
      // If the deletion is successful, it shows a success toast message;
      // otherwise, it shows an error toast message indicating the failure reason.

      if (result.success) {
        toast({
          title: "Success",
          description: result.message,
        });
      } else {
        toast({
          title: "Error",
          description:
            "Ensure the user has no borrowed books, check your connection and try again",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Button
      variant={"ghost"}
      onClick={() => {
        handleUserDelete(id);
      }}
    >
      <Image
        src={"/icons/admin/trash.svg"}
        alt="delete"
        width={20}
        height={20}
      />
    </Button>
  );
};

export default DeleteUser;
