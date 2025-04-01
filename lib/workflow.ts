import { Client } from "@upstash/workflow";
import config from "@/lib/config";
import { Client as QStashClient} from "@upstash/qstash";

export const workflowClient = new Client({
  token: config.env.upstash.qstashToken,
  baseUrl: config.env.upstash.qstashUrl,
});

const qstashClient = new QStashClient({
  token: config.env.upstash.qstashToken,
});

export async function sendEmail({ email, message, subject }: { email: string; message: string; subject: string }) {
  await qstashClient.publishJSON({
    url: `${config.env.productionApiEndpoint}/api/workflow/send-email`,
    body: { email, message, subject },
  });
}

