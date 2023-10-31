import { COOKIE_NAME, COOKIE_SECRET } from "@/lib/constants";
import db from "@/lib/db";
import { sealData } from "iron-session/edge";

export async function POST(request: Request) {
  const { email } = await request.json();
  let user = await db.user.findUnique({ where: { email } });

  console.log(user);

  if (!user) {
    return new Response(JSON.stringify({ ok: false }), { status: 401 });
  }
  console.log(user);

  const encryptSession = await sealData(JSON.stringify(user), {
    password: COOKIE_SECRET,
  });
  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "Set-Cookie": `${COOKIE_NAME}=${encryptSession};path=/;` },
  });
}
