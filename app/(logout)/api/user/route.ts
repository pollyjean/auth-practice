import db from "@/lib/db";

export async function GET() {
  const user = await db.user.findMany();
  console.log(user);
  if (user) {
    return new Response(JSON.stringify({ ok: true }));
  } else {
    return new Response(JSON.stringify({ ok: false }));
  }
}
