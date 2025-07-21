import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { categories as categoryList } from '@/constants/policies';
import { useUser } from '@clerk/clerk-react';
import {
  Calendar,
  Download,
  Filter,
  Globe,
  RefreshCcw,
  Search,
  SlidersHorizontal,
} from 'lucide-react';
import { useState } from 'react';

export function PolicyFiltersPanel({
  selectedCategories,
  setSelectedCategories,
  states,
  selectedState,
  setSelectedState,
  years,
  selectedYear,
  setSelectedYear,
  searchQuery,
  setSearchQuery,
  onReset,
  onExport,
}: {
  selectedCategories: string[];
  setSelectedCategories: (cats: string[]) => void;
  states: string[];
  selectedState: string;
  setSelectedState: (state: string) => void;
  years: string[];
  selectedYear: string;
  setSelectedYear: (year: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onReset: () => void;
  onExport: (e?: React.MouseEvent) => void;
}) {
  const [open, setOpen] = useState(false);
  const { user } = useUser();
  const toggleCategory = (cat: string) => {
    setSelectedCategories(
      selectedCategories.includes(cat)
        ? selectedCategories.filter((c) => c !== cat)
        : [...selectedCategories, cat],
    );
  };

  // Mobile: Show button to toggle filter drawer
  return (
    <div className="relative">
      {/* Mobile: Show Filters button */}
      <div className="md:hidden flex justify-end mb-2">
        <Button
          variant="outline"
          className="flex items-center gap-2 text-xs"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="filters-drawer"
        >
          <SlidersHorizontal className="w-4 h-4" />
          {open ? 'Hide Filters' : 'Show Filters'}
        </Button>
      </div>
      {/* Filter Panel */}
      <div
        id="filters-drawer"
        className={`w-full bg-white/90 shadow-md rounded-xl p-4 flex flex-col gap-4 md:flex-row md:items-start md:gap-6 animate-fadein
          md:sticky md:top-4 md:z-30 md:bg-white/90 md:shadow-lg
          transition-all duration-300
          ${
            open
              ? 'max-h-[1000px] opacity-100 pointer-events-auto'
              : 'max-h-0 opacity-0 pointer-events-none'
          }
          md:max-h-none md:opacity-100 md:pointer-events-auto
        `}
        style={{ overflow: 'hidden' }}
        aria-hidden={!open && window.innerWidth < 768}
      >
        {/* Search */}
        <div className="flex-1 flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-600 flex items-center gap-1 mb-1">
            <Search className="w-4 h-4" /> Search
          </label>
          <Input
            placeholder="Search policies..."
            className="w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        {/* Categories */}
        <div className="flex-1 flex flex-col gap-1 min-w-[160px]">
          <label className="text-xs font-medium text-gray-600 flex items-center gap-1 mb-1">
            <Filter className="w-4 h-4" /> Category
          </label>
          <div className="flex flex-wrap gap-2">
            {categoryList.map((cat) => (
              <Button
                key={cat.key}
                variant={
                  selectedCategories.includes(cat.key) ? 'default' : 'outline'
                }
                className={`text-xs px-3 py-1 rounded-full transition-all duration-200 ${
                  selectedCategories.includes(cat.key)
                    ? 'bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow'
                    : ''
                }`}
                onClick={() => toggleCategory(cat.key)}
              >
                {cat.label}
              </Button>
            ))}
          </div>
        </div>
        {/* State */}
        <div className="flex-1 flex flex-col gap-1 min-w-[120px]">
          <label className="text-xs font-medium text-gray-600 flex items-center gap-1 mb-1">
            <Globe className="w-4 h-4" /> State
          </label>
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-2 py-1 text-sm focus:ring-2 focus:ring-blue-400 transition-all"
          >
            <option value="">All States</option>
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>
        {/* Year */}
        <div className="flex-1 flex flex-col gap-1 min-w-[100px]">
          <label className="text-xs font-medium text-gray-600 flex items-center gap-1 mb-1">
            <Calendar className="w-4 h-4" /> Year
          </label>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-2 py-1 text-sm focus:ring-2 focus:ring-blue-400 transition-all"
          >
            <option value="">All Years</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        {/* Actions */}
        <div className="flex flex-row gap-2 mt-2 md:mt-0">
          <Button
            variant="ghost"
            onClick={onReset}
            className="text-xs flex items-center gap-1 hover:bg-gray-100"
          >
            <RefreshCcw className="w-4 h-4 animate-spin-slow" /> Reset
          </Button>
          <Button
            variant="outline"
            className="flex items-center gap-2 text-xs hover:bg-blue-50"
            onClick={onExport}
          >
            <Download className="h-4 w-4 animate-bounce" />{' '}
            {!user ? 'Sign In to Export ' : 'Export as CSV'}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default PolicyFiltersPanel;
