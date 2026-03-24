"use client";
import { useState } from "react";
import AdminMembersSection from "@/components/admin/AdminMemberSection";
import AdminMeetingsSection from "@/components/admin/AdminMeetingsSection";
import AdminNewsSection from "@/components/admin/AdminNewsSection";
type Tab = "members" | "meetings" | "news";

const TABS: { key: Tab; label: string; icon: string }[] = [
  { key: "members", label: "Гишүүнчлэл", icon: "👥" },
  { key: "meetings", label: "Хурал", icon: "📅" },
  { key: "news", label: "Мэдээ", icon: "📰" },
];

function Toast({ msg, type }: { msg: string; type: "success" | "error" }) {
  return (
    <div
      className={`fixed top-5 right-5 z-50 px-5 py-3 rounded-xl shadow-lg text-sm font-semibold text-white flex items-center gap-2 transition-all ${
        type === "success" ? "bg-teal-500" : "bg-red-500"
      }`}
    >
      {type === "success" ? "✓" : "✕"} {msg}
    </div>
  );
}

export default function AdminPage() {
  const [tab, setTab] = useState<Tab>("members");
  const [toast, setToast] = useState<{
    msg: string;
    type: "success" | "error";
  } | null>(null);

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="min-h-screen bg-[#f5f7fa]">
      {toast && <Toast msg={toast.msg} type={toast.type} />}

      {/* ── Header ── */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center text-white text-xs font-bold">
              P
            </div>
            <div>
              <div className="text-sm font-bold text-slate-800 leading-tight">
                POSM Admin
              </div>
              <div className="text-[10px] text-slate-400">Хяналтын самбар</div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 bg-slate-100 rounded-xl p-1">
            {TABS.map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
                  tab === t.key
                    ? "bg-white text-teal-600 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                <span>{t.icon}</span>
                {t.label}
              </button>
            ))}
          </div>

          {/* Avatar */}
          <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 font-bold text-sm">
            А
          </div>
        </div>
      </header>

      {/* ── Content ── */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        {tab === "members" && <AdminMembersSection showToast={showToast} />}
        {tab === "meetings" && <AdminMeetingsSection showToast={showToast} />}
        {tab === "news" && <AdminNewsSection showToast={showToast} />}
      </main>
    </div>
  );
}
