"use client";
import WaterCursor from "@/components/WaterCursor";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Check, ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Compass, Download, Maximize2, Menu, X, MapPin, Phone, Plus, Sparkles } from "lucide-react";
import { submitLeadClient } from "@/lib/leads-client";
const project = "/assets/Project/";
const gallery = [["Entrance_Dusk.webp", "An arrival to remember"], ["Master_Elevation.webp", "A new perspective on the city"], ["Rooftop_Sky_Lounge.webp", "Evenings above the everyday"], ["Zen_Pond.webp", "A moment of stillness"]];
const heroSlides = [
  {
    image: "Master_Elevation.webp",
    tag: "PATIA, BHUBANESWAR",
    title1: "Life, Beautifully",
    title2: "Shaped.",
    scene: "01 / THE ARCHITECTURE",
    desc: "305 thoughtfully designed residences across 2 distinctive 11-storey towers with 32% open spaces.",
    alt: "Acrux Aakaar iconic residential towers surrounded by landscaped gardens"
  },
  {
    image: "Entrance_Dusk.webp",
    tag: "PATIA, BHUBANESWAR",
    title1: "Arrive In Style.",
    title2: "Stay Inspired.",
    scene: "02 / THE ARRIVAL",
    desc: "An imposing double-height entrance gateway and exclusive G+3 clubhouse crafted for an elevated life.",
    alt: "The Aakaar grand entrance at dusk illuminated with ambient lighting"
  },
  {
    image: "Rooftop_Sky_Lounge.webp",
    tag: "PATIA, BHUBANESWAR",
    title1: "The City Below.",
    title2: "The Sky Above.",
    scene: "03 / THE SKY LOUNGE",
    desc: "Panoramic rooftop sky lounge and landscaped pergola terraces overlooking the city skyline.",
    alt: "Rooftop sky lounge with panoramic city views"
  },
  {
    image: "Entrance_Sunrise.webp",
    tag: "PATIA, BHUBANESWAR",
    title1: "Wake To Light.",
    title2: "Live In Full.",
    scene: "04 / THE RESIDENCES",
    desc: "Thoughtfully crafted 2.5 & 3 BHK residences with expansive balconies and tranquil open vistas.",
    alt: "Aakaar residences in the morning light"
  }
];
const heroSocials = [
  { label: "Facebook", href: "https://www.facebook.com/acruxrealcon03" },
  { label: "Instagram", href: "https://www.instagram.com/acrux_realcon/" },
  { label: "YouTube", href: "https://www.youtube.com/@acrux_realcon" },
];
function HeroSocialIcon({ label }: { label: string }) {
  if (label === "Facebook") return <svg viewBox="0 0 24 24" width="19" height="19" fill="currentColor" aria-hidden="true"><path d="M13.5 21v-8.1h2.8l.4-3.2h-3.2v-2c0-.9.3-1.5 1.6-1.5h1.7V3.3c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.2H7.3v3.2h2.8V21h3.4Z" /></svg>;
  if (label === "Instagram") return <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>;
  return <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true"><rect x="2" y="5" width="20" height="14" rx="4" stroke="currentColor" strokeWidth="1.8" /><path d="m10 9 5 3-5 3V9Z" fill="currentColor" /></svg>;
}
const amenities = [["Rooftop_Sky_Lounge.webp", "Sky lounge", "A little closer to the stars."], ["Podium_Garden.webp", "Podium gardens", "Room to wander. Space to breathe."], ["Zen_Pond.webp", "Zen pond", "Find your own quiet corner."], ["Rooftop_Pergola.webp", "Rooftop pergola", "Slow mornings. Unhurried evenings."], ["Central_Lawn.webp", "Central lawn", "More room for life outdoors."], ["Plaza_Blocks_AB.webp", "Community plaza", "Where neighbours become friends."], ["Plaza_Blocks_CD.webp", "Landscaped courtyards", "Sunlit avenues and tranquil walkways."]];

interface MasterPlanHotspot {
  id: number;
  num: string;
  name: string;
  tag: string;
  type: string;
  desc: string;
  x: number;
  y: number;
}

const masterPlanHotspots: MasterPlanHotspot[] = [
  {
    id: 1,
    num: "01",
    name: "Block A1",
    tag: "B+S+P+17",
    type: "Residential Tower",
    desc: "Luxury 2.5 & 3 BHK residences overlooking the landscaped central court.",
    x: 22.2,
    y: 52.8,
  },
  {
    id: 2,
    num: "02",
    name: "Block A2",
    tag: "B+S+P+17",
    type: "Residential Tower",
    desc: "Corner residences with dual aspect balconies and panoramic northern views.",
    x: 31.4,
    y: 47.8,
  },
  {
    id: 3,
    num: "03",
    name: "Block B1",
    tag: "B+S+21",
    type: "Residential Tower",
    desc: "High-rise residences with expansive views across the Daya West Canal promenade.",
    x: 24.8,
    y: 65.8,
  },
  {
    id: 4,
    num: "04",
    name: "Block B2",
    tag: "B+S+21",
    type: "Residential Tower",
    desc: "Elevated tower living oriented for maximum daylight and natural ventilation.",
    x: 35.8,
    y: 65.8,
  },
  {
    id: 5,
    num: "05",
    name: "Block C",
    tag: "B+S+21",
    type: "Residential Tower",
    desc: "Central tower commanding direct views over the community greens & clubhouse.",
    x: 56.0,
    y: 49.0,
  },
  {
    id: 6,
    num: "06",
    name: "Block D",
    tag: "B+S+21",
    type: "Residential Tower",
    desc: "High-rise living flanked by tranquil water bodies and landscaped walkways.",
    x: 66.5,
    y: 53.0,
  },
  {
    id: 7,
    num: "07",
    name: "Block E",
    tag: "B+S+21",
    type: "Residential Tower",
    desc: "East-wing residences nestled in quiet privacy with dedicated peripheral driveways.",
    x: 78.0,
    y: 47.5,
  },
  {
    id: 8,
    num: "08",
    name: "Clubhouse",
    tag: "G+3 Floors",
    type: "Club & Amenities",
    desc: "Exclusive G+3 lifestyle club with fitness studio, banquet, theatre & swimming pool.",
    x: 53.2,
    y: 61.8,
  },
  {
    id: 9,
    num: "09",
    name: "Central Courtyard",
    tag: "Podium Garden",
    type: "Landscape & Leisure",
    desc: "Pedestrian-safe landscaped garden with amphitheatre, walking paths & pergolas.",
    x: 29.5,
    y: 56.5,
  },
  {
    id: 10,
    num: "10",
    name: "Grand Entry Boulevard",
    tag: "12.19m Wide",
    type: "Access & Security",
    desc: "Grand boulevard entrance providing smooth vehicular access and manned security.",
    x: 18.2,
    y: 76.5,
  },
];
const nav = [["Overview", "overview"], ["Residences", "residences"], ["Amenities", "amenities"], ["Gallery", "gallery"], ["Location", "location"]];
function Picture({ src, alt, className = "", priority = false }: { src: string; alt: string; className?: string; priority?: boolean }) { return <div className={`picture ${className}`}><Image src={src} alt={alt} fill sizes="(max-width: 700px) 100vw, 75vw" className="picture-image" priority={priority} /></div>; }
function StatCounter({
  target,
  prefix = "",
  suffix = "",
  duration = 3000,
  holdTime = 3000,
  shouldStart = false,
}: {
  target: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  holdTime?: number;
  shouldStart: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!shouldStart) {
      setCount(0);
      return;
    }

    let startTimestamp: number | null = null;
    let animId: number;
    let holdTimeout: NodeJS.Timeout | null = null;

    const runCycle = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;

      if (elapsed < duration) {
        const progress = Math.min(elapsed / duration, 1);
        // Smooth cubic ease out deceleration
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentVal = Math.floor(easeOut * target);

        setCount(currentVal);
        animId = requestAnimationFrame(runCycle);
      } else {
        // Target reached
        setCount(target);
        // Hold for 3 seconds, then restart from number 0
        holdTimeout = setTimeout(() => {
          setCount(0);
          startTimestamp = null;
          animId = requestAnimationFrame(runCycle);
        }, holdTime);
      }
    };

    setCount(0);
    animId = requestAnimationFrame(runCycle);

    return () => {
      if (animId) cancelAnimationFrame(animId);
      if (holdTimeout) clearTimeout(holdTimeout);
    };
  }, [shouldStart, target, duration, holdTime]);

  return (
    <>
      {prefix}
      {count}
      {suffix}
    </>
  );
}

export default function Home() {
 const router = useRouter();
 const [menuOpen, setMenuOpen] = useState(false);
 const [scrolled, setScrolled] = useState(false);
 const [unit, setUnit] = useState(1);
 const [slide, setSlide] = useState(0);
 const [heroSlide, setHeroSlide] = useState(0);
 const [amenitySlide, setAmenitySlide] = useState(0);
 const [amenityHovered, setAmenityHovered] = useState(false);
 const [visibleAmenities, setVisibleAmenities] = useState(3);
 const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [enquirySubmitted, setEnquirySubmitted] = useState(false);
  const [modalResidence, setModalResidence] = useState("3 BHK");
  const [statsVisible, setStatsVisible] = useState(false);
  const [hoveredHotspot, setHoveredHotspot] = useState<number | null>(null);
  const [selectedHotspot, setSelectedHotspot] = useState<number | null>(null);
  const [planFullscreen, setPlanFullscreen] = useState(false);
  const [legendCollapsed, setLegendCollapsed] = useState(false);
  const [modalLegendCollapsed, setModalLegendCollapsed] = useState(false);
  const [legendPage, setLegendPage] = useState(0);
  const [modalLegendPage, setModalLegendPage] = useState(0);
  const activeSpotId = hoveredHotspot ?? selectedHotspot;
  const activeSpot = masterPlanHotspots.find((s) => s.id === activeSpotId);

  // Capture & Persist UTM Marketing Parameters on Landing
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const params = new URLSearchParams(window.location.search);
      const utmSource = params.get("utm_source");
      const utmMedium = params.get("utm_medium");
      const utmCampaign = params.get("utm_campaign");
      const utmTerm = params.get("utm_term");
      const utmContent = params.get("utm_content");

      if (utmSource) sessionStorage.setItem("acrux_utm_source", utmSource);
      if (utmMedium) sessionStorage.setItem("acrux_utm_medium", utmMedium);
      if (utmCampaign) sessionStorage.setItem("acrux_utm_campaign", utmCampaign);
      if (utmTerm) sessionStorage.setItem("acrux_utm_term", utmTerm);
      if (utmContent) sessionStorage.setItem("acrux_utm_content", utmContent);

      if (document.referrer && !sessionStorage.getItem("acrux_referrer")) {
        sessionStorage.setItem("acrux_referrer", document.referrer);
      }
    } catch (err) {
      console.error("Error reading UTM parameters:", err);
    }
  }, []);

  const getUtmData = () => {
    if (typeof window === "undefined") return {};
    return {
      utm_source: sessionStorage.getItem("acrux_utm_source") || "direct",
      utm_medium: sessionStorage.getItem("acrux_utm_medium") || "none",
      utm_campaign: sessionStorage.getItem("acrux_utm_campaign") || "general",
      utm_term: sessionStorage.getItem("acrux_utm_term") || undefined,
      utm_content: sessionStorage.getItem("acrux_utm_content") || undefined,
      referrer: sessionStorage.getItem("acrux_referrer") || (typeof document !== "undefined" ? document.referrer : "Direct"),
    };
  };

  const handleInlineEnquirySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "");
    const phone = String(data.get("phone") || "");
    const email = String(data.get("email") || "");
    const residence = String(data.get("residence") || "3 BHK");
    const utm = getUtmData();

    // Persist lead to database with UTM source tracking
    try {
      await submitLeadClient({
        name,
        phone,
        email,
        residence,
        sourceForm: "inline_enquiry",
        ...utm,
      });
    } catch (err) {
      console.error("Lead submission error:", err);
    }

    sessionStorage.setItem("acrux_brochure_access", "granted");
    router.push("/thank-you");
  };

  const handleConciergeModalSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "");
    const phone = String(data.get("phone") || "");
    const email = String(data.get("email") || "");
    const timeSlot = String(data.get("timeSlot") || "");
    const utm = getUtmData();

    // Persist lead to database with UTM source tracking
    try {
      await submitLeadClient({
        name,
        phone,
        email,
        residence: modalResidence,
        timeSlot,
        sourceForm: "concierge_modal",
        ...utm,
      });
    } catch (err) {
      console.error("Lead submission error:", err);
    }

    sessionStorage.setItem("acrux_brochure_access", "granted");
    router.push("/thank-you");
  };

  const statsRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const updateVisible = () => {
      if (typeof window === "undefined") return;
      if (window.innerWidth <= 640) setVisibleAmenities(1);
      else if (window.innerWidth <= 1024) setVisibleAmenities(2);
      else setVisibleAmenities(3);
    };
    updateVisible();
    window.addEventListener("resize", updateVisible, { passive: true });
    return () => window.removeEventListener("resize", updateVisible);
  }, []);

  const maxAmenitySlide = Math.max(0, amenities.length - visibleAmenities);

  useEffect(() => {
    if (amenitySlide > maxAmenitySlide) {
      setAmenitySlide(maxAmenitySlide);
    }
  }, [maxAmenitySlide, amenitySlide]);

  useEffect(() => {
    if (amenityHovered) return;
    const interval = setInterval(() => {
      setAmenitySlide((curr) => (curr >= maxAmenitySlide ? 0 : curr + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, [amenityHovered, maxAmenitySlide]);

  const prevAmenity = () => {
    setAmenitySlide((curr) => (curr <= 0 ? maxAmenitySlide : curr - 1));
  };

  const nextAmenity = () => {
    setAmenitySlide((curr) => (curr >= maxAmenitySlide ? 0 : curr + 1));
  };

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setStatsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
 const [lightbox, setLightbox] = useState<{ src: string; title: string } | null>(null);
 useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 30); onScroll(); window.addEventListener("scroll", onScroll, { passive: true }); return () => window.removeEventListener("scroll", onScroll); }, []);
 useEffect(() => {
   const hero = heroRef.current;
   if (!hero || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
   let frame = 0;
   const update = () => {
     frame = 0;
     const progress = Math.min(1, Math.max(0, -hero.getBoundingClientRect().top / hero.offsetHeight));
     hero.style.setProperty("--hero-scroll-scale", `${1 + progress * 0.06}`);
     hero.style.setProperty("--hero-scroll-lift", `${-progress * 18}px`);
     hero.style.setProperty("--hero-scroll-opacity", `${1 - progress * 0.2}`);
   };
   const onScroll = () => { if (!frame) frame = window.requestAnimationFrame(update); };
   update();
   window.addEventListener("scroll", onScroll, { passive: true });
   window.addEventListener("resize", onScroll);
   return () => {
     window.removeEventListener("scroll", onScroll);
     window.removeEventListener("resize", onScroll);
     if (frame) window.cancelAnimationFrame(frame);
   };
 }, []);
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setEnquiryOpen(false);
        setLightbox(null);
        setPlanFullscreen(false);
      }
    };
    if (enquiryOpen || lightbox || planFullscreen) {
      window.addEventListener("keydown", onKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [enquiryOpen, lightbox, planFullscreen]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setHeroSlide((curr) => (curr + 1) % heroSlides.length);
    }, 6500);
    return () => window.clearTimeout(timer);
  }, [heroSlide]);

  const openEnquiryModal = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setEnquirySubmitted(false);
    setEnquiryOpen(true);
  };
 const nextHeroSlide = () => setHeroSlide((curr) => (curr + 1) % heroSlides.length);
 const prevHeroSlide = () => setHeroSlide((curr) => (curr - 1 + heroSlides.length) % heroSlides.length);
 const openImage = (src: string, title: string) => { setLightbox({ src, title }); };
 return <main className="aakaar-site" id="top">
 <a href="#overview" className="skip-link">Skip to content</a>
 <header className={`site-header${scrolled ? " is-scrolled" : ""}`}><a href="#top" className="brand" aria-label="Acrux Aakaar home"><Image src="/assets/Aakaar Logo.webp" alt="Acrux Aakaar" width={160} height={65} priority /></a><nav aria-label="Main navigation" className="desktop-nav">{nav.map(([label,id]) => <a href={`#${id}`} key={id}>{label}</a>)}</nav><a href="#enquire" className="header-enquire" onClick={openEnquiryModal}>Enquire now <ArrowUpRight size={16}/></a><button className="menu-toggle" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} aria-controls="mobile-nav" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X/> : <Menu/>}</button></header>
 {menuOpen && <nav className="mobile-nav" id="mobile-nav" aria-label="Mobile navigation">{nav.map(([label,id]) => <a href={`#${id}`} key={id} onClick={() => setMenuOpen(false)}>{label}<ArrowUpRight size={20}/></a>)}<a href="#enquire" onClick={(e) => { setMenuOpen(false); openEnquiryModal(e); }} style={{ color: "var(--color-gold)", fontWeight: 600 }}>Enquire now <ArrowUpRight size={20}/></a></nav>}
 <section className="aakaar-hero" ref={heroRef} aria-label="Introducing Acrux Aakaar">
    <div className="aakaar-hero-slides">
      {heroSlides.map((item, index) => (
        <div
          key={item.image}
          className={`aakaar-hero-slide${heroSlide === index ? " is-active" : ""}`}
          aria-hidden={heroSlide !== index}
        >
          <Picture src={`${project}${item.image}`} alt={item.alt} className="aakaar-hero-picture" priority={index === 0} />
        </div>
      ))}
    </div>
    <div className="aakaar-hero-scene" aria-live="polite">
      <span>{heroSlides[heroSlide].scene}</span>
      <span>Artist’s impression</span>
    </div>

    <div className="aakaar-hero-inner">
      <div className="aakaar-hero-copy" key={heroSlide}>
        <div className="aakaar-hero-overline">
          <span className="hero-beacon" />
          <span>THE ART OF COMING HOME</span>
        </div>
        <h1 className="aakaar-hero-title">
          <span>{heroSlides[heroSlide].title1}</span>
          <em>{heroSlides[heroSlide].title2}</em>
        </h1>
        <p className="aakaar-hero-description">{heroSlides[heroSlide].desc}</p>
        <div className="aakaar-hero-actions">
          <a href="#enquire" className="aakaar-hero-cta" onClick={openEnquiryModal}>Enquire now <ArrowUpRight size={17} /></a>
          <a href="#residences" className="aakaar-hero-text-link">Explore residences <ArrowDown size={16} /></a>
        </div>
      </div>
    </div>

    <nav className="aakaar-hero-social" aria-label="Acrux social media">
      {heroSocials.map(({ label, href }) => (
        <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={`Acrux on ${label}`} title={label}>
          <HeroSocialIcon label={label} />
        </a>
      ))}
    </nav>

    <div className="aakaar-hero-footer">
      <div className="aakaar-hero-navigation" aria-label="Hero slider controls">
        <button className="aakaar-hero-arrow" aria-label="Previous hero slide" onClick={prevHeroSlide}><ChevronLeft size={20} /></button>
        <span className="aakaar-hero-count"><strong>0{heroSlide + 1}</strong><span>/</span>0{heroSlides.length}</span>
        <button className="aakaar-hero-arrow" aria-label="Next hero slide" onClick={nextHeroSlide}><ChevronRight size={20} /></button>
      </div>
      <span className="aakaar-hero-footer-note">A VISION BY ACRUX REALCON</span>
    </div>
 </section>
  <section id="overview" className="section overview"><Picture src={`${project}Entrance_Sunrise.webp`} alt="The Aakaar towers at sunrise, surrounded by green gardens"/><div className="overview-copy"><span className="eyebrow">01 / THE OVERVIEW</span><h2>A home above<br/><em>the everyday.</em></h2><p>Morning light across your living room. A quiet walk through green gardens. The city close by, yet a world of your own.</p><p>Welcome to Acrux Aakaar. Two distinctive towers in Patia, Bhubaneswar, bringing thoughtful architecture, open landscapes and everyday comforts together.</p><a href="#enquire" className="text-link" onClick={openEnquiryModal}>Find your place here <ArrowUpRight size={19}/></a></div>    <div className="overview-stats" ref={statsRef}>
      <div>
        <strong>
          <StatCounter target={305} shouldStart={statsVisible} duration={3000} holdTime={3000} />
        </strong>
        <span className="stat-label">Thoughtfully designed homes</span>
      </div>
      <div>
        <strong>
          <StatCounter target={2} shouldStart={statsVisible} duration={3000} holdTime={3000} />
        </strong>
        <span className="stat-label">Distinctive towers</span>
      </div>
      <div>
        <strong>
          <StatCounter prefix="B+S+" target={11} shouldStart={statsVisible} duration={3000} holdTime={3000} />
        </strong>
        <span className="stat-label">An elevated perspective</span>
      </div>
      <div>
        <strong>
          <StatCounter target={32} suffix="%" shouldStart={statsVisible} duration={3000} holdTime={3000} />
        </strong>
        <span className="stat-label">Open spaces</span>
      </div>
    </div></section>
  <section id="residences" className="residences section"><div className="section-heading"><span className="eyebrow">02 / YOUR PRIVATE WORLD</span><h2>Space for everything.<br/><em>Especially you.</em></h2></div><div className="residence-layout"><Picture src="/assets/Interiors/Living_Dining_Room.webp" alt="Aakaar living and dining room opening onto a balcony"/><div className="residence-details"><p className="eyebrow">THE RESIDENCES</p><div className="unit-tabs" aria-label="Residence configuration">{["2.5 BHK","3 BHK"].map((label,i) => <button key={label} aria-pressed={unit===i} onClick={() => setUnit(i)}>{label}</button>)}</div><div aria-live="polite"><h3>{unit ? "A little more room to call your own." : "Your home. Your possibilities."}</h3><p>{unit ? "Three bedrooms, welcoming shared spaces and room for every part of your day." : "Two bedrooms and a versatile study for work, creativity or a quiet retreat."}</p><div className="residence-size"><strong>{unit ? "2,148" : "1,790"}</strong><span>sq. ft.</span></div></div><a href="#enquire" onClick={openEnquiryModal} className="text-link">Get plans &amp; brochure <ArrowUpRight size={20}/></a></div></div></section>
  <section id="amenities" className="section amenities">
    <div className="heading-row">
      <div className="section-heading">
        <span className="eyebrow">03 / LIFE BEYOND YOUR HOME</span>
        <h2>The everyday.<br/><em>Made extraordinary.</em></h2>
      </div>
      <div className="amenities-heading-right">
        <p>
          From peaceful gardens to evenings on the rooftop,<br />make time for the things that make you feel alive.
        </p>
        <div className="amenities-controls" aria-label="Amenities carousel navigation">
          <button
            onClick={prevAmenity}
            className="amenities-arrow"
            aria-label="Previous amenities slide"
          >
            <ArrowLeft size={18} />
          </button>
          <button
            onClick={nextAmenity}
            className="amenities-arrow"
            aria-label="Next amenities slide"
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>

    <div
      className="amenities-carousel-wrapper"
      onMouseEnter={() => setAmenityHovered(true)}
      onMouseLeave={() => setAmenityHovered(false)}
      onTouchStart={() => setAmenityHovered(true)}
      onTouchEnd={() => setAmenityHovered(false)}
    >
      <div
        className="amenities-carousel-track"
        style={{
          '--amenity-index': amenitySlide,
          '--visible-amenities': visibleAmenities,
        } as React.CSSProperties}
      >
        {amenities.map(([src, title, desc], i) => (
          <article key={src} className="amenity-slide">
            <button
              className="image-button"
              onClick={() => openImage(project + src, title)}
              aria-label={`View ${title}`}
            >
              <Picture src={project + src} alt={title} />
              <span className="image-expand"><Plus size={20} /></span>
            </button>
            <div className="amenity-caption">
              <span>0{i + 1}</span>
              <div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>

    <div className="amenities-pagination" aria-label="Amenities carousel indicators">
      {Array.from({ length: maxAmenitySlide + 1 }).map((_, idx) => (
        <button
          key={idx}
          className={`amenities-dot ${amenitySlide === idx ? "is-active" : ""}`}
          onClick={() => setAmenitySlide(idx)}
          aria-label={`Go to slide ${idx + 1}`}
        />
      ))}
    </div>
  </section>
  <section id="clubhouse" className="clubhouse"><Picture src={`${project}Clubhouse_Exterior.webp`} alt="The landscaped Aakaar clubhouse"/><div className="clubhouse-copy"><span className="eyebrow">A SPACE TO COME TOGETHER</span><h2>Your days.<br/><em>With more possibilities.</em></h2><p>A G+3 clubhouse for a workout, a celebration, a film with friends, or simply a welcome change of pace.</p><div className="club-links">{[["GYM.webp","Fitness studio"],["AV_ROOM.webp","Private theatre"],["SOCIETY HALL.webp","Society hall"]].map(([src,name]) => <button key={src} onClick={() => openImage(`/assets/CLUB RENDERS/${src}`,name)}>{name}<ArrowUpRight size={18}/></button>)}</div></div></section>
  <section id="gallery" className="section gallery"><div className="heading-row"><div className="section-heading"><span className="eyebrow">04 / A CLOSER LOOK</span><h2>Picture your life <em>here.</em></h2></div><div className="gallery-controls"><button onClick={() => setSlide((slide+gallery.length-1)%gallery.length)} aria-label="Previous gallery image"><ArrowLeft size={20}/></button><button onClick={() => setSlide((slide+1)%gallery.length)} aria-label="Next gallery image"><ArrowRight size={20}/></button></div></div><button className="image-button gallery-image" onClick={() => openImage(project+gallery[slide][0],gallery[slide][1])} aria-label={`Enlarge ${gallery[slide][1]}`}><Picture src={project+gallery[slide][0]} alt={gallery[slide][1]}/><span className="render-caption">Artist’s impression</span><span className="image-expand"><Plus size={22}/></span></button><div className="gallery-caption" aria-live="polite"><h3>{gallery[slide][1]}</h3><div><span>0{slide+1}</span> / 0{gallery.length}</div></div></section>
  <section id="master-plan" className="section master-plan-section">
    {/* 1. Compact Editorial Introduction (Top-Left Composition) */}
    <div className="master-plan-top-editorial">
      <div className="top-editorial-heading">
        <span className="eyebrow">THOUGHTFULLY PLANNED</span>
        <h2>A place for life <em>to unfold.</em></h2>
      </div>
      <div className="top-editorial-right">
        <p>Explore how the towers, clubhouse and landscaped spaces come together.</p>
        <div className="top-editorial-actions">
          <button
            type="button"
            className="top-editorial-btn"
            onClick={() => setPlanFullscreen(true)}
            aria-label="Open fullscreen master plan explorer"
          >
            <Maximize2 size={13} />
            <span>Fullscreen Plan</span>
          </button>
          <a href="#enquire" onClick={openEnquiryModal} className="top-editorial-link">
            <Download size={13} />
            <span>Brochure</span>
          </a>
        </div>
      </div>
    </div>

    {/* 2. Full-Width Architectural Master Plan Board */}
    <div className="master-plan-board">
      <div className="master-plan-canvas">
        <Image
          src={project + "Master_Plan.webp"}
          alt="Acrux Aakaar comprehensive architectural site master plan"
          width={2528}
          height={1425}
          priority={false}
          className="master-plan-full-image"
          sizes="(max-width: 1600px) 100vw, 1600px"
        />



        {/* 4. Numbered Map Markers */}
        {masterPlanHotspots.map((spot) => {
          const isActive = activeSpotId === spot.id;
          const isDimmed = activeSpotId !== null && !isActive;
          const isNearTop = spot.y < 30;
          const isNearRight = spot.x > 70;
          const isNearLeft = spot.x < 24;

          return (
            <div
              key={spot.id}
              className={`master-marker-node ${isActive ? "is-active" : ""} ${isDimmed ? "is-dimmed" : ""}`}
              style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
            >
              <button
                type="button"
                className="master-marker-circle"
                onMouseEnter={() => setHoveredHotspot(spot.id)}
                onMouseLeave={() => setHoveredHotspot(null)}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedHotspot(selectedHotspot === spot.id ? null : spot.id);
                }}
                aria-label={`Hotspot ${spot.num}: ${spot.name} (${spot.tag})`}
                aria-expanded={isActive}
              >
                <span className="marker-ping" aria-hidden="true" />
                <span className="marker-num-text">{spot.num}</span>
              </button>

              {/* Tooltip on Hover/Active */}
              {isActive && (
                <div
                  className={`marker-float-tooltip ${isNearTop ? "pos-bottom" : "pos-top"} ${isNearRight ? "pos-right" : isNearLeft ? "pos-left" : "pos-center"}`}
                  role="tooltip"
                >
                  <div className="marker-tooltip-header">
                    <span className="marker-tooltip-num">{spot.num}</span>
                    <span className="marker-tooltip-type">{spot.type}</span>
                  </div>
                  <h4 className="marker-tooltip-title">{spot.name}</h4>
                  <span className="marker-tooltip-tag">{spot.tag}</span>
                  <p className="marker-tooltip-desc">{spot.desc}</p>
                </div>
              )}
            </div>
          );
        })}

        {/* 5. Desktop Floating Legend Panel (Top-Right, Compact & Non-Overlapping) */}
        <aside className={`master-plan-floating-legend ${legendCollapsed ? "is-collapsed" : ""}`} aria-label="Master Plan Architectural Index">
          <div className="floating-legend-header">
            <div className="floating-legend-title-row">
              <div className="floating-legend-title-left">
                <Compass size={12} className="floating-legend-compass" />
                <span className="floating-legend-eyebrow">MASTER PLAN</span>
              </div>
              <button
                type="button"
                className="floating-legend-toggle"
                onClick={() => setLegendCollapsed(!legendCollapsed)}
                aria-label={legendCollapsed ? "Expand legend" : "Minimize legend"}
                title={legendCollapsed ? "Expand legend" : "Minimize legend"}
              >
                {legendCollapsed ? <ChevronDown size={13} /> : <ChevronUp size={13} />}
              </button>
            </div>
            {!legendCollapsed && <p className="floating-legend-subtitle">EXPLORE THE DEVELOPMENT</p>}
          </div>

          {!legendCollapsed && (
            <div className="floating-legend-list" role="list">
              {masterPlanHotspots.slice(legendPage === 0 ? 0 : 7, legendPage === 0 ? 7 : 10).map((spot) => {
                const isActive = activeSpotId === spot.id;
                return (
                  <button
                    key={spot.id}
                    type="button"
                    role="listitem"
                    className={`floating-legend-item ${isActive ? "is-active" : ""}`}
                    onMouseEnter={() => setHoveredHotspot(spot.id)}
                    onMouseLeave={() => setHoveredHotspot(null)}
                    onClick={() => setSelectedHotspot(selectedHotspot === spot.id ? null : spot.id)}
                    aria-label={`Highlight landmark ${spot.num}: ${spot.name}`}
                  >
                    <span className="fl-num">{spot.num}</span>
                    <span className="fl-name">{spot.name}</span>
                    <span className="fl-tag">{spot.tag}</span>
                  </button>
                );
              })}
              <div className="floating-legend-pagination" aria-label="Legend pages">
                <span>{legendPage === 0 ? "01–07" : "08–10"}</span>
                <div className="floating-legend-page-buttons">
                  <button
                    type="button"
                    onClick={() => setLegendPage(0)}
                    disabled={legendPage === 0}
                    aria-label="Show legend items 1 to 7"
                  >
                    <ChevronLeft size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setLegendPage(1)}
                    disabled={legendPage === 1}
                    aria-label="Show legend items 8 to 10"
                  >
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>

    {/* 6. Mobile Active Landmark Card (Below Map) */}
    {activeSpot && (
      <div className="mobile-active-card" aria-live="polite">
        <div className="mobile-card-badge">
          <span className="mobile-card-num">{activeSpot.num}</span>
          <span className="mobile-card-type">{activeSpot.type}</span>
        </div>
        <div className="mobile-card-content">
          <div className="mobile-card-heading">
            <h4>{activeSpot.name}</h4>
            <span className="mobile-card-tag">{activeSpot.tag}</span>
          </div>
          <p>{activeSpot.desc}</p>
        </div>
        <button
          type="button"
          className="mobile-card-close"
          onClick={() => { setSelectedHotspot(null); setHoveredHotspot(null); }}
          aria-label="Dismiss landmark details"
        >
          <X size={15} />
        </button>
      </div>
    )}

    {/* 7. Mobile Architectural Legend Grid (Below Map on Mobile) */}
    <div className="mobile-master-plan-legend" role="list" aria-label="Master plan architectural index">
      <div className="mobile-legend-header">
        <Compass size={13} />
        <span>MASTER PLAN INDEX</span>
      </div>
      <div className="mobile-legend-grid">
        {masterPlanHotspots.map((spot) => {
          const isActive = activeSpotId === spot.id;
          return (
            <button
              key={spot.id}
              type="button"
              role="listitem"
              className={`mobile-legend-btn ${isActive ? "is-active" : ""}`}
              onClick={() => setSelectedHotspot(selectedHotspot === spot.id ? null : spot.id)}
              aria-label={`Highlight landmark ${spot.num}: ${spot.name}`}
            >
              <span className="fl-num">{spot.num}</span>
              <span className="fl-line" aria-hidden="true" />
              <span className="fl-name">{spot.name}</span>
              <span className="fl-tag">{spot.tag}</span>
            </button>
          );
        })}
      </div>
    </div>
  </section>

  <section id="architect" className="architect section">
    <div className="architect-visual">
      <Picture
        src={`${project}Architect_Portrait.webp`}
        alt="Ar. Ramesh Swain and Ar. Rahul Swain — Leaders of Acrux Realcon"
      />
    </div>
    <div className="architect-content">
      <span className="eyebrow">THE MIND BEHIND THE VISION</span>
      <h2>
        Imagined with care.<br />
        <em>Designed for living.</em>
      </h2>
      <div className="architect-gold-line" aria-hidden="true" />
      <p>
        Architecture by Ar. Ramesh Swain and Ar. Rahul Swain, bringing natural light, open views and considered spaces into the way you live.
      </p>
      <div className="architect-names-row">
        <div className="architect-name-item">
          <span className="architect-name">Ar. Ramesh Swain</span>
          <small className="architect-role">MANAGING DIRECTOR</small>
        </div>
        <div className="architect-name-divider" aria-hidden="true" />
        <div className="architect-name-item">
          <span className="architect-name">Ar. Rahul Swain</span>
          <small className="architect-role">DIRECTOR</small>
        </div>
      </div>
    </div>
  </section>
 <section id="location" className="section location">
    <div className="section-heading">
      <span className="eyebrow">05 / CONNECTED TO YOUR WORLD</span>
      <h2>The city at your doorstep.<br/><em>Calm at your heart.</em></h2>
    </div>
    <div className="location-layout">
      {/* Left Side: Interactive Google Map */}
      <div className="location-map-container">
        <div className="location-map-frame">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d36827.611162170164!2d85.81957025870696!3d20.332625705710612!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a190a2400000015%3A0xbd05b0fd3686dceb!2sPlot%20for%20sale%20in%20Bhubaneswar!5e1!3m2!1sen!2sin!4v1790923004554!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            title="Acrux Aakaar Location Map - Patia, Bhubaneswar"
            className="location-iframe"
          />
        </div>
        <div className="location-card-footer">
          <div className="location-card-info">
            <div className="location-card-pin">
              <MapPin size={18} />
            </div>
            <div>
              <h3>Patia, Bhubaneswar</h3>
              <p>Plot No. 15W, Chandrasekharpur, Patia, Bhubaneswar, Odisha 751021</p>
            </div>
          </div>
          <a
            className="location-gmaps-link"
            href="https://www.google.com/maps/search/?api=1&query=Acrux+Aakaar+Patia+Bhubaneswar"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Open in Maps</span>
            <ArrowUpRight size={15} />
          </a>
        </div>
      </div>

      {/* Right Side: Everyday Connections */}
      <div className="nearby">
        <p className="eyebrow">EVERYDAY CONNECTIONS</p>
        {[
          ["01", "Education", "KIIT University · SAI International School"],
          ["02", "Work", "Infocity · TCS · Infosys"],
          ["03", "Healthcare", "KIMS · Care Hospitals"],
          ["04", "Connectivity", "Patia railway station · Nandankanan Road"]
        ].map(([num, title, text]) => (
          <div key={num}>
            <span>{num}</span>
            <div>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
            <ArrowUpRight size={18} />
          </div>
        ))}
      </div>
    </div>
  </section>

 <section id="enquire" className="section enquiry"><div><span className="eyebrow">LET’S START A CONVERSATION</span><h2>Your next chapter<br/><em>begins here.</em></h2><p>Complete the form to receive access to the official project brochure and arrange your visit.</p><a href="tel:+919777543339" className="contact-phone">+91 97775 43339 <ArrowUpRight size={20}/></a><a href="mailto:sales@acruxrealcon.in">sales@acruxrealcon.in</a></div><form onSubmit={handleInlineEnquirySubmit}><label>Your name<input name="name" autoComplete="name" placeholder="Full name" required minLength={2} maxLength={100}/></label><div className="form-row"><label>Phone number<input name="phone" autoComplete="tel" type="tel" inputMode="numeric" placeholder="9876543210" pattern="(?:\+91[ -]?)?[6-9][0-9]{9}" title="Enter a valid 10-digit Indian mobile number" required/></label><label>Email address<input name="email" autoComplete="email" type="email" placeholder="name@example.com" required/></label></div><label>Interested in<select name="residence" defaultValue="3 BHK" required><option>2.5 BHK</option><option>3 BHK</option><option>Help me choose</option></select></label><label className="consent"><input type="checkbox" required/>I agree to be contacted by Acrux Realcon about my enquiry.</label><button className="solid-button" type="submit">Submit &amp; access brochure <ArrowUpRight size={18}/></button><p className="form-note">Your brochure download will be available on the next page after successful submission.</p></form></section>
   {/* About the Developer Section */}
  <section id="developer" className="section developer-section">
    <div className="developer-layout">
      {/* Left: Atmospheric Architectural Portrait */}
      <div className="developer-visual">
        <div className="developer-image-frame">
          <Image
            src="/assets/Project/Architects_Image_07.webp"
            alt="Ar. Ramesh Swain and Ar. Rahul Swain — Leaders of Acrux Realcon"
            width={1600}
            height={1018}
            className="developer-portrait-img"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority={false}
          />
        </div>
        <p className="developer-image-caption">
          Ar. Ramesh Swain, Managing Director &amp; Ar. Rahul Swain, Director
        </p>
      </div>

      {/* Right: Stately Editorial Narrative & Leadership */}
      <div className="developer-content">
        <span className="eyebrow">ABOUT THE DEVELOPER</span>
        <h2 className="developer-title">
          Spaces built with purpose.<br />
          <em>Places made for life.</em>
        </h2>
        <div className="developer-gold-line" aria-hidden="true" />
        <p className="developer-narrative">
          Led by Ar. Ramesh Swain, Managing Director, and Ar. Rahul Swain, Director, Acrux Realcon brings together design-led thinking, quality, and a deep understanding of Odisha. Their experience across residential and commercial developments shapes the vision of CODENAME THE ARCH, creating places people are proud to call their own.
        </p>

        <div className="developer-highlights" aria-label="Acrux Realcon highlights">
          <div><strong>20+</strong><span>Years of experience</span></div>
          <div><strong>40+</strong><span>Landmark projects</span></div>
          <div><strong>1,000+</strong><span>Happy families</span></div>
          <div><strong>2</strong><span>Visionary architects</span></div>
        </div>

        {/* Minimalist Architectural Signature Row */}
        <div className="developer-byline-grid">
          <div className="developer-byline-item">
            <span className="byline-role">MANAGING DIRECTOR</span>
            <h3 className="byline-name">Ar. Ramesh Swain</h3>
          </div>
          <div className="developer-byline-divider" aria-hidden="true" />
          <div className="developer-byline-item">
            <span className="byline-role">DIRECTOR</span>
            <h3 className="byline-name">Ar. Rahul Swain</h3>
          </div>
        </div>

        <p className="developer-heritage-note">
          ACRUX REALCON · ARCHITECTURAL EXCELLENCE · BHUBANESWAR, ODISHA
        </p>
      </div>
    </div>
  </section>

  <footer className="site-footer">
    <div className="footer-top"><a href="#top" className="footer-brand"><Image src="/assets/Aakaar Logo.webp" alt="Acrux Aakaar" width={170} height={70}/></a><p>A considered way of living.<br/>By Acrux Realcon.</p><a href="#top" className="back-top">Back to top <ArrowUpRight size={19}/></a></div>
    <div className="footer-details">
      <div><span className="footer-detail-label">PROJECT LOCATION / SITE ADDRESS</span><address>Plot No. 15W, Chandrasekharpur, Patia, Bhubaneswar, Odisha 751 021</address></div>
      <div><span className="footer-detail-label">DEVELOPER&apos;S CORPORATE OFFICE</span><address>Acrux Realcon Pvt. Ltd., F33/F34, Chandaka Industrial Area, Infocity, Bhubaneswar, Odisha 751 024</address></div>
      <div><span className="footer-detail-label">CONTACT</span><a href="tel:+919777543339">+91 97775 43339</a><a href="mailto:sales@acruxrealcon.in">sales@acruxrealcon.in</a></div>
      <div><span className="footer-detail-label">ORERA REGISTRATION</span><span className="footer-rera-pending">Registration number to be updated</span><a href="https://rera.odisha.gov.in/" target="_blank" rel="noreferrer">rera.odisha.gov.in</a></div>
    </div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} Acrux Realcon. All rights reserved.</span><span>All renders are artist’s impressions. Details subject to confirmation.</span></div>
  </footer>
 <div className="mobile-cta"><a href="tel:+919777543339"><Phone size={16}/> Call us</a><a href="#enquire" onClick={openEnquiryModal}>Schedule a visit <ArrowUpRight size={16}/></a></div>
 {lightbox && (
   <div
     className="image-modal-overlay"
     role="dialog"
     aria-modal="true"
     aria-label={lightbox.title}
     onClick={(e) => {
       if (e.target === e.currentTarget) setLightbox(null);
     }}
   >
     <div className="image-dialog">
       <button className="dialog-close" aria-label="Close image" onClick={() => setLightbox(null)}>
         <X size={20} />
       </button>
       <div className="lightbox-picture">
         <Image src={lightbox.src} alt={lightbox.title} fill sizes="95vw" style={{ objectFit: "contain" }} />
       </div>
       <p>{lightbox.title}</p>
     </div>
   </div>
 )}
 
  {/* Split-Panel Luxury Concierge Modal Popup */}
  {enquiryOpen && (
    <div
      className="enquiry-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="enquiry-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) setEnquiryOpen(false);
      }}
    >
      <div className="enquiry-modal-card split-layout">
        <button
          type="button"
          className="enquiry-modal-close"
          onClick={() => setEnquiryOpen(false)}
          aria-label="Close enquiry popup"
        >
          <X size={18} />
        </button>

        {/* Left Visual & Credentials Showcase */}
        <div className="modal-showcase-pane">
          <div className="modal-pane-bg">
            <Image
              src="/assets/Project/Clubhouse_Exterior.webp"
              alt="Acrux Aakaar Grand Clubhouse"
              fill
              sizes="(max-width: 768px) 100vw, 420px"
              priority
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="modal-pane-overlay" />
          <div className="modal-pane-content">
            <div className="modal-pane-header">
              <Image
                src="/assets/Aakaar Logo.webp"
                alt="Acrux Aakaar"
                width={128}
                height={50}
                className="modal-pane-logo"
              />
              <span className="modal-pane-tag">PRIVATE SALES PREVIEW</span>
            </div>
            <div className="modal-pane-body">
              <blockquote>
                “Architecture designed for serenity, light, and elevated living in Patia.”
              </blockquote>
              <div className="modal-pane-hallmarks">
                <div className="hallmark-item">
                  <Sparkles size={15} className="hallmark-icon" />
                  <div>
                    <strong>Priority Residence Allocation</strong>
                    <span>Direct sales desk pricing &amp; unit selection</span>
                  </div>
                </div>
                <div className="hallmark-item">
                  <MapPin size={15} className="hallmark-icon" />
                  <div>
                    <strong>Patia, Bhubaneswar</strong>
                    <span>Opposite Infocity &amp; KIIT University</span>
                  </div>
                </div>
                <div className="hallmark-item">
                  <Download size={15} className="hallmark-icon" />
                  <div>
                    <strong>Floor Plans &amp; Pricing Sheets</strong>
                    <span>Instant digital brochure on WhatsApp</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-pane-footer">
              <span>ORERA / BDA APPROVED RESIDENTIAL LANDMARK</span>
            </div>
          </div>
        </div>

        {/* Right Concierge Form Pane */}
        <div className="modal-form-pane">
          {enquirySubmitted ? (
            <div className="enquiry-success-state">
              <div className="success-badge">
                <Check size={28} />
              </div>
              <span className="eyebrow">ACRUX AAKAAR</span>
              <h3>Preview Request Confirmed</h3>
              <p>
                Thank you for your interest. WhatsApp has been opened to connect you directly with our senior relationship manager. We will assist you with floor plans, pricing breakups, and confirm your private preview appointment.
              </p>
              <button
                type="button"
                className="modal-submit-btn"
                style={{ width: "100%", justifyContent: "center" }}
                onClick={() => setEnquiryOpen(false)}
              >
                Return to Site
              </button>
            </div>
          ) : (
            <div className="enquiry-modal-body">
              <div className="enquiry-modal-header">
                <div className="modal-eyebrow">
                  <span className="hero-beacon" />
                  <span>CONCIERGE DESK ● PATIA, BHUBANESWAR</span>
                </div>
                <h2 id="enquiry-modal-title">Schedule a Private Preview</h2>
                <p>
                  Register your interest below for customized residence plans, current stage pricing, or a personal site walkthrough.
                </p>
              </div>

              <form className="enquiry-modal-form" onSubmit={handleConciergeModalSubmit}>
                <div className="modal-input-group">
                  <label htmlFor="modal-name">Your Full Name *</label>
                  <input
                    id="modal-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="e.g. Ramesh Mishra"
                    required
                    minLength={2}
                    maxLength={100}
                  />
                </div>

                <div className="modal-form-row">
                  <div className="modal-input-group">
                    <label htmlFor="modal-phone">Contact Number *</label>
                    <input
                      id="modal-phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      inputMode="numeric"
                      placeholder="9876543210"
                      pattern="(?:\+91[ -]?)?[6-9][0-9]{9}"
                      title="Enter a valid 10-digit Indian mobile number"
                      required
                    />
                  </div>
                  <div className="modal-input-group">
                    <label htmlFor="modal-email">Email Address *</label>
                    <input
                      id="modal-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="name@domain.com"
                      required
                    />
                  </div>
                </div>

                <div className="modal-input-group">
                  <label>Select Preferred Residence</label>
                  <div className="modal-config-chips">
                    {[
                      { key: "2.5 BHK", label: "2.5 BHK", area: "1,790 SQ.FT." },
                      { key: "3 BHK", label: "3 BHK", area: "2,148 SQ.FT." },
                      { key: "Both Options", label: "Both Options", area: "Undecided" }
                    ].map((opt) => (
                      <button
                        key={opt.key}
                        type="button"
                        className={"modal-chip-luxury" + (modalResidence === opt.key ? " active" : "")}
                        onClick={() => setModalResidence(opt.key)}
                      >
                        <strong>{opt.label}</strong>
                        <small>{opt.area}</small>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="modal-input-group">
                  <label htmlFor="modal-timeslot">Preferred Walkthrough Timing</label>
                  <select id="modal-timeslot" name="timeSlot" defaultValue="Weekend Morning (10 AM - 1 PM)">
                    <option value="Weekend Morning (10 AM - 1 PM)">Weekend Morning (10 AM – 1 PM)</option>
                    <option value="Weekend Afternoon (2 PM - 5 PM)">Weekend Afternoon (2 PM – 5 PM)</option>
                    <option value="Weekday Working Hours">Weekday Working Hours</option>
                    <option value="Online Video Presentation First">Online Video Presentation First</option>
                  </select>
                </div>

                <label className="modal-consent">
                  <input type="checkbox" required defaultChecked />
                  <span>I agree to receive floor plans and project updates via WhatsApp / Call from Acrux Realcon.</span>
                </label>

                <button type="submit" className="modal-submit-btn">
                  <span>Confirm Invitation on WhatsApp</span>
                  <ArrowUpRight size={17} />
                </button>

                <div className="modal-direct-call">
                  <span>Prefer an instant conversation?</span>
                  <a href="tel:+919777543339">
                    <Phone size={13} /> +91 97775 43339
                  </a>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  )}
  {planFullscreen && (
    <div
      className="master-plan-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Fullscreen Master Plan Explorer"
      onClick={(e) => {
        if (e.target === e.currentTarget) setPlanFullscreen(false);
      }}
    >
      <div className="master-plan-modal-dialog">
        <div className="modal-header-bar">
          <div className="modal-header-title">
            <Compass size={15} />
            <span>ACRUX AAKAAR — MASTER PLAN EXPLORER</span>
          </div>
          <button
            type="button"
            className="modal-close-trigger"
            onClick={() => setPlanFullscreen(false)}
            aria-label="Close fullscreen explorer"
          >
            <X size={20} />
          </button>
        </div>

        <div className="modal-stage-wrapper">
          <div className="modal-map-stage">
            <Image
              src={project + "Master_Plan.webp"}
              alt="Acrux Aakaar Fullscreen Master Plan"
              fill
              className="modal-full-img"
              sizes="95vw"
              priority
            />

            {masterPlanHotspots.map((spot) => {
              const isActive = activeSpotId === spot.id;
              const isDimmed = activeSpotId !== null && !isActive;

              return (
                <div
                  key={spot.id}
                  className={`master-marker-node ${isActive ? "is-active" : ""} ${isDimmed ? "is-dimmed" : ""}`}
                  style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                >
                  <button
                    type="button"
                    className="master-marker-circle"
                    onMouseEnter={() => setHoveredHotspot(spot.id)}
                    onMouseLeave={() => setHoveredHotspot(null)}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedHotspot(selectedHotspot === spot.id ? null : spot.id);
                    }}
                    aria-label={`${spot.num}: ${spot.name}`}
                  >
                    <span className="marker-ping" aria-hidden="true" />
                    <span className="marker-num-text">{spot.num}</span>
                  </button>

                  {isActive && (
                    <div className="marker-float-tooltip pos-top pos-center" role="tooltip">
                      <div className="marker-tooltip-header">
                        <span className="marker-tooltip-num">{spot.num}</span>
                        <span className="marker-tooltip-type">{spot.type}</span>
                      </div>
                      <h4 className="marker-tooltip-title">{spot.name}</h4>
                      <span className="marker-tooltip-tag">{spot.tag}</span>
                      <p className="marker-tooltip-desc">{spot.desc}</p>
                    </div>
                  )}
                </div>
              );
            })}

            <aside className="master-plan-floating-legend modal-floating-legend" aria-label="Fullscreen Landmark Index">
              <div className="floating-legend-header">
                <span className="floating-legend-eyebrow">MASTER PLAN</span>
                <p className="floating-legend-subtitle">EXPLORE THE DEVELOPMENT</p>
              </div>
              <div className="floating-legend-list">
                {masterPlanHotspots.slice(modalLegendPage === 0 ? 0 : 7, modalLegendPage === 0 ? 7 : 10).map((spot) => (
                  <button
                    key={spot.id}
                    type="button"
                    className={`floating-legend-item ${activeSpotId === spot.id ? "is-active" : ""}`}
                    onMouseEnter={() => setHoveredHotspot(spot.id)}
                    onMouseLeave={() => setHoveredHotspot(null)}
                    onClick={() => setSelectedHotspot(selectedHotspot === spot.id ? null : spot.id)}
                  >
                    <span className="fl-num">{spot.num}</span>
                    <span className="fl-line" />
                    <span className="fl-name">{spot.name}</span>
                    <span className="fl-tag">{spot.tag}</span>
                  </button>
                ))}
                <div className="floating-legend-pagination" aria-label="Legend pages">
                  <span>{modalLegendPage === 0 ? "01–07" : "08–10"}</span>
                  <div className="floating-legend-page-buttons">
                    <button type="button" onClick={() => setModalLegendPage(0)} disabled={modalLegendPage === 0} aria-label="Show legend items 1 to 7">
                      <ChevronLeft size={14} />
                    </button>
                    <button type="button" onClick={() => setModalLegendPage(1)} disabled={modalLegendPage === 1} aria-label="Show legend items 8 to 10">
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  )}
  <WaterCursor />
  </main>;
}
