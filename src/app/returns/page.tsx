
import {
Metadata
}
from"next";

import Link from"next/link";

import {
RefreshCw, ArrowRight
}
from"lucide-react";

export 
const metadata: Metadata = {
title:"Returns & Refunds Policy — Easy 30-Day Returns", description:"FamilyFans offers hassle-free 30-day returns on all products. Free return shipping, fast refunds within 3–5 days, and no questions asked on any order.", keywords: ["FamilyFans returns","return policy","refund policy","easy returns","30 day return"], alternates: {
canonical:"https://FamilyFans.com/returns"
}
, openGraph: {
title:"Returns & Refunds Policy | FamilyFans", description:"Hassle-free 30-day returns with free shipping and fast refunds.", url:"https://FamilyFans.com/returns", type:"website", images: [{
url:"/og-image.jpg", width: 1200, height: 630
}
],
}
,
}
;

export default 
function ReturnsPage() {

return ( <div className="max-w-3xl mx-auto px-4 md:px-6 py-10"> <nav className="text-sm text-[var(--muted-text)] mb-6 flex items-center gap-2"> <Link href="/" className="hover:text-[var(--foreground)] transition-colors">Home</Link> <span>/</span> <span className="text-[var(--foreground)] font-medium">Returns & Refunds</span> </nav> <div className="flex items-center gap-2 mb-2"> <RefreshCw className="w-5 h-5 text-[var(--highlight)]" /> <span className="text-xs uppercase tracking-widest font-semibold text-[var(--highlight)]">Hassle-free</span> </div> <h1 className="text-3xl md:text-4xl font-bold mb-3" style={{
fontFamily:"var(--font-inter)"
}

}
>Returns & Refunds</h1> <p className="text-[var(--muted-text)] mb-10">We stand behind our products. If you're not satisfied, we'll make it right.</p> <div className="grid grid-cols-3 gap-4 mb-10"> {[{
v:"30 Days", l:"Return window"
}
, {
v:"Free", l:"Return shipping"
}
, {
v:"3–5 Days", l:"Refund time"
}
].map(({
v, l
}
) => ( <div key={l
}
className="border border-[var(--border)] rounded-xl p-4 text-center"> <p className="text-2xl font-bold mb-1">{v
}
</p> <p className="text-xs text-[var(--muted-text)]">{l
}
</p> </div> ))
}
</div> <div className="space-y-8"> <section> <h2 className="text-xl font-bold mb-3" style={{
fontFamily:"var(--font-inter)"
}

}
>Return Eligibility</h2> <ul className="space-y-2 text-sm text-[var(--muted-text)]"> {["Items must be returned within 30 days of delivery.","Products must be in original, unused condition and packaging.","Proof of purchase (order number or receipt) required.","Clearance items and open‑box products are final sale."].map(item => ( <li key={item
}
className="flex items-start gap-2"><span className="text-green-500 font-bold mt-0.5">✓</span>{item
}
</li> ))
}
</ul> </section> <section> <h2 className="text-xl font-bold mb-3" style={{
fontFamily:"var(--font-inter)"
}

}
>How to Start a Return</h2> <ol className="space-y-3 text-sm"> {["Email returns@FamilyFans.com with your order number and reason.","We'll send a prepaid return shipping label within 24 hours.","Pack the item securely and drop it at any courier location.","Once received, your refund is processed in 3–5 business days.", ].map((step, i) => ( <li key={i
}
className="flex items-start gap-3"> <span className="w-5 h-5 rounded-full bg-[var(--foreground)] text-white text-xs flex items-center justify-center flex-shrink-0 font-bold">{i + 1
}
</span> {step
}
</li> ))
}
</ol> </section> <section> <h2 className="text-xl font-bold mb-3" style={{
fontFamily:"var(--font-inter)"
}

}
>Refund Methods</h2> <p className="text-sm text-[var(--muted-text)]"> Refunds are issued to the original payment method. Credit card refunds appear within 3–5 business days. PayPal refunds are near-instant. Store credit is available if you prefer. </p> </section> </div> <div className="mt-10 flex gap-3"> <Link href="/contact" className="btn-secondary !text-sm !py-2 inline-flex">Contact Support</Link> <Link href="/faq" className="btn-primary !text-sm !py-2 inline-flex"> View FAQ <ArrowRight className="w-4 h-4" /> </Link> </div> </div> );
}
