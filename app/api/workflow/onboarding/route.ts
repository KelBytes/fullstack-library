import { db } from "@/app/database/drizzle";
import { usersTable } from "@/app/database/schema";
import { serve } from "@upstash/workflow/nextjs";
import { eq } from "drizzle-orm";
import { sendEmail } from "@/lib/sendEmail";
import emailjs from '@emailjs/browser';
import config from "@/lib/config";

type InitialData = {
  email: string;
  fullName: string;
};

type UserState = "non-active" | "active";

const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;
const THREE_DAYS_IN_MS = 3 * ONE_DAY_IN_MS;
const THIRTY_DAYS_IN_MS = 30 * ONE_DAY_IN_MS;

const getUserState = async (email: string): Promise<UserState> => {
  const user = await db.select().from(usersTable).where(eq(usersTable.email, email)).limit(1);

  if (user.length === 0) return "non-active";

  const lastActivityDate = new Date(user[0].lastActivityDate!);
  const now = new Date();
  const timeDifference = now.getTime() - lastActivityDate.getTime();

  if (timeDifference > THREE_DAYS_IN_MS && timeDifference <= THIRTY_DAYS_IN_MS) {
    return "non-active";
  }

  return "active"; // Default return statement
};

emailjs.init({
  publicKey: config.env.emailjs.publicKey,
});

export const { POST } = serve<InitialData>(async (context) => {
  const { email, fullName } = context.requestPayload;

  //Welcome Email
  await context.run("new-signup", async () => {
    await sendEmail({ email, message: `Welcome ${fullName}!`, subject: "Welcome to our service!" });
    });
    
    await context.sleep("wait-for-3-days", 60 * 60 * 24 * 3);

    while (true) {
      const state = await context.run("check-user-state", async () => {
        return await getUserState(email);
      });

      if (state === "non-active") {
        await context.run("send-email-non-active", async () => {
          await sendEmail({ email, message: "Just Checking In", subject: "We miss you!" });
        });
      } else if (state === "active") {
        await context.run("send-email-active", async () => {
          await sendEmail({ email, message: "BookWise is glad you're back", subject: "Welcome" });
        });
      }

      await context.sleep("wait-for-1-month", 60 * 60 * 24 * 30);
    }
  });
