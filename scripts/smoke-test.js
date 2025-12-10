#!/usr/bin/env node
import axios from 'axios';

const checks = [
  { name: 'Frontend (Vite dev)', url: 'http://localhost:5173/' },
  { name: 'Backend - products', url: 'http://localhost:3000/products' },
];

async function run() {
  let ok = true;
  for (const c of checks) {
    try {
      const res = await axios.get(c.url, { timeout: 5000 });
      console.log(`${c.name}: ${res.status}`);
      if (res.status >= 400) ok = false;
    } catch (err) {
      console.error(`${c.name}: FAILED — ${err.message}`);
      ok = false;
    }
  }

  if (!ok) {
    console.error('\nSmoke test: FAILED');
    process.exit(1);
  }

  console.log('\nSmoke test: OK');
  process.exit(0);
}

run();
