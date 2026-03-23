
import {
Metadata
}
from"next";

import Link from"next/link";

export 
const metadata: Metadata = {
title:"Cookie Policy — How We Use Cookies | FamilyFans", description:"Learn how FamilyFans uses cookies and similar tracking technologies on its website. Manage your cookie preferences and learn about GDPR compliance.", alternates: {
canonical:"https://FamilyFans.com/cookies"
}
, openGraph: {
title:"Cookie Policy | FamilyFans", description:"How FamilyFans uses cookies and how to manage them.", type:"website"
}
,
}
;

const COOKIES = [ {
name:"Essential Cookies", purpose:"Required for the website to function — cart, session, and security tokens.", canDisable: false
}
, {
name:"Analytics Cookies", purpose:"Google Analytics — helps us understand how visitors use our site. No personal data stored.", canDisable: true
}
, {
name:"Marketing Cookies", purpose:"Used for retargeted advertising on platforms like Meta and Google Ads.", canDisable: true
}
, {
name:"Preference Cookies", purpose:"Saves your preferences such as currency, language, and region.", canDisable: true
}
, ];

export default 
function CookiesPage() {

return ( <div className="max-w-3xl mx-auto px-4 md:px-6 py-10"> <nav className="text-sm text-[var(--muted-text)] mb-6 flex items-center gap-2"> <Link href="/" className="hover:text-[var(--foreground)] transition-colors">Home</Link> <span>/</span> <span className="text-[var(--foreground)] font-medium">Cookie Policy</span> </nav> <h1 className="text-3xl md:text-4xl font-bold mb-3" style={{
fontFamily:"var(--font-inter)"
}

}
>Cookie Policy</h1> <p className="text-sm text-[var(--muted-text)] mb-8">Last updated: March 14, 2026</p> <p className="text-[var(--muted-text)] mb-10">FamilyFans uses cookies to improve your browsing experience, analyze traffic, and personalize content. This page explains what cookies we use and how you can control them.</p> <div className="border border-[var(--border)] rounded-xl overflow-hidden mb-10"> <table className="w-full text-sm"> <thead> <tr className="bg-[var(--muted)] border-b border-[var(--border)]"> <th className="text-left px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-[var(--muted-text)]">Type</th> <th className="text-left px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-[var(--muted-text)]">Purpose</th> <th className="text-left px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-[var(--muted-text)]">Optional?</th> </tr> </thead> <tbody className="divide-y divide-[var(--border)]"> {COOKIES.map(c => ( <tr key={c.name
}
className="hover:bg-[var(--muted)] transition-colors"> <td className="px-5 py-4 font-medium">{c.name
}
</td> <td className="px-5 py-4 text-[var(--muted-text)]">{c.purpose
}
</td> <td className="px-5 py-4"> <span className={`text-xs font-semibold px-2 py-1 rounded-full ${c.canDisable ?"bg-blue-50 text-blue-700" :"bg-[var(--muted)] text-[var(--muted-text)]"
}
`
}
> {c.canDisable ?"Optional" :"Required"
}
</span> </td> </tr> ))
}
</tbody> </table> </div> <section className="space-y-4"> <h2 className="text-xl font-bold" style={{
fontFamily:"var(--font-inter)"
}

}
>Managing Your Preferences</h2> <p className="text-sm text-[var(--muted-text)]">You can manage cookie preferences via the cookie banner that appears on your first visit, your browser settings, or by contacting <a href="mailto:privacy@FamilyFans.com" className="text-[var(--highlight)] hover:underline">privacy@FamilyFans.com</a>.</p> <p className="text-sm text-[var(--muted-text)]">Disabling optional cookies will not affect your ability to shop. Essential cookies cannot be disabled as they are required for the site to function.</p> </section> <div className="mt-10 flex gap-3"> <Link href="/privacy" className="btn-secondary !text-sm !py-2">Privacy Policy</Link> <Link href="/terms" className="btn-secondary !text-sm !py-2">Terms & Conditions</Link> </div> </div> );
}
