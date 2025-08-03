import { db } from "@/app/database/drizzle";
import { usersTable } from "@/app/database/schema";
import { serve } from "@upstash/workflow/nextjs";
import { eq } from "drizzle-orm";
import { sendEmail } from "@/lib/workflow";

type InitialData = {
  email: string;
  fullName: string;
};

type UserState = "non-active" | "active";

const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;
const THREE_DAYS_IN_MS = 3 * ONE_DAY_IN_MS;
const THIRTY_DAYS_IN_MS = 30 * ONE_DAY_IN_MS;

const getUserState = async (email: string): Promise<UserState> => {
  // Check if the user exists in the database
  // and determine their last activity date to classify them as active or non-active
  const user = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email))
    .limit(1);

  if (user.length === 0) return "non-active";

  const lastActivityDate = new Date(user[0].lastActivityDate!);
  const now = new Date();
  const timeDifference = now.getTime() - lastActivityDate.getTime();

  if (
    timeDifference > THREE_DAYS_IN_MS &&
    timeDifference <= THIRTY_DAYS_IN_MS
  ) {
    return "non-active";
  }

  return "active"; // Default return statement
}; //Check user's last activity date and compare with today to determine if user is active

export const { POST } = serve<InitialData>(async (context) => {
  const { email, fullName } = context.requestPayload; // Extract email and fullName from the request payload

  // Validate the input data
  await context.run("new-signup", async () => {
    await sendEmail({
      email,
      message: `Welcome ${fullName}!`,
      subject: "We are glad to have you onboard!",
    });
  });

  await context.sleep("wait-for-3-days", 60 * 60 * 24 * 3); // Wait for 3 days before checking the user's state

  while (true) {
    const state = await context.run("check-user-state", async () => {
      return await getUserState(email);
    });

    if (state === "non-active") {
      await context.run("send-email-non-active", async () => {
        await sendEmail({
          email,
          message: "Just Checking In",
          subject: "We miss you!",
        });
      });
    } else if (state === "active") {
      await context.run("send-email-active", async () => {
        await sendEmail({
          email,
          message: "Glad to see you again",
          subject: "Welcome",
        });
      });
    }

    await context.sleep("wait-for-1-month", 60 * 60 * 24 * 30); // Wait for 30 days before checking the user's state again
  }
});
