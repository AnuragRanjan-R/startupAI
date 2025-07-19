import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useToast } from '@/components/ui/use-toast';
import { investors } from '@/constants/angelInvestors';
import { useIsMobile } from '@/hooks/use-mobile';
import { useUser } from '@clerk/clerk-react';
import {
  ArrowDown,
  ArrowUp,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Download,
  Filter,
  Info,
  MapPin,
  Search,
  TrendingUp,
  Users,
  X,
} from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const sectorOptions = [
  { key: 'saas', label: 'SaaS', match: 'saas', icon: '💻' },
  { key: 'fintech', label: 'Fintech', match: 'fintech', icon: '💳' },
  { key: 'healthcare', label: 'Healthcare', match: 'healthcare', icon: '🏥' },
  { key: 'aiml', label: 'AI/ML', match: 'ai', icon: '🤖' },
];

const stageOptions = [
  { key: 'preseed', label: 'Pre-seed', match: 'pre-seed', icon: '🌱' },
  { key: 'seed', label: 'Seed', match: 'seed', icon: '🌿' },
  { key: 'seriesA', label: 'Series A', match: 'series a', icon: '🌳' },
  { key: 'seriesB', label: 'Series B', match: 'series b', icon: '🌲' },
];

const locationOptions = [
  { key: 'bangalore', label: 'Bangalore', match: 'bangalore', icon: '🏙️' },
  { key: 'mumbai', label: 'Mumbai', match: 'mumbai', icon: '🌆' },
  { key: 'delhi', label: 'Delhi NCR', match: 'delhi ncr', icon: '🏛️' },
];

const PAGE_SIZE = 10;

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
};

const sortOptions = [
  { key: 'name', label: 'Name' },
  { key: 'location', label: 'Location' },
  { key: 'stage', label: 'Stage' },
];

type SortState = {
  key: string;
  direction: 'asc' | 'desc';
};

const AngelInvestors = () => {
  const [filters, setFilters] = useState({
    saas: false,
    fintech: false,
    healthcare: false,
    aiml: false,
    preseed: false,
    seed: false,
    seriesA: false,
    seriesB: false,
    bangalore: false,
    mumbai: false,
    delhi: false,
    search: '',
  });
  const [searchInput, setSearchInput] = useState('');
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<SortState>({
    key: 'name',
    direction: 'asc',
  });
  const [showTooltip, setShowTooltip] = useState<string | null>(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const { user } = useUser();
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Debounce search input
  React.useEffect(() => {
    const handler = setTimeout(() => {
      setFilters((f) => ({ ...f, search: searchInput }));
      setPage(1);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchInput]);

  // Filtering logic
  const filteredInvestors = useMemo(() => {
    return investors.filter((inv) => {
      // Sector filter
      const sectorActive = sectorOptions.filter((opt) => !!filters[opt.key]);
      const sectorMatch =
        sectorActive.length === 0 ||
        sectorActive.some((opt) =>
          inv.sectors.toLowerCase().includes(opt.match),
        );
      // Stage filter
      const stageActive = stageOptions.filter((opt) => !!filters[opt.key]);
      const stageMatch =
        stageActive.length === 0 ||
        stageActive.some((opt) => inv.stage.toLowerCase().includes(opt.match));
      // Location filter
      const locationActive = locationOptions.filter(
        (opt) => !!filters[opt.key],
      );
      const locationMatch =
        locationActive.length === 0 ||
        locationActive.some((opt) =>
          inv.location.toLowerCase().includes(opt.match),
        );
      // Global search
      const search = filters.search.trim().toLowerCase();
      const searchMatch =
        !search ||
        inv.name.toLowerCase().includes(search) ||
        inv.location.toLowerCase().includes(search) ||
        inv.sectors.toLowerCase().includes(search) ||
        inv.stage.toLowerCase().includes(search);
      return sectorMatch && stageMatch && locationMatch && searchMatch;
    });
  }, [filters]);

  // Sorting logic
  const sortedInvestors = useMemo(() => {
    const sorted = [...filteredInvestors];
    sorted.sort((a, b) => {
      const { key, direction } = sort;
      let aVal: string = String((a as Record<string, unknown>)[key] ?? '');
      let bVal: string = String((b as Record<string, unknown>)[key] ?? '');
      aVal = aVal.toLowerCase();
      bVal = bVal.toLowerCase();
      if (aVal < bVal) return direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return direction === 'asc' ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [filteredInvestors, sort]);

  // Pagination logic
  const totalPages = Math.ceil(sortedInvestors.length / PAGE_SIZE) || 1;
  const paginatedInvestors = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return sortedInvestors.slice(start, start + PAGE_SIZE);
  }, [sortedInvestors, page]);

  // Active filter chips
  const activeChips = [
    ...sectorOptions.filter((opt) => !!filters[opt.key]),
    ...stageOptions.filter((opt) => !!filters[opt.key]),
    ...locationOptions.filter((opt) => !!filters[opt.key]),
  ];

  // CSV Export
  const handleExportCSV = (e?: React.MouseEvent) => {
    if (!user) {
      if (isMobile && e) {
        e.preventDefault();
        toast({ title: 'Sign in to download' });
      }
      return;
    }
    const header = ['Name', 'Location', 'Sectors', 'Stage'];
    const rows = sortedInvestors.map((inv) => [
      inv.name,
      inv.location,
      inv.sectors,
      inv.stage,
    ]);
    const csv = [header, ...rows]
      .map((r) =>
        r.map((field) => `"${field.replace(/"/g, '""')}` + '"').join(','),
      )
      .join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'angel-investors.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Remove chip
  const removeChip = (key: string) => {
    setFilters((prev) => ({ ...prev, [key]: false }));
    setPage(1);
  };

  // Clear all filters
  const clearAll = () => {
    setFilters({
      saas: false,
      fintech: false,
      healthcare: false,
      aiml: false,
      preseed: false,
      seed: false,
      seriesA: false,
      seriesB: false,
      bangalore: false,
      mumbai: false,
      delhi: false,
      search: '',
    });
    setSearchInput('');
    setPage(1);
  };

  // Pagination controls
  const goToPage = (p: number) => {
    setPage(Math.max(1, Math.min(totalPages, p)));
  };

  // Sorting controls
  const handleSort = (key: string) => {
    setSort((prev) => {
      if (prev.key === key) {
        return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
      }
      return { key, direction: 'asc' };
    });
  };

  // Clickable sector/location chips in table
  const handleTableChipClick = (type: 'sector' | 'location', value: string) => {
    if (type === 'sector') {
      const found = sectorOptions.find((opt) =>
        value.toLowerCase().includes(opt.match),
      );
      if (found) setFilters((prev) => ({ ...prev, [found.key]: true }));
    } else if (type === 'location') {
      const found = locationOptions.find((opt) =>
        value.toLowerCase().includes(opt.match),
      );
      if (found) setFilters((prev) => ({ ...prev, [found.key]: true }));
    }
    setPage(1);
  };

  // Tooltip helpers
  const tooltipContent = {
    sector: 'Filter investors by the sectors they invest in.',
    stage: 'Filter by the funding stage the investor prefers.',
    location: 'Filter by the city/region where the investor is based.',
    search: 'Search by name, sector, location, or stage.',
  };

  // Prevent background scroll and right overflow when mobile sidebar is open
  useEffect(() => {
    document.body.classList.add('overflow-x-hidden');
    if (showMobileFilters) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
      document.body.classList.remove('overflow-x-hidden');
    };
  }, [showMobileFilters]);

  // Sidebar filter UI as a function for reuse
  const renderSidebar = (isMobileSidebar = false) => (
    <div
      className={
        isMobileSidebar
          ? 'fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-center items-center lg:hidden transition-all duration-300'
          : 'lg:col-span-1 w-full flex justify-center items-center'
      }
      style={
        isMobileSidebar ? { display: showMobileFilters ? 'flex' : 'none' } : {}
      }
    >
      <div
        className={
          isMobileSidebar
            ? 'w-[85vw] max-w-sm bg-white h-full shadow-2xl transform transition-transform duration-300 ease-out'
            : ''
        }
        style={
          isMobileSidebar
            ? {
                transform: showMobileFilters
                  ? 'translateX(0)'
                  : 'translateX(-100%)',
              }
            : {}
        }
      >
        <Card className="bg-white border-gray-200 h-full shadow-lg">
          <CardContent className="p-0 h-full flex flex-col">
            {/* Filter Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Filter className="h-4 w-4 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Filters</h3>
              </div>
              <div className="flex items-center gap-2">
                {activeChips.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                    onClick={clearAll}
                  >
                    Clear All
                  </Button>
                )}
                {isMobileSidebar && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-red-50 hover:text-red-600 transition-colors"
                    onClick={() => setShowMobileFilters(false)}
                    aria-label="Close filters"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                )}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-8">
              {/* Global Search */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                  <Search className="w-4 h-4 text-gray-500" />
                  Global Search
                  <span
                    onMouseEnter={() => setShowTooltip('search')}
                    onMouseLeave={() => setShowTooltip(null)}
                    className="relative cursor-help"
                  >
                    <Info className="w-3 h-3 text-gray-400 hover:text-blue-500 transition-colors" />
                    {showTooltip === 'search' && (
                      <div className="absolute left-5 top-0 z-50 bg-gray-900 text-white text-xs rounded-lg px-3 py-2 shadow-xl whitespace-nowrap">
                        {tooltipContent.search}
                        <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-0 h-0 border-r-4 border-r-gray-900 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
                      </div>
                    )}
                  </span>
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search by name, sector, location..."
                    className="pl-10 border-gray-200 focus:border-blue-300 focus:ring-2 focus:ring-blue-100 transition-all"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                  />
                </div>
              </div>

              {/* Sector Filters */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-gray-500" />
                  Sector
                  <span
                    onMouseEnter={() => setShowTooltip('sector')}
                    onMouseLeave={() => setShowTooltip(null)}
                    className="relative cursor-help"
                  >
                    <Info className="w-3 h-3 text-gray-400 hover:text-blue-500 transition-colors" />
                    {showTooltip === 'sector' && (
                      <div className="absolute left-5 top-0 z-20 bg-gray-900 text-white text-xs rounded-lg px-3 py-2 shadow-xl whitespace-nowrap">
                        {tooltipContent.sector}
                        <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-0 h-0 border-r-4 border-r-gray-900 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
                      </div>
                    )}
                  </span>
                </h4>
                <div className="space-y-3">
                  {sectorOptions.map((item) => (
                    <div
                      key={item.key}
                      className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Checkbox
                        id={item.key}
                        checked={Boolean(
                          filters[item.key as keyof typeof filters],
                        )}
                        onCheckedChange={(checked) =>
                          setFilters((prev) => ({
                            ...prev,
                            [item.key]: Boolean(checked),
                          }))
                        }
                        className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                      />
                      <label
                        htmlFor={item.key}
                        className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer flex-1"
                      >
                        <span className="text-base">{item.icon}</span>
                        {item.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stage Filters */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-gray-500" />
                  Stage
                  <span
                    onMouseEnter={() => setShowTooltip('stage')}
                    onMouseLeave={() => setShowTooltip(null)}
                    className="relative cursor-help"
                  >
                    <Info className="w-3 h-3 text-gray-400 hover:text-blue-500 transition-colors" />
                    {showTooltip === 'stage' && (
                      <div className="absolute left-5 top-0 z-20 bg-gray-900 text-white text-xs rounded-lg px-3 py-2 shadow-xl whitespace-nowrap">
                        {tooltipContent.stage}
                        <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-0 h-0 border-r-4 border-r-gray-900 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
                      </div>
                    )}
                  </span>
                </h4>
                <div className="space-y-3">
                  {stageOptions.map((item) => (
                    <div
                      key={item.key}
                      className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Checkbox
                        id={item.key}
                        checked={Boolean(
                          filters[item.key as keyof typeof filters],
                        )}
                        onCheckedChange={(checked) =>
                          setFilters((prev) => ({
                            ...prev,
                            [item.key]: Boolean(checked),
                          }))
                        }
                        className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                      />
                      <label
                        htmlFor={item.key}
                        className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer flex-1"
                      >
                        <span className="text-base">{item.icon}</span>
                        {item.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Location Filters */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  Location
                  <span
                    onMouseEnter={() => setShowTooltip('location')}
                    onMouseLeave={() => setShowTooltip(null)}
                    className="relative cursor-help"
                  >
                    <Info className="w-3 h-3 text-gray-400 hover:text-blue-500 transition-colors" />
                    {showTooltip === 'location' && (
                      <div className="absolute left-5 top-0 z-20 bg-gray-900 text-white text-xs rounded-lg px-3 py-2 shadow-xl whitespace-nowrap">
                        {tooltipContent.location}
                        <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-0 h-0 border-r-4 border-r-gray-900 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
                      </div>
                    )}
                  </span>
                </h4>
                <div className="space-y-3">
                  {locationOptions.map((item) => (
                    <div
                      key={item.key}
                      className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Checkbox
                        id={item.key}
                        checked={Boolean(
                          filters[item.key as keyof typeof filters],
                        )}
                        onCheckedChange={(checked) =>
                          setFilters((prev) => ({
                            ...prev,
                            [item.key]: Boolean(checked),
                          }))
                        }
                        className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                      />
                      <label
                        htmlFor={item.key}
                        className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer flex-1"
                      >
                        <span className="text-base">{item.icon}</span>
                        {item.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <Layout title="Angel Investors Directory">
      <div className="space-y-6 w-full max-w-full overflow-x-hidden bg-gray-50 min-h-screen">
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 lg:p-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                  Angel Investors Directory
                </h1>
              </div>
              <p className="text-gray-600 text-sm lg:text-base">
                Discover and connect with angel investors across various sectors
                and stages.
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {sortedInvestors.length} investors
                </span>
                {activeChips.length > 0 && (
                  <span className="flex items-center gap-1">
                    <Filter className="w-4 h-4" />
                    {activeChips.length} filters active
                  </span>
                )}
              </div>
            </div>

            {isMobile ? (
              <Button
                variant="outline"
                className="flex items-center gap-2 bg-blue-50 border-blue-200 hover:bg-blue-100 text-blue-700 font-medium shadow-sm"
                onClick={(e) => {
                  if (!user) {
                    toast({ title: 'Sign in to download' });
                    e.preventDefault();
                    return;
                  }
                  handleExportCSV(e);
                }}
                disabled={!user}
              >
                <Download className="h-4 w-4" />
                Export CSV
              </Button>
            ) : (
              <Tooltip>
                <TooltipTrigger className="cursor-pointer" asChild>
                  <span>
                    <Button
                      variant="outline"
                      className="flex items-center gap-2 bg-blue-50 border-blue-200 hover:bg-blue-100 text-blue-700 font-medium shadow-sm transition-all"
                      onClick={handleExportCSV}
                      disabled={!user}
                    >
                      <Download className="h-4 w-4" />
                      Export CSV
                    </Button>
                  </span>
                </TooltipTrigger>
                {!user && (
                  <TooltipContent side="bottom">
                    Sign in to download
                  </TooltipContent>
                )}
              </Tooltip>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6 w-full max-w-full">
          {/* Mobile Filter Button */}
          {isMobile && (
            <div className="lg:hidden">
              <Button
                variant="outline"
                className="w-full flex items-center justify-center gap-2 bg-white border-gray-200 hover:bg-gray-50 shadow-sm"
                onClick={() => setShowMobileFilters(true)}
              >
                <Filter className="h-4 w-4" />
                Filters
                {activeChips.length > 0 && (
                  <span className="ml-2 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    {activeChips.length}
                  </span>
                )}
              </Button>
            </div>
          )}

          {/* Filters Sidebar */}
          {isMobile ? renderSidebar(true) : renderSidebar(false)}

          {/* Main Content */}
          <div className="lg:col-span-3 w-full max-w-full">
            <Card className="bg-white border-gray-200 shadow-sm">
              <CardContent className="p-0">
                {/* Active filter chips */}
                {activeChips.length > 0 && (
                  <div className="flex flex-wrap gap-2 p-4 lg:p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <Filter className="w-4 h-4" />
                      Active Filters:
                    </div>
                    {activeChips.map((chip) => (
                      <span
                        key={chip.key}
                        className="inline-flex items-center bg-blue-100 hover:bg-blue-200 text-blue-800 text-xs font-medium px-3 py-1.5 rounded-full border border-blue-200 transition-colors"
                      >
                        {chip.label}
                        <button
                          className="ml-2 hover:text-red-600 transition-colors"
                          onClick={() => removeChip(chip.key)}
                          aria-label={`Remove ${chip.label}`}
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}

                <div
                  className="w-full overflow-x-auto sm:rounded"
                  style={{ maxWidth: '100vw' }}
                >
                  {/* Mobile scroll hint */}
                  {isMobile && (
                    <div className="text-xs text-gray-400 px-4 py-2 bg-gray-50 border-b border-gray-100">
                      <div className="flex items-center gap-1">
                        <span>Swipe to view more</span>
                        <ChevronRight className="w-3 h-3" />
                      </div>
                    </div>
                  )}

                  <table className="min-w-[700px] px-2 w-full text-sm">
                    <thead className="bg-gradient-to-r overflow-x-auto from-gray-50 to-gray-100 border-b border-gray-200">
                      <tr>
                        <th
                          className="text-left py-4 px-4 lg:px-6 font-semibold text-gray-800 cursor-pointer select-none hover:bg-gray-100 transition-colors"
                          onClick={() => handleSort('name')}
                        >
                          <span className="flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            Name
                            {sort.key === 'name' && (
                              <div className="text-blue-600">
                                {sort.direction === 'asc' ? (
                                  <ArrowUp className="w-4 h-4" />
                                ) : (
                                  <ArrowDown className="w-4 h-4" />
                                )}
                              </div>
                            )}
                          </span>
                        </th>
                        <th
                          className="text-left py-4 px-4 lg:px-6 font-semibold text-gray-800 cursor-pointer select-none hover:bg-gray-100 transition-colors"
                          onClick={() => handleSort('location')}
                        >
                          <span className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            Location
                            {sort.key === 'location' && (
                              <div className="text-blue-600">
                                {sort.direction === 'asc' ? (
                                  <ArrowUp className="w-4 h-4" />
                                ) : (
                                  <ArrowDown className="w-4 h-4" />
                                )}
                              </div>
                            )}
                          </span>
                        </th>
                        <th className="text-left py-4 px-4 lg:px-6 font-semibold text-gray-800">
                          <span className="flex items-center gap-2">
                            <Briefcase className="w-4 h-4" />
                            Sectors
                          </span>
                        </th>
                        <th
                          className="text-left py-4 px-4 lg:px-6 font-semibold text-gray-800 cursor-pointer select-none hover:bg-gray-100 transition-colors"
                          onClick={() => handleSort('stage')}
                        >
                          <span className="flex items-center gap-2">
                            <TrendingUp className="w-4 h-4" />
                            Stage
                            {sort.key === 'stage' && (
                              <div className="text-blue-600">
                                {sort.direction === 'asc' ? (
                                  <ArrowUp className="w-4 h-4" />
                                ) : (
                                  <ArrowDown className="w-4 h-4" />
                                )}
                              </div>
                            )}
                          </span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedInvestors.length === 0 ? (
                        <tr>
                          <td colSpan={4} className="py-16 px-6 text-center">
                            <div className="flex flex-col items-center gap-4">
                              <div className="p-4 bg-gray-100 rounded-full">
                                <Users className="w-8 h-8 text-gray-400" />
                              </div>
                              <div className="space-y-2">
                                <h3 className="text-lg font-medium text-gray-900">
                                  No investors found
                                </h3>
                                <p className="text-gray-500">
                                  Try adjusting your filters or search criteria
                                </p>
                              </div>
                              {activeChips.length > 0 && (
                                <Button
                                  variant="outline"
                                  onClick={clearAll}
                                  className="mt-2"
                                >
                                  Clear all filters
                                </Button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ) : (
                        paginatedInvestors.map((investor, idx) => (
                          <tr
                            key={investor.id}
                            className={`border-b border-gray-100 hover:bg-blue-50 hover:shadow-sm cursor-pointer transition-all duration-200 ${
                              idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                            }`}
                            onClick={() =>
                              navigate(`/database/investor/${investor.id}`)
                            }
                          >
                            <td className="py-4 px-4 lg:px-6">
                              <div className="flex items-center gap-3">
                                <div className="flex-shrink-0">
                                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white font-bold text-sm shadow-lg">
                                    {getInitials(investor.name)}
                                  </span>
                                </div>
                                <div className="min-w-0 flex-1">
                                  <span className="text-blue-600 hover:text-blue-700 font-semibold text-sm lg:text-base block truncate">
                                    {investor.name}
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-4 lg:px-6 text-gray-600">
                              <button
                                className="inline-flex items-center px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-blue-100 text-xs font-medium text-blue-700 border border-gray-200 hover:border-blue-200 transition-all"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleTableChipClick(
                                    'location',
                                    investor.location,
                                  );
                                }}
                              >
                                <MapPin className="w-3 h-3 mr-1" />
                                {investor.location}
                              </button>
                            </td>
                            <td className="py-4 px-4 lg:px-6 text-gray-600">
                              <div className="flex flex-wrap gap-1">
                                {investor.sectors
                                  .split(',')
                                  .map((sector, i) => (
                                    <button
                                      key={i}
                                      className="inline-flex items-center px-2 py-1 rounded-md bg-gray-100 hover:bg-blue-100 text-xs font-medium text-blue-700 border border-gray-200 hover:border-blue-200 transition-all"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleTableChipClick('sector', sector);
                                      }}
                                    >
                                      {sector.trim()}
                                    </button>
                                  ))}
                              </div>
                            </td>
                            <td className="py-4 px-4 lg:px-6 text-gray-600">
                              <span className="inline-flex items-center px-3 py-1.5 rounded-lg bg-green-100 text-green-800 text-xs font-medium border border-green-200">
                                <TrendingUp className="w-3 h-3 mr-1" />
                                {investor.stage}
                              </span>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Enhanced Pagination */}
                {sortedInvestors.length > 0 && (
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 lg:p-6 border-t border-gray-200 bg-gray-50">
                    <div className="text-sm text-gray-600">
                      Showing {(page - 1) * PAGE_SIZE + 1} to{' '}
                      {Math.min(page * PAGE_SIZE, sortedInvestors.length)} of{' '}
                      {sortedInvestors.length} investors
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => goToPage(1)}
                        disabled={page === 1}
                        className="hover:bg-blue-50 hover:border-blue-300 disabled:opacity-50"
                      >
                        <ChevronsLeft className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => goToPage(page - 1)}
                        disabled={page === 1}
                        className="hover:bg-blue-50 hover:border-blue-300 disabled:opacity-50"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </Button>

                      <div className="flex gap-1 items-center">
                        {Array.from({ length: totalPages }, (_, i) => i + 1)
                          .slice(Math.max(0, page - 2), page + 1)
                          .map((pn) => (
                            <Button
                              key={pn}
                              variant={pn === page ? 'default' : 'outline'}
                              size="sm"
                              onClick={() => goToPage(pn)}
                              className={
                                pn === page
                                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                  : 'hover:bg-blue-50 hover:border-blue-300'
                              }
                            >
                              {pn}
                            </Button>
                          ))}
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => goToPage(page + 1)}
                        disabled={page === totalPages}
                        className="hover:bg-blue-50 hover:border-blue-300 disabled:opacity-50"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => goToPage(totalPages)}
                        disabled={page === totalPages}
                        className="hover:bg-blue-50 hover:border-blue-300 disabled:opacity-50"
                      >
                        <ChevronsRight className="w-4 h-4" />
                      </Button>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => goToPage(1)}
                      className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                    >
                      Reset
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AngelInvestors;
