import Layout from '@/components/Layout';
import PolicyCard from '@/components/PolicyCard';
import PolicyCardSkeleton from '@/components/PolicyCardSkeleton';
import PolicyFiltersPanel from '@/components/PolicyFiltersPanel';
import { useToast } from '@/components/ui/use-toast';
import { policies } from '@/constants/policies';
import { useIsMobile } from '@/hooks/use-mobile';
import { useUser } from '@clerk/clerk-react';
import { useEffect, useMemo, useState } from 'react';

function getUniqueStates(policies) {
  return Array.from(new Set(policies.map((p) => p.state).filter(Boolean)));
}
function getUniqueYears(policies) {
  return Array.from(new Set(policies.map((p) => p.date.split('-')[0]))).sort(
    (a, b) => String(b).localeCompare(String(a)),
  );
}

const PoliciesHub = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedState, setSelectedState] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useUser();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for 1s
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const states = useMemo(() => getUniqueStates(policies), []);
  const years = useMemo(() => getUniqueYears(policies), []);

  // Advanced filtering
  const filteredPolicies = useMemo(() => {
    return policies.filter((policy) => {
      // Category filter (multi)
      if (
        selectedCategories.length > 0 &&
        !selectedCategories.includes(policy.category)
      ) {
        return false;
      }
      // State filter
      if (selectedState && policy.state !== selectedState) {
        return false;
      }
      // Year filter
      if (selectedYear && !policy.date.startsWith(selectedYear)) {
        return false;
      }
      // Search
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        if (
          !policy.title.toLowerCase().includes(query) &&
          !policy.excerpt.toLowerCase().includes(query) &&
          !(policy.state && policy.state.toLowerCase().includes(query))
        ) {
          return false;
        }
      }
      return true;
    });
  }, [selectedCategories, selectedState, selectedYear, searchQuery]);

  // Handle CSV export
  const handleExportCSV = (e?: React.MouseEvent) => {
    if (!user) {
      if (isMobile && e) {
        e.preventDefault();
        toast({ title: 'Sign in to download' });
      }
      return;
    }
    const header = ['Title', 'Category', 'Date', 'Description', 'Website'];
    const rows = filteredPolicies.map((policy) => [
      policy.title,
      policy.category,
      policy.date,
      policy.excerpt,
      policy.website || '',
    ]);
    const csv = [header, ...rows]
      .map((r) =>
        r.map((field) => `"${String(field).replace(/"/g, '""')}"`).join(','),
      )
      .join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'startup-policies.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Reset all filters
  const handleReset = () => {
    setSelectedCategories([]);
    setSelectedState('');
    setSelectedYear('');
    setSearchQuery('');
  };

  return (
    <Layout title="Policy Hub">
      <div className="space-y-6 md:px-4 px-2">
        {/* Filters and Export */}
        <PolicyFiltersPanel
          selectedCategories={selectedCategories as string[]}
          setSelectedCategories={setSelectedCategories}
          states={states as string[]}
          selectedState={selectedState}
          setSelectedState={setSelectedState}
          years={years as string[]}
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onReset={handleReset}
          onExport={handleExportCSV}
        />
        {/* Policies Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <PolicyCardSkeleton key={i} />
            ))
          ) : filteredPolicies.length > 0 ? (
            filteredPolicies.map((policy) => (
              <PolicyCard key={policy.id} policy={policy} />
            ))
          ) : (
            <div className="col-span-full text-center py-10 text-gray-500">
              No policies found matching your criteria.
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default PoliciesHub;
