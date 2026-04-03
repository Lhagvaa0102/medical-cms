import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-100 border-t border-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* About */}
          <div>
            <h3 className="text-sm font-semibold text-teal-400 tracking-widest uppercase mb-4">
              POSM тухай
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              Монголын хүүхдийн гэмтэл согог судлалын нийгэмлэг нь хүүхдийн
              эрүүл мэндийг дэмжих, эмч нарыг хөгжүүлэх зорилготой.
            </p>
            <a
              href="https://www.google.com/maps/place/%D0%93%D1%8D%D0%BC%D1%82%D1%8D%D0%BB+%D0%A1%D0%BE%D0%B3%D0%BE%D0%B3+%D0%A1%D1%83%D0%B4%D0%BB%D0%B0%D0%BB%D1%8B%D0%BD+%D2%AE%D0%BD%D0%B4%D1%8D%D1%81%D0%BD%D0%B8%D0%B9+%D0%A2%D3%A9%D0%B2/@47.9199085,106.8558276,628m"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-teal-400 hover:text-teal-300 transition-colors font-medium"
            >
              📍 Гэмтэл согог судлалын үндэсний төв
            </a>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-teal-400 tracking-widest uppercase mb-4">
              Мэдээлэл
            </h3>
            <ul className="space-y-2">
              {[
                { label: "Бидний тухай", href: "/about-us" },
                { label: "Зөвлөмж", href: "/education" },
                { label: "Мэдээ мэдээлэл", href: "/news" },
                { label: "Хурал зөвөлгөөн", href: "/meeting" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-teal-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Sponsors */}
          <div>
            <h3 className="text-sm font-semibold text-teal-400 tracking-widest uppercase mb-4">
              Спонсор байгууллага
            </h3>
            <ul className="space-y-2">
              {[
                { label: "ГССҮТ", href: "https://www.gemtel.mn/" },
                {
                  label: "Rotary Clubs of Mongolia",
                  href: "https://rotarymongolia.org/",
                },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-teal-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-teal-400 tracking-widest uppercase mb-4">
              Холбоо барих
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                  И-мэйл
                </p>
                <a
                  href="mailto:mgltrauma.ped@gmail.com"
                  className="text-sm text-teal-400 hover:text-teal-300 transition-colors font-medium"
                >
                  mgltrauma.ped@gmail.com
                </a>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                  Байршил
                </p>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Улаанбаатар, Монгол улс
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-500">
              <p>
                © {currentYear} Монголын Хүүхдийн Ортопед Травматологийн
                Нийгэмлэг. Бүх эрх хуулиар хамгаалагдсан.
              </p>
            </div>

            {/* Social */}
            {/* <div className="flex items-center gap-5">
              {[
                { name: "Facebook", href: "#", icon: "facebook" },
                { name: "LinkedIn", href: "#", icon: "linkedin" },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  aria-label={social.name}
                  className="text-gray-500 hover:text-teal-400 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {social.icon === "facebook" && (
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    )}
                    {social.icon === "linkedin" && (
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    )}
                  </svg>
                </a>
              ))}
            </div> */}

            {/* Legal */}
            {/* <div className="flex items-center gap-4 text-sm">
              <a
                href="#"
                className="text-gray-500 hover:text-teal-400 transition-colors"
              >
                Нууцлал
              </a>
              <span className="text-gray-700">•</span>
              <a
                href="#"
                className="text-gray-500 hover:text-teal-400 transition-colors"
              >
                Нөхцөл
              </a>
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  );
}
