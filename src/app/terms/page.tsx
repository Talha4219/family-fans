
import {
Metadata
}
from"next";

import Link from"next/link";

export 
const metadata: Metadata = {
title:"Terms & Conditions — User Agreement | FamilyFans", description:"Read FamilyFans's Terms and Conditions. These terms govern your use of our website and services, including purchase, returns, and intellectual property rights.", alternates: {
canonical:"https://FamilyFans.com/terms"
}
, openGraph: {
title:"Terms & Conditions | FamilyFans", description:"Terms governing use of the FamilyFans website and services.", url:"https://FamilyFans.com/terms", type:"website",
}
,
}
;

const SECTIONS = [ {
title:"1. Acceptance of Terms", body:"By accessing or using the FamilyFans website, you agree to be bound by these Terms and Conditions. If you disagree with any part, please do not use our service."
}
, {
title:"2. Products & Pricing", body:"All product descriptions, images, and pricing are subject to change without notice. We reserve the right to limit quantities, refuse or cancel orders at our discretion."
}
, {
title:"3. Orders & Payment", body:"By placing an order, you represent that you are at least 18 years old and legally able to enter into contracts. Payment is processed at the time of order. We accept major credit cards, PayPal, and other payment methods listed at checkout."
}
, {
title:"4. Shipping & Delivery", body:"Delivery times are estimates and not guaranteed. Risk of loss and title pass to you upon delivery to the carrier. See our full Shipping Policy for details."
}
, {
title:"5. Returns & Refunds", body:"Our 30-day return policy is described in full in our Returns Policy. Clearance items are final sale. We reserve the right to refuse returns that do not meet our policy conditions."
}
, {
title:"6. Intellectual Property", body:"All content on this site — including text, graphics, logos, and product images — is the property of FamilyFans Inc. and protected by copyright law. You may not reproduce or distribute without our written permission."
}
, {
title:"7. Limitation of Liability", body:"FamilyFans is not liable for any indirect, incidental, or consequential damages arising from your use of our products or website. Our total liability is limited to the purchase price of the product in question."
}
, {
title:"8. Governing Law", body:"These terms are governed by the laws of the State of California, United States. Any disputes shall be resolved in the courts of San Francisco County, California."
}
, ];

export default 
function TermsPage() {

return ( <div className="max-w-3xl mx-auto px-4 md:px-6 py-10"> <nav className="text-sm text-[var(--muted-text)] mb-6 flex items-center gap-2"> <Link href="/" className="hover:text-[var(--foreground)] transition-colors">Home</Link> <span>/</span> <span className="text-[var(--foreground)] font-medium">Terms & Conditions</span> </nav> <h1 className="text-3xl md:text-4xl font-bold mb-3" style={{
fontFamily:"var(--font-inter)"
}

}
>Terms & Conditions</h1> <p className="text-sm text-[var(--muted-text)] mb-10">Last updated: March 14, 2026</p> <p className="text-[var(--muted-text)] mb-8">Please read these Terms carefully before using FamilyFans&apos;s website or placing an order.</p> <div className="space-y-8"> {SECTIONS.map(({
title, body
}
) => ( <section key={title
}
> <h2 className="text-lg font-bold mb-2" style={{
fontFamily:"var(--font-inter)"
}

}
>{title
}
</h2> <p className="text-sm text-[var(--muted-text)] leading-relaxed">{body
}
</p> </section> ))
}
</div> <div className="mt-12 flex gap-3 flex-wrap"> <Link href="/privacy" className="btn-secondary !text-sm !py-2">Privacy Policy</Link> <Link href="/returns" className="btn-secondary !text-sm !py-2">Returns Policy</Link> </div> </div> );
}
