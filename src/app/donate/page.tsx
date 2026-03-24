"use client";
import { useState } from "react";

const BANK_ACCOUNTS = [
  { bank: "Хаан банк", account: "5000****78", name: "ПОСМ ТББ" },
  { bank: "Голомт банк", account: "1234****90", name: "ПОСМ ТББ" },
];

function formatMNT(n: number) {
  return n.toLocaleString("mn-MN") + "₮";
}

export default function DonatePage() {
  const [customAmount, setCustomAmount] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  const finalAmount = customAmount ? Number(customAmount) : 0;

  function handleCustom(e: React.ChangeEvent<HTMLInputElement>) {
    const v = e.target.value.replace(/\D/g, "");
    setCustomAmount(v);
  }

  function copyToClipboard(text: string, key: string) {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(key);
      setTimeout(() => setCopied(null), 2000);
    });
  }

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
            POSM · Хандив
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Хүүхдийн эрүүл мэндэд
            <br />
            <span className="text-teal-200">хувь нэмэр оруулах</span>
          </h1>
          <p className="text-teal-100 text-lg max-w-xl leading-relaxed">
            Таны хандив Монгол орны хүүхдийн ортопед, травматологийн тусламж
            үйлчилгээг сайжруулах, залуу эмч нарыг дэмжихэд зарцуулагдана.
          </p>
          <div className="grid grid-cols-3 gap-4 mt-10 max-w-lg">
            {[
              { value: "120+", label: "Гишүүн эмч" },
              { value: "15,000+", label: "Жил бүрийн үзлэг" },
              { value: "18+", label: "Орон нутаг" },
            ].map((s) => (
              <div
                key={s.label}
                className="bg-white/10 border border-white/15 rounded-xl px-4 py-3 text-center"
              >
                <div className="text-xl font-bold">{s.value}</div>
                <div className="text-xs text-teal-200 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-5 gap-8">
          {/* Left — Amount + Why */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-5">
                Хандивын хэмжээ
              </h2>
              <div className="relative">
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="Дүн оруулах..."
                  value={
                    customAmount
                      ? Number(customAmount).toLocaleString("mn-MN")
                      : ""
                  }
                  onChange={handleCustom}
                  className={`w-full border-2 rounded-xl px-4 py-4 text-lg font-bold pr-10 focus:outline-none focus:ring-2 focus:ring-teal-400 transition ${
                    customAmount
                      ? "border-teal-400 bg-teal-50 text-teal-800"
                      : "border-slate-200 text-slate-500"
                  }`}
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-lg">
                  ₮
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-2">
                Хандивлах дүнгээ оруулна уу
              </p>

              {finalAmount > 0 && (
                <div className="mt-4 bg-teal-50 border border-teal-100 rounded-xl px-4 py-3 flex items-center justify-between">
                  <span className="text-xs text-teal-600 font-medium">
                    Нийт дүн
                  </span>
                  <span className="text-lg font-bold text-teal-700">
                    {formatMNT(finalAmount)}
                  </span>
                </div>
              )}
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">
                Хандив юунд зарцуулагдах вэ?
              </h3>
              <div className="space-y-3">
                {[
                  { icon: "🏥", text: "Эмч нарын мэргэжлийн сургалт" },
                  { icon: "🔬", text: "Эрдэм шинжилгээний хурал" },
                  { icon: "🤝", text: "Орон нутгийн үзлэг, тусламж" },
                  { icon: "📚", text: "Залуу эмч нарын тэтгэлэг" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-3">
                    <span className="text-lg">{item.icon}</span>
                    <span className="text-sm text-slate-600">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — Bank transfer */}
          <div className="md:col-span-3">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="border-b border-slate-100 px-8 py-4 flex items-center gap-2">
                <span>🏦</span>
                <span className="text-sm font-semibold text-slate-700">
                  Дансаар шилжүүлэх
                </span>
              </div>

              <div className="p-8 space-y-4">
                <p className="text-sm text-slate-500 mb-6">
                  Доорх дансанд шилжүүлэг хийж, гүйлгээний утга дээр өөрийн
                  нэрийг бичнэ үү.
                </p>

                {BANK_ACCOUNTS.map((acc) => (
                  <div
                    key={acc.bank}
                    className="border border-slate-200 rounded-2xl p-5 hover:border-teal-300 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-bold text-slate-800">
                        {acc.bank}
                      </span>
                      <span className="text-xs text-slate-400 bg-slate-100 rounded-full px-3 py-1">
                        {acc.name}
                      </span>
                    </div>
                    <div className="flex items-center justify-between bg-slate-50 rounded-xl px-4 py-3">
                      <span className="font-mono text-lg font-bold text-slate-800 tracking-wider">
                        {acc.account}
                      </span>
                      <button
                        onClick={() =>
                          copyToClipboard(
                            acc.account.replace(/\*/g, "0"),
                            acc.bank,
                          )
                        }
                        className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-all ${
                          copied === acc.bank
                            ? "bg-teal-100 text-teal-700"
                            : "bg-white border border-slate-200 text-slate-500 hover:border-teal-400 hover:text-teal-600"
                        }`}
                      >
                        {copied === acc.bank ? (
                          <>
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
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            Хуулагдлаа
                          </>
                        ) : (
                          <>
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
                                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                              />
                            </svg>
                            Хуулах
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ))}

                {/* Transfer note */}
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
                  <div className="flex gap-3">
                    <span className="text-amber-500 text-lg flex-shrink-0">
                      💡
                    </span>
                    <div>
                      <p className="text-xs font-semibold text-amber-800 mb-1">
                        Гүйлгээний утга
                      </p>
                      <p className="text-xs text-amber-700 leading-relaxed">
                        Гүйлгээний утга хэсэгт{" "}
                        <strong>өөрийн нэр + "POSM хандив"</strong> гэж бичнэ
                        үү. Жишээ: "Батбаяр Дорж POSM хандив"
                      </p>
                    </div>
                  </div>
                </div>

                {/* Amount reminder */}
                {finalAmount > 0 && (
                  <div className="bg-teal-50 border border-teal-100 rounded-xl px-4 py-3 flex items-center justify-between">
                    <span className="text-xs text-teal-600 font-medium">
                      Шилжүүлэх дүн
                    </span>
                    <span className="text-lg font-bold text-teal-700">
                      {formatMNT(finalAmount)}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Thank you */}
            <div className="mt-6 bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex items-start gap-4">
              <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-xl">🙏</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800 mb-1">
                  Баярлалаа!
                </p>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Таны хандив Монгол орны хүүхдүүдийн эрүүл мэндэд шууд хувь
                  нэмэр болно. POSM нийгэмлэг таны итгэлцэлд талархаж байна.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
