"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft, Download, Check } from "lucide-react";

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
      <div className="thank-you-card">
        <Image src="/assets/Aakaar Logo.webp" alt="Acrux Aakaar" width={160} height={65} priority />
        <span className="thank-you-icon"><Check size={24} /></span>
        <p className="thank-you-eyebrow">ENQUIRY RECEIVED</p>
        <h1>Thank you for your interest.</h1>
        <p className="thank-you-copy">Our team will connect with you shortly. Your official Acrux Aakaar project brochure is now ready.</p>
        <a className="thank-you-download" href="/brochure.pdf" download="Acrux-Aakaar-Brochure.pdf">
          <Download size={18} /> Download the brochure
        </a>
        <Link className="thank-you-back" href="/"><ArrowLeft size={16} /> Return to the website</Link>
      </div>
    </main>
  );
}
