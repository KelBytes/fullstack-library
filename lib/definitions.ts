export type SessionPayload = {
  userId: string;
  name: string;
  role: "ADMIN" | "USER";
  email: string;
  status: "APPROVED" | "PENDING" | "REJECTED";
};
