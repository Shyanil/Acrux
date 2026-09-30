const fs = require('fs');
const path = require('path');

// 1. Read fonts and encode as base64
const fontBookB64 = fs.readFileSync(path.join(__dirname, 'acrux-web/src/fonts/GothamBook.otf')).toString('base64');
const fontMediumB64 = fs.readFileSync(path.join(__dirname, 'acrux-web/src/fonts/Gotham Medium.otf')).toString('base64');

// 2. Define SVG icons
const icons = {
  arrowUpRight: (size = 16, cls = '') => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-up-right ${cls}"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>`,
  arrowDown: (size = 17, cls = '') => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-down ${cls}"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg>`,
  arrowLeft: (size = 17, cls = '') => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-left ${cls}"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>`,
  arrowRight: (size = 17, cls = '') => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right ${cls}"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>`,
  download: (size = 16, strokeWidth = 2, cls = '') => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-download ${cls}"><path d="M12 15V3"/><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/></svg>`,
  menu: (size = 24, cls = '') => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-menu ${cls}"><path d="M4 5h16"/><path d="M4 12h16"/><path d="M4 19h16"/></svg>`,
  x: (size = 24, cls = '') => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x ${cls}"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`,
  mapPin: (size = 28, strokeWidth = 1, cls = '') => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin ${cls}"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>`,
  phone: (size = 16, cls = '') => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-phone ${cls}"><path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"/></svg>`,
  plus: (size = 20, cls = '') => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus ${cls}"><path d="M5 12h14"/><path d="M12 5v14"/></svg>`
};

const htmlContent = `<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>ACRUX AAKAAR | Ultra-Luxury 2.5 &amp; 3 BHK Residences | Patia, Bhubaneswar</title>
  <meta name="description" content="A Living Masterpiece Awaits. Acrux Aakaar offers 556 ultra-luxury apartments across 5 iconic towers (B+S+21) with 60% open spaces in Chandrasekharpur, Patia, Bhubaneswar by Acrux Realcon.">
  <meta name="keywords" content="Acrux Aakaar,Acrux Realcon,Luxury Apartments Bhubaneswar,Flats in Patia Bhubaneswar,3 BHK in Patia,2.5 BHK in Patia,Bhubaneswar Real Estate">
  <meta property="og:title" content="ACRUX AAKAAR | Ultra-Luxury 2.5 &amp; 3 BHK Residences">
  <meta property="og:description" content="556 Apartments | 5 Towers | B+S+21 | 60% Open Space in Patia, Bhubaneswar.">
  <meta property="og:image" content="assets/Project/Master_Elevation.webp">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="ACRUX AAKAAR | Ultra-Luxury 2.5 &amp; 3 BHK Residences">
  <meta name="twitter:description" content="556 Apartments | 5 Towers | B+S+21 | 60% Open Space in Patia, Bhubaneswar.">
  <meta name="twitter:image" content="assets/Project/Master_Elevation.webp">
  <link rel="icon" href="favicon.ico" sizes="256x256" type="image/x-icon">
  <style>
    @font-face {
      font-family: 'Gotham';
      src: url('data:font/opentype;base64,${fontBookB64}') format('opentype');
      font-weight: 400;
      font-style: normal;
      font-display: swap;
    }
    @font-face {
      font-family: 'Gotham';
      src: url('data:font/opentype;base64,${fontMediumB64}') format('opentype');
      font-weight: 500;
      font-style: normal;
      font-display: swap;
    }

    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      border: 0 solid;
    }

    :root {
      --gold-primary: #b38b36;
      --gold-medium: #c5a059;
      --gold-dark: #8c6b25;
      --gold-light: #f7f2e7;
      --gold-champagne: #fcf9f2;
      --border-gold: rgba(179, 139, 54, 0.25);
      --border-subtle: rgba(0, 0, 0, 0.08);
      --paper: #ffffff;
      --ink: #243343;
      --muted: #707983;
      --accent: #a1413e;
      --navy: #243343;
      --vermilion: #ad3f3c;
      --font-gotham: 'Gotham', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    }

    html {
      scroll-behavior: smooth;
      color-scheme: light;
      -webkit-text-size-adjust: 100%;
    }

    body {
      background-color: #ffffff;
      color: #121820;
      font-family: var(--font-gotham), sans-serif;
      overflow-x: hidden;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    ::selection {
      background: #b38b36;
      color: #ffffff;
    }

    /* Base Typography & Elements */
    .aakaar-site {
      color: var(--ink);
      background: var(--paper);
      font-family: var(--font-gotham), sans-serif;
      font-size: 14px;
      line-height: 1.8;
      width: 100%;
      position: relative;
    }
    .aakaar-site * {
      box-sizing: border-box;
    }
    .aakaar-site section {
      scroll-margin-top: 92px;
    }
    .aakaar-site a, .aakaar-site button {
      transition: color .2s, background .2s, border-color .2s;
    }
    .aakaar-site button {
      cursor: pointer;
      background: none;
      border: none;
      font: inherit;
      color: inherit;
    }
    .aakaar-site a {
      text-decoration: none;
      color: inherit;
    }
    .aakaar-site a:hover {
      color: var(--accent);
    }
    .aakaar-site :focus-visible {
      outline: 2px solid var(--accent);
      outline-offset: 5px;
    }
    .aakaar-site h1, .aakaar-site h2, .aakaar-site h3 {
      font-family: Georgia, 'Times New Roman', serif;
      font-weight: 400;
      line-height: 1.12;
      letter-spacing: -.035em;
    }
    .aakaar-site h1 {
      font-size: clamp(64px, 6.8vw, 110px);
      line-height: 1.02;
      margin: 23px 0;
      color: #ffffff;
    }
    .aakaar-site h1 em {
      color: #eee3ce;
      font-style: italic;
    }
    .aakaar-site h2 {
      font-size: clamp(36px, 3.5vw, 58px);
      margin: 22px 0 30px;
      color: #243343;
    }
    .aakaar-site h2 em {
      color: #a1413e;
      font-style: italic;
    }
    .aakaar-site h3 {
      font-size: 28px;
    }
    .aakaar-site em {
      font-weight: 400;
      color: var(--accent);
      font-style: italic;
    }
    .aakaar-site p {
      color: var(--muted);
    }
    .eyebrow {
      font-size: 10px;
      letter-spacing: .22em;
      font-weight: 500;
      line-height: 1.6;
      text-transform: uppercase;
    }
    .section {
      padding: 105px max(6vw, 24px);
    }

    /* Skip link */
    .skip-link {
      position: fixed;
      top: -100px;
      left: 15px;
      z-index: 100;
      padding: 10px 16px;
      background: white;
      color: #121820;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      border-radius: 4px;
      font-size: 12px;
      opacity: 0;
      pointer-events: none;
      transition: top 0.2s, opacity 0.2s;
    }
    .skip-link:focus {
      top: 10px;
      opacity: 1;
      pointer-events: auto;
    }

    /* Picture container helper */
    .picture {
      position: relative;
      overflow: hidden;
      width: 100%;
      min-height: 200px;
    }
    .picture-image {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform .7s;
      display: block;
    }

    /* Header */
    .site-header {
      position: absolute;
      inset: 0 0 auto;
      height: 92px;
      padding: 0 5%;
      display: flex;
      align-items: center;
      gap: 36px;
      background: transparent;
      color: #fff;
      border-bottom: 0;
      z-index: 40;
      transition: background .25s, color .25s, box-shadow .25s;
    }
    .site-header .brand {
      margin-right: auto;
      display: flex;
      align-items: center;
    }
    .site-header .brand img {
      width: 146px;
      height: 63px;
      object-fit: contain;
      filter: brightness(0) invert(1);
      transition: filter .25s;
    }
    .desktop-nav {
      display: flex;
      gap: 30px;
    }
    .desktop-nav a {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: .12em;
      color: #fff;
    }
    .desktop-nav a:hover {
      color: #e8b6aa;
    }
    .header-enquire {
      background: #ffffff16;
      color: #fff;
      border: 1px solid #ffffffa6;
      padding: 11px 15px;
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: .1em;
      border-radius: 2px;
    }
    .header-enquire:hover {
      background: #fff;
      color: #243343 !important;
    }
    .menu-toggle {
      display: none;
      color: #fff;
    }
    .site-header.is-scrolled {
      position: fixed;
      inset: 0 0 auto;
      background: #fff;
      color: #243343;
      border-bottom: 1px solid rgba(41, 44, 39, 0.08);
      box-shadow: 0 5px 20px rgba(24, 39, 56, 0.05);
    }
    .site-header.is-scrolled .desktop-nav a,
    .site-header.is-scrolled .menu-toggle {
      color: #243343;
    }
    .site-header.is-scrolled .desktop-nav a:hover {
      color: #a1413e;
    }
    .site-header.is-scrolled .brand img {
      filter: none;
    }
    .site-header.is-scrolled .header-enquire {
      background: #ad3f3c;
      color: #fff;
      border-color: #ad3f3c;
    }
    .site-header.is-scrolled .header-enquire:hover {
      background: #853532;
      color: #fff !important;
    }

    /* Mobile navigation */
    .mobile-nav {
      position: fixed;
      top: 92px;
      left: 0;
      right: 0;
      background: #ffffff;
      padding: 22px 6%;
      z-index: 45;
      box-shadow: 0 20px 30px rgba(0,0,0,0.12);
      display: none;
      flex-direction: column;
    }
    .mobile-nav.open {
      display: flex;
    }
    .mobile-nav a {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px 0;
      border-bottom: 1px solid #ddd6c9;
      font-size: 13px;
      color: #243343;
    }
    .mobile-nav a:hover {
      color: #a1413e;
    }

    /* Hero Section */
    .hero {
      height: min(780px, 100svh);
      min-height: 580px;
      position: relative;
      color: white;
      overflow: hidden;
    }
    .hero-slides, .hero-slide {
      position: absolute;
      inset: 0;
    }
    .hero-slide {
      opacity: 0;
      visibility: hidden;
      transition: opacity 1s ease, visibility 1s ease;
    }
    .hero-slide.active {
      opacity: 1;
      visibility: visible;
    }
    .hero-picture {
      position: absolute;
      inset: 0;
      height: 100%;
      width: 100%;
    }
    .hero-picture .picture-image {
      object-position: center 55%;
      transform: scale(1.025);
      transition: transform 7s ease;
    }
    .hero-slide.active .picture-image {
      transform: scale(1);
    }
    .hero-shade {
      position: absolute;
      inset: 0;
      background: linear-gradient(90deg, rgba(12,25,21,.65), rgba(12,25,21,.06) 80%), linear-gradient(0deg, rgba(16,35,28,.4), transparent 45%);
      pointer-events: none;
    }
    .hero-content {
      position: absolute;
      left: 7%;
      top: 25%;
      max-width: 660px;
      z-index: 2;
      animation: hero-enter .65s ease both;
    }
    @keyframes hero-enter {
      from { opacity: 0; transform: translateY(15px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .hero p {
      color: #f6f2e8;
      font-size: 13px;
      letter-spacing: .03em;
    }
    .hero-link {
      display: inline-flex;
      align-items: center;
      justify-content: space-between;
      width: 190px;
      border-bottom: 1px solid rgba(255,255,255,0.5);
      padding: 18px 0;
      margin-top: 28px;
      text-transform: uppercase;
      letter-spacing: .12em;
      font-size: 10px;
      color: #fff;
    }
    .hero-link:hover {
      color: #eee3ce;
      border-color: #fff;
    }
    .hero-side {
      position: absolute;
      right: 28px;
      top: 32%;
      writing-mode: vertical-rl;
      font-size: 9px;
      letter-spacing: .25em;
      color: rgba(255,255,255,0.7);
      z-index: 2;
    }
    .hero-bottom {
      position: absolute;
      bottom: 23px;
      left: 7%;
      right: 4%;
      display: flex;
      justify-content: space-between;
      font-size: 8px;
      letter-spacing: .16em;
      color: rgba(255,255,255,0.7);
      z-index: 2;
    }
    .hero-bottom span:last-child {
      letter-spacing: .02em;
    }
    .hero-controls {
      position: absolute;
      right: 7%;
      bottom: 62px;
      z-index: 3;
      display: flex;
      align-items: center;
      gap: 15px;
      color: #fff;
    }
    .hero-arrow {
      display: grid;
      place-items: center;
      width: 40px;
      height: 40px;
      border: 1px solid rgba(255,255,255,0.54);
      border-radius: 50%;
      color: #fff;
      background: rgba(23,37,27,0.2);
    }
    .hero-arrow:hover {
      background: #fff;
      color: #243343;
    }
    .hero-dots {
      display: flex;
      gap: 8px;
      align-items: center;
    }
    .hero-dots button {
      height: 5px;
      width: 20px;
      background: rgba(255,255,255,0.46);
      border-radius: 9px;
      transition: width .25s, background .25s;
    }
    .hero-dots button.active {
      width: 38px;
      background: #fff;
    }
    .hero-count {
      font-size: 9px;
      letter-spacing: .12em;
      margin-left: 3px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .hero-count i {
      width: 17px;
      height: 1px;
      background: rgba(255,255,255,0.56);
      display: inline-block;
    }

    /* Project Ribbon */
    .project-ribbon {
      position: relative;
      background: #243343;
      color: #f8f7f2;
      border: 0;
      padding: 19px 6%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 25px;
      font-size: 10px;
    }
    .project-ribbon > span:first-child {
      font-family: Georgia, serif;
      font-size: 18px;
      color: #fff;
    }
    .project-ribbon span:nth-child(2) {
      display: flex;
      align-items: center;
      gap: 19px;
    }
    .project-ribbon i {
      height: 3px;
      width: 3px;
      background: var(--accent);
      border-radius: 50%;
      display: inline-block;
    }
    .project-ribbon a {
      display: flex;
      align-items: center;
      gap: 17px;
      color: #f8f7f2;
    }
    .project-ribbon a:hover {
      color: #e8b6aa;
    }

    /* Section 01 / Overview */
    .overview {
      display: grid;
      grid-template-columns: .76fr 1.24fr;
      align-items: center;
      gap: 38px 8%;
      padding-bottom: 0;
      background: #fff;
    }
    .overview > .picture {
      height: 385px;
      min-height: 385px;
    }
    .overview > .picture .picture-image {
      object-position: center 43%;
    }
    .overview-copy {
      padding-top: 0;
      max-width: 560px;
    }
    .overview-copy h2 {
      color: #243343;
      margin: 16px 0 22px;
    }
    .overview-copy p {
      font-size: 12px;
      max-width: 490px;
      line-height: 1.8;
    }
    .overview-copy p + p {
      margin-top: 18px;
    }
    .text-link {
      display: inline-flex;
      align-items: center;
      justify-content: space-between;
      gap: 35px;
      border-bottom: 1px solid var(--accent);
      padding: 12px 0;
      font-size: 11px;
      margin-top: 16px;
      color: var(--ink);
    }
    .text-link:hover {
      color: var(--accent);
    }
    .overview-stats {
      position: relative;
      isolation: isolate;
      grid-column: 1 / -1;
      margin: 38px calc(max(6vw, 24px) * -1) 0;
      padding: 32px max(6vw, 24px);
      background: #243343;
      color: #fff;
      border: 0;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
    }
    .overview-stats::after {
      content: "";
      position: absolute;
      inset: 0;
      z-index: -1;
      opacity: .075;
      background: repeating-linear-gradient(135deg, transparent 0 12px, #fff 12px 14px, transparent 14px 24px);
    }
    .overview-stats > div {
      border-right: 1px solid rgba(255,255,255,0.22);
      text-align: center;
    }
    .overview-stats > div:last-child {
      border: 0;
    }
    .overview-stats strong {
      font: 400 clamp(32px, 3.5vw, 56px) Georgia, serif;
      display: block;
      color: #fff;
    }
    .overview-stats span {
      display: block;
      font-size: 10px;
      margin-top: 13px;
      color: #e3e4e3;
      letter-spacing: .05em;
    }

    /* Section 02 / Residences */
    .residences {
      background: #fff;
    }
    .residence-layout {
      display: grid;
      grid-template-columns: 1.6fr 1fr;
      gap: 0;
      margin-top: 45px;
    }
    .residence-layout > .picture {
      min-height: 540px;
      background: #f2f0ea;
    }
    .residence-details {
      padding: 45px 0 25px 60px;
    }
    .unit-tabs {
      display: flex;
      gap: 28px;
      border-bottom: 1px solid #cec8bb;
      margin: 28px 0;
    }
    .unit-tabs button {
      padding: 12px 0;
      color: #767467;
      border-bottom: 2px solid transparent;
      font-size: 17px;
    }
    .unit-tabs button[aria-pressed="true"] {
      color: var(--ink);
      border-color: var(--accent);
      font-weight: 500;
    }
    .residence-details h3 {
      font-size: 36px;
      max-width: 320px;
      margin-bottom: 20px;
      min-height: 80px;
    }
    .residence-details p {
      font-size: 12px;
      max-width: 340px;
      min-height: 44px;
    }
    .residence-size {
      display: flex;
      align-items: baseline;
      gap: 12px;
      margin-top: 28px;
    }
    .residence-size strong {
      font: 40px Georgia, serif;
      color: var(--accent);
    }
    .residence-size span {
      font-size: 11px;
      color: var(--muted);
    }

    /* Section 03 / Amenities */
    .amenities {
      background: #fff;
    }
    .heading-row {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      gap: 40px;
      margin-bottom: 45px;
    }
    .heading-row h2 {
      margin-bottom: 0;
    }
    .heading-row > p {
      max-width: 400px;
      font-size: 12px;
    }
    .amenities-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 35px 25px;
    }
    .image-button {
      position: relative;
      display: block;
      width: 100%;
      text-align: left;
      overflow: hidden;
      cursor: pointer;
    }
    .image-button:hover .picture-image {
      transform: scale(1.035);
    }
    .amenities-grid .picture {
      height: 370px;
      background: #f2f0ea;
    }
    .image-expand {
      position: absolute;
      right: 16px;
      bottom: 16px;
      width: 38px;
      height: 38px;
      display: grid;
      place-items: center;
      background: rgba(251,250,247,0.92);
      color: var(--ink);
      border-radius: 50%;
      box-shadow: 0 4px 10px rgba(0,0,0,0.1);
      transition: transform .2s, background .2s;
    }
    .image-button:hover .image-expand {
      transform: scale(1.08);
      background: #ffffff;
    }
    .amenity-caption {
      display: flex;
      gap: 20px;
      margin-top: 22px;
    }
    .amenity-caption > span {
      color: var(--accent);
      font-size: 10px;
      margin-top: 7px;
    }
    .amenity-caption h3 {
      font-size: 26px;
    }
    .amenity-caption p {
      font-size: 10px;
      margin-top: 9px;
    }
    .outline-button {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 32px;
      padding: 15px 23px;
      border: 1px solid #ad3f3c;
      color: #ad3f3c;
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: .1em;
      border-radius: 2px;
    }
    .outline-button:hover {
      background: #ad3f3c;
      color: #fff;
    }
    .amenities-more {
      margin: 48px auto 0;
    }
    .amenity-extra {
      display: none;
    }
    .amenity-extra.show {
      display: block;
      animation: hero-enter .45s ease both;
    }

    /* Clubhouse */
    .clubhouse {
      display: grid;
      grid-template-columns: 1fr 1fr;
      background: #293b32;
      color: white;
    }
    .clubhouse > .picture {
      min-height: 650px;
    }
    .clubhouse-copy {
      padding: 80px 12%;
    }
    .clubhouse h2 {
      font-size: clamp(36px, 3.5vw, 56px);
      color: #fff;
    }
    .clubhouse em {
      color: #cbbb99;
    }
    .clubhouse p {
      color: #d0d7cd;
      font-size: 12px;
    }
    .club-links {
      margin-top: 40px;
    }
    .club-links button {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      padding: 18px 0;
      border-bottom: 1px solid rgba(255,255,255,0.19);
      font-size: 12px;
      color: #fff;
    }
    .club-links button:hover {
      color: #d2bc91;
    }

    /* Section 04 / Gallery */
    .gallery {
      background: #fff;
    }
    .gallery-controls {
      display: flex;
      gap: 10px;
    }
    .gallery-controls button {
      border: 1px solid #ccc6b9;
      border-radius: 50%;
      padding: 14px;
      display: grid;
      place-items: center;
      color: var(--ink);
    }
    .gallery-controls button:hover {
      background: #e7e1d6;
    }
    .gallery-image .picture {
      height: 580px;
      background: #f2f0ea;
    }
    .render-caption {
      position: absolute;
      left: 18px;
      bottom: 16px;
      color: white;
      text-shadow: 0 1px 4px black;
      font-size: 9px;
      z-index: 2;
    }
    .gallery-caption {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 24px;
    }
    .gallery-caption h3 {
      font-size: 27px;
    }
    .gallery-caption > div {
      font-size: 11px;
      color: #898476;
    }
    .gallery-caption span {
      color: var(--ink);
      margin-right: 15px;
    }

    /* Master Plan */
    .master-plan {
      background: #eae7dd;
      display: grid;
      grid-template-columns: .85fr 1.15fr;
      gap: 10%;
      align-items: center;
    }
    .master-plan p {
      max-width: 370px;
      font-size: 13px;
    }
    .master-plan .picture {
      height: 500px;
    }
    .master-plan .picture-image {
      object-fit: contain;
    }

    /* Architect */
    .architect {
      display: grid;
      grid-template-columns: .7fr 1.3fr;
      align-items: center;
      gap: 10%;
      border-bottom: 1px solid #dedbd2;
    }
    .architect > .picture {
      height: 400px;
    }
    .architect .picture-image {
      object-position: top;
    }
    .architect p {
      max-width: 500px;
    }
    .architect-name {
      display: block;
      font: 24px Georgia, serif;
      margin-top: 30px;
    }
    .architect-name small {
      display: block;
      font: 9px var(--font-gotham), sans-serif;
      letter-spacing: .15em;
      color: var(--accent);
      margin-top: 12px;
    }

    /* Section 05 / Location */
    .location-layout {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8%;
      margin-top: 45px;
    }
    .location-address {
      padding: 45px;
      background: #eeebe2;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
    }
    .location-address > svg {
      color: var(--accent);
      margin-bottom: 25px;
    }
    .location-address h3 {
      font-size: 34px;
    }
    .location-address p {
      margin-top: 20px;
      font-size: 12px;
      line-height: 1.8;
    }
    .nearby > div {
      display: flex;
      align-items: center;
      gap: 25px;
      border-bottom: 1px solid #dcd7cc;
      padding: 23px 0;
    }
    .nearby > div > span {
      color: var(--accent);
      font-size: 10px;
    }
    .nearby > div > svg {
      margin-left: auto;
      color: var(--accent);
    }
    .nearby h3 {
      font-size: 24px;
    }
    .nearby p {
      font-size: 11px;
      margin-top: 7px;
    }

    /* Resources */
    .resources {
      padding: 60px 6%;
      background: #f5f4f0;
      display: flex;
      align-items: center;
      gap: 60px;
      justify-content: space-between;
    }
    .resources h2 {
      font-size: 35px;
      margin-bottom: 0;
      max-width: 540px;
    }
    .resources > a {
      display: flex;
      align-items: center;
      gap: 65px;
      border-bottom: 1px solid #a49881;
      padding: 20px 0;
      font: 26px Georgia, serif;
      color: var(--ink);
    }
    .resources small {
      font: 8px var(--font-gotham), sans-serif;
      letter-spacing: .1em;
      display: block;
      margin-top: 15px;
      color: var(--muted);
    }

    /* Enquiry */
    .enquiry {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12%;
      background: #ffffff;
    }
    .enquiry > div > p {
      max-width: 375px;
      font-size: 13px;
    }
    .contact-phone {
      display: flex;
      align-items: center;
      gap: 20px;
      font: 27px Georgia, serif;
      margin: 35px 0 15px;
      color: var(--ink);
    }
    .contact-phone:hover, .enquiry > div > a:last-child:hover {
      color: #ad3f3c;
    }
    .enquiry > div > a:last-child {
      font-size: 12px;
      color: var(--ink);
    }
    .enquiry form {
      padding-top: 10px;
    }
    .enquiry label {
      display: block;
      font-size: 10px;
      letter-spacing: .02em;
      margin-bottom: 25px;
      color: var(--ink);
    }
    .enquiry input:not([type=checkbox]), .enquiry select {
      display: block;
      border: 0;
      border-bottom: 1px solid #cfcabc;
      border-radius: 0;
      width: 100%;
      background: transparent;
      padding: 13px 0;
      color: var(--ink);
      font: 13px var(--font-gotham), sans-serif;
      outline: none;
    }
    .enquiry input:not([type=checkbox]):focus, .enquiry select:focus {
      border-bottom-color: var(--accent);
    }
    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 22px;
    }
    .enquiry .consent {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      font-size: 9px;
      line-height: 1.7;
      letter-spacing: 0;
      cursor: pointer;
    }
    .consent input {
      accent-color: #816a42;
      margin-top: 3px;
      cursor: pointer;
    }
    .solid-button {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 25px;
      background: #ad3f3c;
      color: white;
      padding: 18px 24px;
      width: 100%;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: .1em;
      border: none;
      border-radius: 2px;
    }
    .solid-button:hover {
      background: #873431;
    }
    .enquiry .form-note {
      font-size: 9px;
      margin-top: 15px;
      line-height: 1.7;
      color: var(--muted);
    }

    /* Footer */
    .site-footer {
      padding: 50px 6% 25px;
      background: #eeeae0;
    }
    .footer-top {
      display: flex;
      align-items: center;
      gap: 65px;
      padding-bottom: 40px;
    }
    .footer-brand img {
      width: 170px;
      height: 70px;
      object-fit: contain;
    }
    .footer-top p {
      font-size: 11px;
      color: var(--muted);
    }
    .back-top {
      margin-left: auto;
      display: flex;
      gap: 25px;
      align-items: center;
      font-size: 10px;
      color: var(--ink);
    }
    .footer-bottom {
      border-top: 1px solid #d4cebf;
      padding-top: 22px;
      display: flex;
      justify-content: space-between;
      gap: 25px;
      font-size: 8px;
      color: #747268;
    }

    /* Mobile CTA Bar */
    .mobile-cta {
      display: none;
    }

    /* Lightbox Modal */
    .image-dialog {
      margin: auto;
      padding: 24px;
      width: 94vw;
      max-width: 1400px;
      max-height: 95svh;
      background: #f7f5ef;
      border: 0;
      color: var(--ink);
      border-radius: 4px;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4);
    }
    .image-dialog::backdrop {
      background: rgba(16, 26, 22, 0.86);
      backdrop-filter: blur(4px);
    }
    .dialog-close {
      display: grid;
      place-items: center;
      position: absolute;
      right: 15px;
      top: 15px;
      z-index: 2;
      background: white;
      width: 42px;
      height: 42px;
      border-radius: 50%;
      color: var(--ink);
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }
    .dialog-close:hover {
      background: #f0ede6;
    }
    .lightbox-picture {
      position: relative;
      height: 75svh;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .lightbox-picture img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
    }
    .image-dialog > p {
      text-align: center;
      margin-top: 15px;
      font-size: 13px;
      font-weight: 500;
    }
    body:has(dialog[open]) {
      overflow: hidden;
    }

    /* Responsive Queries */
    @media (min-width: 1600px) {
      .section {
        padding-left: max(8vw, calc((100vw - 1380px)/2));
        padding-right: max(8vw, calc((100vw - 1380px)/2));
      }
    }
    @media (max-width: 1100px) {
      .desktop-nav { gap: 18px; }
      .site-header { gap: 25px; }
      .residence-details { padding-left: 35px; }
      .project-ribbon > span:first-child { display: none; }
      .amenities-grid .picture { height: 280px; }
      .clubhouse-copy { padding: 60px 9%; }
      .clubhouse > .picture { min-height: 580px; }
      .resources { gap: 35px; }
      .resources > a { gap: 25px; min-width: 270px; }
    }
    @media (max-width: 960px) {
      .desktop-nav { display: none; }
      .menu-toggle { display: grid; place-items: center; width: 40px; height: 40px; color: #fff; }
      .site-header { gap: 14px; }
      .site-header.is-scrolled .menu-toggle { color: #243343; }
      .mobile-nav { top: 92px; }
      .residence-layout { grid-template-columns: 1fr; gap: 10px; }
      .residence-layout > .picture { min-height: 380px; }
      .residence-details { padding: 25px 0 10px; }
      .amenities-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      .amenities-grid .picture { height: 300px; }
    }
    @media (max-width: 760px) {
      .site-header { height: 76px; padding: 0 22px; gap: 12px; }
      .brand { min-width: 0; }
      .site-header .brand img { width: 108px; height: auto; }
      .menu-toggle { width: 36px; flex: 0 0 36px; }
      .header-enquire { white-space: nowrap; padding: 9px 10px; font-size: 8px; gap: 8px; letter-spacing: .06em; }
      .mobile-nav { top: 76px; }
      .hero { min-height: 590px; height: calc(90svh - 76px); max-height: 800px; }
      .hero-content { left: 7%; right: 8%; top: 25%; }
      .hero h1 { font-size: clamp(52px, 11vw, 76px); }
      .hero p { font-size: 11px; max-width: 240px; }
      .hero-side { right: 13px; font-size: 8px; }
      .hero-picture .picture-image { object-position: 60% center; }
      .hero-shade { background: linear-gradient(90deg, #12291f9c, #12291f20), linear-gradient(0deg, #12291f70, transparent); }
      .hero-bottom { font-size: 7px; right: 24px; }
      .hero-controls { right: 24px; bottom: 58px; gap: 10px; }
      .hero-arrow { width: 36px; height: 36px; }
      .hero-count { font-size: 8px; }
      .hero-dots { gap: 6px; }
      .hero-dots button { width: 14px; }
      .hero-dots button.active { width: 28px; }
      .project-ribbon { padding: 20px 24px; flex-direction: column; gap: 10px; background: #243343; }
      .project-ribbon span:nth-child(2) { gap: 14px; font-size: 9px; }
      .project-ribbon > a { font-size: 9px; }
      .section { padding: 65px 24px; }
      .aakaar-site section { scroll-margin-top: 76px; }
      .aakaar-site h2 { font-size: 36px; margin: 18px 0 25px; }
      .eyebrow { font-size: 9px; }
      .overview { grid-template-columns: 1fr; gap: 25px; padding-bottom: 0; }
      .overview > .picture { height: 300px; min-height: 300px; }
      .overview-copy { padding-top: 0; font-size: 12px; }
      .overview-stats { grid-column: 1; margin: 18px -24px 0; padding: 25px 24px; grid-template-columns: 1fr 1fr; row-gap: 32px; }
      .overview-stats > div:nth-child(2) { border: 0; }
      .overview-stats strong { font-size: 36px; }
      .overview-stats span { font-size: 8px; }
      .residence-layout { grid-template-columns: 1fr; margin-top: 30px; }
      .residence-layout > .picture { min-height: 300px; }
      .residence-details { padding: 30px 0 0; }
      .residence-details h3 { font-size: 31px; max-width: none; min-height: auto; }
      .residence-details p { max-width: none; min-height: auto; }
      .heading-row { align-items: flex-start; gap: 20px; flex-wrap: wrap; margin-bottom: 30px; }
      .heading-row h2 { margin-bottom: 0; }
      .heading-row > p { font-size: 11px; }
      .amenities-grid { grid-template-columns: 1fr; gap: 32px; }
      .amenities-grid .picture { height: 330px; }
      .amenity-caption h3 { font-size: 27px; }
      .amenity-caption p { font-size: 11px; }
      .clubhouse { grid-template-columns: 1fr; }
      .clubhouse > .picture { min-height: 370px; }
      .clubhouse-copy { padding: 50px 24px; }
      .gallery .heading-row { flex-wrap: nowrap; align-items: flex-end; }
      .gallery .heading-row h2 { font-size: 34px; }
      .gallery-controls { gap: 6px; }
      .gallery-controls button { padding: 10px; }
      .gallery-image .picture { height: 350px; }
      .gallery-caption h3 { font-size: 22px; max-width: 75%; }
      .master-plan { grid-template-columns: 1fr; gap: 25px; }
      .master-plan .picture { height: 370px; }
      .architect { grid-template-columns: 1fr; gap: 35px; }
      .architect > .picture { height: 360px; max-width: 350px; }
      .architect p { font-size: 12px; }
      .location-layout { grid-template-columns: 1fr; gap: 35px; margin-top: 30px; }
      .location-address { padding: 30px; }
      .location-address h3 { font-size: 29px; }
      .nearby > div { gap: 18px; }
      .nearby p { font-size: 10px; }
      .resources { padding: 45px 24px; flex-direction: column; align-items: stretch; gap: 15px; }
      .resources h2 { font-size: 32px; }
      .resources > a { justify-content: space-between; font-size: 25px; }
      .enquiry { grid-template-columns: 1fr; gap: 40px; }
      .form-row { grid-template-columns: 1fr; gap: 0; }
      .site-footer { padding: 40px 24px 90px; }
      .footer-top { flex-wrap: wrap; gap: 25px; }
      .footer-brand img { width: 125px; height: auto; }
      .footer-top p { font-size: 10px; }
      .back-top { margin-left: 0; }
      .footer-bottom { flex-direction: column; gap: 10px; line-height: 1.8; }
      .mobile-cta {
        display: grid;
        grid-template-columns: 1fr 1fr;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 35;
        background: #fbfaf7;
        border-top: 1px solid #d2c8b4;
        padding-bottom: env(safe-area-inset-bottom);
      }
      .mobile-cta a {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 12px;
        padding: 17px 8px;
        font-size: 10px;
        color: #121820;
      }
      .mobile-cta a:last-child {
        background: #ad3f3c;
        color: white;
      }
      .image-dialog { padding: 12px; }
      .lightbox-picture { height: 65svh; }
    }
    @media (prefers-reduced-motion: reduce) {
      html { scroll-behavior: auto !important; }
      .aakaar-site * { transition: none !important; animation: none !important; }
    }
  </style>
</head>
<body class="font-sans bg-white text-[#121820] antialiased selection:bg-[#b38b36] selection:text-white">

  <main class="aakaar-site" id="top">
    <a href="#overview" class="skip-link">Skip to content</a>

    <!-- Header -->
    <header class="site-header" id="site-header">
      <a href="#top" class="brand" aria-label="Acrux Aakaar home">
        <img src="assets/Aakaar Logo.webp" alt="Acrux Aakaar" width="160" height="65">
      </a>
      <nav aria-label="Main navigation" class="desktop-nav">
        <a href="#overview">Overview</a>
        <a href="#residences">Residences</a>
        <a href="#amenities">Amenities</a>
        <a href="#gallery">Gallery</a>
        <a href="#location">Location</a>
      </nav>
      <a href="#enquire" class="header-enquire">
        Enquire now ${icons.arrowUpRight(16)}
      </a>
      <button class="menu-toggle" id="menu-toggle-btn" aria-label="Open navigation" aria-expanded="false" aria-controls="mobile-nav">
        <span id="menu-icon">${icons.menu(24)}</span>
      </button>
    </header>

    <!-- Mobile Drawer -->
    <nav class="mobile-nav" id="mobile-nav" aria-label="Mobile navigation">
      <a href="#overview">Overview ${icons.arrowUpRight(20)}</a>
      <a href="#residences">Residences ${icons.arrowUpRight(20)}</a>
      <a href="#amenities">Amenities ${icons.arrowUpRight(20)}</a>
      <a href="#gallery">Gallery ${icons.arrowUpRight(20)}</a>
      <a href="#location">Location ${icons.arrowUpRight(20)}</a>
    </nav>

    <!-- Hero Section -->
    <section class="hero" aria-label="Introducing Acrux Aakaar">
      <div class="hero-slides">
        <div class="hero-slide active" id="hero-slide-0" aria-hidden="false">
          <div class="picture hero-picture">
            <img src="assets/Project/Master_Elevation.webp" alt="Aakaar residential towers surrounded by landscaped gardens" class="picture-image">
          </div>
        </div>
        <div class="hero-slide" id="hero-slide-1" aria-hidden="true">
          <div class="picture hero-picture">
            <img src="assets/Project/Entrance_Dusk.webp" alt="The Aakaar entrance at dusk" class="picture-image" loading="lazy">
          </div>
        </div>
        <div class="hero-slide" id="hero-slide-2" aria-hidden="true">
          <div class="picture hero-picture">
            <img src="assets/Project/Entrance_Sunrise.webp" alt="Aakaar residences in the morning light" class="picture-image" loading="lazy">
          </div>
        </div>
      </div>

      <div class="hero-shade"></div>

      <div class="hero-content" id="hero-content">
        <span class="eyebrow">PATIA, BHUBANESWAR</span>
        <h1 id="hero-h1">A life, beautifully<br><em>shaped.</em></h1>
        <p id="hero-p">Room to grow. Space to breathe. A place to call your own.</p>
        <a href="#overview" class="hero-link">
          Discover Aakaar ${icons.arrowDown(17)}
        </a>
      </div>

      <span class="hero-side">ARCHITECTURE. NATURE. YOU.</span>

      <div class="hero-bottom">
        <span>A VISION BY ACRUX REALCON</span>
        <span>Artist’s impression</span>
      </div>

      <div class="hero-controls">
        <button class="hero-arrow" id="hero-prev" aria-label="Previous hero slide">
          ${icons.arrowLeft(17)}
        </button>
        <div class="hero-dots" id="hero-dots" role="group" aria-label="Choose hero slide">
          <button class="active" aria-label="Show hero slide 1" aria-pressed="true" data-index="0"></button>
          <button class="" aria-label="Show hero slide 2" aria-pressed="false" data-index="1"></button>
          <button class="" aria-label="Show hero slide 3" aria-pressed="false" data-index="2"></button>
        </div>
        <button class="hero-arrow" id="hero-next" aria-label="Next hero slide">
          ${icons.arrowRight(17)}
        </button>
        <span class="hero-count" id="hero-count">01 <i></i> 03</span>
      </div>
    </section>

    <!-- Project Ribbon -->
    <div class="project-ribbon">
      <span>A new perspective on living</span>
      <span>5 towers <i></i> 556 residences <i></i> 60% open space</span>
      <a href="brochure.pdf" download>
        Explore the brochure ${icons.download(16)}
      </a>
    </div>

    <!-- Section 01 / Overview -->
    <section id="overview" class="section overview">
      <div class="picture">
        <img src="assets/Project/Entrance_Sunrise.webp" alt="The Aakaar towers at sunrise, surrounded by green gardens" class="picture-image" loading="lazy">
      </div>
      <div class="overview-copy">
        <span class="eyebrow">01 / THE OVERVIEW</span>
        <h2>A home above<br><em>the everyday.</em></h2>
        <p>Morning light across your living room. A quiet walk through green gardens. The city close by, yet a world of your own.</p>
        <p>Welcome to Acrux Aakaar. Five distinctive towers in Patia, Bhubaneswar, bringing thoughtful architecture, open landscapes and everyday comforts together.</p>
        <a href="#enquire" class="text-link">
          Find your place here ${icons.arrowUpRight(19)}
        </a>
      </div>
      <div class="overview-stats">
        <div><strong>556</strong><span>Thoughtfully designed homes</span></div>
        <div><strong>5</strong><span>Distinctive towers</span></div>
        <div><strong>B+S+21</strong><span>An elevated perspective</span></div>
        <div><strong>60%</strong><span>Open spaces</span></div>
      </div>
    </section>

    <!-- Section 02 / Residences -->
    <section id="residences" class="residences section">
      <div class="section-heading">
        <span class="eyebrow">02 / YOUR PRIVATE WORLD</span>
        <h2>Space for everything.<br><em>Especially you.</em></h2>
      </div>
      <div class="residence-layout">
        <div class="picture">
          <img src="assets/Interiors/Living_Dining_Room.webp" alt="Aakaar living and dining room opening onto a balcony" class="picture-image" loading="lazy">
        </div>
        <div class="residence-details">
          <p class="eyebrow">THE RESIDENCES</p>
          <div class="unit-tabs" aria-label="Residence configuration">
            <button id="tab-25bhk" aria-pressed="false">2.5 BHK</button>
            <button id="tab-3bhk" aria-pressed="true">3 BHK</button>
          </div>
          <div aria-live="polite">
            <h3 id="residence-title">A little more room to call your own.</h3>
            <p id="residence-desc">Three bedrooms, welcoming shared spaces and room for every part of your day.</p>
            <div class="residence-size">
              <strong id="residence-sqft">2,148</strong>
              <span>sq. ft.</span>
            </div>
          </div>
          <a href="brochure.pdf" download class="text-link">
            Explore plans &amp; details ${icons.arrowUpRight(20)}
          </a>
        </div>
      </div>
    </section>

    <!-- Section 03 / Amenities -->
    <section id="amenities" class="section amenities">
      <div class="heading-row">
        <div class="section-heading">
          <span class="eyebrow">03 / LIFE BEYOND YOUR HOME</span>
          <h2>The everyday.<br><em>Made extraordinary.</em></h2>
        </div>
        <p>From peaceful gardens to evenings on the rooftop,<br>make time for the things that make you feel alive.</p>
      </div>

      <div class="amenities-grid">
        <!-- Amenity 1 -->
        <article>
          <button class="image-button js-lightbox-btn" data-src="assets/Project/Rooftop_Sky_Lounge.webp" data-title="Sky lounge" aria-label="View Sky lounge">
            <div class="picture">
              <img src="assets/Project/Rooftop_Sky_Lounge.webp" alt="Sky lounge" class="picture-image" loading="lazy">
            </div>
            <span class="image-expand">${icons.plus(20)}</span>
          </button>
          <div class="amenity-caption">
            <span>01</span>
            <div>
              <h3>Sky lounge</h3>
              <p>A little closer to the stars.</p>
            </div>
          </div>
        </article>

        <!-- Amenity 2 -->
        <article>
          <button class="image-button js-lightbox-btn" data-src="assets/Project/Podium_Garden.webp" data-title="Podium gardens" aria-label="View Podium gardens">
            <div class="picture">
              <img src="assets/Project/Podium_Garden.webp" alt="Podium gardens" class="picture-image" loading="lazy">
            </div>
            <span class="image-expand">${icons.plus(20)}</span>
          </button>
          <div class="amenity-caption">
            <span>02</span>
            <div>
              <h3>Podium gardens</h3>
              <p>Room to wander. Space to breathe.</p>
            </div>
          </div>
        </article>

        <!-- Amenity 3 -->
        <article>
          <button class="image-button js-lightbox-btn" data-src="assets/Project/Zen_Pond.webp" data-title="Zen pond" aria-label="View Zen pond">
            <div class="picture">
              <img src="assets/Project/Zen_Pond.webp" alt="Zen pond" class="picture-image" loading="lazy">
            </div>
            <span class="image-expand">${icons.plus(20)}</span>
          </button>
          <div class="amenity-caption">
            <span>03</span>
            <div>
              <h3>Zen pond</h3>
              <p>Find your own quiet corner.</p>
            </div>
          </div>
        </article>

        <!-- Amenity 4 (expandable) -->
        <article class="amenity-extra">
          <button class="image-button js-lightbox-btn" data-src="assets/Project/Rooftop_Pergola.webp" data-title="Rooftop pergola" aria-label="View Rooftop pergola">
            <div class="picture">
              <img src="assets/Project/Rooftop_Pergola.webp" alt="Rooftop pergola" class="picture-image" loading="lazy">
            </div>
            <span class="image-expand">${icons.plus(20)}</span>
          </button>
          <div class="amenity-caption">
            <span>04</span>
            <div>
              <h3>Rooftop pergola</h3>
              <p>Slow mornings. Unhurried evenings.</p>
            </div>
          </div>
        </article>

        <!-- Amenity 5 (expandable) -->
        <article class="amenity-extra">
          <button class="image-button js-lightbox-btn" data-src="assets/Project/Central_Lawn.webp" data-title="Central lawn" aria-label="View Central lawn">
            <div class="picture">
              <img src="assets/Project/Central_Lawn.webp" alt="Central lawn" class="picture-image" loading="lazy">
            </div>
            <span class="image-expand">${icons.plus(20)}</span>
          </button>
          <div class="amenity-caption">
            <span>05</span>
            <div>
              <h3>Central lawn</h3>
              <p>More room for life outdoors.</p>
            </div>
          </div>
        </article>

        <!-- Amenity 6 (expandable) -->
        <article class="amenity-extra">
          <button class="image-button js-lightbox-btn" data-src="assets/Project/Plaza_Blocks_AB.webp" data-title="Community plaza" aria-label="View Community plaza">
            <div class="picture">
              <img src="assets/Project/Plaza_Blocks_AB.webp" alt="Community plaza" class="picture-image" loading="lazy">
            </div>
            <span class="image-expand">${icons.plus(20)}</span>
          </button>
          <div class="amenity-caption">
            <span>06</span>
            <div>
              <h3>Community plaza</h3>
              <p>Where neighbours become friends.</p>
            </div>
          </div>
        </article>
      </div>

      <button class="outline-button amenities-more" id="amenities-toggle-btn" aria-expanded="false">
        <span id="amenities-btn-text">Explore more amenities</span>
        ${icons.plus(16, 'amenities-btn-icon')}
      </button>
    </section>

    <!-- Clubhouse Section -->
    <section id="clubhouse" class="clubhouse">
      <div class="picture">
        <img src="assets/Project/Clubhouse_Exterior.webp" alt="The landscaped Aakaar clubhouse" class="picture-image" loading="lazy">
      </div>
      <div class="clubhouse-copy">
        <span class="eyebrow">A SPACE TO COME TOGETHER</span>
        <h2>Your days.<br><em>With more possibilities.</em></h2>
        <p>A G+3 clubhouse for a workout, a celebration, a film with friends, or simply a welcome change of pace.</p>
        <div class="club-links">
          <button class="js-lightbox-btn" data-src="assets/CLUB RENDERS/GYM.webp" data-title="Fitness studio">
            Fitness studio ${icons.arrowUpRight(18)}
          </button>
          <button class="js-lightbox-btn" data-src="assets/CLUB RENDERS/AV_ROOM.webp" data-title="Private theatre">
            Private theatre ${icons.arrowUpRight(18)}
          </button>
          <button class="js-lightbox-btn" data-src="assets/CLUB RENDERS/SOCIETY HALL.webp" data-title="Society hall">
            Society hall ${icons.arrowUpRight(18)}
          </button>
        </div>
      </div>
    </section>

    <!-- Section 04 / Gallery -->
    <section id="gallery" class="section gallery">
      <div class="heading-row">
        <div class="section-heading">
          <span class="eyebrow">04 / A CLOSER LOOK</span>
          <h2>Picture your life <em>here.</em></h2>
        </div>
        <div class="gallery-controls">
          <button id="gallery-prev" aria-label="Previous gallery image">
            ${icons.arrowLeft(20)}
          </button>
          <button id="gallery-next" aria-label="Next gallery image">
            ${icons.arrowRight(20)}
          </button>
        </div>
      </div>

      <button class="image-button gallery-image" id="gallery-image-btn" aria-label="Enlarge An arrival to remember">
        <div class="picture">
          <img id="gallery-img" src="assets/Project/Entrance_Dusk.webp" alt="An arrival to remember" class="picture-image" loading="lazy">
        </div>
        <span class="render-caption">Artist’s impression</span>
        <span class="image-expand">${icons.plus(22)}</span>
      </button>

      <div class="gallery-caption" aria-live="polite">
        <h3 id="gallery-title">An arrival to remember</h3>
        <div id="gallery-counter"><span>01</span> / 04</div>
      </div>
    </section>

    <!-- Master Plan -->
    <section id="master-plan" class="section master-plan">
      <div>
        <span class="eyebrow">THOUGHTFULLY PLANNED</span>
        <h2>A place for life<br><em>to unfold.</em></h2>
        <p>Homes, gardens and shared spaces, considered together. Explore how the five towers come together around the landscaped heart of Aakaar.</p>
        <button class="text-link js-lightbox-btn" data-src="assets/Project/Master_Plan.webp" data-title="Aakaar master plan">
          View the master plan ${icons.arrowUpRight(20)}
        </button>
      </div>
      <button class="image-button js-lightbox-btn" data-src="assets/Project/Master_Plan.webp" data-title="Aakaar master plan" aria-label="Enlarge master plan">
        <div class="picture">
          <img src="assets/Project/Master_Plan.webp" alt="Aakaar site master plan" class="picture-image" loading="lazy">
        </div>
      </button>
    </section>

    <!-- Architect -->
    <section id="architect" class="architect section">
      <div class="picture">
        <img src="assets/Project/Architect_Portrait.webp" alt="Architect Ramesh Swain" class="picture-image" loading="lazy">
      </div>
      <div>
        <span class="eyebrow">THE MIND BEHIND THE VISION</span>
        <h2>Imagined with care.<br><em>Designed for living.</em></h2>
        <p>Architecture by Ar. Ramesh Swain, bringing natural light, open views and considered spaces into the way you live.</p>
        <span class="architect-name">Ar. Ramesh Swain <small>PROJECT ARCHITECT</small></span>
      </div>
    </section>

    <!-- Section 05 / Location -->
    <section id="location" class="section location">
      <div class="section-heading">
        <span class="eyebrow">05 / CONNECTED TO YOUR WORLD</span>
        <h2>The city at your doorstep.<br><em>Calm at your heart.</em></h2>
      </div>
      <div class="location-layout">
        <div class="location-address">
          ${icons.mapPin(28, 1)}
          <h3>Patia, Bhubaneswar</h3>
          <p>Plot No. 15W, Chandrasekharpur,<br>Patia, Bhubaneswar, Odisha 751021</p>
          <a class="text-link" href="https://www.google.com/maps/search/?api=1&query=Acrux+Aakaar+Patia+Bhubaneswar" target="_blank" rel="noopener noreferrer">
            Open in Google Maps ${icons.arrowUpRight(20)}
          </a>
        </div>
        <div class="nearby">
          <p class="eyebrow">EVERYDAY CONNECTIONS</p>
          <div>
            <span>01</span>
            <div>
              <h3>Education</h3>
              <p>KIIT University · SAI International School</p>
            </div>
            ${icons.arrowUpRight(18)}
          </div>
          <div>
            <span>02</span>
            <div>
              <h3>Work</h3>
              <p>Infocity · TCS · Infosys</p>
            </div>
            ${icons.arrowUpRight(18)}
          </div>
          <div>
            <span>03</span>
            <div>
              <h3>Healthcare</h3>
              <p>KIMS · Care Hospitals</p>
            </div>
            ${icons.arrowUpRight(18)}
          </div>
          <div>
            <span>04</span>
            <div>
              <h3>Connectivity</h3>
              <p>Patia railway station · Nandankanan Road</p>
            </div>
            ${icons.arrowUpRight(18)}
          </div>
        </div>
      </div>
    </section>

    <!-- Resources -->
    <section class="resources">
      <div>
        <span class="eyebrow">TAKE A CLOSER LOOK</span>
        <h2>The details make <em>the difference.</em></h2>
      </div>
      <a href="brochure.pdf" download>
        <span>Project brochure<small>RESIDENCES, PLANS &amp; AMENITIES</small></span>
        ${icons.download(26, 1)}
      </a>
    </section>

    <!-- Enquiry Section -->
    <section id="enquire" class="section enquiry">
      <div>
        <span class="eyebrow">LET’S START A CONVERSATION</span>
        <h2>Your next chapter<br><em>begins here.</em></h2>
        <p>Discover Aakaar in person. Connect with our team for residence details or to arrange your visit.</p>
        <a href="tel:+919777543339" class="contact-phone">
          +91 97775 43339 ${icons.arrowUpRight(20)}
        </a>
        <a href="mailto:sales@acruxrealcon.in">sales@acruxrealcon.in</a>
      </div>

      <form id="enquiry-form">
        <label>Your name
          <input name="name" autocomplete="name" placeholder="Full name" required maxlength="100">
        </label>
        <div class="form-row">
          <label>Phone number
            <input name="phone" type="tel" autocomplete="tel" placeholder="Your phone number" pattern="[+0-9 ()\\-]{7,20}" required>
          </label>
          <label>Email address
            <input name="email" type="email" autocomplete="email" placeholder="Email (optional)">
          </label>
        </div>
        <label>Interested in
          <select name="residence">
            <option value="2.5 BHK">2.5 BHK</option>
            <option value="3 BHK" selected>3 BHK</option>
            <option value="Help me choose">Help me choose</option>
          </select>
        </label>
        <label class="consent">
          <input type="checkbox" required>
          <span>I agree to be contacted by Acrux Realcon about my enquiry.</span>
        </label>
        <button class="solid-button" type="submit">
          <span>Continue on WhatsApp</span>
          ${icons.arrowUpRight(18)}
        </button>
        <p class="form-note">Opens WhatsApp with your enquiry. Send the message there to connect with our team.</p>
      </form>
    </section>

    <!-- Footer -->
    <footer class="site-footer">
      <div class="footer-top">
        <a href="#top" class="footer-brand">
          <img src="assets/Aakaar Logo.webp" alt="Acrux Aakaar" width="170" height="70" loading="lazy">
        </a>
        <p>A considered way of living.<br>By Acrux Realcon.</p>
        <a href="#top" class="back-top">
          Back to top ${icons.arrowUpRight(19)}
        </a>
      </div>
      <div class="footer-bottom">
        <span>© 2026 Acrux Realcon. All rights reserved.</span>
        <span>All renders are artist’s impressions. Details subject to confirmation.</span>
      </div>
    </footer>

    <!-- Mobile Sticky CTA Bar -->
    <div class="mobile-cta">
      <a href="tel:+919777543339">
        ${icons.phone(16)} Call us
      </a>
      <a href="#enquire">
        Schedule a visit ${icons.arrowUpRight(16)}
      </a>
    </div>

    <!-- Lightbox Modal Dialog -->
    <dialog class="image-dialog" id="image-dialog" aria-label="Project image">
      <button class="dialog-close" id="dialog-close-btn" aria-label="Close image">
        ${icons.x(24)}
      </button>
      <div class="lightbox-picture">
        <img id="dialog-img" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3C/svg%3E" alt="">
      </div>
      <p id="dialog-caption"></p>
    </dialog>
  </main>

  <script>
    (function() {
      // 1. Header scroll detection
      const header = document.getElementById('site-header');
      function onScroll() {
        if (window.scrollY > 30) {
          header.classList.add('is-scrolled');
        } else {
          header.classList.remove('is-scrolled');
        }
      }
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();

      // 2. Mobile navigation toggle
      const menuBtn = document.getElementById('menu-toggle-btn');
      const mobileNav = document.getElementById('mobile-nav');
      const menuIcon = document.getElementById('menu-icon');
      let menuOpen = false;

      const menuSvg = '${icons.menu(24).replace(/'/g, "\\'")}';
      const xSvg = '${icons.x(24).replace(/'/g, "\\'")}';

      menuBtn.addEventListener('click', function() {
        menuOpen = !menuOpen;
        mobileNav.classList.toggle('open', menuOpen);
        menuBtn.setAttribute('aria-expanded', menuOpen);
        menuBtn.setAttribute('aria-label', menuOpen ? 'Close navigation' : 'Open navigation');
        menuIcon.innerHTML = menuOpen ? xSvg : menuSvg;
      });

      mobileNav.querySelectorAll('a').forEach(function(link) {
        link.addEventListener('click', function() {
          menuOpen = false;
          mobileNav.classList.remove('open');
          menuBtn.setAttribute('aria-expanded', 'false');
          menuBtn.setAttribute('aria-label', 'Open navigation');
          menuIcon.innerHTML = menuSvg;
        });
      });

      // 3. Hero Slideshow
      const heroSlides = [
        {
          img: "assets/Project/Master_Elevation.webp",
          h1Line1: "A life, beautifully",
          h1Line2: "shaped.",
          desc: "Room to grow. Space to breathe. A place to call your own."
        },
        {
          img: "assets/Project/Entrance_Dusk.webp",
          h1Line1: "Come home to",
          h1Line2: "something special.",
          desc: "An arrival that feels like the beginning of something."
        },
        {
          img: "assets/Project/Entrance_Sunrise.webp",
          h1Line1: "A brighter way",
          h1Line2: "to begin.",
          desc: "Thoughtful spaces, open skies and a little more room for life."
        }
      ];
      let heroSlide = 0;
      const heroContent = document.getElementById('hero-content');
      const heroH1 = document.getElementById('hero-h1');
      const heroP = document.getElementById('hero-p');
      const heroCount = document.getElementById('hero-count');
      const heroDots = document.getElementById('hero-dots').querySelectorAll('button');

      function setHero(index) {
        heroSlide = (index + heroSlides.length) % heroSlides.length;

        // Slides visibility
        for (let i = 0; i < heroSlides.length; i++) {
          const slideEl = document.getElementById('hero-slide-' + i);
          const isActive = (i === heroSlide);
          slideEl.classList.toggle('active', isActive);
          slideEl.setAttribute('aria-hidden', !isActive);
        }

        // Dots
        heroDots.forEach(function(dot, i) {
          const isActive = (i === heroSlide);
          dot.classList.toggle('active', isActive);
          dot.setAttribute('aria-pressed', isActive);
        });

        // Content
        const data = heroSlides[heroSlide];
        heroH1.innerHTML = data.h1Line1 + '<br><em>' + data.h1Line2 + '</em>';
        heroP.textContent = data.desc;
        heroCount.innerHTML = '0' + (heroSlide + 1) + ' <i></i> 0' + heroSlides.length;

        // Restart animation
        heroContent.style.animation = 'none';
        void heroContent.offsetHeight; // trigger reflow
        heroContent.style.animation = '';
      }

      let heroTimer = setInterval(function() {
        setHero(heroSlide + 1);
      }, 6500);

      function resetHeroTimer() {
        clearInterval(heroTimer);
        heroTimer = setInterval(function() {
          setHero(heroSlide + 1);
        }, 6500);
      }

      document.getElementById('hero-prev').addEventListener('click', function() {
        setHero(heroSlide - 1);
        resetHeroTimer();
      });
      document.getElementById('hero-next').addEventListener('click', function() {
        setHero(heroSlide + 1);
        resetHeroTimer();
      });
      heroDots.forEach(function(dot) {
        dot.addEventListener('click', function() {
          setHero(parseInt(this.getAttribute('data-index'), 10));
          resetHeroTimer();
        });
      });

      // 4. Residence unit configuration tabs
      const tab25 = document.getElementById('tab-25bhk');
      const tab3 = document.getElementById('tab-3bhk');
      const resTitle = document.getElementById('residence-title');
      const resDesc = document.getElementById('residence-desc');
      const resSqft = document.getElementById('residence-sqft');

      tab25.addEventListener('click', function() {
        tab25.setAttribute('aria-pressed', 'true');
        tab3.setAttribute('aria-pressed', 'false');
        resTitle.textContent = "Your home. Your possibilities.";
        resDesc.textContent = "Two bedrooms and a versatile study for work, creativity or a quiet retreat.";
        resSqft.textContent = "1,790";
      });

      tab3.addEventListener('click', function() {
        tab3.setAttribute('aria-pressed', 'true');
        tab25.setAttribute('aria-pressed', 'false');
        resTitle.textContent = "A little more room to call your own.";
        resDesc.textContent = "Three bedrooms, welcoming shared spaces and room for every part of your day.";
        resSqft.textContent = "2,148";
      });

      // 5. Amenities toggle
      const amenitiesToggleBtn = document.getElementById('amenities-toggle-btn');
      const amenitiesBtnText = document.getElementById('amenities-btn-text');
      const extraAmenities = document.querySelectorAll('.amenity-extra');
      let allAmenitiesVisible = false;

      amenitiesToggleBtn.addEventListener('click', function() {
        allAmenitiesVisible = !allAmenitiesVisible;
        extraAmenities.forEach(function(item) {
          item.classList.toggle('show', allAmenitiesVisible);
        });
        amenitiesBtnText.textContent = allAmenitiesVisible ? 'Show less' : 'Explore more amenities';
        amenitiesToggleBtn.setAttribute('aria-expanded', allAmenitiesVisible);
      });

      // 6. Gallery Slider
      const gallery = [
        { img: "assets/Project/Entrance_Dusk.webp", title: "An arrival to remember" },
        { img: "assets/Project/Master_Elevation.webp", title: "A new perspective on the city" },
        { img: "assets/Project/Rooftop_Sky_Lounge.webp", title: "Evenings above the everyday" },
        { img: "assets/Project/Zen_Pond.webp", title: "A moment of stillness" }
      ];
      let galleryIndex = 0;
      const galleryImg = document.getElementById('gallery-img');
      const galleryTitle = document.getElementById('gallery-title');
      const galleryCounter = document.getElementById('gallery-counter');
      const galleryBtn = document.getElementById('gallery-image-btn');

      function setGallery(idx) {
        galleryIndex = (idx + gallery.length) % gallery.length;
        const current = gallery[galleryIndex];
        galleryImg.src = current.img;
        galleryImg.alt = current.title;
        galleryTitle.textContent = current.title;
        galleryCounter.innerHTML = '<span>0' + (galleryIndex + 1) + '</span> / 0' + gallery.length;
        galleryBtn.setAttribute('aria-label', 'Enlarge ' + current.title);
      }

      document.getElementById('gallery-prev').addEventListener('click', function() {
        setGallery(galleryIndex - 1);
      });
      document.getElementById('gallery-next').addEventListener('click', function() {
        setGallery(galleryIndex + 1);
      });
      galleryBtn.addEventListener('click', function() {
        openLightbox(gallery[galleryIndex].img, gallery[galleryIndex].title);
      });

      // 7. Lightbox Modal Dialog
      const dialog = document.getElementById('image-dialog');
      const dialogImg = document.getElementById('dialog-img');
      const dialogCaption = document.getElementById('dialog-caption');
      const dialogClose = document.getElementById('dialog-close-btn');

      function openLightbox(src, title) {
        dialogImg.src = src;
        dialogImg.alt = title;
        dialogCaption.textContent = title;
        if (typeof dialog.showModal === 'function') {
          dialog.showModal();
        } else {
          dialog.setAttribute('open', '');
        }
      }

      function closeLightbox() {
        if (typeof dialog.close === 'function') {
          dialog.close();
        } else {
          dialog.removeAttribute('open');
        }
      }

      dialogClose.addEventListener('click', closeLightbox);
      dialog.addEventListener('click', function(e) {
        if (e.target === dialog) {
          closeLightbox();
        }
      });

      // Attach lightbox triggers to any element with .js-lightbox-btn
      document.querySelectorAll('.js-lightbox-btn').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
          e.preventDefault();
          const src = this.getAttribute('data-src');
          const title = this.getAttribute('data-title');
          if (src) {
            openLightbox(src, title || '');
          }
        });
      });

      // 8. WhatsApp Enquiry Form
      const form = document.getElementById('enquiry-form');
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        const data = new FormData(form);
        const name = data.get('name') || '';
        const phone = data.get('phone') || '';
        const email = data.get('email') || '';
        const residence = data.get('residence') || '3 BHK';

        const message = "Hello, I am " + name + ". I am interested in " + residence + " at Acrux Aakaar. Please contact me at " + phone + (email ? " or " + email : "") + " to discuss a site visit.";
        window.open("https://wa.me/919777543339?text=" + encodeURIComponent(message), "_blank", "noopener,noreferrer");
      });
    })();
  </script>
</body>
</html>`;

// Write to C:\Shyanil\Acrux\index.html
fs.writeFileSync(path.join(__dirname, 'index.html'), htmlContent, 'utf8');
console.log('Successfully generated C:\\Shyanil\\Acrux\\index.html (' + (Buffer.byteLength(htmlContent, 'utf8') / 1024).toFixed(1) + ' KB)');

// Also write a copy to acrux-web/index.html
fs.writeFileSync(path.join(__dirname, 'acrux-web/index.html'), htmlContent, 'utf8');
console.log('Successfully copied to C:\\Shyanil\\Acrux\\acrux-web\\index.html');
