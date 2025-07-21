import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Calendar,
  Download,
  Filter,
  Globe,
  RefreshCcw,
  Search,
} from 'lucide-react';
import { categories as categoryList } from '@/constants/policies';
import { useUser } from '@clerk/clerk-react';


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
  const toggleCategory = (cat: string) => {
    setSelectedCategories(
      selectedCategories.includes(cat)
        ? selectedCategories.filter((c) => c !== cat)
        : [...selectedCategories, cat],
    );
  };
  const {user} = useUser();

  return (
    <div className="w-full bg-white/80 shadow-md rounded-xl p-4 flex flex-col gap-4 md:flex-row md:items-start md:gap-6 animate-fadein">
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
          <Download className="h-4 w-4 animate-bounce" /> {!user ? "Sign In to Export " : "Export as CSV"} 
        </Button>
      </div>
    </div>
  );
}

export default PolicyFiltersPanel;

// Add this to your global CSS (e.g., App.css):
// .animate-fadein { animation: fadein 0.5s; }
// @keyframes fadein { from { opacity: 0; transform: translateY(-10px);} to { opacity: 1; transform: none; } }
// .animate-spin-slow { animation: spin 2s linear infinite; }
// @keyframes spin { to { transform: rotate(360deg); } }
