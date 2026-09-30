"use client";
import WaterCursor from "@/components/WaterCursor";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Check, ChevronLeft, ChevronRight, Download, Menu, X, MapPin, Phone, Plus, Sparkles } from "lucide-react";
const project = "/assets/Project/";
const gallery = [["Entrance_Dusk.webp", "An arrival to remember"], ["Master_Elevation.webp", "A new perspective on the city"], ["Rooftop_Sky_Lounge.webp", "Evenings above the everyday"], ["Zen_Pond.webp", "A moment of stillness"]];
const heroSlides = [
  {
    image: "Master_Elevation.webp",
    tag: "PATIA, BHUBANESWAR",
    title1: "A Life, Beautifully",
    title2: "Shaped.",
    desc: "556 ultra-luxury residences across 5 soaring 21-storey towers with 60% open landscaped greens.",
    alt: "Acrux Aakaar iconic residential towers surrounded by landscaped gardens"
  },
  {
    image: "Entrance_Dusk.webp",
    tag: "PATIA, BHUBANESWAR",
    title1: "Come Home To",
    title2: "Something Special.",
    desc: "An imposing double-height entrance gateway and exclusive G+3 clubhouse crafted for an elevated life.",
    alt: "The Aakaar grand entrance at dusk illuminated with ambient lighting"
  },
  {
    image: "Rooftop_Sky_Lounge.webp",
    tag: "PATIA, BHUBANESWAR",
    title1: "Evenings Above",
    title2: "The Everyday.",
    desc: "Panoramic rooftop sky lounge and landscaped pergola terraces overlooking the city skyline.",
    alt: "Rooftop sky lounge with panoramic city views"
  },
  {
    image: "Entrance_Sunrise.webp",
    tag: "PATIA, BHUBANESWAR",
    title1: "Sun-Kissed Spaces,",
    title2: "Perfected Living.",
    desc: "Thoughtfully crafted 2.5 & 3 BHK residences with expansive balconies and tranquil open vistas.",
    alt: "Aakaar residences in the morning light"
  }
];
const amenities = [["Rooftop_Sky_Lounge.webp", "Sky lounge", "A little closer to the stars."], ["Podium_Garden.webp", "Podium gardens", "Room to wander. Space to breathe."], ["Zen_Pond.webp", "Zen pond", "Find your own quiet corner."], ["Rooftop_Pergola.webp", "Rooftop pergola", "Slow mornings. Unhurried evenings."], ["Central_Lawn.webp", "Central lawn", "More room for life outdoors."], ["Plaza_Blocks_AB.webp", "Community plaza", "Where neighbours become friends."]];
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
 const [menuOpen, setMenuOpen] = useState(false);
 const [scrolled, setScrolled] = useState(false);
 const [unit, setUnit] = useState(1);
 const [allAmenities, setAllAmenities] = useState(false);
 const [slide, setSlide] = useState(0);
 const [heroSlide, setHeroSlide] = useState(0);
 const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [enquirySubmitted, setEnquirySubmitted] = useState(false);
  const [modalResidence, setModalResidence] = useState("3 BHK");
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

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
 const [heroProgress, setHeroProgress] = useState(0);
 const [lightbox, setLightbox] = useState<{ src: string; title: string } | null>(null);
 useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 30); onScroll(); window.addEventListener("scroll", onScroll, { passive: true }); return () => window.removeEventListener("scroll", onScroll); }, []);
   useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setEnquiryOpen(false);
        setLightbox(null);
      }
    };
    if (enquiryOpen || lightbox) {
      window.addEventListener("keydown", onKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [enquiryOpen, lightbox]);

  useEffect(() => {
    const intervalTime = 6000;
    const stepTime = 50;
    const increment = (stepTime / intervalTime) * 100;
    const timer = window.setInterval(() => {
      setHeroProgress((prev) => {
        if (prev >= 100) {
          setHeroSlide((curr) => (curr + 1) % heroSlides.length);
          return 0;
        }
        return prev + increment;
      });
    }, stepTime);
    return () => window.clearInterval(timer);
  }, [heroSlide]);

  const openEnquiryModal = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setEnquirySubmitted(false);
    setEnquiryOpen(true);
  };
 const selectHeroSlide = (index: number) => { setHeroSlide(index); setHeroProgress(0); };
 const nextHeroSlide = () => { setHeroSlide((curr) => (curr + 1) % heroSlides.length); setHeroProgress(0); };
 const prevHeroSlide = () => { setHeroSlide((curr) => (curr - 1 + heroSlides.length) % heroSlides.length); setHeroProgress(0); };
 const openImage = (src: string, title: string) => { setLightbox({ src, title }); };
 return <main className="aakaar-site" id="top">
 <a href="#overview" className="skip-link">Skip to content</a>
 <header className={`site-header${scrolled ? " is-scrolled" : ""}`}><a href="#top" className="brand" aria-label="Acrux Aakaar home"><Image src="/assets/Aakaar Logo.webp" alt="Acrux Aakaar" width={160} height={65} priority /></a><nav aria-label="Main navigation" className="desktop-nav">{nav.map(([label,id]) => <a href={`#${id}`} key={id}>{label}</a>)}</nav><a href="#enquire" className="header-enquire" onClick={openEnquiryModal}>Enquire now <ArrowUpRight size={16}/></a><button className="menu-toggle" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} aria-controls="mobile-nav" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X/> : <Menu/>}</button></header>
 {menuOpen && <nav className="mobile-nav" id="mobile-nav" aria-label="Mobile navigation">{nav.map(([label,id]) => <a href={`#${id}`} key={id} onClick={() => setMenuOpen(false)}>{label}<ArrowUpRight size={20}/></a>)}<a href="#enquire" onClick={(e) => { setMenuOpen(false); openEnquiryModal(e); }} style={{ color: "#ad3f3c", fontWeight: 600 }}>Enquire now <ArrowUpRight size={20}/></a></nav>}
 <section className="hero" aria-label="Introducing Acrux Aakaar">
    <div className="hero-slides">
      {heroSlides.map((s, i) => (
        <div key={s.image} className={`hero-slide${heroSlide === i ? " active" : ""}`} aria-hidden={heroSlide !== i}>
          <Picture src={`${project}${s.image}`} alt={s.alt} className="hero-picture" priority={i === 0} />
        </div>
      ))}
    </div>
    
    {/* Clean, light cinematic overlay allowing full architectural visibility */}
    <div className="hero-shade-top" />
    <div className="hero-shade-main" />
    <div className="hero-shade-bottom" />

    <div className="hero-container">
      <div className="hero-content" key={heroSlide}>
        <div className="hero-eyebrow">
          <span className="hero-beacon" />
          <span>{heroSlides[heroSlide].tag}</span>
        </div>
        <h1 className="hero-headline">
          <span className="hero-headline-primary">{heroSlides[heroSlide].title1}</span>
          <br />
          <em className="hero-headline-accent">{heroSlides[heroSlide].title2}</em>
        </h1>
        <p className="hero-description">{heroSlides[heroSlide].desc}</p>
        <div className="hero-actions">
          <a href="#enquire" className="hero-enquire-btn hero-btn-primary" onClick={openEnquiryModal}>
            <span>Enquire now</span>
            <ArrowUpRight size={16} />
          </a>
          <a href="#residences" className="hero-enquire-btn hero-btn-secondary">
            <span>Explore residences</span>
            <ArrowDown size={15} />
          </a>
        </div>
      </div>
    </div>

    {/* Clean unboxed bottom bar with perfectly aligned controls */}
    <div className="hero-bottom-bar">
      <div className="hero-bottom-left">
        <span className="hero-brand-note">A VISION BY ACRUX REALCON</span>
        <span className="hero-render-note">Artist’s impression</span>
      </div>
      <div className="hero-controls">
        <button className="hero-arrow" aria-label="Previous hero slide" onClick={prevHeroSlide}>
          <ChevronLeft size={18} />
        </button>
        <div className="hero-dots" role="group" aria-label="Choose hero slide">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              className={`hero-dot${heroSlide === i ? " active" : ""}`}
              aria-label={`Show slide ${i + 1}`}
              aria-pressed={heroSlide === i}
              onClick={() => selectHeroSlide(i)}
            >
              {heroSlide === i && (
                <span
                  className="hero-dot-fill"
                  style={{ width: `${heroProgress}%` }}
                />
              )}
            </button>
          ))}
        </div>
        <button className="hero-arrow" aria-label="Next hero slide" onClick={nextHeroSlide}>
          <ChevronRight size={18} />
        </button>
        <span className="hero-count">
          <strong>0{heroSlide + 1}</strong>
          <i>/</i>
          <span>0{heroSlides.length}</span>
        </span>
      </div>
    </div>
  </section>
 <div className="project-ribbon"><span>A signature address in Patia</span><span>G+3 Clubhouse <i/> Rooftop Sky Lounge <i/> 30+ Curated Amenities</span><a href="/brochure.pdf" download>Explore the brochure <Download size={16}/></a></div>
 <section id="overview" className="section overview"><Picture src={`${project}Entrance_Sunrise.webp`} alt="The Aakaar towers at sunrise, surrounded by green gardens"/><div className="overview-copy"><span className="eyebrow">01 / THE OVERVIEW</span><h2>A home above<br/><em>the everyday.</em></h2><p>Morning light across your living room. A quiet walk through green gardens. The city close by, yet a world of your own.</p><p>Welcome to Acrux Aakaar. Five distinctive towers in Patia, Bhubaneswar, bringing thoughtful architecture, open landscapes and everyday comforts together.</p><a href="#enquire" className="text-link" onClick={openEnquiryModal}>Find your place here <ArrowUpRight size={19}/></a></div>    <div className="overview-stats" ref={statsRef}>
      <div>
        <strong>
          <StatCounter target={556} shouldStart={statsVisible} duration={3000} holdTime={3000} />
        </strong>
        <span className="stat-label">Thoughtfully designed homes</span>
      </div>
      <div>
        <strong>
          <StatCounter target={5} shouldStart={statsVisible} duration={3000} holdTime={3000} />
        </strong>
        <span className="stat-label">Distinctive towers</span>
      </div>
      <div>
        <strong>
          <StatCounter prefix="B+S+" target={21} shouldStart={statsVisible} duration={3000} holdTime={3000} />
        </strong>
        <span className="stat-label">An elevated perspective</span>
      </div>
      <div>
        <strong>
          <StatCounter target={60} suffix="%" shouldStart={statsVisible} duration={3000} holdTime={3000} />
        </strong>
        <span className="stat-label">Open spaces</span>
      </div>
    </div></section>
 <section id="residences" className="residences section"><div className="section-heading"><span className="eyebrow">02 / YOUR PRIVATE WORLD</span><h2>Space for everything.<br/><em>Especially you.</em></h2></div><div className="residence-layout"><Picture src="/assets/Interiors/Living_Dining_Room.webp" alt="Aakaar living and dining room opening onto a balcony"/><div className="residence-details"><p className="eyebrow">THE RESIDENCES</p><div className="unit-tabs" aria-label="Residence configuration">{["2.5 BHK","3 BHK"].map((label,i) => <button key={label} aria-pressed={unit===i} onClick={() => setUnit(i)}>{label}</button>)}</div><div aria-live="polite"><h3>{unit ? "A little more room to call your own." : "Your home. Your possibilities."}</h3><p>{unit ? "Three bedrooms, welcoming shared spaces and room for every part of your day." : "Two bedrooms and a versatile study for work, creativity or a quiet retreat."}</p><div className="residence-size"><strong>{unit ? "2,148" : "1,790"}</strong><span>sq. ft.</span></div></div><a href="/brochure.pdf" download className="text-link">Explore plans &amp; details <ArrowUpRight size={20}/></a></div></div></section>
 <section id="amenities" className="section amenities"><div className="heading-row"><div className="section-heading"><span className="eyebrow">03 / LIFE BEYOND YOUR HOME</span><h2>The everyday.<br/><em>Made extraordinary.</em></h2></div><p>From peaceful gardens to evenings on the rooftop,<br/>make time for the things that make you feel alive.</p></div><div className="amenities-grid">{amenities.slice(0,allAmenities ? 6 : 3).map(([src,title,desc],i) => <article key={src}><button className="image-button" onClick={() => openImage(project+src,title)} aria-label={`View ${title}`}><Picture src={project+src} alt={title}/><span className="image-expand"><Plus size={20}/></span></button><div className="amenity-caption"><span>0{i+1}</span><div><h3>{title}</h3><p>{desc}</p></div></div></article>)}</div><button className="outline-button amenities-more" aria-expanded={allAmenities} onClick={() => setAllAmenities(!allAmenities)}>{allAmenities ? "Show less" : "Explore more amenities"}<Plus size={16}/></button></section>
 <section id="clubhouse" className="clubhouse"><Picture src={`${project}Clubhouse_Exterior.webp`} alt="The landscaped Aakaar clubhouse"/><div className="clubhouse-copy"><span className="eyebrow">A SPACE TO COME TOGETHER</span><h2>Your days.<br/><em>With more possibilities.</em></h2><p>A G+3 clubhouse for a workout, a celebration, a film with friends, or simply a welcome change of pace.</p><div className="club-links">{[["GYM.webp","Fitness studio"],["AV_ROOM.webp","Private theatre"],["SOCIETY HALL.webp","Society hall"]].map(([src,name]) => <button key={src} onClick={() => openImage(`/assets/CLUB RENDERS/${src}`,name)}>{name}<ArrowUpRight size={18}/></button>)}</div></div></section>
 <section id="gallery" className="section gallery"><div className="heading-row"><div className="section-heading"><span className="eyebrow">04 / A CLOSER LOOK</span><h2>Picture your life <em>here.</em></h2></div><div className="gallery-controls"><button onClick={() => setSlide((slide+gallery.length-1)%gallery.length)} aria-label="Previous gallery image"><ArrowLeft size={20}/></button><button onClick={() => setSlide((slide+1)%gallery.length)} aria-label="Next gallery image"><ArrowRight size={20}/></button></div></div><button className="image-button gallery-image" onClick={() => openImage(project+gallery[slide][0],gallery[slide][1])} aria-label={`Enlarge ${gallery[slide][1]}`}><Picture src={project+gallery[slide][0]} alt={gallery[slide][1]}/><span className="render-caption">Artist’s impression</span><span className="image-expand"><Plus size={22}/></span></button><div className="gallery-caption" aria-live="polite"><h3>{gallery[slide][1]}</h3><div><span>0{slide+1}</span> / 0{gallery.length}</div></div></section>
 <section id="master-plan" className="section master-plan"><div><span className="eyebrow">THOUGHTFULLY PLANNED</span><h2>A place for life<br/><em>to unfold.</em></h2><p>Homes, gardens and shared spaces, considered together. Explore how the five towers come together around the landscaped heart of Aakaar.</p><button className="text-link" onClick={() => openImage(project+"Master_Plan.webp","Aakaar master plan")}>View the master plan <ArrowUpRight size={20}/></button></div><button className="image-button" onClick={() => openImage(project+"Master_Plan.webp","Aakaar master plan")} aria-label="Enlarge master plan"><Picture src={`${project}Master_Plan.webp`} alt="Aakaar site master plan"/></button></section>
 <section id="architect" className="architect section"><Picture src={`${project}Architect_Portrait.webp`} alt="Architect Ramesh Swain"/><div><span className="eyebrow">THE MIND BEHIND THE VISION</span><h2>Imagined with care.<br/><em>Designed for living.</em></h2><p>Architecture by Ar. Ramesh Swain, bringing natural light, open views and considered spaces into the way you live.</p><span className="architect-name">Ar. Ramesh Swain <small>PROJECT ARCHITECT</small></span></div></section>
 <section id="location" className="section location"><div className="section-heading"><span className="eyebrow">05 / CONNECTED TO YOUR WORLD</span><h2>The city at your doorstep.<br/><em>Calm at your heart.</em></h2></div><div className="location-layout"><div className="location-address"><MapPin size={28} strokeWidth={1}/><h3>Patia, Bhubaneswar</h3><p>Plot No. 15W, Chandrasekharpur,<br/>Patia, Bhubaneswar, Odisha 751021</p><a className="text-link" href="https://www.google.com/maps/search/?api=1&query=Acrux+Aakaar+Patia+Bhubaneswar" target="_blank" rel="noopener noreferrer">Open in Google Maps <ArrowUpRight size={20}/></a></div><div className="nearby"><p className="eyebrow">EVERYDAY CONNECTIONS</p>{[["01","Education","KIIT University · SAI International School"],["02","Work","Infocity · TCS · Infosys"],["03","Healthcare","KIMS · Care Hospitals"],["04","Connectivity","Patia railway station · Nandankanan Road"]].map(([num,title,text]) => <div key={num}><span>{num}</span><div><h3>{title}</h3><p>{text}</p></div><ArrowUpRight size={18}/></div>)}</div></div></section>
 <section className="resources"><div><span className="eyebrow">TAKE A CLOSER LOOK</span><h2>The details make <em>the difference.</em></h2></div><a href="/brochure.pdf" download><span>Project brochure<small>RESIDENCES, PLANS &amp; AMENITIES</small></span><Download size={26} strokeWidth={1}/></a></section>
 <section id="enquire" className="section enquiry"><div><span className="eyebrow">LET’S START A CONVERSATION</span><h2>Your next chapter<br/><em>begins here.</em></h2><p>Discover Aakaar in person. Connect with our team for residence details or to arrange your visit.</p><a href="tel:+919777543339" className="contact-phone">+91 97775 43339 <ArrowUpRight size={20}/></a><a href="mailto:sales@acruxrealcon.in">sales@acruxrealcon.in</a></div><form onSubmit={(e) => { e.preventDefault(); const data=new FormData(e.currentTarget); const message=`Hello, I am ${data.get("name")}. I am interested in ${data.get("residence")} at Acrux Aakaar. Please contact me at ${data.get("phone")}${data.get("email") ? ` or ${data.get("email")}` : ""} to discuss a site visit.`; window.open(`https://wa.me/919777543339?text=${encodeURIComponent(message)}`,"_blank","noopener,noreferrer"); }}><label>Your name<input name="name" autoComplete="name" placeholder="Full name" required maxLength={100}/></label><div className="form-row"><label>Phone number<input name="phone" autoComplete="tel" type="tel" placeholder="Your phone number" pattern="[+0-9 ()\-]{7,20}" required/></label><label>Email address<input name="email" autoComplete="email" type="email" placeholder="Email (optional)"/></label></div><label>Interested in<select name="residence" defaultValue="3 BHK"><option>2.5 BHK</option><option>3 BHK</option><option>Help me choose</option></select></label><label className="consent"><input type="checkbox" required/>I agree to be contacted by Acrux Realcon about my enquiry.</label><button className="solid-button" type="submit">Continue on WhatsApp <ArrowUpRight size={18}/></button><p className="form-note">Opens WhatsApp with your enquiry. Send the message there to connect with our team.</p></form></section>
 <footer className="site-footer"><div className="footer-top"><a href="#top" className="footer-brand"><Image src="/assets/Aakaar Logo.webp" alt="Acrux Aakaar" width={170} height={70}/></a><p>A considered way of living.<br/>By Acrux Realcon.</p><a href="#top" className="back-top">Back to top <ArrowUpRight size={19}/></a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Acrux Realcon. All rights reserved.</span><span>All renders are artist’s impressions. Details subject to confirmation.</span></div></footer>
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

              <form
                className="enquiry-modal-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  const data = new FormData(e.currentTarget);
                  const name = data.get("name");
                  const phone = data.get("phone");
                  const email = data.get("email");
                  const timeSlot = data.get("timeSlot");

                  let message = "Hello Acrux Realcon Sales Team, I would like to request a private preview of Acrux Aakaar (Patia, Bhubaneswar).\n\n";
                  message += "*Name:* " + name + "\n";
                  message += "*Contact:* " + phone + "\n";
                  if (email) message += "*Email:* " + email + "\n";
                  message += "*Configuration Interest:* " + modalResidence + "\n";
                  if (timeSlot) message += "*Preferred Preview Timing:* " + timeSlot + "\n";

                  window.open(
                    "https://wa.me/919777543339?text=" + encodeURIComponent(message),
                    "_blank",
                    "noopener,noreferrer"
                  );
                  setEnquirySubmitted(true);
                }}
              >
                <div className="modal-input-group">
                  <label htmlFor="modal-name">Your Full Name *</label>
                  <input
                    id="modal-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="e.g. Ramesh Mishra"
                    required
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
                      placeholder="+91 98765 43210"
                      pattern="[+0-9 ()-]{7,20}"
                      required
                    />
                  </div>
                  <div className="modal-input-group">
                    <label htmlFor="modal-email">Email Address</label>
                    <input
                      id="modal-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="name@domain.com"
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
  <WaterCursor />
  </main>;
}