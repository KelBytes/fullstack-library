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
import { changeUserRole } from "@/lib/admin/actions/user";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";

const RoleSelect = ({
  role,
  userId,
}: {
  role: "ADMIN" | "USER";
  userId: string;
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const updateUserRole = async (id: string, userRole: "ADMIN" | "USER") => {
    setIsLoading(true);
    try {
      const result = await changeUserRole({ userId: id, role: userRole });

      if (result.success) {
        toast({
          title: "Success",
          description: "User's role has been modified",
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
    router.push("/admin/users");
  };
  return (
    <Select
      value={role}
      onValueChange={(value) => {
        updateUserRole(userId, value as "ADMIN" | "USER");
      }}
      disabled={isLoading ? true : false}
    >
      <SelectTrigger
        className={cn(
          "rounded-full text-sm font-medium border-0",
          role === "ADMIN"
            ? "text-[#027a48] bg-[#ecfdf3] focus:text-[#027a48] focus:bg-[#ecfdf3]"
            : "text-[#c11574] bg-[#fdf2fa] focus:bg-[#fdf2fa] focus:text-[#c11574]"
        )}
      >
        {isLoading ? <p>•••</p> : <SelectValue />}
      </SelectTrigger>
      <SelectContent className="p-2">
        <SelectGroup className="flex flex-col gap-2">
          <SelectItem
            value="USER"
            className="admin-select-content text-[#c11574] bg-[#fdf2fa] focus:bg-[#fdf2fa] focus:text-[#c11574]"
          >
            User
          </SelectItem>
          <SelectItem
            value="ADMIN"
            className="admin-select-content text-[#027a48] bg-[#ecfdf3] focus:text-[#027a48] focus:bg-[#ecfdf3]"
          >
            Admin
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default RoleSelect;
