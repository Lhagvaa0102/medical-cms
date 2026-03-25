import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-100 border-t border-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="text-sm font-semibold text-teal-400 tracking-widest uppercase mb-4">
              About POSM
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              Committed to excellence in pediatric orthopedic care, education,
              and research.
            </p>
            <a
              href="https://www.google.com/maps/place/%D0%93%D1%8D%D0%BC%D1%82%D1%8D%D0%BB+%D0%A1%D0%BE%D0%https://www.google.com/maps/place/%D0%93%D1%8D%D0%BC%D1%82%D1%8D%D0%BB+%D0%A1%D0%BE%D0%B3%D0%BE%D0%B3+%D0%A1%D1%83%D0%B4%D0%BB%D0%B0%D0%BB%D1%8B%D0%BD+%D2%AE%D0%BD%D0%B4%D1%8D%D1%81%D0%BD%D0%B8%D0%B9+%D0%A2%D3%A9%D0%B2/@47.9199085,106.8558276,628m/data=!3m2!1e3!4b1!4m6!3m5!1s0x5d9692dbcf2c28bd:0x67f1ac453e14d01!8m2!3d47.9199085!4d106.8584079!16s%2Fg%2F1tlvp86c?entry=ttu&g_ep=EgoyMDI2MDIyMy4wIKXMDSoASAFQAw%3D%3DB3%D0%BE%D0%B3+%D0%A1%D1%83%D0%B4%D0%BB%D0%B0%D0%BB%D1%8B%D0%BD+%D2%AE%D0%BD%D0%B4%D0%B5%D1%81%D0%BD%D0%B8%D0%B9+%D0%A2%D3%A9%D0%B2/@47.9199085,106.8202991,5027m"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-teal-400 hover:text-teal-300 transition-colors font-medium"
            >
              Гэмтэл согог судлалын үндэсний төв
            </a>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-teal-400 tracking-widest uppercase mb-4">
              Resources
            </h3>
            <ul className="space-y-2">
              {["Research", "Education", "Conditions", "Guidelines"].map(
                (link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-gray-400 hover:text-teal-400 transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-teal-400 tracking-widest uppercase mb-4">
              Membership
            </h3>
            <ul className="space-y-2">
              {["Join POSNA", "Member Login", "Benefits", "Events"].map(
                (link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-gray-400 hover:text-teal-400 transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-teal-400 tracking-widest uppercase mb-4">
              Contact
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                  Email
                </p>
                <a
                  href="mailto:info@posna.org"
                  className="text-sm text-teal-400 hover:text-teal-300 transition-colors font-medium"
                >
                  mgltrauma.ped@gmail.com
                </a>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                  Phone
                </p>
                <a
                  href="tel:+1234567890"
                  className="text-sm text-gray-400 hover:text-teal-400 transition-colors"
                >
                  +1 (234) 567-890
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-500">
              <p>
                © {currentYear} Pediatric Orthopedic Society of Mongolia. All
                rights reserved.
              </p>
            </div>

            <div className="flex items-center gap-5">
              {[
                { name: "LinkedIn", icon: "linkedin" },
                { name: "Twitter", icon: "twitter" },
                { name: "Facebook", icon: "facebook" },
              ].map((social) => (
                <a
                  key={social.name}
                  href="#"
                  aria-label={social.name}
                  className="text-gray-500 hover:text-teal-400 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {social.icon === "linkedin" && (
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    )}
                    {social.icon === "twitter" && (
                      <path d="M23.953 4.57a10 10 0 002.856-3.37 9.958 9.958 0 01-2.825.856 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    )}
                    {social.icon === "facebook" && (
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    )}
                  </svg>
                </a>
              ))}
            </div>

            {/* Legal Links */}
            <div className="flex items-center gap-4 text-sm">
              <a
                href="#"
                className="text-gray-500 hover:text-teal-400 transition-colors"
              >
                Privacy
              </a>
              <span className="text-gray-700">•</span>
              <a
                href="#"
                className="text-gray-500 hover:text-teal-400 transition-colors"
              >
                Terms
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
