"use client";
import { useState } from "react";
import Image from "next/image";

const doctors = [
  {
    id: 1,
    name: "Д.Оюунжаргал",
    title: "Гэмтэл согогийн их эмч",
    specialty: "Хүүхдийн ортопед, Нурууны мэс засал",
    experience: "22 жил",
    education:
      "Монгол Улсын Анагаахын Их Сургууль · Seoul National University Hospital",
    image: "D.Oyunjargal.jpg",
    initials: "ББ",
    color: "#0d9488",
  },
  {
    id: 2,
    name: "Х.Нямсүрэн",
    title: "Гэмтэл согогийн их эмч",
    specialty: "Хүүхдийн яс холбох мэс засал",
    experience: "17 жил",
    education: "МУИС · Peking Union Medical College",
    image: "N.Nymsuren.jpg",
    initials: "НО",
    color: "#0284c7",
  },
  {
    id: 3,
    name: "Б.Тамир",
    title: "Гэмтэл согогийн их эмч",
    specialty: "Травматологи, Хүүхдийн спортын гэмтэл",
    experience: "14 жил",
    education: "МУИС · Tokyo Medical University",
    image: "B.Tamir.jpg",
    initials: "ГЭ",
    color: "#0891b2",
  },
  {
    id: 4,
    name: "Б.Солонго",
    title: "Гэмтэл согогийн их эмч",
    specialty: "Хүүхдийн нугасны хэв гажилт",
    experience: "10 жил",
    education: "МУИС · Yonsei University",
    image: "B.Solongo.jpg",
    initials: "ДМ",
    color: "#0d9488",
  },
  {
    id: 5,
    name: "Х.Ганзориг",
    title: "Гэмтэл согогийн их эмч",
    specialty: "Ахлах",
    experience:
      "2019 ГССҮТөвийн Хүлээн авах яаралтай тусламжийн тасгийн их эмч,  2022 ГССҮТөвийн Хүүхдийн гэмтэл согогийн тасгийн их эмч",

    education:
      "2008 ЭМШУИСургууль  хүний их эмч   2008-2010 Гэмтэл согогч мэс засалч эмч  2019 Хүүхдийн гэмтэл согог судлалын мэс засалч эмч ",

    image: "H.Ganzorig.jpg",
    initials: "ТС",
    color: "#0284c7",
  },
  {
    id: 6,
    name: "Д.Батэрдэнэ",
    title: "Гэмтэл согогийн их эмч",
    specialty: "Минималь инвазив мэс засал",
    experience: "6 жил",
    education: "МУИС · Beijing Children's Hospital",
    image: "D.Baterdene.jpg",
    initials: "ЭБ",
    color: "#0891b2",
  },
];

const stats = [
  { value: "2024", label: "Үүсгэн байгуулагдсан" },
  { value: "120+", label: "Гишүүн эмч нар" },
  { value: "15,000+", label: "Жил бүрийн үзлэг" },
  { value: "18+", label: "Орон нутгийн салбар" },
];

export default function AboutUs() {
  const [activeDoctor, setActiveDoctor] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white font-sans">
      <section className="relative overflow-hidden bg-gradient-to-br from-teal-700 via-teal-600 to-cyan-700 text-white">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-white/3 pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-6 py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-teal-300 animate-pulse" />
              Монголын Хүүхдийн Гэмтэл Согог Судлалын Нийгэмлэг
            </div>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6 tracking-tight">
              Хүүхдийн эрүүл мэнд —{" "}
              <span className="text-teal-200">манай зорилго</span>
            </h1>
            <p className="text-lg md:text-xl text-teal-50/90 leading-relaxed max-w-2xl">
              Манай ТББ нь Монголын хүүхдийн гэмтэл согогийн чиглэлээр эрдэм
              шинжилгээ, судалгааны ажил хийх, олон улсын жишигт нийцсэн гэмтэл
              согогийн цогц эмчилгээ, тусламж үйлчилгээ үзүүлэх, гэмтэл согогийн
              чиглэлээр дотоодын болон гадаадын эрүүл мэндийн байгууллага, эмч
              мэргэжилтэн, олон нийтэд сургалт зохион байгуулах зэрэг үйл
              ажиллагаа явуулах зорилготой.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-slate-100">
            {stats.map((s) => (
              <div key={s.label} className="py-10 px-8 text-center">
                <div className="text-4xl font-bold text-teal-600 mb-1">
                  {s.value}
                </div>
                <div className="text-sm text-slate-500 font-medium">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-xs font-bold tracking-widest text-teal-600 uppercase mb-3 block">
              Бидний тухай
            </span>
            <h2 className="text-4xl font-bold text-slate-800 mb-6 leading-tight">
              Хүүхдийн ортопедын тусламжийг дэлгэрүүлэх
            </h2>
            <p className="text-slate-600 leading-relaxed mb-5">
              Монголын Хүүхдийн Ортопед Травматологийн Нийгэмлэг (POSM) нь 2004
              онд байгуулагдсан бөгөөд өнөөдрийг хүртэл 120 гаруй мэргэжлийн эмч
              нарыг нэгтгэсэн томоохон нийгэмлэг болон хөгжжээ.
            </p>
            <p className="text-slate-600 leading-relaxed mb-5">
              Бид жил бүр олон улсын болон дотоодын эрдэм шинжилгээний хурал,
              сургалт семинар зохион байгуулж, эмч нарын мэдлэг, ур чадварыг
              байнга дээшлүүлэхэд анхаардаг.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Хүүхдийн эрүүл мэнд, ялангуяа яс, үе мөч, нугасны эмгэгийг эрт
              илрүүлж, зөв эмчлэхэд тэргүүлэх байр суурь эзэлдэг.
            </p>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-10 border border-teal-100">
              <div className="space-y-6">
                {[
                  {
                    icon: "🎯",
                    title: "Зорилго",
                    text: "Монгол дахь хүүхдийн ортопедын тусламжийн чанар, хүртээмжийг сайжруулах",
                  },
                  {
                    icon: "🔬",
                    title: "Эрдэм шинжилгээ",
                    text: "Олон улсын стандарт, судалгаанд тулгуурласан эмчилгээний аргуудыг нэвтрүүлэх",
                  },
                  {
                    icon: "🤝",
                    title: "Хамтын ажиллагаа",
                    text: "Дотоод, гадаадын их сургууль, эмнэлгүүдтэй идэвхтэй хамтран ажиллах",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4 items-start">
                    <div className="text-2xl flex-shrink-0">{item.icon}</div>
                    <div>
                      <div className="font-semibold text-slate-800 mb-1">
                        {item.title}
                      </div>
                      <div className="text-sm text-slate-600 leading-relaxed">
                        {item.text}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Doctors Section */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-xs font-bold tracking-widest text-teal-600 uppercase mb-3 block">
              Манай баг
            </span>
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              Эмч мэргэжилтнүүд
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {doctors.map((doc) => (
              <div
                key={doc.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
                onClick={() =>
                  setActiveDoctor(activeDoctor === doc.id ? null : doc.id)
                }
              >
                {/* Avatar Area */}
                <div
                  className="relative w-full h-96 overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${doc.color}22, ${doc.color}44)`,
                  }}
                >
                  {doc.image ? (
                    <Image
                      src={`/${doc.image}`}
                      alt={doc.name}
                      fill
                      className="object-cover object-center"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div
                        className="w-28 h-28 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg"
                        style={{ backgroundColor: doc.color }}
                      >
                        {doc.initials}
                      </div>
                    </div>
                  )}
                  {/* Expand indicator */}
                  <div className="absolute bottom-3 right-3 bg-white/80 backdrop-blur-sm rounded-full w-7 h-7 flex items-center justify-center text-slate-400 text-xs group-hover:bg-white transition-colors">
                    {activeDoctor === doc.id ? "▲" : "▼"}
                  </div>
                </div>

                {/* Info */}
                <div className="p-5">
                  <h3 className="font-bold text-slate-800 text-lg">
                    {doc.name}
                  </h3>
                  <p
                    className="text-sm font-medium mb-1"
                    style={{ color: doc.color }}
                  >
                    {doc.title}
                  </p>
                  <p className="text-sm text-slate-500">{doc.specialty}</p>

                  {/* Expanded details */}
                  {activeDoctor === doc.id && (
                    <div className="mt-4 pt-4 border-t border-slate-100 space-y-2 text-sm text-slate-600">
                      <div className="flex items-center gap-2">
                        <span className="text-teal-500">⏱</span>
                        <span>
                          Туршлага: <strong>{doc.experience}</strong>
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-teal-500 mt-0.5">🎓</span>
                        <span>{doc.education}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
