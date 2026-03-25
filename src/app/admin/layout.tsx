import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/admin/AdminLogout";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  // Login хуудас бол session шалгахгүйгээр зүгээр дамжуулна
  // (middleware /admin/login-г тойрч байгаа боловч layout хоёр дахин шалгадаг)
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-[#f5f7fa]">
      <div className="bg-white border-b border-gray-100 px-6 py-2 flex items-center justify-end gap-3">
        <span className="text-xs text-slate-400">{session.user?.email}</span>
        <LogoutButton />
      </div>
      {children}
    </div>
  );
}
