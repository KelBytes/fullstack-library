"use client";

import { Button } from "../ui/button";
import Image from "next/image";
import { toast } from "@/hooks/use-toast";
import { approveUser } from "@/lib/admin/actions/user";

const ApproveUser = ({ id }: { id: string }) => {
  const handleUserApproval = async (id: string) => {
    try {
      const result = await approveUser({ userId: id }, "APPROVED");

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
  const handleUserRejection = async (id: string) => {
    try {
      const result = await approveUser({ userId: id }, "REJECTED");

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
    <div className="flex gap-2">
      <Button
        className="bg-[#ecfdf3] text-[#027a48]"
        onClick={() => {
          handleUserApproval(id);
        }}
      >
        Approve
      </Button>
      <Button variant={"ghost"} onClick={() => handleUserRejection(id)}>
        <Image
          src={"/icons/admin/close-circle.svg"}
          width={20}
          height={20}
          alt="Close"
        />
        Deny
      </Button>
    </div>
  );
};

export default ApproveUser;
