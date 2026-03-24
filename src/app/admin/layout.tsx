import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  if (!session) {
    redirect("/admin-login");
  }

  return <div className="w-full bg-[#f5f7fa] min-h-screen">{children}</div>;
}
