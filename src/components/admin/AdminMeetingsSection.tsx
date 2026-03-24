"use client";
import { useState, useEffect, useCallback } from "react";
import { UploadButton } from "@/lib/uploadthing";

type Session = {
  time: string;
  speaker: string;
  organization: string;
  topic: string;
  duration: string;
  isBreak: boolean;
  pptUrl: string;
};

type Meeting = {
  _id: string;
  title: string;
  date: string;
  endDate?: string;
  location: string;
  organizer: string;
  description: string;
  tags: string[];
  status: "upcoming" | "ongoing" | "finished";
  attendees?: number;
  sessions: Session[];
  pptUrl?: string;
  published: boolean;
};

type MeetingForm = {
  title: string;
  date: string;
  endDate: string;
  location: string;
  organizer: string;
  description: string;
  tagsRaw: string;
  status: "upcoming" | "ongoing" | "finished";
  attendees: string;
  published: boolean;
};

const EMPTY_MEETING: MeetingForm = {
  title: "",
  date: "",
  endDate: "",
  location: "",
  organizer: "POSM",
  description: "",
  tagsRaw: "",
  status: "upcoming",
  attendees: "",
  published: false,
};

const EMPTY_SESSION: Session = {
  time: "",
  speaker: "",
  organization: "",
  topic: "",
  duration: "",
  isBreak: false,
  pptUrl: "",
};

const inputCls =
  "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition";

const statusColor: Record<string, string> = {
  upcoming: "bg-teal-50 text-teal-600",
  ongoing: "bg-blue-50 text-blue-600",
  finished: "bg-gray-100 text-gray-500",
};
const statusLabel: Record<string, string> = {
  upcoming: "Удахгүй",
  ongoing: "Явагдаж байна",
  finished: "Дууссан",
};

// ── Modal ─────────────────────────────────────────────────
function Modal({
  title,
  onClose,
  wide,
  children,
}: {
  title: string;
  onClose: () => void;
  wide?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
      <div
        className={`bg-white rounded-2xl shadow-2xl w-full ${wide ? "max-w-3xl" : "max-w-lg"} max-h-[90vh] overflow-y-auto`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white z-10">
          <h2 className="text-base font-bold text-slate-800">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl leading-none"
          >
            &times;
          </button>
        </div>
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-4">
      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
        {label}
      </label>
      {children}
    </div>
  );
}

function Toggle({
  value,
  onChange,
  label,
}: {
  value: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <div
        onClick={onChange}
        className={`relative w-10 h-5 rounded-full transition-colors ${value ? "bg-teal-500" : "bg-gray-200"}`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${value ? "translate-x-5" : ""}`}
        />
      </div>
      <span className="text-sm text-slate-600">{label}</span>
    </label>
  );
}

// ════════════════════════════════════════════════════════
export default function AdminMeetingsSection({
  showToast,
}: {
  showToast: (msg: string, type: "success" | "error") => void;
}) {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<
    null | "create" | "edit" | "sessions" | "ppt"
  >(null);
  const [selected, setSelected] = useState<Meeting | null>(null);
  const [form, setForm] = useState<MeetingForm>(EMPTY_MEETING);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [pptUrl, setPptUrl] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploadingIdx, setUploadingIdx] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      // admin: бүгдийг татна
      const res = await fetch("/api/meetings?all=1");
      const data = await res.json();
      setMeetings(Array.isArray(data) ? data : []);
    } catch {
      showToast("Татахад алдаа гарлаа", "error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  // ── Create / Edit ─────────────────────────────────────
  const openCreate = () => {
    setForm(EMPTY_MEETING);
    setModal("create");
  };
  const openEdit = (m: Meeting) => {
    setSelected(m);
    setForm({
      title: m.title,
      date: m.date,
      endDate: m.endDate || "",
      location: m.location,
      organizer: m.organizer,
      description: m.description,
      tagsRaw: m.tags.join(", "),
      status: m.status,
      attendees: m.attendees?.toString() || "",
      published: m.published,
    });
    setModal("edit");
  };

  const saveMeeting = async () => {
    if (!form.title || !form.date || !form.location) return;
    setSaving(true);
    const payload = {
      ...form,
      tags: form.tagsRaw
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      attendees: form.attendees ? Number(form.attendees) : undefined,
    };
    try {
      if (modal === "create") {
        const res = await fetch("/api/meetings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error((await res.json()).error);
        showToast("Хурал нэмэгдлээ", "success");
      } else if (selected) {
        const res = await fetch(`/api/meetings/${selected._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error((await res.json()).error);
        showToast("Засагдлаа", "success");
      }
      setModal(null);
      load();
    } catch (e: any) {
      showToast(e.message || "Алдаа гарлаа", "error");
    } finally {
      setSaving(false);
    }
  };

  // ── Sessions editor ───────────────────────────────────
  const openSessions = async (m: Meeting) => {
    setSelected(m);
    // sessions авахын тулд detail татна
    const res = await fetch(`/api/meetings/${m._id}`);
    const data = await res.json();
    setSessions(data.sessions || []);
    setModal("sessions");
  };

  const addSession = () => setSessions((p) => [...p, { ...EMPTY_SESSION }]);
  const addBreak = () =>
    setSessions((p) => [
      ...p,
      { ...EMPTY_SESSION, isBreak: true, speaker: "Завсарлага" },
    ]);
  const removeSession = (i: number) =>
    setSessions((p) => p.filter((_, idx) => idx !== i));
  const updateSession = (
    i: number,
    field: keyof Session,
    value: string | boolean,
  ) =>
    setSessions((p) =>
      p.map((s, idx) => (idx === i ? { ...s, [field]: value } : s)),
    );
  const moveUp = (i: number) => {
    if (i === 0) return;
    setSessions((p) => {
      const a = [...p];
      [a[i - 1], a[i]] = [a[i], a[i - 1]];
      return a;
    });
  };
  const moveDown = (i: number) => {
    if (i === sessions.length - 1) return;
    setSessions((p) => {
      const a = [...p];
      [a[i], a[i + 1]] = [a[i + 1], a[i]];
      return a;
    });
  };

  const saveSessions = async () => {
    if (!selected) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/meetings/${selected._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessions }),
      });
      if (!res.ok) throw new Error();
      showToast("Хөтөлбөр хадгалагдлаа", "success");
      setModal(null);
      load();
    } catch {
      showToast("Хадгалахад алдаа гарлаа", "error");
    } finally {
      setSaving(false);
    }
  };

  // ── PPT URL ───────────────────────────────────────────
  const openPpt = (m: Meeting) => {
    setSelected(m);
    setPptUrl(m.pptUrl || "");
    setModal("ppt");
  };
  const savePpt = async () => {
    if (!selected) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/meetings/${selected._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pptUrl }),
      });
      if (!res.ok) throw new Error();
      showToast("PPT холбоос хадгалагдлаа", "success");
      setModal(null);
      load();
    } catch {
      showToast("Алдаа гарлаа", "error");
    } finally {
      setSaving(false);
    }
  };

  // ── Delete ────────────────────────────────────────────
  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      await fetch(`/api/meetings/${deleteId}`, { method: "DELETE" });
      setMeetings((p) => p.filter((m) => m._id !== deleteId));
      showToast("Устгагдлаа", "success");
    } catch {
      showToast("Устгахад алдаа гарлаа", "error");
    } finally {
      setDeleteId(null);
    }
  };

  const togglePublish = async (m: Meeting) => {
    const res = await fetch(`/api/meetings/${m._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ published: !m.published }),
    });
    const updated = await res.json();
    setMeetings((p) =>
      p.map((x) =>
        x._id === m._id ? { ...x, published: updated.published } : x,
      ),
    );
  };

  // ── Session PPT upload ──────────────────────────────────
  const handleSessionPptUpload = async (
    idx: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingIdx(idx);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      updateSession(idx, "pptUrl", data.url);
      showToast("PPT амжилттай upload хийгдлээ", "success");
    } catch (err: any) {
      showToast(err.message || "Upload амжилтгүй боллоо", "error");
    } finally {
      setUploadingIdx(null);
      e.target.value = "";
    }
  };

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-slate-800">
          Хурал / Арга хэмжээ
        </h2>
        <button
          onClick={openCreate}
          className="flex items-center gap-1.5 px-4 py-2 bg-teal-500 text-white text-sm font-semibold rounded-lg hover:bg-teal-400 transition-all shadow shadow-teal-100"
        >
          <span className="text-base leading-none">+</span> Нэмэх
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="py-14 text-center text-slate-400 text-sm animate-pulse">
            Ачааллаж байна...
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                <th className="px-5 py-3">Хурал</th>
                <th className="px-5 py-3">Огноо</th>
                <th className="px-5 py-3">Төрөл</th>
                <th className="px-5 py-3">Хөтөлбөр</th>
                <th className="px-5 py-3">Статус</th>
                <th className="px-5 py-3 text-right">Үйлдэл</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {meetings.map((m) => (
                <tr
                  key={m._id}
                  className="hover:bg-slate-50/60 transition-colors"
                >
                  <td className="px-5 py-3.5">
                    <p className="font-medium text-slate-700 line-clamp-1">
                      {m.title}
                    </p>
                    <p className="text-xs text-slate-400">{m.location}</p>
                  </td>
                  <td className="px-5 py-3.5 text-slate-400 whitespace-nowrap text-xs">
                    {m.date}
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-semibold ${statusColor[m.status]}`}
                    >
                      {statusLabel[m.status]}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openSessions(m)}
                        className="text-xs text-slate-500 hover:text-teal-600 font-medium transition-colors"
                      >
                        {m.sessions?.length
                          ? `${m.sessions.filter((s) => !s.isBreak).length} илтгэл`
                          : "Хоосон"}
                      </button>
                      <span className="text-slate-200">·</span>
                      <button
                        onClick={() => openPpt(m)}
                        className={`text-xs font-medium transition-colors ${m.pptUrl ? "text-teal-500 hover:text-teal-700" : "text-slate-400 hover:text-teal-500"}`}
                      >
                        {m.pptUrl ? "PPT ✓" : "PPT нэмэх"}
                      </button>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <button
                      onClick={() => togglePublish(m)}
                      className={`px-2.5 py-0.5 rounded-full text-xs font-semibold transition-colors ${m.published ? "bg-green-50 text-green-600 hover:bg-green-100" : "bg-gray-100 text-gray-400 hover:bg-gray-200"}`}
                    >
                      {m.published ? "Нийтлэгдсэн" : "Ноорог"}
                    </button>
                  </td>
                  <td className="px-5 py-3.5 text-right whitespace-nowrap">
                    <button
                      onClick={() => openEdit(m)}
                      className="text-teal-500 hover:text-teal-700 font-medium mr-3 transition-colors"
                    >
                      Засах
                    </button>
                    <button
                      onClick={() => setDeleteId(m._id)}
                      className="text-red-400 hover:text-red-600 font-medium transition-colors"
                    >
                      Устгах
                    </button>
                  </td>
                </tr>
              ))}
              {meetings.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-10 text-center text-slate-400 text-sm"
                  >
                    Хурал байхгүй байна
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* ── Create / Edit modal ── */}
      {(modal === "create" || modal === "edit") && (
        <Modal
          title={modal === "create" ? "Шинэ хурал нэмэх" : "Хурал засах"}
          onClose={() => setModal(null)}
        >
          <div className="grid grid-cols-2 gap-4">
            <Field label="Статус">
              <select
                className={inputCls}
                value={form.status}
                onChange={(e) =>
                  setForm({
                    ...form,
                    status: e.target.value as
                      | "upcoming"
                      | "ongoing"
                      | "finished",
                  })
                }
              >
                <option value="upcoming">Удахгүй</option>
                <option value="ongoing">Явагдаж байна</option>
                <option value="finished">Дууссан</option>
              </select>
            </Field>
            <Field label="Зохион байгуулагч">
              <input
                className={inputCls}
                value={form.organizer}
                onChange={(e) =>
                  setForm({ ...form, organizer: e.target.value })
                }
              />
            </Field>
          </div>
          <Field label="Гарчиг">
            <input
              className={inputCls}
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Хурлын нэр"
            />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Эхлэх огноо">
              <input
                type="date"
                className={inputCls}
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
              />
            </Field>
            <Field label="Дуусах огноо">
              <input
                type="date"
                className={inputCls}
                value={form.endDate}
                onChange={(e) => setForm({ ...form, endDate: e.target.value })}
              />
            </Field>
          </div>
          <Field label="Байршил">
            <input
              className={inputCls}
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              placeholder="Улаанбаатар, ..."
            />
          </Field>
          <Field label="Тайлбар">
            <textarea
              className={inputCls}
              rows={2}
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Оролцогчид">
              <input
                type="number"
                className={inputCls}
                value={form.attendees}
                onChange={(e) =>
                  setForm({ ...form, attendees: e.target.value })
                }
                placeholder="142"
              />
            </Field>
            <Field label="Таг (таслалаар)">
              <input
                className={inputCls}
                value={form.tagsRaw}
                onChange={(e) => setForm({ ...form, tagsRaw: e.target.value })}
                placeholder="Ортопед, 2025"
              />
            </Field>
          </div>
          <Toggle
            value={form.published}
            onChange={() => setForm({ ...form, published: !form.published })}
            label="Нийтлэх"
          />
          <div className="flex justify-end gap-2 mt-6">
            <button
              onClick={() => setModal(null)}
              className="px-4 py-2 text-sm text-slate-500"
            >
              Цуцлах
            </button>
            <button
              onClick={saveMeeting}
              disabled={saving}
              className="px-5 py-2 bg-teal-500 text-white text-sm font-semibold rounded-lg hover:bg-teal-400 disabled:opacity-60 transition-colors"
            >
              {saving ? "Хадгалж байна..." : "Хадгалах"}
            </button>
          </div>
        </Modal>
      )}

      {/* ── Sessions editor modal ── */}
      {modal === "sessions" && selected && (
        <Modal
          title={`Хөтөлбөр — ${selected.title}`}
          onClose={() => setModal(null)}
          wide
        >
          <div className="space-y-2 mb-4 max-h-[50vh] overflow-y-auto pr-1">
            {sessions.length === 0 && (
              <p className="text-sm text-slate-400 text-center py-6">
                Хоосон байна. Мөр нэмнэ үү.
              </p>
            )}
            {sessions.map((s, i) => (
              <div
                key={i}
                className={`rounded-xl border p-3 ${s.isBreak ? "bg-amber-50 border-amber-200" : "bg-slate-50 border-gray-100"}`}
              >
                {s.isBreak ? (
                  <div className="flex items-center gap-3">
                    <span className="text-amber-500">☕</span>
                    <input
                      className="flex-1 bg-white border border-amber-200 rounded-lg px-2 py-1 text-sm"
                      value={s.speaker}
                      onChange={(e) =>
                        updateSession(i, "speaker", e.target.value)
                      }
                      placeholder="Завсарлагын тайлбар"
                    />
                    <input
                      className="w-20 bg-white border border-amber-200 rounded-lg px-2 py-1 text-sm"
                      value={s.time}
                      onChange={(e) => updateSession(i, "time", e.target.value)}
                      placeholder="12:30"
                    />
                    <button
                      onClick={() => removeSession(i)}
                      className="text-red-400 hover:text-red-600 text-lg leading-none"
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="grid grid-cols-[5rem_1fr_1fr_5rem] gap-2">
                      <input
                        className={`${inputCls} text-xs`}
                        value={s.time}
                        onChange={(e) =>
                          updateSession(i, "time", e.target.value)
                        }
                        placeholder="10:00"
                      />
                      <input
                        className={`${inputCls} text-xs`}
                        value={s.speaker}
                        onChange={(e) =>
                          updateSession(i, "speaker", e.target.value)
                        }
                        placeholder="Илтгэгч"
                      />
                      <input
                        className={`${inputCls} text-xs`}
                        value={s.topic}
                        onChange={(e) =>
                          updateSession(i, "topic", e.target.value)
                        }
                        placeholder="Сэдэв"
                      />
                      <input
                        className={`${inputCls} text-xs`}
                        value={s.duration}
                        onChange={(e) =>
                          updateSession(i, "duration", e.target.value)
                        }
                        placeholder="10 мин"
                      />
                    </div>
                    <input
                      className={`${inputCls} text-xs`}
                      value={s.organization}
                      onChange={(e) =>
                        updateSession(i, "organization", e.target.value)
                      }
                      placeholder="Байгууллага"
                    />
                    <div className="flex gap-2 items-center">
                      <input
                        className={`${inputCls} text-xs flex-1`}
                        value={s.pptUrl || ""}
                        onChange={(e) =>
                          updateSession(i, "pptUrl", e.target.value)
                        }
                        placeholder="PPT URL эсвэл доор upload хийнэ"
                      />
                      <UploadButton
                        endpoint="pptUploader"
                        appearance={{
                          button:
                            "shrink-0 h-auto px-3 py-1.5 text-xs font-semibold bg-teal-50 text-teal-600 hover:bg-teal-100 rounded-lg border border-teal-100 transition-colors whitespace-nowrap ut-uploading:opacity-60",
                          allowedContent: "hidden",
                        }}
                        content={{
                          button: uploadingIdx === i ? "⏳" : "📎 Upload",
                        }}
                        onUploadBegin={() => setUploadingIdx(i)}
                        onClientUploadComplete={(res) => {
                          if (res?.[0]?.url)
                            updateSession(i, "pptUrl", res[0].url);
                          showToast("PPT амжилттай upload хийгдлээ", "success");
                          setUploadingIdx(null);
                        }}
                        onUploadError={(err) => {
                          showToast(
                            err.message || "Upload амжилтгүй боллоо",
                            "error",
                          );
                          setUploadingIdx(null);
                        }}
                      />
                    </div>
                  </div>
                )}
                <div className="flex justify-end gap-1 mt-2">
                  <button
                    onClick={() => moveUp(i)}
                    className="text-xs text-slate-400 hover:text-slate-600 px-1.5"
                  >
                    ↑
                  </button>
                  <button
                    onClick={() => moveDown(i)}
                    className="text-xs text-slate-400 hover:text-slate-600 px-1.5"
                  >
                    ↓
                  </button>
                  {!s.isBreak && (
                    <button
                      onClick={() => removeSession(i)}
                      className="text-xs text-red-400 hover:text-red-600 px-1.5"
                    >
                      Устгах
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2 mb-6">
            <button
              onClick={addSession}
              className="px-3 py-1.5 text-xs font-semibold bg-teal-50 text-teal-600 hover:bg-teal-100 rounded-lg transition-colors border border-teal-100"
            >
              + Илтгэл нэмэх
            </button>
            <button
              onClick={addBreak}
              className="px-3 py-1.5 text-xs font-semibold bg-amber-50 text-amber-600 hover:bg-amber-100 rounded-lg transition-colors border border-amber-100"
            >
              ☕ Завсарлага нэмэх
            </button>
          </div>

          <div className="flex justify-end gap-2">
            <button
              onClick={() => setModal(null)}
              className="px-4 py-2 text-sm text-slate-500"
            >
              Цуцлах
            </button>
            <button
              onClick={saveSessions}
              disabled={saving}
              className="px-5 py-2 bg-teal-500 text-white text-sm font-semibold rounded-lg hover:bg-teal-400 disabled:opacity-60"
            >
              {saving ? "Хадгалж байна..." : "Хадгалах"}
            </button>
          </div>
        </Modal>
      )}

      {/* ── PPT URL modal ── */}
      {modal === "ppt" && selected && (
        <Modal title="PPT / PDF холбоос" onClose={() => setModal(null)}>
          <p className="text-xs text-slate-400 mb-4">
            Google Drive, Dropbox эсвэл өөр хадгалалтын URL оруулна уу.
            Хэрэглэгчид шууд татах боломжтой болно.
          </p>
          <Field label="PPT / PDF URL">
            <input
              className={inputCls}
              value={pptUrl}
              onChange={(e) => setPptUrl(e.target.value)}
              placeholder="https://drive.google.com/..."
            />
          </Field>
          {pptUrl && (
            <a
              href={pptUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-teal-500 hover:underline"
            >
              Холбоосыг шалгах →
            </a>
          )}
          <div className="flex justify-end gap-2 mt-6">
            <button
              onClick={() => setModal(null)}
              className="px-4 py-2 text-sm text-slate-500"
            >
              Цуцлах
            </button>
            <button
              onClick={savePpt}
              disabled={saving}
              className="px-5 py-2 bg-teal-500 text-white text-sm font-semibold rounded-lg hover:bg-teal-400 disabled:opacity-60"
            >
              {saving ? "Хадгалж байна..." : "Хадгалах"}
            </button>
          </div>
        </Modal>
      )}

      {/* ── Delete confirm ── */}
      {deleteId && (
        <Modal title="Устгах уу?" onClose={() => setDeleteId(null)}>
          <p className="text-sm text-slate-500 mb-6">
            Устгавал буцаах боломжгүй.
          </p>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setDeleteId(null)}
              className="px-4 py-2 text-sm text-slate-500"
            >
              Цуцлах
            </button>
            <button
              onClick={confirmDelete}
              className="px-5 py-2 bg-red-500 text-white text-sm font-semibold rounded-lg hover:bg-red-400"
            >
              Устгах
            </button>
          </div>
        </Modal>
      )}
    </section>
  );
}
