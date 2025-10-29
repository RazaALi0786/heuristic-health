import Link from "next/link";
import { Briefcase, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-white/10">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">
                Heuristic Health
              </span>
            </Link>
            <p className="text-sm text-white/80">
              Delivering trusted medical solutions and innovations that improve
              patient care worldwide.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { href: "/", label: "Home" },
                { href: "/solutions", label: "Solutions" },
                { href: "/contact", label: "Contact" },
                { href: "/careers", label: "Careers" },
              ].map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.href}
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Resources</h3>
            <ul className="space-y-2">
              {[
                { href: "/about", label: "About Us" },
                { href: "/privacy", label: "Privacy Policy" },
                { href: "/terms", label: "Terms of Use" },
                { href: "/sitemap", label: "Site Map" },
              ].map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.href}
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Contact Us</h3>
            <ul className="space-y-3 text-white/80">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-white" />
                <span className="text-sm">info@terumo.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-white" />
                <span className="text-sm">+1 (800) 555-TERU</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-white" />
                <span className="text-sm">Global Presence</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-white/20 pt-8 text-center text-sm text-white/70">
          <p>
            &copy; {new Date().getFullYear()} Heuristic Health. All rights
            reserved. | Disclaimer | Privacy Policy | Terms of Use | Supplier
            Conditions | Cookie Settings
          </p>
        </div>
      </div>
    </footer>
  );
}
