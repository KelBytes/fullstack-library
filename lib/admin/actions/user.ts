"use server";

import { db } from "@/app/database/drizzle";
import { usersTable } from "@/app/database/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const changeUserRole = async (params: userParams) => {
  try {
    await db
      .update(usersTable)
      .set({ ROLE: params.role })
      .where(eq(usersTable.id, params.userId));

    return {
      success: true,
      message: "User's role has been changed successfully",
    };
  } catch (error) {
    return {
      success: false,
      error: `There was an error changing the user's role ${error}`,
    };
  }
};

export const deleteUser = async (params: userParams) => {
  try {
    await db.delete(usersTable).where(eq(usersTable.id, params.userId));

    return {
      success: true,
      message: "User has been successfully deleted",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: `We encountered an error trying to delete the user, check your connection and try again ${error}`,
    };
  }
};

export const approveUser = async (
  params: userParams,
  status: "APPROVED" | "REJECTED"
) => {
  try {
    await db
      .update(usersTable)
      .set({ status: status })
      .where(eq(usersTable.id, params.userId));

    revalidatePath("/");

    return {
      success: true,
      message: "User has been successfully approved",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: `We encountered an error trying to approve the user, check your connection and try again ${error}`,
    };
  }
};
