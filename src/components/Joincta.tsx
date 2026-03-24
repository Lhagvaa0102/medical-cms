import Link from "next/link";

export default function JoinCTA() {
  return (
    <section className="max-w-6xl mx-auto px-4 pb-20">
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-teal-900 to-blue-900 rounded-3xl text-white p-10 md:p-16 text-center">
        {/* Decorative rings */}
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full border border-white/5 pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full border border-white/5 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border border-white/5 pointer-events-none" />

        <p className="text-teal-300 text-xs font-bold uppercase tracking-widest mb-4">
          POSM Нийгэмлэг
        </p>
        <h2
          className="text-3xl md:text-4xl font-extrabold leading-tight mb-4"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          Хүүхдийн ортопедийн
          <br />
          мэргэжилтнүүдийн
          <br />
          нийгэмлэгт нэгдэнэ үү
        </h2>
        <p className="text-slate-300 text-base max-w-xl mx-auto mb-8 leading-relaxed">
          POSM-ын гишүүн болж хурал, семинар, сургалтад оролцох, дотоод
          материалд нэвтрэх боломж аваарай.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            href="/join"
            className="px-8 py-3.5 bg-teal-500 text-white text-sm font-bold rounded-full hover:bg-teal-400 transition shadow-lg shadow-teal-500/30"
          >
            Гишүүн болох
          </Link>
          <Link
            href="/about-us"
            className="px-8 py-3.5 border border-white/25 text-white text-sm font-semibold rounded-full hover:bg-white/10 transition"
          >
            Бидний тухай
          </Link>
        </div>
      </div>
    </section>
  );
}
