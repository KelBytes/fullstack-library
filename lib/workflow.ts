import { Client } from "@upstash/workflow";
import config from "@/lib/config";

export const workflowClient = new Client({
  token: config.env.upstash.qstashToken,
  baseUrl: config.env.upstash.qstashUrl,
});
