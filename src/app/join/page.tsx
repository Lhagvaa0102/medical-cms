"use client";
import { useState, useRef } from "react";

type FormData = {
  lastName: string;
  firstName: string;
  phone: string;
  email: string;
  specialty: string;
  organization: string;
  degree: string;
  experience: string;
  message: string;
};

const SPECIALTIES = [
  "Хүүхдийн ортопед",
  "Хүүхдийн травматологи",
  "Хүүхдийн мэс засал",
  "Нурууны мэс засал",
  "Спортын анагаах ухаан",
  "Бусад",
];

const DEGREES = [
  "Их эмч",
  "Мэргэжилтэн эмч",
  "А.У. доктор (Ph.D)",
  "Дэд доктор",
  "Профессор",
  "Дэд профессор",
];

type Status = "idle" | "loading" | "success" | "error";

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!;

async function uploadToCloudinary(file: File): Promise<string> {
  const fd = new FormData();
  fd.append("file", file);
  fd.append("upload_preset", UPLOAD_PRESET);
  fd.append("folder", "posm/receipts");

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    { method: "POST", body: fd },
  );
  if (!res.ok) throw new Error("Cloudinary upload амжилтгүй болов");
  const data = await res.json();
  return data.secure_url as string;
}

export default function JoinPage() {
  const [form, setForm] = useState<FormData>({
    lastName: "",
    firstName: "",
    phone: "",
    email: "",
    specialty: "",
    organization: "",
    degree: "",
    experience: "",
    message: "",
  });

  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [cv, setCv] = useState<File | null>(null);

  // Receipt (гүйлгээний баримт)
  const [receipt, setReceipt] = useState<File | null>(null);
  const [receiptPreview, setReceiptPreview] = useState<string | null>(null);

  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const photoRef = useRef<HTMLInputElement>(null);
  const cvRef = useRef<HTMLInputElement>(null);
  const receiptRef = useRef<HTMLInputElement>(null);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handlePhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setErrorMsg("Зөвхөн зураг файл оруулна уу (JPG, PNG)");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg("Зургийн хэмжээ 5MB-аас хэтрэхгүй байх ёстой");
      return;
    }
    setPhoto(file);
    setPhotoPreview(URL.createObjectURL(file));
    setErrorMsg("");
  }

  function handleCv(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const allowed = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!allowed.includes(file.type)) {
      setErrorMsg("CV-г PDF эсвэл Word (.doc, .docx) форматаар оруулна уу");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setErrorMsg("CV-ийн хэмжээ 10MB-аас хэтрэхгүй байх ёстой");
      return;
    }
    setCv(file);
    setErrorMsg("");
  }

  function handleReceipt(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setErrorMsg("Гүйлгээний баримтыг зураг (JPG, PNG) форматаар оруулна уу");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg("Баримтын зургийн хэмжээ 5MB-аас хэтрэхгүй байх ёстой");
      return;
    }
    setReceipt(file);
    setReceiptPreview(URL.createObjectURL(file));
    setErrorMsg("");
  }

  async function handleSubmit() {
    const required: (keyof FormData)[] = [
      "lastName",
      "firstName",
      "phone",
      "email",
      "specialty",
      "organization",
      "degree",
    ];
    for (const key of required) {
      if (!form[key].trim()) {
        setErrorMsg("Бүх шаардлагатай (*) талбарыг бөглөнө үү.");
        return;
      }
    }
    if (!receipt) {
      setErrorMsg("Гүйлгээний баримтын зургийг заавал оруулна уу.");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    try {
      // 1. Upload receipt to Cloudinary
      const receiptUrl = await uploadToCloudinary(receipt);

      // 2. Submit form to API
      const formData = new FormData();
      Object.entries(form).forEach(([k, v]) => formData.append(k, v));
      if (photo) formData.append("photo", photo);
      if (cv) formData.append("cv", cv);
      formData.append("receiptUrl", receiptUrl);

      const res = await fetch("/api/join", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Алдаа гарлаа");
      setStatus("success");
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Алдаа гарлаа");
      setStatus("error");
    }
  }

  // ── Success ────────────────────────────────────
  if (status === "success") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-700 via-teal-600 to-cyan-600 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-teal-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-3">
            Амжилттай илгээгдлээ!
          </h2>
          <p className="text-slate-500 leading-relaxed mb-2">
            Таны өргөдөл хүлээн авагдлаа. POSM-ийн admin шалгаж, удахгүй
            и-мэйлээр хариу мэдэгдэнэ.
          </p>
          <p className="text-xs text-slate-400 mb-8">
            Ихэвчлэн 2–5 ажлын өдрийн дотор
          </p>
          <div className="bg-slate-50 rounded-2xl p-5 text-left space-y-3">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
              Дараагийн алхамууд
            </p>
            {[
              "Admin таны материалыг шалгана",
              "И-мэйлээр зөвшөөрлийн хариу ирнэ",
              "Гишүүнчлэл баталгаажна",
            ].map((s, i) => (
              <div key={s} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-teal-600 text-white text-xs flex items-center justify-center font-bold flex-shrink-0">
                  {i + 1}
                </div>
                <span className="text-sm text-slate-600">{s}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── Form ───────────────────────────────────────
  return (
    <div
      className="min-h-screen bg-slate-50"
      style={{ fontFamily: "'Noto Sans', sans-serif" }}
    >
      {/* Hero */}
      <div className="bg-gradient-to-r from-teal-700 via-teal-600 to-cyan-600 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-white/15 border border-white/20 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wider uppercase mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-300 animate-pulse" />
            POSM · Гишүүнчлэл
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Нийгэмлэгт элсэх
          </h1>
          <p className="text-teal-100 text-lg max-w-xl leading-relaxed">
            Монголын хүүхдийн ортопед, травматологийн чиглэлээр мэргэшсэн эмч
            нарын нийгэмлэгт тавтай морилно уу.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
            {[
              { icon: "🎓", text: "Сургалт, семинарт оролцох" },
              { icon: "🤝", text: "Мэргэжлийн сүлжээ" },
              { icon: "📄", text: "Эрдэм шинжилгээний хамтын ажиллагаа" },
            ].map((b) => (
              <div
                key={b.text}
                className="flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/15 rounded-xl px-4 py-3"
              >
                <span className="text-xl">{b.icon}</span>
                <span className="text-sm text-teal-50">{b.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form card */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="bg-slate-800 px-8 py-5">
            <h2 className="text-white font-semibold text-lg">
              Өргөдлийн маягт
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              * тэмдэглэсэн талбарыг заавал бөглөнө үү
            </p>
          </div>

          <div className="p-8 space-y-8">
            {/* Photo */}
            <section>
              <SectionTitle>Профайл зураг</SectionTitle>
              <div className="flex items-center gap-6">
                <div
                  onClick={() => photoRef.current?.click()}
                  className="relative w-24 h-24 rounded-2xl border-2 border-dashed border-slate-200 flex items-center justify-center cursor-pointer hover:border-teal-400 transition-colors overflow-hidden bg-slate-50 flex-shrink-0"
                >
                  {photoPreview ? (
                    <>
                      <img
                        src={photoPreview}
                        alt="preview"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-white text-xs font-medium">
                          Солих
                        </span>
                      </div>
                    </>
                  ) : (
                    <svg
                      className="w-8 h-8 text-slate-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  )}
                </div>
                <div>
                  <button
                    onClick={() => photoRef.current?.click()}
                    className="text-sm font-medium text-teal-600 hover:text-teal-800 transition-colors"
                  >
                    {photo ? "Зураг солих" : "Зураг оруулах"}
                  </button>
                  {photo && (
                    <p className="text-xs text-slate-500 mt-1">{photo.name}</p>
                  )}
                  <p className="text-xs text-slate-400 mt-1">
                    JPG, PNG · Дээд хэмжээ 5MB
                  </p>
                </div>
                <input
                  ref={photoRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhoto}
                />
              </div>
            </section>

            <hr className="border-slate-100" />

            {/* Personal */}
            <section>
              <SectionTitle>Хувийн мэдээлэл</SectionTitle>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field
                  label="Овог *"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  placeholder="Батбаяр"
                />
                <Field
                  label="Нэр *"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  placeholder="Дорж"
                />
                <Field
                  label="Утасны дугаар *"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="9911 2233"
                  type="tel"
                />
                <Field
                  label="И-мэйл *"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="example@email.com"
                  type="email"
                />
              </div>
            </section>

            <hr className="border-slate-100" />

            {/* Professional */}
            <section>
              <SectionTitle>Мэргэжлийн мэдээлэл</SectionTitle>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <SelectField
                  label="Мэргэжил *"
                  name="specialty"
                  value={form.specialty}
                  onChange={handleChange}
                  options={SPECIALTIES}
                />
                <Field
                  label="Байгууллага *"
                  name="organization"
                  value={form.organization}
                  onChange={handleChange}
                  placeholder="ГССҮТ, ЭХЭМҮТ..."
                />
                <SelectField
                  label="Зэрэг цол *"
                  name="degree"
                  value={form.degree}
                  onChange={handleChange}
                  options={DEGREES}
                />
                <Field
                  label="Ажлын туршлага (жил)"
                  name="experience"
                  value={form.experience}
                  onChange={handleChange}
                  placeholder="10"
                  type="number"
                />
              </div>
            </section>

            <hr className="border-slate-100" />

            {/* CV */}
            <section>
              <SectionTitle>CV / Анкет</SectionTitle>
              <div
                onClick={() => cvRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-colors ${
                  cv
                    ? "border-teal-300 bg-teal-50"
                    : "border-slate-200 hover:border-teal-300 bg-slate-50"
                }`}
              >
                {cv ? (
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-10 h-10 bg-teal-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-5 h-5 text-white"
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
                    <div className="text-left">
                      <p className="text-sm font-medium text-slate-700">
                        {cv.name}
                      </p>
                      <p className="text-xs text-slate-400">
                        {(cv.size / 1024).toFixed(0)} KB · Солихын тулд дарна уу
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    <svg
                      className="w-10 h-10 text-slate-300 mx-auto mb-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M16 8l-4-4-4 4M12 4v12"
                      />
                    </svg>
                    <p className="text-sm font-medium text-slate-600 mb-1">
                      CV файл оруулах
                    </p>
                    <p className="text-xs text-slate-400">
                      PDF, DOC, DOCX · Дээд хэмжээ 10MB
                    </p>
                  </>
                )}
              </div>
              <input
                ref={cvRef}
                type="file"
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={handleCv}
              />
            </section>

            <hr className="border-slate-100" />

            {/* Payment */}
            <section>
              <SectionTitle>Бүртгэлийн хураамж</SectionTitle>
              <div className="bg-gradient-to-br from-teal-50 to-cyan-50 border border-teal-100 rounded-2xl p-6 mb-5">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <p className="text-xs font-semibold text-teal-600 uppercase tracking-wider mb-1">
                      Хураамжийн дүн
                    </p>
                    <p className="text-3xl font-bold text-slate-800">
                      50,000
                      <span className="text-lg text-slate-500 ml-1">₮</span>
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      Нэг удаагийн бүртгэлийн хураамж
                    </p>
                  </div>
                  <div className="bg-white border border-teal-100 rounded-xl px-5 py-4 shadow-sm min-w-[240px]">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                      Шилжүүлэх данс
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <span className="text-xs text-slate-400 w-16 flex-shrink-0 pt-0.5">
                          Банк
                        </span>
                        <span className="text-sm font-semibold text-slate-700">
                          Төрийн банк
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-xs text-slate-400 w-16 flex-shrink-0 pt-0.5">
                          Дансны №
                        </span>
                        <span className="text-sm font-mono font-bold text-teal-700 tracking-wide break-all">
                          860034100901882633
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-xs text-slate-400 w-16 flex-shrink-0 pt-0.5">
                          Эзэмшигч
                        </span>
                        <span className="text-xs font-medium text-slate-600 leading-snug">
                          Монголын хүүхдийн гэмтэл согогийн унагалдай нийгэмлэг
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex items-start gap-2 bg-amber-50 border border-amber-100 rounded-xl px-4 py-3">
                  <svg
                    className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="text-xs text-amber-700 leading-relaxed">
                    Хураамж төлсний дараа гүйлгээний баримтын зургийг доор
                    оруулна уу. Баримтгүйгээр өргөдлийг баталгаажуулах
                    боломжгүй.
                  </p>
                </div>
              </div>

              {/* Receipt upload */}
              <label className="block text-sm font-medium text-slate-600 mb-2">
                Гүйлгээний баримт *
              </label>
              <div
                onClick={() => receiptRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl cursor-pointer transition-colors overflow-hidden ${
                  receipt
                    ? "border-teal-300 bg-teal-50"
                    : "border-slate-200 hover:border-teal-300 bg-slate-50"
                }`}
              >
                {receiptPreview ? (
                  <div className="relative group">
                    <img
                      src={receiptPreview}
                      alt="Гүйлгээний баримт"
                      className="w-full max-h-64 object-contain p-3"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-2xl">
                      <span className="text-white text-sm font-medium bg-black/50 px-4 py-2 rounded-lg">
                        Солих
                      </span>
                    </div>
                    <div className="border-t border-teal-100 px-4 py-2.5 bg-teal-50 flex items-center gap-2">
                      <svg
                        className="w-4 h-4 text-teal-600 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <p className="text-xs font-medium text-teal-700">
                        {receipt!.name}
                      </p>
                      <p className="text-xs text-teal-500 ml-auto">
                        {(receipt!.size / 1024).toFixed(0)} KB
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="p-8 text-center">
                    <svg
                      className="w-10 h-10 text-slate-300 mx-auto mb-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M16 8l-4-4-4 4M12 4v12"
                      />
                    </svg>
                    <p className="text-sm font-medium text-slate-600 mb-1">
                      Баримтын зураг оруулах
                    </p>
                    <p className="text-xs text-slate-400">
                      JPG, PNG · Дээд хэмжээ 5MB
                    </p>
                  </div>
                )}
              </div>
              <input
                ref={receiptRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleReceipt}
              />
            </section>

            <hr className="border-slate-100" />

            {/* Message */}
            <section>
              <SectionTitle>Нэмэлт мэдээлэл</SectionTitle>
              <label className="block text-sm font-medium text-slate-600 mb-1.5">
                Элсэх болсон шалтгаан / Танилцуулга
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={4}
                placeholder="Нийгэмлэгт элсэх болсон шалтгаан, өөрийн тухай товч танилцуулга..."
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent resize-none transition"
              />
            </section>

            {/* Error */}
            {(status === "error" || errorMsg) && (
              <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-600 flex items-center gap-2">
                <svg
                  className="w-4 h-4 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {errorMsg}
              </div>
            )}

            {/* Submit */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
              <p className="text-xs text-slate-400 max-w-sm">
                Өргөдлийг admin шалгаж зөвшөөрсний дараа гишүүнчлэл баталгаажна.
                Хариуг и-мэйлээр мэдэгдэнэ.
              </p>
              <button
                onClick={handleSubmit}
                disabled={status === "loading"}
                className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 disabled:opacity-60 text-white font-semibold px-8 py-3 rounded-xl transition-colors text-sm whitespace-nowrap"
              >
                {status === "loading" ? (
                  <>
                    <svg
                      className="w-4 h-4 animate-spin"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8z"
                      />
                    </svg>
                    Илгээж байна...
                  </>
                ) : (
                  <>
                    Өргөдөл илгээх
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7-7 7M3 12h18"
                      />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-xs font-bold tracking-widest text-teal-600 uppercase mb-5 flex items-center gap-2">
      <span className="w-5 h-px bg-teal-200 inline-block" />
      {children}
    </h3>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-600 mb-1.5">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition"
      />
    </div>
  );
}

function SelectField({
  label,
  name,
  value,
  onChange,
  options,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-600 mb-1.5">
        {label}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition bg-white"
      >
        <option value="">Сонгох...</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
