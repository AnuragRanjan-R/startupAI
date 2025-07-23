export type VCFirm = {
  name: string;
  location: string;
  focus: string;
  notable?: string;
  founded?: string;
  fundSize?: string;
  why?: string;
  contact?: string;
};

export const vcData = {
  bengaluru: [
    {
      name: 'Peak XV Partners',
      location: 'Bengaluru',
      focus: 'Tech, Deep Tech, Fintech, SaaS',
      notable: 'Zomato, Byju’s',
    },
    {
      name: 'Accel India',
      location: 'Bengaluru',
      focus: 'Consumer Tech, SaaS, Deep Tech',
      notable: 'Flipkart, Swiggy',
    },
    {
      name: 'Blume Ventures',
      location: 'Bengaluru',
      focus: 'Edtech, Healthtech, Fintech',
      notable: 'Unacademy, Dunzo',
    },
    {
      name: 'Kalaari Capital',
      location: 'Bengaluru',
      focus: 'E-commerce, AI, Fintech',
      notable: 'Myntra, Razorpay',
    },
    {
      name: 'Nexus Venture Partners',
      location: 'Bengaluru',
      focus: 'SaaS, Consumer Tech',
      notable: 'Postman, Delhivery',
    },
    {
      name: 'Chiratae Ventures',
      location: 'Bengaluru',
      focus: 'Deep Tech, Healthtech, Fintech',
      notable: 'Lenskart, PolicyBazaar',
    },
    {
      name: '3one4 Capital',
      location: 'Bengaluru',
      focus: 'Tech, Deep Tech, Healthcare',
      notable: 'Licious, Jupiter',
    },
    {
      name: 'Speciale Invest',
      location: 'Bengaluru',
      focus: 'Deep Tech, AI/ML, Robotics',
      notable: 'Agnikul Cosmos, Niramai',
    },
  ],
  gurgaon: [
    {
      name: 'SenseAI Ventures',
      location: 'Gurgaon',
      focus: 'AI, Machine Learning; Deep Tech focus',
      notable: '-',
    },
    {
      name: 'Venture Catalysts',
      location: 'Gurgaon',
      focus: 'Tech, Agritech, Fintech',
      notable: 'Oyo, BharatPe',
    },
  ],
  newFirms: [
    {
      name: 'Riceberg Ventures',
      founded: '2024',
      location: 'Bengaluru',
      focus:
        'Pre-seed and seed-stage startups in deep tech, AI, and sustainability.',
      fundSize: '$20 million',
      notable:
        'Not yet publicly detailed, but targeting early-stage deep tech startups.',
      why: 'Ideal for MutaneX’s AI-driven genetic analysis platform, with potential presence at Bengaluru’s Bharat Startup Awards or TechSparks for pitching.',
      contact: 'ricebergventures.com',
    },
    {
      name: 'AJVC (Aviral Jain Venture Capital)',
      founded: '2024',
      location: 'Bengaluru',
      focus:
        'Pre-seed investments in consumer tech, SaaS, fintech, and deep tech.',
      fundSize: 'Not disclosed, SEBI-registered Category II AIF.',
      notable: 'Early-stage consumer businesses (details not public).',
      why: 'Founded by Aviral Bhatnagar (ex-Venture Highway), AJVC focuses on pre-seed startups, aligning with Devlaunch’s early-stage app development model. Likely to attend Bengaluru’s SG Global Pitch Battle or Startup Pitch Night.',
      contact: 'ajvc.fund',
    },
    {
      name: 'Volt VC',
      founded: '2024',
      location: 'Bengaluru',
      focus:
        'Pre-seed investments in consumer businesses across tech, SaaS, and deep tech.',
      fundSize: 'Not disclosed, SEBI-registered Category II AIF.',
      notable: 'Not yet detailed, focusing on consumer-driven startups.',
      why: 'Suits BuyOneGram’s market linkage model for farmers, with potential pitching opportunities at Bengaluru’s Startup Expo or eChai Demo Day.',
      contact: 'volt.vc',
    },
    {
      name: 'Centre Court Capital',
      founded: '2024',
      location: 'Mumbai (active in Bengaluru & Gurgaon)',
      focus: 'Early-stage startups in sports, gaming, and deep tech.',
      fundSize: 'Not disclosed, but part of the micro VC wave.',
      notable: 'Emerging sports and gaming startups (specifics not public).',
      why: 'Relevant for tech-driven startups like Devlaunch, with possible engagement at Gurgaon’s 21BY72 Summit or Bengaluru’s Venture Capital World Summit.',
      contact: 'centrecourt.capital',
    },
  ],
};
