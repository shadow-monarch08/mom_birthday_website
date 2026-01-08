import { Story, FloatingWord } from './types';

export const STORIES: Story[] = [
  {
    id: 1,
    // REAL PHOTO: Mom & Son with Pink/Holi Powder
    image: 'https://bxwolvowcznaqjeyfoil.supabase.co/storage/v1/object/public/chat_files/temp/IMG_20240325_110448.jpg', 
    title: "The Festival of Colors",
    description: "Life with you is never dull. It's vibrant, chaotic, and full of joy. Thanks for making every day feel like a celebration.",
    date: "Level 24: Joy",
    quote: "Color me happy!",
    stats: [
      { label: "Vibrancy", value: 100, color: "text-neonMagenta" },
      { label: "Fun", value: 100, color: "text-neonYellow" },
      { label: "Clean-up", value: 10, color: "text-gray-400" }
    ]
  },
  {
    id: 2,
    // REAL PHOTO: Mom & Son Selfie on Plane (Red hat)
    image: 'https://bxwolvowcznaqjeyfoil.supabase.co/storage/v1/object/public/chat_files/temp/IMG_20230827_170416.jpg',
    title: "The Travel Buddy",
    description: "From takeoff to landing, you're the best co-pilot. Ready for the next adventure whenever you are.",
    date: "Level 35: Exploration",
    quote: "Sky's the limit!",
    stats: [
      { label: "Navigation", value: 85, color: "text-neonCyan" },
      { label: "Patience", value: 100, color: "text-neonMagenta" },
      { label: "Jetlag", value: 0, color: "text-neonYellow" }
    ]
  },
  {
    id: 3,
    // REAL PHOTO: Mom & Son Selfie (Indoors/Teal shirt)
    image: 'https://bxwolvowcznaqjeyfoil.supabase.co/storage/v1/object/public/chat_files/temp/IMG_20221004_215040.jpg',
    title: "Home Base",
    description: "No matter where we go, being with you feels like home. The ultimate safe point in this crazy game called life.",
    date: "Level: Infinite",
    quote: "Best team ever.",
    stats: [
      { label: "Comfort", value: 100, color: "text-neonYellow" },
      { label: "Support", value: 100, color: "text-neonCyan" },
      { label: "Love", value: 1000, color: "text-neonMagenta" }
    ]
  },
  {
    id: 4,
    // REAL PHOTO: Mom & Son Selfie on Plane (Grey scarf)
    image: 'https://bxwolvowcznaqjeyfoil.supabase.co/storage/v1/object/public/chat_files/temp/IMG_20230831_223425.jpg',
    title: "High Altitude Love",
    description: "Raising me up to new heights, literally and figuratively. Thank you for always believing I could fly.",
    date: "Current Level: Legend",
    quote: "Onwards and upwards!",
    stats: [
      { label: "Altitude", value: 100, color: "text-neonCyan" },
      { label: "Warmth", value: 100, color: "text-neonMagenta" },
      { label: "Legacy", value: 100, color: "text-neonYellow" }
    ]
  }
];

export const FLOATING_WORDS: FloatingWord[] = [
  { id: 1, text: "HERO", x: 10, y: 20 },
  { id: 2, text: "POWER", x: 70, y: 15 },
  { id: 3, text: "LEGEND", x: 80, y: 60 },
  { id: 4, text: "EPIC", x: 15, y: 70 },
  { id: 5, text: "STRENGTH", x: 40, y: 40 },
  { id: 6, text: "BAM!", x: 90, y: 30 },
  { id: 7, text: "POW!", x: 5, y: 50 },
];

export const MULTIVERSE_VARIANTS = [
  {
    id: '198X',
    universe: 'EARTH-198X',
    role: 'The College Hero',
    stats: 'STYLE: ROCKSTAR / GPA: 4.0',
    desc: 'The origin story. Denim jacket equipped. Fighting for dreams and looking cool doing it.',
    color: 'text-retroPurple',
    // HERO IMAGE: Mom in Denim Jacket
    image: 'https://bxwolvowcznaqjeyfoil.supabase.co/storage/v1/object/public/chat_files/temp/college_mom.png' 
  },
  {
    id: '2010',
    universe: 'EARTH-2010',
    role: 'The Super Mom',
    stats: 'SIDEKICK: ROOKIE / MISSION: SUCCESS',
    desc: 'Operational Command of the household. Feeds the troops. Infinite curiosity. Always wins.',
    color: 'text-neonCyan',
    // HERO IMAGE: Mom in Kitchen
    image: 'https://bxwolvowcznaqjeyfoil.supabase.co/storage/v1/object/public/chat_files/temp/super_mom.png' 
  },
  {
    id: '2025',
    universe: 'EARTH-2025',
    role: 'The Legend-Tier Mom',
    stats: 'WISDOM: +999 / COOLDOWN: NONE',
    desc: 'The ultimate form. Radiant energy. Guardian of the timeline. Levels up everyone around her.',
    color: 'text-neonMagenta',
    // HERO IMAGE: Mom in Leather Jacket/City
    image: 'https://bxwolvowcznaqjeyfoil.supabase.co/storage/v1/object/public/chat_files/temp/legend_mom.png'
  }
];

export const BOSS_LOG = [
  { name: "The Laundry Hydra", status: "DEFEATED DAILY", reward: "+10 Patience" },
  { name: "Teenage Rebellion", status: "SURVIVED", reward: "Iron Will" },
  { name: "Thanksgiving Dinner", status: "MASTERED", reward: "Culinary Arts Max" },
  { name: "Lost Keys Mystery", status: "SOLVED", reward: "Detective Badge" }
];

export const HEARTFELT_MESSAGES = [
  "DECRYPTING: unspoken_feelings.dat...",
  "Running analysis on: MEMORIES...",
  "> Message 1: Thank you for the sacrifices I was too young to notice.",
  "> Message 2: Your voice is the sound of home.",
  "> Message 3: I measure my own strength by yours.",
  "> Message 4: You really were right about everything.",
  "Analysis complete: LOVE_LEVEL = INFINITE"
];

export const TESTIMONIALS = [
  { user: "Dad_Unit_01", rating: "★★★★★", comment: "Saved my life approx 18 times. Makes great chili." },
  { user: "The_Kid", rating: "★★★★★", comment: "10/10 would be raised by again. Best co-op partner." },
  { user: "Grandma_OS", rating: "★★★★★", comment: "She learned from the best (me)." },
];
