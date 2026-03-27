"use client";
import { useState, useEffect, useCallback } from "react";

type Member = {
  _id: string;
  lastName: string;
  firstName: string;
  phone: string;
  email: string;
  specialty: string;
  organization: string;
  degree: string;
  experience: string | null;
  message: string | null;
  photoUrl: string | null;
  cvUrl: string | null;
  receiptUrl: string | null; // Гүйлгээний баримт
  status: "pending" | "approved" | "rejected";
  createdAt: string;
};

type MemberTab = "pending" | "approved" | "rejected";

const STATUS_LABELS: Record<
  string,
  { label: string; color: string; bg: string }
> = {
  pending: {
    label: "Хүлээгдэж буй",
    color: "text-amber-700",
    bg: "bg-amber-50 border-amber-200",
  },
  approved: {
    label: "Зөвшөөрөгдсөн",
    color: "text-teal-700",
    bg: "bg-teal-50 border-teal-200",
  },
  rejected: {
    label: "Татгалзсан",
    color: "text-red-700",
    bg: "bg-red-50 border-red-200",
  },
};

const MEMBER_TABS: { key: MemberTab; label: string; icon: string }[] = [
  { key: "pending", label: "Хүлээгдэж буй", icon: "⏳" },
  { key: "approved", label: "Гишүүд", icon: "✅" },
  { key: "rejected", label: "Татгалзсан", icon: "✗" },
];

// ── Shared UI ─────────────────────────────────────────────
function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-1">
        {label}
      </p>
      <p className="text-sm text-slate-700 font-medium break-all">{value}</p>
    </div>
  );
}

function Modal({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors text-lg"
        >
          ✕
        </button>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════
export default function AdminMembersSection({
  showToast,
}: {
  showToast: (msg: string, type: "success" | "error") => void;
}) {
  const [tab, setTab] = useState<MemberTab>("pending");
  const [members, setMembers] = useState<Member[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<Member | null>(null);
  const [modal, setModal] = useState<"detail" | "email" | "receipt" | null>(
    null,
  );
  const [actionLoading, setActionLoading] = useState(false);
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");

  const inputCls =
    "w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition";

  // ── Fetch ────────────────────────────────────────────────
  const fetchMembers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/members?status=${tab}`);
      const data = await res.json();
      setMembers(data.members || []);
      setTotal(data.total || 0);
    } catch {
      showToast("Мэдээлэл татахад алдаа гарлаа", "error");
    } finally {
      setLoading(false);
    }
  }, [tab]);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  // ── Actions ──────────────────────────────────────────────
  async function handleStatus(id: string, status: "approved" | "rejected") {
    setActionLoading(true);
    try {
      const res = await fetch(`/api/admin/members/${id}/status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error();
      showToast(
        status === "approved" ? "Зөвшөөрлөө ✓" : "Татгалзлаа",
        "success",
      );
      setModal(null);
      setSelected(null);
      fetchMembers();
    } catch {
      showToast("Алдаа гарлаа", "error");
    } finally {
      setActionLoading(false);
    }
  }

  async function handleEmail() {
    if (!selected || !emailSubject || !emailBody) return;
    setActionLoading(true);
    try {
      const res = await fetch(`/api/admin/members/${selected._id}/email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject: emailSubject, body: emailBody }),
      });
      if (!res.ok) throw new Error();
      showToast("И-мэйл амжилттай илгээгдлээ ✓", "success");
      setModal(null);
      setEmailSubject("");
      setEmailBody("");
    } catch {
      showToast("И-мэйл илгээхэд алдаа гарлаа", "error");
    } finally {
      setActionLoading(false);
    }
  }

  function openDetail(m: Member) {
    setSelected(m);
    setModal("detail");
  }

  function openEmail(m: Member) {
    setSelected(m);
    const isApproved = m.status === "approved";
    setEmailSubject(
      isApproved ? "POSM гишүүнчлэл баталгаажлаа" : "POSM өргөдлийн хариу",
    );
    setEmailBody(
      isApproved
        ? `Таны POSM-д элсэх өргөдөл зөвшөөрөгдлөө.\n\nТаныг манай нийгэмлэгт тавтай морилно уу!\n\nХүндэтгэлтэй,\nPOSM Захиргаа`
        : `Таны POSM-д элсэх өргөдлийг хянасан боловч одоогоор зөвшөөрөх боломжгүй байна.\n\nДэлгэрэнгүй мэдээлэл авахыг хүсвэл холбогдоно уу.\n\nХүндэтгэлтэй,\nPOSM Захиргаа`,
    );
    setModal("email");
  }

  // ── Render ───────────────────────────────────────────────
  return (
    <section>
      {/* Sub-tabs + count */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex gap-1 bg-white border border-gray-100 rounded-xl p-1 shadow-sm">
          {MEMBER_TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                tab === t.key
                  ? "bg-teal-500 text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
              }`}
            >
              <span>{t.icon}</span>
              {t.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 bg-teal-50 border border-teal-100 rounded-xl px-3 py-1.5">
          <span className="w-2 h-2 rounded-full bg-teal-400" />
          <span className="text-xs text-teal-600 font-medium">
            Нийт: <span className="font-bold">{total}</span>
          </span>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex items-center justify-center py-24">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-slate-400 text-sm">Уншиж байна...</span>
          </div>
        </div>
      ) : members.length === 0 ? (
        <div className="text-center py-24 text-slate-400">
          <div className="text-5xl mb-4">📋</div>
          <p className="text-base font-medium">Мэдээлэл байхгүй байна</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-gray-100">
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Гишүүн
                </th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider hidden md:table-cell">
                  Мэргэжил
                </th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider hidden lg:table-cell">
                  Байгууллага
                </th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider hidden sm:table-cell">
                  Огноо
                </th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Статус
                </th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {members.map((m) => {
                const s = STATUS_LABELS[m.status];
                return (
                  <tr
                    key={m._id}
                    className="hover:bg-slate-50/60 transition-colors"
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        {m.photoUrl ? (
                          <img
                            src={m.photoUrl}
                            alt=""
                            className="w-9 h-9 rounded-xl object-cover shrink-0"
                          />
                        ) : (
                          <div className="w-9 h-9 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600 text-sm font-bold shrink-0">
                            {m.lastName[0]}
                          </div>
                        )}
                        <div>
                          <p className="font-semibold text-slate-800">
                            {m.lastName} {m.firstName}
                          </p>
                          <p className="text-xs text-slate-400">{m.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 hidden md:table-cell text-slate-600">
                      {m.specialty}
                    </td>
                    <td className="px-5 py-3.5 hidden lg:table-cell text-slate-400 text-xs">
                      {m.organization}
                    </td>
                    <td className="px-5 py-3.5 hidden sm:table-cell text-xs text-slate-400">
                      {new Date(m.createdAt).toLocaleDateString("mn-MN")}
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${s.bg} ${s.color}`}
                      >
                        {s.label}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <div className="flex items-center gap-2 justify-end">
                        <button
                          onClick={() => openDetail(m)}
                          className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                        >
                          Дэлгэрэнгүй
                        </button>
                        <button
                          onClick={() => openEmail(m)}
                          className="px-3 py-1.5 text-xs font-semibold text-teal-600 hover:text-white bg-teal-50 hover:bg-teal-500 rounded-lg transition-colors border border-teal-100 hover:border-teal-500"
                        >
                          И-мэйл
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Detail Modal */}
      {modal === "detail" && selected && (
        <Modal
          onClose={() => {
            setModal(null);
            setSelected(null);
          }}
        >
          <div className="space-y-5">
            <div className="flex items-start gap-4">
              {selected.photoUrl ? (
                <img
                  src={selected.photoUrl}
                  alt=""
                  className="w-16 h-16 rounded-2xl object-cover shrink-0"
                />
              ) : (
                <div className="w-16 h-16 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center text-2xl font-bold text-teal-500 shrink-0">
                  {selected.lastName[0]}
                </div>
              )}
              <div className="flex-1 min-w-0 pt-1">
                <h2 className="text-lg font-bold text-slate-800">
                  {selected.lastName} {selected.firstName}
                </h2>
                <p className="text-sm text-slate-400 mt-0.5">
                  {selected.degree}
                </p>
                <span
                  className={`inline-flex items-center mt-2 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${STATUS_LABELS[selected.status].bg} ${STATUS_LABELS[selected.status].color}`}
                >
                  {STATUS_LABELS[selected.status].label}
                </span>
              </div>
            </div>

            <div className="h-px bg-gray-100" />

            <div className="grid grid-cols-2 gap-4">
              <Field label="И-мэйл" value={selected.email} />
              <Field label="Утас" value={selected.phone} />
              <Field label="Мэргэжил" value={selected.specialty} />
              <Field label="Байгууллага" value={selected.organization} />
              <Field
                label="Туршлага"
                value={selected.experience ? `${selected.experience} жил` : "—"}
              />
              <Field
                label="Огноо"
                value={new Date(selected.createdAt).toLocaleDateString("mn-MN")}
              />
            </div>

            {selected.message && (
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-2">
                  Нэмэлт мэдээлэл
                </p>
                <p className="text-sm text-slate-600 bg-slate-50 rounded-xl p-4 leading-relaxed border border-gray-100">
                  {selected.message}
                </p>
              </div>
            )}

            {/* CV */}
            {selected.cvUrl && (
              <a
                href={selected.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-slate-50 hover:bg-teal-50 border border-gray-100 hover:border-teal-200 rounded-xl p-4 transition-colors group"
              >
                <div className="w-9 h-9 bg-teal-500 rounded-xl flex items-center justify-center shrink-0">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-700 group-hover:text-teal-600 transition-colors">
                    CV / Анкет харах
                  </p>
                  <p className="text-xs text-slate-400">Шинэ tab-д нээгдэнэ</p>
                </div>
              </a>
            )}

            {/* Гүйлгээний баримт */}
            {selected.receiptUrl && (
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-2">
                  Гүйлгээний баримт
                </p>
                <div className="relative rounded-xl overflow-hidden border border-gray-100 bg-slate-50">
                  <img
                    src={selected.receiptUrl}
                    alt="Гүйлгээний баримт"
                    className="w-full max-h-56 object-contain p-2"
                  />
                  <div className="border-t border-gray-100 px-4 py-2.5 flex items-center justify-between bg-white">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-teal-400" />
                      <span className="text-xs font-medium text-slate-600">
                        20,000₮ · Төрийн банк
                      </span>
                    </div>
                    <button
                      onClick={() => setModal("receipt")}
                      className="text-xs font-semibold text-teal-600 hover:text-teal-800 transition-colors"
                    >
                      Томруулах →
                    </button>
                  </div>
                </div>
              </div>
            )}

            {selected.status === "pending" && (
              <div className="flex gap-3 pt-1">
                <button
                  onClick={() => handleStatus(selected._id, "approved")}
                  disabled={actionLoading}
                  className="flex-1 py-2.5 bg-teal-500 hover:bg-teal-400 disabled:opacity-60 text-white font-semibold rounded-xl transition-colors text-sm"
                >
                  {actionLoading ? "..." : "✓ Зөвшөөрөх"}
                </button>
                <button
                  onClick={() => handleStatus(selected._id, "rejected")}
                  disabled={actionLoading}
                  className="flex-1 py-2.5 bg-red-50 hover:bg-red-500 disabled:opacity-60 text-red-500 hover:text-white font-semibold rounded-xl transition-colors text-sm border border-red-100 hover:border-red-500"
                >
                  {actionLoading ? "..." : "✗ Татгалзах"}
                </button>
              </div>
            )}

            <button
              onClick={() => {
                setModal(null);
                openEmail(selected);
              }}
              className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-medium rounded-xl transition-colors text-sm"
            >
              ✉ И-мэйл илгээх
            </button>
          </div>
        </Modal>
      )}

      {/* Receipt fullscreen Modal */}
      {modal === "receipt" && selected?.receiptUrl && (
        <Modal onClose={() => setModal("detail")}>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-800">
                  Гүйлгээний баримт
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  {selected.lastName} {selected.firstName}
                </p>
              </div>
              <a
                href={selected.receiptUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-semibold text-teal-600 hover:text-teal-800 bg-teal-50 hover:bg-teal-100 px-3 py-1.5 rounded-lg transition-colors"
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
                Нээх
              </a>
            </div>
            <img
              src={selected.receiptUrl}
              alt="Гүйлгээний баримт"
              className="w-full rounded-xl object-contain border border-gray-100"
            />
            <button
              onClick={() => setModal("detail")}
              className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-medium rounded-xl transition-colors text-sm"
            >
              ← Буцах
            </button>
          </div>
        </Modal>
      )}

      {/* Email Modal */}
      {modal === "email" && selected && (
        <Modal
          onClose={() => {
            setModal(null);
            setEmailSubject("");
            setEmailBody("");
          }}
        >
          <div className="space-y-5">
            <div>
              <h2 className="text-base font-bold text-slate-800">
                И-мэйл илгээх
              </h2>
              <p className="text-slate-400 text-sm mt-1">
                Хүлээн авагч:{" "}
                <span className="text-teal-600 font-medium">
                  {selected.email}
                </span>
              </p>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                Гарчиг
              </label>
              <input
                type="text"
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
                className={inputCls}
                placeholder="И-мэйлийн гарчиг..."
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                Агуулга
              </label>
              <textarea
                value={emailBody}
                onChange={(e) => setEmailBody(e.target.value)}
                rows={8}
                className={inputCls + " resize-none"}
                placeholder="И-мэйлийн агуулга..."
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleEmail}
                disabled={actionLoading || !emailSubject || !emailBody}
                className="flex-1 py-2.5 bg-teal-500 hover:bg-teal-400 disabled:opacity-50 text-white font-semibold rounded-xl transition-colors text-sm"
              >
                {actionLoading ? "Илгээж байна..." : "✉ Илгээх"}
              </button>
              <button
                onClick={() => {
                  setModal(null);
                  setEmailSubject("");
                  setEmailBody("");
                }}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-medium rounded-xl transition-colors text-sm"
              >
                Болих
              </button>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
}
