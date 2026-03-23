
import {
    Metadata
}
    from "next";

import Link from "next/link";

import {
    HelpCircle, ChevronDown
}
    from "lucide-react";

export
    const metadata: Metadata = {
        title: "Frequently Asked Questions — FAQs | FamilyFans", description: "Find answers to the most common questions about FamilyFans fans and heaters, including shipping, returns, warranties, installation, and product care.", keywords: ["FamilyFans faq", "fan questions", "heater questions", "FamilyFans help", "returns policy question"], alternates: {
            canonical: "https://FamilyFans.com/faq"
        }
        , openGraph: {
            title: "Frequently Asked Questions | FamilyFans", description: "Answers to common questions about shipping, returns, and product care.", url: "https://FamilyFans.com/faq", type: "website", images: [{
                url: "/og-image.jpg", width: 1200, height: 630
            }
            ],
        }
        ,
    }
    ;

const FAQS = [{
    category: "Orders & Shipping", items: [{
        q: "How long does shipping take?", a: "Standard shipping takes 3–5 business days. Express 1–2 business days. Free shipping on orders over $50."
    }
        , {
        q: "Can I change or cancel my order?", a: "You can cancel your order within 2 hours of placing it. After that, contact support and we'll do our best to help."
    }

        ,],
}
    , {
    category: "Returns & Refunds", items: [{
        q: "What is your return policy?", a: "We offer a 30-day no-questions-asked return policy. Items must be in original condition."
    }
        , {
        q: "How long until I get my refund?", a: "Refunds are processed within 3–5 business days after we receive the returned item."
    }
        , {
        q: "Is the return shipping free?", a: "Yes, return shipping is free for all orders within the US."
    }
        ,],
}
    , {
    category: "Products", items: [{
        q: "Are your fans Energy Star certified?", a: "Yes, all FamilyFans fans and heaters are Energy Star certified for maximum efficiency."
    }
        , {
        q: "What warranty comes with my purchase?", a: "All products include a 2-year manufacturer's warranty covering defects and malfunctions."
    }
        , {
        q: "Can I use your heaters safely overnight?", a: "Yes. All our heaters have auto-shutoff, tip-over protection, and overheat protection built in."
    }
        ,],
}
    ,];

export default
    function FAQPage() {

    return (<div className="max-w-3xl mx-auto px-4 md:px-6 py-10"> <nav className="text-sm text-[var(--muted-text)] mb-6 flex items-center gap-2"> <Link href="/" className="hover:text-[var(--foreground)] transition-colors">Home</Link> <span>/</span> <span className="text-[var(--foreground)] font-medium">FAQ</span> </nav> <div className="flex items-center gap-2 mb-2"> <HelpCircle className="w-5 h-5 text-[var(--highlight)]" /> <span className="text-xs uppercase tracking-widest font-semibold text-[var(--highlight)]">Answers</span> </div> <h1 className="text-3xl md:text-4xl font-bold mb-3" style={{
        fontFamily: "var(--font-inter)"
    }

    }
    > Frequently Asked Questions </h1> <p className="text-[var(--muted-text)] mb-10"> Can't find your answer? <Link href="/contact" className="text-[var(--highlight)] hover:underline">Contact our support team</Link>. </p> <div className="space-y-10"> {FAQS.map(section => (<div key={section.category
    }
    > <h2 className="text-lg font-bold mb-4 pb-3 border-b border-[var(--border)]" style={{
        fontFamily: "var(--font-inter)"
    }

    }
    > {section.category
            }
        </h2> <div className="space-y-1"> {section.items.map(({
            q, a
        }
        ) => (<details key={q
        }
            className="group border border-[var(--border)] rounded-xl overflow-hidden"> <summary className="flex items-center justify-between px-5 py-4 cursor-pointer font-medium text-sm list-none hover:bg-[var(--muted)] transition-colors"> {q
            }
                <ChevronDown className="w-4 h-4 text-[var(--muted-text)] group-open:rotate-180 transition-transform flex-shrink-0 ml-4" /> </summary> <div className="px-5 pb-4 text-sm text-[var(--muted-text)] leading-relaxed">{a
                }
            </div> </details>))
        }
        </div> </div>))
    }
        </div> <div className="mt-12 bg-[var(--muted)] rounded-xl p-6 text-center"> <h2 className="font-bold mb-2" style={{
            fontFamily: "var(--font-inter)"
        }

        }
        >Still need help?</h2> <p className="text-sm text-[var(--muted-text)] mb-4">Our team is available 7 days a week.</p> <Link href="/contact" className="btn-primary !text-sm !py-2.5 !px-6 inline-flex">Contact Support</Link> </div> </div>);
}
