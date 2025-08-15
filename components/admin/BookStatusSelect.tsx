"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { changeBorrowStatus } from "@/lib/admin/actions/book";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";

// This component allows an admin to change a user's role between "ADMIN" and "USER".
// It uses a select dropdown to choose the role and calls the changeUserRole action when the role is changed.
// The component also handles loading state and displays success or error messages using the toast notification system.
// The role is passed as a prop, and the userId is used to identify which user's role is being changed.
// The component is designed to be used in an admin interface where user roles can be managed.
// The Select component is used to create a dropdown menu for selecting the user's role.
// The SelectTrigger and SelectContent components are used to style the dropdown, and the SelectItem
// components are used to define the options available in the dropdown.
const BookStatusSelect = ({
  status,
  bookId,
}: {
  status: "BORROWED" | "RETURNED";
  bookId: string;
}) => {
  const router = useRouter(); // Initialize the router for navigation
  // This state is used to manage the loading state of the role change operation.
  // When the role is being changed, this state is set to true to disable the select
  // and show a loading indicator. Once the operation is complete, it is set back to false.

  // The updateUserRole function is called when the user selects a new role from the dropdown
  // It calls the changeUserRole action with the userId and the new role.
  // If the operation is successful, it shows a success toast message;
  // otherwise, it shows an error toast message.
  // After the operation, it redirects the user to the "/admin/users" page.
  const [isLoading, setIsLoading] = useState(false);
  const updateBorrowStatus = async (
    id: string,
    bookStatus: "BORROWED" | "RETURNED"
  ) => {
    setIsLoading(true);
    try {
      const result = await changeBorrowStatus({
        bookId: id,
        status: bookStatus,
      });

      if (result.success) {
        toast({
          title: "Success",
          description: "Borrowed status has been changed",
        });
      } else {
        toast({
          title: "Error",
          description: "An error occured",
        });
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
    router.push("/admin/borrow-records");
  };
  return (
    <Select
      value={status}
      onValueChange={(value) => {
        updateBorrowStatus(bookId, value as "BORROWED" | "RETURNED");
      }}
      disabled={isLoading ? true : false}
    >
      <SelectTrigger
        className={cn(
          "rounded-full text-sm font-medium border-0",
          status === "BORROWED"
            ? "text-[#027a48] bg-[#ecfdf3] focus:text-[#027a48] focus:bg-[#ecfdf3]"
            : "text-[#c11574] bg-[#fdf2fa] focus:bg-[#fdf2fa] focus:text-[#c11574]"
        )}
      >
        {isLoading ? <p>•••</p> : <SelectValue />}
      </SelectTrigger>
      <SelectContent className="p-2">
        <SelectGroup className="flex flex-col gap-2">
          <SelectItem
            value="RETURNED"
            className="admin-select-content text-[#c11574] bg-[#fdf2fa] focus:bg-[#fdf2fa] focus:text-[#c11574]"
          >
            Returned
          </SelectItem>
          <SelectItem
            value="BORROWED"
            className="admin-select-content text-[#027a48] bg-[#ecfdf3] focus:text-[#027a48] focus:bg-[#ecfdf3]"
          >
            Borrowed
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default BookStatusSelect;
