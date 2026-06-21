export async function GET(request: Request) {
  const success = { success: true, message: "Health check successful" };
  return new Response(JSON.stringify(success), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
