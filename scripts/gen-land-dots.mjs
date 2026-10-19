// Precomputes the dot-matrix land points for the Gaming page globe.
// Run: node scripts/gen-land-dots.mjs   → writes src/data/land-dots.json as flat [lat, lon, lat, lon, ...]
import { readFileSync, writeFileSync } from "node:fs";
import { geoContains } from "d3-geo";
import { feature } from "topojson-client";

const topo = JSON.parse(readFileSync(new URL("../node_modules/world-atlas/land-110m.json", import.meta.url)));
const land = feature(topo, topo.objects.land);

const step = 1.6;
const out = [];
for (let lat = -78; lat <= 82; lat += step) {
  const ring = Math.max(1, Math.round((360 / step) * Math.cos((lat * Math.PI) / 180)));
  for (let k = 0; k < ring; k++) {
    const lon = -180 + (k / ring) * 360;
    if (geoContains(land, [lon, lat])) out.push(+lat.toFixed(1), +lon.toFixed(1));
  }
}

writeFileSync(new URL("../src/data/land-dots.json", import.meta.url), JSON.stringify(out));
console.log(`${out.length / 2} land dots`);
