
import {
Metadata
}
from"next";

import Link from"next/link";

import {
LifeBuoy, Package, RefreshCw, Truck, CreditCard, ChevronRight
}
from"lucide-react";

export 
const metadata: Metadata = {
title:"Help Center — Support & How-to Guides | FamilyFans", description:"Find help articles, how-to guides, and support resources for your FamilyFans fans and heaters. Answers to setup, troubleshooting, and care questions.", keywords: ["FamilyFans help","product support","how to","troubleshooting","setup guide"], alternates: {
canonical:"https://FamilyFans.com/help"
}
, openGraph: {
title:"Help Center | FamilyFans", description:"Support articles, setup guides, and troubleshooting for FamilyFans products.", url:"https://FamilyFans.com/help", type:"website", images: [{
url:"/og-image.jpg", width: 1200, height: 630
}
],
}
,
}
;

const HELP_CATEGORIES = [ {
icon: Package, title:"Orders & Tracking", desc:"Track, modify, or cancel your order", href:"/track-order"
}
, {
icon: Truck, title:"Shipping", desc:"Delivery times, rates, and policies", href:"/shipping"
}
, {
icon: RefreshCw, title:"Returns & Refunds", desc:"How to start a return or get a refund", href:"/returns"
}
, {
icon: LifeBuoy, title:"Product Setup", desc:"Installation and getting started guides", href:"/faq"
}
, {
icon: CreditCard,title:"Payments & Billing", desc:"Payment methods, receipts, and invoices", href:"/faq"
}
, ];

export default 
function HelpPage() {

return ( <div className="max-w-4xl mx-auto px-4 md:px-6 py-10"> <nav className="text-sm text-[var(--muted-text)] mb-6 flex items-center gap-2"> <Link href="/" className="hover:text-[var(--foreground)] transition-colors">Home</Link> <span>/</span> <span className="text-[var(--foreground)] font-medium">Help Center</span> </nav> <h1 className="text-3xl md:text-4xl font-bold mb-3 text-center" style={{
fontFamily:"var(--font-inter)"
}

}
> How can we help? </h1> <p className="text-[var(--muted-text)] text-center mb-10 max-w-md mx-auto"> Find answers quickly or contact our team for personalized support. </p> <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12"> {HELP_CATEGORIES.map(({
icon: Icon, title, desc, href
}
) => ( <Link key={title
}
href={href
}
className="flex items-start gap-4 p-5 border border-[var(--border)] rounded-xl hover:border-[var(--foreground)] transition-colors group"> <div className="w-10 h-10 bg-[var(--muted)] rounded-md flex items-center justify-center flex-shrink-0"> <Icon className="w-5 h-5 text-[var(--muted-text)]" /> </div> <div className="flex-grow min-w-0"> <p className="font-semibold text-sm">{title
}
</p> <p className="text-xs text-[var(--muted-text)] mt-0.5">{desc
}
</p> </div> <ChevronRight className="w-4 h-4 text-[var(--muted-text)] flex-shrink-0 self-center group-hover:text-[var(--foreground)] transition-colors" /> </Link> ))
}
</div> <div className="bg-[var(--muted)] rounded-2xl p-8 text-center"> <h2 className="text-lg font-bold mb-2" style={{
fontFamily:"var(--font-inter)"
}

}
>Still need help?</h2> <p className="text-sm text-[var(--muted-text)] mb-5">Our support team typically responds within 2 hours.</p> <div className="flex gap-3 justify-center"> <Link href="/contact" className="btn-primary !text-sm !py-2.5">Contact Support</Link> <Link href="/faq" className="btn-secondary !text-sm !py-2.5">View FAQ</Link> </div> </div> </div> );
}
