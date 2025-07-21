import { db } from "@/app/database/drizzle";
import { usersTable } from "@/app/database/schema";
import { getFirstName, getInitials } from "@/lib/utils";
import { eq } from "drizzle-orm";
import { Session } from "next-auth";
import { Avatar, AvatarFallback } from "./ui/avatar";
import Image from "next/image";
import StudentId from "./StudentId";

const ProfileCard = async ({ session }: { session: Session }) => {
  if (!session?.user?.id) {
    // Handle unauthenticated state or throw an error
    return <div>You must be logged in to view your profile</div>;
  }

  //Get one student or user from the database whose id matches the currently user signed in id
  const [student] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, session?.user?.id))
    .limit(1);

  return (
    <div className="relative max-h-[60rem] gradient-vertical mx-auto flex max-w-xl flex-col gap-12 pt-32 rounded-3xl px-10 py-10 text-white max-xs:px-9">
      <div className="absolute -top-3 flex items-center justify-center w-full right-0 left-0">
        <Image src={"/icons/mark.svg"} alt="mark" width={50} height={80} />
      </div>
      <div className="flex gap-4 items-center">
        <div className="h-20 w-20 bg-[#333c5c] bg-opacity-20 rounded-full items-center justify-center flex">
          <Avatar className="h-16 w-16">
            <AvatarFallback className="bg-amber-100 text-black">
              {getInitials(session?.user?.name || "IN")}
            </AvatarFallback>
          </Avatar>
        </div>

        <div className="flex flex-col gap-2">
          {student.status === "APPROVED" ? (
            <div className="flex items-center gap-1">
              <Image
                src={"/icons/verified.svg"}
                alt="verified"
                width={14}
                height={14}
              />
              <p className="text-light-100 text-lg"> Verified Student</p>
            </div>
          ) : student.status === "PENDING" ? (
            <p className="text-light-100 text-lg">Pending verification</p>
          ) : student.status === "REJECTED" ? (
            <p>Banned</p>
          ) : (
            <p>Not Verified</p>
          )}
          <div>
            <p className="font-bold text-2xl">
              {getFirstName(student.fullName)}
            </p>
            <p className="text-light-100">{student.email}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <p className="text-light-100 text-lg">University</p>
        <p className="font-bold text-2xl">Koforidua Technical University</p>
      </div>
      <div className="flex flex-col gap-4">
        <p className="text-light-100 text-lg">Student ID</p>
        <p className="font-bold text-2xl">{student.universityId}</p>
      </div>
      <div>
        <StudentId source={student.universityCard} />
      </div>
    </div>
  );
};

export default ProfileCard;
