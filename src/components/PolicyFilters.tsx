import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { categories } from '@/constants/policies';


export function PolicyFilters({
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
}) {
  // Multi-select for categories
  const toggleCategory = (cat: string) => {
    setSelectedCategories(
      selectedCategories.includes(cat)
        ? selectedCategories.filter((c) => c !== cat)
        : [...selectedCategories, cat],
    );
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 justify-between items-center w-full">
      {/* Search */}
      <Input
        placeholder="Search policies..."
        className="w-full md:w-64"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <Button
            key={cat.key}
            variant={
              selectedCategories.includes(cat.key) ? 'default' : 'outline'
            }
            className={`text-xs px-3 py-1 relative overflow-hidden transition-colors duration-200 ${
              selectedCategories.includes(cat.key)
                ? 'bg-gradient-to-r from-blue-500 to-blue-700 text-white'
                : ''
            }`}
            onClick={() => toggleCategory(cat.key)}
          >
            <span className="relative z-10">{cat.label}</span>
            {selectedCategories.includes(cat.key) && (
              <span className="absolute left-0 bottom-0 w-full h-0.5 bg-blue-300 animate-slidein" />
            )}
          </Button>
        ))}
      </div>
      {/* State Filter */}
      <div className="w-32">
        <Select value={selectedState} onValueChange={setSelectedState}>
          <option value="">All States</option>
          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </Select>
      </div>
      {/* Year Filter */}
      <div className="w-24">
        <Select value={selectedYear} onValueChange={setSelectedYear}>
          <option value="">All Years</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </Select>
      </div>
      {/* Reset Button */}
      <Button variant="ghost" onClick={onReset} className="text-xs">
        Reset
      </Button>
    </div>
  );
}

export default PolicyFilters;
