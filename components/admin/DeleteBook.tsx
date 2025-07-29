"use client";

import { Button } from "../ui/button";
import Image from "next/image";
import { deleteBook } from "@/lib/admin/actions/book";
import { toast } from "@/hooks/use-toast";

const DeleteBook = ({ id }: { id: string }) => {
  const handleBookDelete = async (id: string) => {
    try {
      const result = await deleteBook({ bookId: id });

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
