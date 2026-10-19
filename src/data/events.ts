/**
 * Event stops from the Instagram highlights — the single source for the
 * Gaming page passes and the 3D globe. Photos live in /public/events/<city>.jpg.
 */
export type Stop = {
  city: string;
  country: "IN" | "SA";
  lat: number;
  lon: number;
  event: string;
  year: string;
  pass: string;
  /** Who issued the credential — printed on the pass */
  org: string;
  /** Visual theme of the pass (see components/brands.tsx) */
  brand: "redbull" | "krafton" | "dreamhack" | "skyesports" | "ewc" | "esl" | "lan";
  /** Event name as printed under the brand mark and on the lanyard */
  title: string;
  /** Optional official logo file (e.g. /brands/redbull.svg) — replaces the drawn wordmark */
  logo?: string;
  color: string;
  note: string;
  tags: string[];
  photo?: string;
  /** CSS object-position for the photo crop */
  focus?: string;
  highlight?: boolean;
};

export const stops: Stop[] = [
  {
    city: "Chennai",
    country: "IN",
    lat: 13.08,
    lon: 80.27,
    event: "Skyesports Champions Series · Valorant",
    year: "2022",
    pass: "MEDIA",
    org: "Skyesports",
    brand: "skyesports",
    title: "Champions Series · Valorant",
    color: "#019EA5",
    note: "Covering the Skyesports Champions Series LAN with Viral Gamer.",
    tags: ["LAN", "Valorant", "Viral Gamer"],
    photo: "/events/chennai.jpg",
    focus: "center 8%",
  },
  {
    city: "Bengaluru",
    country: "IN",
    lat: 12.97,
    lon: 77.59,
    event: "Bengaluru LAN",
    year: "2022",
    pass: "MEDIA",
    org: "Bengaluru LAN",
    brand: "lan",
    title: "Bengaluru LAN",
    color: "#C6F24E",
    note: "A LAN event in my home city, catching up with players and creators.",
    tags: ["LAN", "Home city"],
    photo: "/events/bengaluru.jpg",
  },
  {
    city: "Hyderabad",
    country: "IN",
    lat: 17.39,
    lon: 78.49,
    event: "DreamHack Hyderabad",
    year: "Nov 2022",
    pass: "GUEST",
    org: "Nodwin Gaming",
    brand: "dreamhack",
    logo: "/brands/dreamhack.svg",
    title: "Hyderabad 2022",
    color: "#F77F1A",
    note: "Three days at DreamHack through Nodwin Gaming. Interviewed Kaash Plays and met a lot of the creators I'd only known online.",
    tags: ["3 days", "Nodwin Gaming", "Interview"],
    photo: "/events/hyderabad.jpg",
    highlight: true,
  },
  {
    city: "Delhi",
    country: "IN",
    lat: 28.61,
    lon: 77.21,
    event: "ESL India · Nodwin Gaming",
    year: "2022",
    pass: "ACCESS",
    org: "Nodwin Gaming",
    brand: "esl",
    title: "Delhi 2022",
    color: "#F5A623",
    note: "Two days at ESL India in Delhi with Nodwin Gaming — on the arena floor under the big screens.",
    tags: ["2 days", "ESL", "Nodwin Gaming"],
    photo: "/events/delhi.webp",
    focus: "center 30%",
  },
  {
    city: "Mumbai",
    country: "IN",
    lat: 19.08,
    lon: 72.88,
    event: "Red Bull M.E.O Cricket Invitational",
    year: "2022",
    pass: "ACCESS",
    org: "Red Bull India",
    brand: "redbull",
    logo: "/brands/redbull.svg",
    title: "M.E.O Cricket Invitational",
    color: "#9B5DE5",
    note: "Three days in Mumbai with Red Bull India — gamers off the screen and on a cricket pitch.",
    tags: ["3 days", "Red Bull India"],
    photo: "/events/mumbai.jpg",
    focus: "center 55%",
  },
  {
    city: "Pune",
    country: "IN",
    lat: 18.52,
    lon: 73.86,
    event: "Red Bull Campus Clutch Finals",
    year: "2023",
    pass: "ACCESS",
    org: "Red Bull India",
    brand: "redbull",
    logo: "/brands/redbull.svg",
    title: "Campus Clutch Finals",
    color: "#FCAD50",
    note: "Two days at the Campus Clutch India finals, Red Bull's college Valorant tournament.",
    tags: ["2 days", "Valorant", "Red Bull India"],
    photo: "/events/pune.jpg",
    focus: "center 30%",
  },
  {
    city: "Ahmedabad",
    country: "IN",
    lat: 23.02,
    lon: 72.57,
    event: "BGMI Pro Series (BMPS)",
    year: "2023",
    pass: "ACCESS",
    org: "Krafton",
    brand: "krafton",
    logo: "/brands/krafton.svg",
    title: "BGMI Pro Series",
    color: "#FF7A9C",
    note: "Krafton's BGMI Pro Series, played out in a full stadium.",
    tags: ["Krafton", "BGMI", "Stadium"],
    photo: "/events/ahmedabad.jpg",
    focus: "center 75%",
  },
  {
    city: "Riyadh",
    country: "SA",
    lat: 24.71,
    lon: 46.68,
    event: "Esports World Cup",
    year: "2025",
    pass: "MEDIA",
    org: "Esports World Cup",
    brand: "ewc",
    logo: "/brands/ewc.svg",
    title: "Riyadh 2025",
    color: "#F5C518",
    note: "At the Esports World Cup in Riyadh, Saudi Arabia.",
    tags: ["EWC", "Saudi Arabia"],
    photo: "/events/riyadh.jpg",
    focus: "center 92%",
    highlight: true,
  },
];

/** Other cities from the highlights — travel and community, not gaming */
export const alsoVisited = [
  { city: "Indore", lat: 22.72, lon: 75.86 },
  { city: "Dehradun", lat: 30.32, lon: 78.03 },
  { city: "Kochi", lat: 9.93, lon: 76.27 },
  { city: "Jodhpur", lat: 26.24, lon: 73.02 },
  { city: "Aizawl", lat: 23.73, lon: 92.72 },
  { city: "Lucknow", lat: 26.85, lon: 80.95 },
  { city: "Pondicherry", lat: 11.94, lon: 79.81 },
];

/** Home base — flight arcs start here */
export const HOME = { city: "Bengaluru", lat: 12.97, lon: 77.59 };
