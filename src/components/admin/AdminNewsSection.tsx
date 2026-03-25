"use client";
import { useState, useEffect, useCallback } from "react";
import { CldUploadWidget } from "next-cloudinary";

type News = {
  _id: string;
  title: string;
  category: string;
  year: string;
  date: string;
  location: string;
  tags: string[];
  excerpt: string;
  content: string;
  imageUrl: string;
  images?: string[];
  highlight: boolean;
  published: boolean;
};

type NewsForm = {
  title: string;
  category:
    | "Хурал"
    | "Сургалт"
    | "Судалгаа"
    | "Олон улс"
    | "Нийгмийн"
    | "Бусад";
  year: string;
  date: string;
  location: string;
  tagsRaw: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  images: string[];
  highlight: boolean;
  published: boolean;
};

const EMPTY_FORM: NewsForm = {
  title: "",
  category: "Хурал",
  year: new Date().getFullYear().toString(),
  date: "",
  location: "",
  tagsRaw: "",
  excerpt: "",
  content: "",
  imageUrl: "",
  images: [],
  highlight: false,
  published: false,
};

const inputCls =
  "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition";

const categoryColor: Record<string, string> = {
  Хурал: "bg-blue-50 text-blue-600",
  Сургалт: "bg-teal-50 text-teal-600",
  Судалгаа: "bg-purple-50 text-purple-600",
  "Олон улс": "bg-amber-50 text-amber-600",
  Нийгмийн: "bg-green-50 text-green-600",
  Бусад: "bg-gray-100 text-gray-500",
};

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
        className={`bg-white rounded-2xl shadow-2xl w-full ${wide ? "max-w-2xl" : "max-w-lg"} max-h-[90vh] overflow-y-auto`}
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

export default function AdminNewsSection({
  showToast,
}: {
  showToast: (msg: string, type: "success" | "error") => void;
}) {
  const [items, setItems] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<null | "create" | "edit">(null);
  const [editing, setEditing] = useState<News | null>(null);
  const [form, setForm] = useState<NewsForm>(EMPTY_FORM);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/news?all=1");
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch {
      showToast("Татахад алдаа гарлаа", "error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const openCreate = () => {
    setForm(EMPTY_FORM);
    setModal("create");
  };

  const openEdit = (item: News) => {
    setEditing(item);
    setForm({
      title: item.title,
      category: item.category as NewsForm["category"],
      year: item.year,
      date: item.date,
      location: item.location || "",
      tagsRaw: item.tags.join(", "),
      excerpt: item.excerpt,
      content: item.content,
      imageUrl: item.imageUrl || "",
      images: item.images || [],
      highlight: item.highlight,
      published: item.published,
    });
    setModal("edit");
  };

  const save = async () => {
    if (!form.title || !form.date || !form.excerpt || !form.content) return;
    setSaving(true);
    const payload = {
      ...form,
      tags: form.tagsRaw
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      images: form.images,
    };
    try {
      if (modal === "create") {
        const res = await fetch("/api/news", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error((await res.json()).error);
        showToast("Нэмэгдлээ", "success");
      } else if (editing) {
        const res = await fetch(`/api/news/${editing._id}`, {
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

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      await fetch(`/api/news/${deleteId}`, { method: "DELETE" });
      setItems((p) => p.filter((x) => x._id !== deleteId));
      showToast("Устгагдлаа", "success");
    } catch {
      showToast("Устгахад алдаа гарлаа", "error");
    } finally {
      setDeleteId(null);
    }
  };

  const togglePublish = async (item: News) => {
    try {
      const res = await fetch(`/api/news/${item._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: !item.published }),
      });
      const updated = await res.json();
      setItems((p) =>
        p.map((x) =>
          x._id === item._id ? { ...x, published: updated.published } : x,
        ),
      );
    } catch {
      showToast("Алдаа гарлаа", "error");
    }
  };

  // Зураг устгах
  const removeImage = (idx: number) =>
    setForm((f) => ({
      ...f,
      images: (f.images ?? []).filter((_, i) => i !== idx),
    }));

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-slate-800">Мэдээ</h2>
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
                <th className="px-5 py-3">Гарчиг</th>
                <th className="px-5 py-3">Ангилал</th>
                <th className="px-5 py-3">Огноо</th>
                <th className="px-5 py-3">Статус</th>
                <th className="px-5 py-3 text-right">Үйлдэл</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {items.map((item) => (
                <tr
                  key={item._id}
                  className="hover:bg-slate-50/60 transition-colors"
                >
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      {item.imageUrl && (
                        <img
                          src={item.imageUrl}
                          alt=""
                          className="w-8 h-8 rounded-lg object-cover shrink-0"
                        />
                      )}
                      <div>
                        <p className="font-medium text-slate-700 line-clamp-1">
                          {item.title}
                        </p>
                        {item.highlight && (
                          <span className="text-[10px] text-teal-500">
                            ★ Онцлох
                          </span>
                        )}
                        {(item.images?.length ?? 0) > 0 && (
                          <span className="text-[10px] text-slate-400 ml-1">
                            🖼 {item.images!.length} зураг
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${categoryColor[item.category] ?? categoryColor["Бусад"]}`}
                    >
                      {item.category}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-slate-400 text-xs whitespace-nowrap">
                    {item.date}
                  </td>
                  <td className="px-5 py-3.5">
                    <button
                      onClick={() => togglePublish(item)}
                      className={`px-2.5 py-0.5 rounded-full text-xs font-semibold transition-colors ${
                        item.published
                          ? "bg-green-50 text-green-600 hover:bg-green-100"
                          : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                      }`}
                    >
                      {item.published ? "Нийтлэгдсэн" : "Ноорог"}
                    </button>
                  </td>
                  <td className="px-5 py-3.5 text-right whitespace-nowrap">
                    <button
                      onClick={() => openEdit(item)}
                      className="text-teal-500 hover:text-teal-700 font-medium mr-3 transition-colors"
                    >
                      Засах
                    </button>
                    <button
                      onClick={() => setDeleteId(item._id)}
                      className="text-red-400 hover:text-red-600 font-medium transition-colors"
                    >
                      Устгах
                    </button>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-5 py-10 text-center text-slate-400 text-sm"
                  >
                    Мэдээ байхгүй байна
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Create / Edit Modal */}
      {modal && (
        <Modal
          title={modal === "create" ? "Шинэ мэдээ" : "Засах"}
          onClose={() => setModal(null)}
          wide
        >
          <div className="grid grid-cols-2 gap-4">
            <Field label="Ангилал">
              <select
                className={inputCls}
                value={form.category}
                onChange={(e) =>
                  setForm({
                    ...form,
                    category: e.target.value as NewsForm["category"],
                  })
                }
              >
                {[
                  "Хурал",
                  "Сургалт",
                  "Судалгаа",
                  "Олон улс",
                  "Нийгмийн",
                  "Бусад",
                ].map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </Field>
            <Field label="Жил">
              <input
                className={inputCls}
                value={form.year}
                onChange={(e) => setForm({ ...form, year: e.target.value })}
              />
            </Field>
          </div>

          <Field label="Гарчиг">
            <input
              className={inputCls}
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Мэдээний нэр"
            />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Огноо">
              <input
                type="date"
                className={inputCls}
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
              />
            </Field>
            <Field label="Байршил">
              <input
                className={inputCls}
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                placeholder="Улаанбаатар"
              />
            </Field>
          </div>

          <Field label="Таг (таслалаар)">
            <input
              className={inputCls}
              value={form.tagsRaw}
              onChange={(e) => setForm({ ...form, tagsRaw: e.target.value })}
              placeholder="ГССҮТ, Хамтын ажиллагаа"
            />
          </Field>

          <Field label="Товч тайлбар">
            <textarea
              className={inputCls}
              rows={2}
              value={form.excerpt}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
            />
          </Field>

          <Field label="Дэлгэрэнгүй агуулга">
            <textarea
              className={inputCls}
              rows={6}
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
            />
          </Field>

          {/* ── Зургийн хэсэг ── */}
          <Field label="Зурагнууд">
            <div className="space-y-3">
              {/* Upload товч */}
              <div className="flex items-center gap-3">
                <CldUploadWidget
                  uploadPreset={
                    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
                  }
                  options={{
                    resourceType: "image",
                    maxFileSize: 5_000_000,
                    folder: "posm/news",
                  }}
                  onSuccess={(result) => {
                    const info = result.info as { secure_url: string };
                    if (!info?.secure_url) return;
                    // Эхний зураг нүүр зураг болно, бусад images[] руу орно
                    setForm((f) => {
                      if (!f.imageUrl)
                        return { ...f, imageUrl: info.secure_url };
                      return { ...f, images: [...f.images, info.secure_url] };
                    });
                  }}
                >
                  {({ open }) => (
                    <button
                      type="button"
                      onClick={() => open()}
                      className="flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-teal-50 text-teal-600 hover:bg-teal-100 rounded-xl border border-teal-100 transition-colors"
                    >
                      <span className="text-base">🖼</span>
                      Зураг нэмэх
                    </button>
                  )}
                </CldUploadWidget>
                <span className="text-xs text-slate-400">
                  {
                    [form.imageUrl, ...(form.images ?? [])].filter(Boolean)
                      .length
                  }{" "}
                  зураг нэмэгдсэн
                </span>
              </div>

              {/* Preview grid */}
              {[form.imageUrl, ...(form.images ?? [])].filter(Boolean).length >
                0 && (
                <div className="grid grid-cols-4 gap-2">
                  {/* Нүүр зураг */}
                  {form.imageUrl && (
                    <div className="relative group">
                      <img
                        src={form.imageUrl}
                        alt=""
                        className="w-full h-20 object-cover rounded-xl border-2 border-teal-400"
                      />
                      <div className="absolute bottom-1 left-1 bg-teal-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                        Нүүр
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          // Нүүр зураг устгахад дараагийн зураг нүүр болно
                          const next = form.images[0] || "";
                          setForm((f) => ({
                            ...f,
                            imageUrl: next,
                            images: f.images.slice(1),
                          }));
                        }}
                        className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow"
                      >
                        ×
                      </button>
                    </div>
                  )}
                  {/* Нэмэлт зурагнууд */}
                  {form.images.map((url, i) => (
                    <div key={i} className="relative group">
                      <img
                        src={url}
                        alt=""
                        className="w-full h-20 object-cover rounded-xl border border-gray-200"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(i)}
                        className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <p className="text-xs text-slate-400">
                Эхний зураг нүүр зураг болно. Hover хийж × дарвал устгана.
              </p>
            </div>
          </Field>

          <div className="flex gap-6 mt-1">
            <Toggle
              value={form.highlight}
              onChange={() => setForm({ ...form, highlight: !form.highlight })}
              label="Онцлох"
            />
            <Toggle
              value={form.published}
              onChange={() => setForm({ ...form, published: !form.published })}
              label="Нийтлэх"
            />
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <button
              onClick={() => setModal(null)}
              className="px-4 py-2 text-sm text-slate-500"
            >
              Цуцлах
            </button>
            <button
              onClick={save}
              disabled={saving}
              className="px-5 py-2 bg-teal-500 text-white text-sm font-semibold rounded-lg hover:bg-teal-400 disabled:opacity-60 transition-colors"
            >
              {saving ? "Хадгалж байна..." : "Хадгалах"}
            </button>
          </div>
        </Modal>
      )}

      {/* Delete confirm */}
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
