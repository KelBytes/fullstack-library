"use client";

import { Button } from "../ui/button";
import Image from "next/image";
import { deleteBook } from "@/lib/admin/actions/book";
import { toast } from "@/hooks/use-toast";

const DeleteBook = ({ id }: { id: string }) => {
  // This component handles the deletion of a book.
  // It imports the deleteBook action from the admin actions and the toast hook for notifications.
  // The handleBookDelete function is called when the delete button is clicked.
  // It attempts to delete the book with the given id and shows a success or error message
  // based on the result of the deletion.
  // If the deletion is successful, it shows a success toast message;
  // otherwise, it shows an error toast message indicating the failure reason.
  const handleBookDelete = async (id: string) => {
    try {
      const result = await deleteBook({ bookId: id }); // Call the deleteBook action with the book id
      // The deleteBook action is expected to return a result object with a success property and a message property.
      // If the deletion is successful, it shows a success toast message;
      // otherwise, it shows an error toast message indicating the failure reason.
      // The toast component is used to display notifications to the user.

      if (result.success) {
        toast({
          title: "Success",
          description: result.message,
        });
      } else {
        toast({
          title: "Error",
          description:
            "There was an error borrowing the book, make sure the book is not borrowed and try again",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: `Error ${error}`,
        description: "Unable to delete book, try again later",
      });
    }
  };
  return (
    <Button
      variant={"ghost"}
      onClick={() => {
        handleBookDelete(id);
      }}
    >
      <Image src={"/icons/admin/trash.svg"} alt="edit" width={20} height={20} />
      <span>Delete</span>
    </Button>
  );
};

export default DeleteBook;
