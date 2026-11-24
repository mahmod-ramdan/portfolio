import xiaomi from '../assets/logos/xiaomi.png';
import poco from '../assets/logos/poco.png';
import espaces from '../assets/logos/e-spaces.png';
import cocafe from '../assets/logos/cocafe.png';
import creativa from '../assets/logos/creativa.png';
import mec from '../assets/logos/mec-academy.png';
import applogica from '../assets/logos/applogica.png';
import alialkhajehMarketing from '../assets/logos/ali-alkhajeh-marketing.png';
import yana from '../assets/logos/yana.png';
import fatima from '../assets/logos/fatima-alhammadi.png';
import mai from '../assets/logos/mai-boutique.png';

export const person = {
  name: 'Mahmoud Ramadan',
  first: 'Mahmoud',
  last: 'Ramadan',
  title: 'Digital Marketing Specialist',
  heroLine: 'From the brief to the dashboard, I handle the full marketing cycle.',
  facts: ['Digital Marketing Specialist', '6+ years', 'Egypt & UAE'],
  email: 'mahmodrf25@gmail.com',
  phone: '+20 11 249 41 148',
  whatsapp: 'https://wa.me/201124941148',
  linkedin: 'https://www.linkedin.com/in/mahmod-ramdan-82a83331b/',
  location: 'Giza, Egypt',
  cv: { file: 'Mahmoud_Ramadan_CV.pdf', ready: true },
  about: [
    'I started in tech: 3 years at the Faculty of Computers & AI, Cairo University. Then I moved to Commerce to study marketing.',
    'That mix still shapes how I work. I can talk to tech people, and I can sell to everyone else.',
    'I started as a student intern at Xiaomi. Today I plan and run full marketing cycles for academies, agencies and B2B brands in Egypt and the UAE.',
  ],
  education: 'Cairo University · Faculty of Commerce, Marketing & Business Administration',
};

export type StageId = 'research' | 'positioning' | 'content' | 'media' | 'analysis' | 'client';

export const stages: { id: StageId; name: string; short: string; text: string }[] = [
  { id: 'research', name: 'Research & Analysis', short: 'Research', text: 'Market, audience and competitor research before any plan.' },
  { id: 'positioning', name: 'Positioning & Pricing', short: 'Positioning', text: 'What we say, to whom, and at what price.' },
  { id: 'content', name: 'Content Strategy', short: 'Content', text: 'Content pillars, angles, plans and calendars.' },
  { id: 'media', name: 'Media Buying', short: 'Media buying', text: 'Media plans and full-funnel Meta campaigns.' },
  { id: 'analysis', name: 'Analysis & Scaling', short: 'Analysis', text: "Read the dashboards, cut what doesn't work, scale what does." },
  { id: 'client', name: 'Client & Team', short: 'Client & team', text: 'A clear brief in, clear tasks out. Fewer edits, faster delivery.' },
];

export const industries = ['EdTech', 'B2B', 'Retail & F&B', 'Consumer Tech', 'Agency'] as const;

// Numbers are animated: `to` is the counted part, prefix/suffix stay still.
export const proof = [
  { prefix: 'EGP ', to: 1.2, decimals: 1, suffix: 'M+', label: 'in sales in 3 months', source: 'MEC Academy', href: 'work/mec-academy' },
  { prefix: '', to: 10, decimals: 0, suffix: 'K+', label: 'followers from zero, mostly organic', source: 'Creativa', href: 'work/creativa' },
  { prefix: '1 → ', to: 8, decimals: 0, suffix: '', label: 'from first social hire to a team of 8', source: 'E-Spaces', href: 'work/e-spaces' },
  { prefix: '', to: 7, decimals: 0, suffix: '', label: 'UAE clients handled directly', source: 'Ali Alkhajeh Marketing', href: 'work/ali-alkhajeh' },
  { prefix: '', to: 500, decimals: 0, suffix: '+', label: 'messages per shift, 100% response rate', source: 'Xiaomi', href: 'work/xiaomi-poco' },
];

export type TimelineItem = { dates: string; role: string; company: string; type?: string; href?: string; note?: string };

export const timeline: { fullTime: TimelineItem[]; side: TimelineItem[] } = {
  fullTime: [
    { dates: 'Jan 2026 – Present', role: 'Senior Social Media Specialist → Marketing Coordinator', company: 'Ali Alkhajeh Marketing', href: 'work/ali-alkhajeh' },
    { dates: 'Jul 2024 – Jan 2026', role: 'Social Media Manager', company: 'E-Spaces & CoCafe', note: 'Including the Creativa Hub Zagazig project', href: 'work/e-spaces' },
    { dates: 'Sep 2023 – Jul 2024', role: 'Military service', company: '' },
    { dates: '2022 – Sep 2023', role: 'Social Media Specialist', company: 'E-Spaces', href: 'work/e-spaces' },
    { dates: '2020 – Feb 2025', role: 'Intern → Junior Social Media Specialist & Community Manager → Social Media Specialist', company: 'Xiaomi Egypt & POCO Egypt', type: 'Remote', href: 'work/xiaomi-poco' },
  ],
  side: [
    { dates: 'May 2026 – Dec 2026', role: 'Media Buyer', company: 'MEC Academy', type: 'Part-time', href: 'work/mec-academy' },
    { dates: 'Dec 2025 – Present', role: 'Senior Social Media Specialist', company: 'Big O Solutions', type: 'Freelance', href: 'work/big-o' },
    { dates: 'Sep 2024 – Feb 2025', role: 'Social Media Specialist', company: 'Space Minders Software', type: 'Freelance', href: 'work/b2b-tech-content' },
    { dates: 'Jul 2024', role: 'Product Content Creator', company: 'AppLogica Middle East', type: 'Freelance', href: 'work/b2b-tech-content' },
    { dates: 'Feb 2023 – Aug 2023', role: 'Content Creator', company: 'Learn It', type: 'Part-time', note: 'Content for programming and networking courses' },
  ],
};

export const brands = [
  { name: 'Xiaomi Egypt', logo: xiaomi, href: 'https://www.facebook.com/XiaomiEgypt', keepShape: true },
  { name: 'POCO', logo: poco },
  { name: 'E-Spaces', logo: espaces, href: 'https://www.facebook.com/espaces.eg' },
  { name: 'CoCafe', logo: cocafe, href: 'https://www.facebook.com/profile.php?id=61585976124025' },
  { name: 'Creativa', logo: creativa, href: 'https://www.facebook.com/profile.php?id=61565826658164' },
  { name: 'MEC Academy', logo: mec, href: 'https://www.facebook.com/mecacademyegy' },
  { name: 'AppLogica', logo: applogica },
  { name: 'Ali Alkhajeh Marketing', logo: alialkhajehMarketing },
  { name: 'YANA', logo: yana, href: 'https://www.instagram.com/yanarestaurants/' },
  { name: 'Fatima Alhammadi', logo: fatima, href: 'https://www.instagram.com/fatimalhammadi_interior/' },
  { name: 'MAI Boutique', logo: mai, href: 'https://www.instagram.com/bymai.ae/' },
];

export const agencyClients = ['YANA', 'Fatima Alhammadi', 'MAI Boutique'];

export const siteTodos = [
  'Logos still missing: Big O Solutions, Ali Alkhajeh law firm (https://www.instagram.com/alialkhajehae/)',
  'Testimonials (manager at Ali Alkhajeh, AppLogica): the section stays hidden until there are at least 2',
  'Exact military service dates',
];
