import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  if (!session) {
    redirect("/admin-login"); // өөр route
  }

  return <div className="flex min-h-screen">{children}</div>;
}
