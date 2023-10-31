import db from "@/lib/db";

export async function POST(request: Request) {
  const { name, email } = await request.json();
  let user = await db.user.findUnique({ where: { email } });
  let ok = false;

  if (!user) {
    user = await db.user.create({
      data: {
        name,
        email,
      },
    });
    ok = true;
  } else if (user.name !== name) {
    user = await db.user.update({
      where: {
        email,
      },
      data: {
        name,
      },
    });
  }

  return new Response(JSON.stringify({ ok }), { status: 200 });
}
