import { db } from "@/app/database/drizzle";
import { borrowRecords, usersTable } from "@/app/database/schema";
import Image from "next/image";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { getInitials } from "@/lib/utils";
import Link from "next/link";
import { eq, count } from "drizzle-orm";
import ApproveUser from "./ApproveUser";

const AccountRequestTable = async ({ fields }: { fields: Array<string> }) => {
  // Fetch all users from the database along with their borrow records count
  // The usersTable is joined with borrowRecords to get the number of books borrowed by each user
  // The result is grouped by user id to get the count of borrow records for each user
  // The fields parameter is used to dynamically render the table headers
  const allUsers = await db
    .select({
      id: usersTable.id,
      fullName: usersTable.fullName,
      email: usersTable.email,
      universityCard: usersTable.universityCard,
      universityId: usersTable.universityId,
      ROLE: usersTable.ROLE,
      createdAt: usersTable.createdAt,
      numberOfBooksBorrowed: count(borrowRecords.id) || 0,
    })
    .from(usersTable)
    .leftJoin(borrowRecords, eq(borrowRecords.userId, usersTable.id))
    .where(eq(usersTable.status, "PENDING"))
    .groupBy(usersTable.id);

  return (
    <div className="md:h-[60vh] 2xl:h-[80vh] overflow-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-light-300">
            {fields.map((field) => (
              <th key={field}>{field}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {allUsers.map(
            ({
              id,
              fullName,
              email,
              universityCard,
              universityId,
              createdAt,
            }) => (
              <tr className="" key={id}>
                <td className="">
                  <div className="user-table">
                    <div>
                      <Avatar>
                        <AvatarFallback className="bg-amber-100">
                          {getInitials(fullName || "IN")}
                        </AvatarFallback>
                      </Avatar>
                    </div>

                    <div className="flex flex-col">
                      <p className="font-semibold font-ibm-plex-sans">
                        {fullName}
                      </p>
                      <p className="font-light text-sm text-light-500">
                        {email}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="font-medium">{createdAt?.toDateString()}</td>

                <td className="font-medium">{universityId}</td>
                <td>
                  <Link
                    href={`https://ik.imagekit.io/kelbytes${universityCard}`}
                    className="flex items-center"
                  >
                    <p className="text-[#0089f1] font-medium">View ID Card</p>
                    <Image
                      src={"/icons/admin/link.svg"}
                      alt="link"
                      width={20}
                      height={20}
                    />
                  </Link>
                </td>
                <td>
                  <ApproveUser id={id} />
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AccountRequestTable;
