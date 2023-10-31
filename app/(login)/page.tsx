import sessionState from "@/lib/sessionState";

export default async function Home() {
  const session = await sessionState();
  return (
    <div>
      <h1>Welcome {session?.name}</h1>
      <h2>Your email is: {session?.email}</h2>
    </div>
  );
}
