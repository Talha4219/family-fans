import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Instagram,
  Twitter,
  Zap,
  Globe,
  Mail,
  Headset,
  Phone,
  MapPin,
} from "lucide-react";
export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-white border-t border-[var(--border)] pt-20 pb-10">
      {" "}
      <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        {" "}
        {/* Brand Column */}{" "}
        <div className="space-y-6">
          {" "}
          <Link href="/" className="group block">
            <Image
              src="/Logo.png"
              alt="FamilyFans Logo"
              width={160}
              height={50}
              className="h-16 w-auto object-contain"
            />
          </Link>{" "}
          <p className="text-sm text-[var(--muted-text)] leading-relaxed max-w-xs">
            {" "}
            Providing premium home technology solutions for modern living since
            2018. Efficient, quiet, and beautiful.{" "}
          </p>{" "}
          
          <div className="pt-2 flex flex-col gap-3">
            <span className="text-[10px] sm:text-xs text-[var(--muted-text)] font-black uppercase tracking-widest">Certified By</span>
            <div className="flex flex-wrap items-center gap-3">
               <div className="bg-slate-50 border border-slate-100 p-2 rounded-xl flex items-center justify-center">
                 <Image src="/logos/neeca.png" alt="NEECA" width={60} height={30} className="h-6 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity" />
               </div>
               <div className="bg-slate-50 border border-slate-100 p-2 rounded-xl flex items-center justify-center">
                 <Image src="/logos/pcsir.png" alt="PCSIR" width={60} height={30} className="h-6 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity" />
               </div>
               <div className="bg-slate-50 border border-slate-100 p-2 rounded-xl flex items-center justify-center">
                 <Image src="/logos/psqca.png" alt="PSQCA" width={60} height={30} className="h-6 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity" />
               </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {" "}
            {[
              { Icon: Facebook, href: "https://facebook.com/familyfans" },
              { Icon: Instagram, href: "https://instagram.com/familyfans" },
              {
                Icon: ({ className }: { className?: string }) => (
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className={className}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.617a8.13 8.13 0 0 0 5.373 1.933V7.12a4.797 4.797 0 0 1-1.603-.434z" />
                  </svg>
                ),
                href: "https://tiktok.com/@familyfans"
              },
            ].map(({ Icon, href }, i) => (
              <Link
                key={i}
                href={href}
                target="_blank"
                className="w-8 h-8 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--muted-text)] hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] transition-all"
              >
                {" "}
                <Icon className="w-4 h-4" />{" "}
              </Link>
            ))}{" "}
          </div>{" "}
        </div>{" "}
        {/* Quick Links */}{" "}
        <div className="space-y-6">
          {" "}
          <h4 className="text-sm font-black uppercase tracking-widest text-[var(--foreground)]">
            Quick Links
          </h4>{" "}
          <nav className="flex flex-col gap-3">
            {" "}
            {[
              { href: "/shop", label: "Shop All" },
              { href: "/about", label: "About Us" },
              { href: "/blog", label: "Blogs" },
              { href: "/certificates", label: "Certifications" },
              { href: "/contact", label: "Contact Us" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-sm font-medium text-[var(--muted-text)] hover:text-[var(--color-primary)] transition-colors w-fit"
              >
                {" "}
                {label}{" "}
              </Link>
            ))}{" "}
          </nav>{" "}
        </div>{" "}
        {/* Support */}{" "}
        <div className="space-y-6">
          {" "}
          <h4 className="text-sm font-black uppercase tracking-widest text-[var(--foreground)]">
            Support
          </h4>{" "}
          <nav className="flex flex-col gap-3">
            {" "}
            {[
              { href: "/faq", label: "FAQ / Help" },
              { href: "/track-order", label: "Order Tracking" },
              { href: "/shipping", label: "Shipping Policy" },
              { href: "/returns", label: "Returns & Refunds" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-sm font-medium text-[var(--muted-text)] hover:text-[var(--color-primary)] transition-colors w-fit"
              >
                {" "}
                {label}{" "}
              </Link>
            ))}{" "}
          </nav>{" "}
        </div>{" "}
        {/* Contact */}{" "}
        <div className="space-y-6">
          {" "}
          <h4 className="text-sm font-black uppercase tracking-widest text-[var(--foreground)]">
            Contact
          </h4>{" "}
          <ul className="space-y-4">
            {" "}
            <li className="flex items-start gap-3 group">
              {" "}
              <MapPin className="w-4 h-4 text-[var(--color-primary)] mt-1 flex-shrink-0" />{" "}
              <a
                href="https://www.google.com/maps/search/?api=1&query=45HW%2BXG5%20Rana%20Colony%20Kangniwala%20Gujranwala"
                target="_blank"
                className="text-sm text-[var(--muted-text)] hover:text-[var(--color-primary)] transition-colors"
              >
                45HW+XG5, Rana Colony Kangniwala, Gujranwala
              </a>{" "}
            </li>{" "}
            <li className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[var(--color-primary)] flex-shrink-0" />{" "}
                <div className="flex flex-col gap-1">
                  <a href="tel:+92554271684" className="text-sm text-[var(--muted-text)] hover:text-[var(--color-primary)] transition-colors">
                    +92 55 427 1684
                  </a>{" "}
                  <a href="tel:03466140730" className="text-sm text-[var(--muted-text)] hover:text-[var(--color-primary)] transition-colors">
                    03466140730
                  </a>{" "}
                </div>
              </div>{" "}
            </li>{" "}
            <li className="flex items-center gap-3">
              {" "}
              <Mail className="w-4 h-4 text-[var(--color-primary)] flex-shrink-0" />{" "}
              <a href="mailto:info@familyfans.net" className="text-sm text-[var(--muted-text)] hover:text-[var(--color-primary)] transition-colors">
                info@familyfans.net
              </a>{" "}
            </li>{" "}
          </ul>{" "}

          <div className="pt-4">
            <h4 className="text-[10px] sm:text-xs text-[var(--muted-text)] font-black uppercase tracking-widest mb-3">Our Location</h4>
            <div className="w-full h-36 bg-slate-100 rounded-2xl overflow-hidden border border-[var(--border)] relative group">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13540.669818817757!2d74.20165565!3d32.1102946!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391f29ce2723c313%3A0xe5479008bc50d24e!2sGujranwala%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 grayscale group-hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </div>
        </div>{" "}
      </div>{" "}
      {/* Bottom Bar */}{" "}
      <div className="border-t border-[var(--border)] pt-8">
        {" "}
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          {" "}
          <div className="text-[10px] sm:text-xs text-[var(--muted-text)] font-medium">
            {" "}
            © {currentYear} FamilyFans Electronics Inc. All rights
            reserved.{" "}
          </div>{" "}
          <div className="flex items-center gap-6">
            {" "}
            <Link
              href="/privacy"
              className="text-[10px] sm:text-xs text-[var(--muted-text)] hover:text-[var(--foreground)] transition-colors font-medium"
            >
              Privacy Policy
            </Link>{" "}
            <Link
              href="/terms"
              className="text-[10px] sm:text-xs text-[var(--muted-text)] hover:text-[var(--foreground)] transition-colors font-medium"
            >
              Terms of Service
            </Link>{" "}
          </div>{" "}
          <div className="flex items-center gap-4 text-[var(--muted-text)]">
            {" "}
            {/* <Globe className="w-4 h-4 hover:text-[var(--color-primary)] cursor-pointer" />{" "}
            <Mail className="w-4 h-4 hover:text-[var(--color-primary)] cursor-pointer" />{" "}
            <Headset className="w-4 h-4 hover:text-[var(--color-primary)] cursor-pointer" />{" "} */}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </footer>
  );
}
