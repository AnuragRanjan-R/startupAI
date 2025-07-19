import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useUser } from '@clerk/clerk-react';
import {
  Building2,
  DollarSign,
  Download,
  Filter,
  Globe,
  Leaf,
  Mail,
  MapPin,
  Rocket,
  Search,
  ShoppingCart,
  Sparkles,
  TrendingUp,
  Users,
} from 'lucide-react';
import { useState } from 'react';

type VCFirm = {
  name: string;
  location: string;
  focus: string;
  notable?: string;
  founded?: string;
  fundSize?: string;
  why?: string;
  contact?: string;
};

const vcData = {
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

const sectorIcons: Record<string, JSX.Element> = {
  Tech: <Rocket className="h-4 w-4 text-blue-500" />,
  'Deep Tech': <Sparkles className="h-4 w-4 text-purple-500" />,
  Fintech: <DollarSign className="h-4 w-4 text-green-500" />,
  SaaS: <Building2 className="h-4 w-4 text-indigo-500" />,
  'Consumer Tech': <Users className="h-4 w-4 text-orange-500" />,
  Edtech: <TrendingUp className="h-4 w-4 text-pink-500" />,
  Healthtech: <Globe className="h-4 w-4 text-red-500" />,
  ECommerce: <ShoppingCart className="h-4 w-4 text-yellow-500" />,
  AI: <Sparkles className="h-4 w-4 text-purple-400" />,
  'AI/ML': <Sparkles className="h-4 w-4 text-purple-400" />,
  Robotics: <Rocket className="h-4 w-4 text-blue-400" />,
  Agritech: <Leaf className="h-4 w-4 text-green-400" />,
  Sports: <Users className="h-4 w-4 text-orange-400" />,
  Gaming: <Rocket className="h-4 w-4 text-blue-400" />,
  Sustainability: <Leaf className="h-4 w-4 text-green-600" />,
};

const locationIcons: Record<string, JSX.Element> = {
  Bengaluru: <MapPin className="h-4 w-4 text-purple-600" />,
  Mumbai: <MapPin className="h-4 w-4 text-pink-600" />,
  Gurgaon: <MapPin className="h-4 w-4 text-green-600" />,
  Delhi: <MapPin className="h-4 w-4 text-blue-600" />,
};

const VCFirms = () => {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    location: '',
    sector: '',
  });
  const { user } = useUser();
  const [exporting, setExporting] = useState(false);

  // Helper to filter firms by search and filters
  const filterFirms = (firms: VCFirm[]) => {
    return firms.filter((firm) => {
      const matchesSearch =
        !search ||
        firm.name.toLowerCase().includes(search.toLowerCase()) ||
        (firm.focus &&
          firm.focus.toLowerCase().includes(search.toLowerCase())) ||
        (firm.notable &&
          firm.notable.toLowerCase().includes(search.toLowerCase()));
      const matchesLocation =
        !filters.location ||
        (firm.location &&
          firm.location.toLowerCase().includes(filters.location.toLowerCase()));
      const matchesSector =
        !filters.sector ||
        (firm.focus &&
          firm.focus.toLowerCase().includes(filters.sector.toLowerCase()));
      return matchesSearch && matchesLocation && matchesSector;
    });
  };

  // Combine all filtered firms for export
  const getAllFilteredFirms = () => [
    ...filterFirms(vcData.bengaluru),
    ...filterFirms(vcData.gurgaon),
    ...filterFirms(vcData.newFirms),
  ];

  // Export to CSV logic
  const handleExportCSV = (e?: React.MouseEvent) => {
    if (!user) return;
    setExporting(true);
    const header = [
      'Name',
      'Location',
      'Focus',
      'Notable',
      'Founded',
      'Fund Size',
      'Why Relevant',
      'Contact',
    ];
    const rows = getAllFilteredFirms().map((firm) => [
      firm.name,
      firm.location,
      firm.focus,
      firm.notable || '',
      firm.founded || '',
      firm.fundSize || '',
      firm.why || '',
      firm.contact || '',
    ]);
    const csv = [header, ...rows]
      .map((r) =>
        r.map((field) => `"${(field || '').replace(/"/g, '""')}"`).join(','),
      )
      .join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'vc-firms.csv';
    a.click();
    URL.revokeObjectURL(url);
    setExporting(false);
  };

  // Responsive filter sidebar/collapse
  return (
    <Layout title="VC Firms Directory">
      <div className="space-y-8 px-2 md:px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-gray-600 text-base md:text-lg">
            Explore venture capital firms, their investment focus, and recent
            entrants in the Indian startup ecosystem.
          </p>
          <Tooltip>
            <TooltipTrigger asChild>
              <span>
                <Button
                  variant="outline"
                  className="flex items-center gap-2"
                  onClick={handleExportCSV}
                  disabled={!user || exporting}
                >
                  <Download className="h-4 w-4" />
                  Export CSV
                </Button>
              </span>
            </TooltipTrigger>
            {!user && (
              <TooltipContent side="bottom">
                Sign in to export data
              </TooltipContent>
            )}
            {user && (
              <TooltipContent side="bottom">
                Download filtered VC data as CSV
              </TooltipContent>
            )}
          </Tooltip>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4 w-full">
            <Card className="bg-white border-gray-200 sticky top-24">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Filter className="h-4 w-4" />
                  <h3 className="font-semibold">Filters</h3>
                </div>
                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <Search className="h-4 w-4 text-gray-400" /> Global Search
                    </label>
                    <Input
                      placeholder="Search by name, sector, or investment..."
                      className="border-gray-200"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-purple-600" /> Location
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {['', 'Bengaluru', 'Mumbai', 'Gurgaon'].map((loc) => (
                        <Button
                          key={loc || 'all'}
                          variant={
                            filters.location === loc ? 'default' : 'outline'
                          }
                          size="sm"
                          className="flex items-center gap-1"
                          onClick={() =>
                            setFilters((f) => ({ ...f, location: loc }))
                          }
                        >
                          {loc ? (
                            locationIcons[loc]
                          ) : (
                            <Globe className="h-4 w-4 text-gray-400" />
                          )}{' '}
                          {loc || 'All'}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      <Rocket className="h-4 w-4 text-blue-500" /> Sector
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {[
                        '',
                        'Tech',
                        'Deep Tech',
                        'Fintech',
                        'SaaS',
                        'Consumer Tech',
                        'Edtech',
                        'Healthtech',
                        'AI',
                        'AI/ML',
                        'Robotics',
                        'Agritech',
                        'Sports',
                        'Gaming',
                        'Sustainability',
                      ].map((sector) => (
                        <Button
                          key={sector || 'all'}
                          variant={
                            filters.sector === sector ? 'default' : 'outline'
                          }
                          size="sm"
                          className="flex items-center gap-1"
                          onClick={() =>
                            setFilters((f) => ({ ...f, sector: sector }))
                          }
                        >
                          {sector ? (
                            sectorIcons[sector]
                          ) : (
                            <Globe className="h-4 w-4 text-gray-400" />
                          )}{' '}
                          {sector || 'All'}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* VC Firms Sections */}
          <div className="lg:w-3/4 w-full flex flex-col gap-10">
            {/* Bengaluru Section */}
            <section>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-purple-600" /> Bengaluru: Active
                VC Firms (2025)
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filterFirms(vcData.bengaluru).map((firm) => (
                  <Card
                    key={firm.name}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <CardContent className="p-5 flex flex-col gap-2">
                      <div className="flex items-center gap-2 mb-1">
                        <Building2 className="h-5 w-5 text-indigo-500" />
                        <span className="font-semibold text-lg">
                          {firm.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        {locationIcons[firm.location]}
                        {firm.location}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <Rocket className="h-4 w-4 text-blue-500" />
                        {firm.focus}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <TrendingUp className="h-4 w-4 text-pink-500" />
                        Notable: {firm.notable}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Gurgaon Section */}
            <section>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-green-600" /> Gurgaon: Active VC
                Firms (2025)
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filterFirms(vcData.gurgaon).map((firm) => (
                  <Card
                    key={firm.name}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <CardContent className="p-5 flex flex-col gap-2">
                      <div className="flex items-center gap-2 mb-1">
                        <Building2 className="h-5 w-5 text-indigo-500" />
                        <span className="font-semibold text-lg">
                          {firm.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        {locationIcons[firm.location]}
                        {firm.location}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <Rocket className="h-4 w-4 text-blue-500" />
                        {firm.focus}
                      </div>
                      {firm.notable && (
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <TrendingUp className="h-4 w-4 text-pink-500" />
                          Notable: {firm.notable}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* New Firms Section */}
            <section>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-yellow-500" /> New Venture
                Capital Firms (2023–2025, Active in 2025)
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
                {filterFirms(vcData.newFirms).map((firm) => (
                  <Card
                    key={firm.name}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <CardContent className="p-5 flex flex-col gap-2">
                      <div className="flex items-center gap-2 mb-1">
                        <Building2 className="h-5 w-5 text-indigo-500" />
                        <span className="font-semibold text-lg">
                          {firm.name}
                        </span>
                        {firm.founded && (
                          <span className="ml-auto text-xs text-gray-400">
                            Founded: {firm.founded}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        {firm.location &&
                          locationIcons[firm.location.split(' ')[0]]}
                        {firm.location}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <Rocket className="h-4 w-4 text-blue-500" />
                        {firm.focus}
                      </div>
                      {firm.fundSize && (
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <DollarSign className="h-4 w-4 text-green-500" />
                          Fund Size: {firm.fundSize}
                        </div>
                      )}
                      {firm.notable && (
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <TrendingUp className="h-4 w-4 text-pink-500" />
                          Notable: {firm.notable}
                        </div>
                      )}
                      {firm.why && (
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Sparkles className="h-4 w-4 text-yellow-500" />
                          {firm.why}
                        </div>
                      )}
                      {firm.contact && (
                        <div className="flex items-center gap-2 text-xs text-blue-600 mt-1">
                          <Mail className="h-4 w-4" />
                          <a
                            href={`https://${firm.contact}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline"
                          >
                            {firm.contact}
                          </a>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default VCFirms;
