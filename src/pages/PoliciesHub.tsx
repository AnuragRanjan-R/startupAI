
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Download, Search } from "lucide-react";
import Layout from "@/components/Layout";
import { policies } from "@/constants/policies";
import { useUser } from "@clerk/clerk-react";
import { useToast } from "@/components/ui/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

const PoliciesHub = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { isLoaded, user } = useUser();
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const tabs = [
    { key: 'all', label: 'All' },
    { key: 'central', label: 'Central Govt' },
    { key: 'state', label: 'State' },
    { key: 'tax', label: 'Tax' },
    { key: 'sector', label: 'Sector' }
  ];

  // Filter policies based on active tab and search query
  const filteredPolicies = policies.filter(policy => {
    // Filter by tab
    if (activeTab !== 'all' && policy.category !== activeTab) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        policy.title.toLowerCase().includes(query) ||
        policy.excerpt.toLowerCase().includes(query) ||
        (policy.state && policy.state.toLowerCase().includes(query))
      );
    }
    
    return true;
  });

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
      policy.website || ''
    ]);
    
    const csv = [header, ...rows]
      .map((r) =>
        r.map((field) => `"${String(field).replace(/"/g, '""')}"`).join(',')
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

  return (
    <Layout title="Policy Hub">
      <div className="space-y-6 md:px-4 px-2">
        {/* Search and Export */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search policies..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Button
            variant="outline"
            className="flex items-center gap-2 w-full sm:w-auto"
            onClick={handleExportCSV}
          >
            <Download className="h-4 w-4" />
            {user ? 'Export as CSV' : 'Sign in to Export'}
          </Button>
        </div>
        
        {/* Policy Categories Tabs */}
        <div className="flex gap-1 bg-gray-100 p-1 rounded-lg overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 text-sm font-medium rounded whitespace-nowrap transition-colors ${
                activeTab === tab.key 
                  ? 'bg-white text-gray-800 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Policies Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPolicies.length > 0 ? (
            filteredPolicies.map((policy) => (
              <Card key={policy.id} className="bg-white border-gray-200 hover:shadow-md transition-shadow h-full">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded capitalize">
                      {policy.category}
                    </span>
                    <span className="text-xs text-gray-500">{policy.date}</span>
                  </div>
                  
                  <Link to={`/policies/${policy.id}`} className="flex-grow">
                    <h3 className="font-semibold text-gray-800 mb-3 hover:text-blue-600 cursor-pointer">
                      {policy.title}
                    </h3>
                  </Link>
                  
                  <p className="text-gray-600 text-sm line-clamp-3 mt-auto">
                    {policy.excerpt}
                  </p>
                </CardContent>
              </Card>
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
