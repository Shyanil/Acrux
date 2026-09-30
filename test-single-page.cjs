const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome' });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('pageerror', err => {
    errors.push(err.message);
  });

  const fileUrl = 'file:///' + path.resolve(__dirname, 'index.html').replace(/\\/g, '/');
  console.log('Navigating to:', fileUrl);
  await page.goto(fileUrl, { waitUntil: 'load' });
  await page.waitForTimeout(500);

  // Check broken images
  const brokenImages = await page.evaluate(() => {
    return Array.from(document.images)
      .filter(img => img.complete && img.naturalWidth === 0)
      .map(img => img.src);
  });
  console.log('Broken images:', brokenImages);

  // Test Hero next button
  await page.click('#hero-next');
  await page.waitForTimeout(200);
  const heroSlideText = await page.textContent('#hero-h1');
  console.log('Hero text after next:', heroSlideText.replace(/\s+/g, ' '));

  // Test Residence tabs
  await page.click('#tab-25bhk');
  const res25Title = await page.textContent('#residence-title');
  const res25Sqft = await page.textContent('#residence-sqft');
  console.log('2.5 BHK Title & Sqft:', res25Title, res25Sqft);

  await page.click('#tab-3bhk');
  const res3Title = await page.textContent('#residence-title');
  const res3Sqft = await page.textContent('#residence-sqft');
  console.log('3 BHK Title & Sqft:', res3Title, res3Sqft);

  // Test Amenities toggle
  await page.click('#amenities-toggle-btn');
  const extraVisible = await page.isVisible('.amenity-extra.show');
  console.log('Amenities expanded:', extraVisible);

  // Test Gallery next
  await page.click('#gallery-next');
  const galleryTitle = await page.textContent('#gallery-title');
  console.log('Gallery item 2:', galleryTitle);

  // Test Lightbox
  await page.click('#gallery-image-btn');
  const isDialogVisible = await page.evaluate(() => {
    const d = document.getElementById('image-dialog');
    return d && d.open;
  });
  console.log('Lightbox dialog open:', isDialogVisible);
  await page.click('#dialog-close-btn');
  const isDialogClosed = await page.evaluate(() => {
    const d = document.getElementById('image-dialog');
    return d && !d.open;
  });
  console.log('Lightbox dialog closed:', isDialogClosed);

  // Take screenshot of desktop
  await page.screenshot({ path: 'desktop-verified.png', fullPage: true });
  console.log('Saved desktop-verified.png');

  // Test Mobile view
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(200);
  await page.click('#menu-toggle-btn');
  const mobileNavOpen = await page.isVisible('#mobile-nav.open');
  console.log('Mobile nav open:', mobileNavOpen);

  await page.screenshot({ path: 'mobile-verified.png', fullPage: false });
  console.log('Saved mobile-verified.png');

  console.log('Console / Page Errors:', errors);

  await browser.close();
})();
