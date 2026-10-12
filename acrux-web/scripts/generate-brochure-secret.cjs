const { randomBytes } = require('node:crypto');
const { mkdirSync, writeFileSync } = require('node:fs');
const { join } = require('node:path');

const edgeDir = join(__dirname, '..', 'netlify', 'edge-functions');
mkdirSync(edgeDir, { recursive: true });
writeFileSync(
  join(edgeDir, 'brochure-secret.js'),
  `export default ${JSON.stringify(randomBytes(32).toString('base64url'))};\n`,
  { mode: 0o600 },
);
