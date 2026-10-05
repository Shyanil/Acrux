"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Download, Check, Phone } from "lucide-react";

export default function ThankYouPage() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("acrux_brochure_access") !== "granted") {
      router.replace("/#enquire");
      return;
    }
    setAuthorized(true);
  }, [router]);

  if (!authorized) return <main className="thank-you-page" aria-busy="true" />;

  return (
    <main className="thank-you-page">
      <div className="thank-you-shell">
        <section className="thank-you-content">
          <Image className="thank-you-logo" src="/assets/Aakaar Logo.webp" alt="Acrux Aakaar" width={170} height={70} priority />
          <div className="thank-you-status"><span><Check size={15} /></span> Enquiry received</div>
          <h1>Thank you.<br /><em>Your journey begins here.</em></h1>
          <p className="thank-you-copy">Your interest has been registered successfully. A member of the Acrux Aakaar team will connect with you shortly to understand your requirements.</p>

          <div className="thank-you-brochure">
            <div><small>YOUR COPY IS READY</small><strong>Official Project Brochure</strong><span>Plans, amenities, specifications and project details.</span></div>
            <a className="thank-you-download" href="/brochure.pdf" download="Acrux-Aakaar-Brochure.pdf" aria-label="Download the official Acrux Aakaar brochure">
              <Download size={19} /><span>Download brochure</span>
            </a>
          </div>

          <div className="thank-you-actions">
            <Link className="thank-you-back" href="/"><ArrowLeft size={15} /> Return to website</Link>
            <a className="thank-you-call" href="tel:+919777543339"><Phone size={14} /> +91 97775 43339</a>
          </div>
        </section>

        <aside className="thank-you-visual" aria-label="Acrux Aakaar project">
          <Image src="/assets/Project/Master_Elevation.webp" alt="Acrux Aakaar residences" fill sizes="(max-width: 800px) 100vw, 44vw" priority />
          <div className="thank-you-visual-shade" />
          <div className="thank-you-visual-copy">
            <span>PATIA · BHUBANESWAR</span>
            <h2>A home above<br />the everyday.</h2>
            <div className="thank-you-project-stats"><span><strong>2.5 &amp; 3</strong>BHK residences</span><span><strong>60%</strong>Open space</span></div>
            <Link href="/#location">Explore the location <ArrowRight size={16} /></Link>
          </div>
        </aside>
      </div>
    </main>
  );
}
