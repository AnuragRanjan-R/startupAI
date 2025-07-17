
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/Layout";

const PoliciesHub = () => {
  const [activeTab, setActiveTab] = useState('all');

  const policies = [
    {
      id: 1,
      title: "Policy Title 1",
      category: "Tax Policy",
      date: "Dec 1, 2024",
      excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua..."
    },
    {
      id: 2,
      title: "Policy Title 2", 
      category: "Tax Policy",
      date: "Dec 2, 2024",
      excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua..."
    },
    {
      id: 3,
      title: "Policy Title 3",
      category: "Tax Policy", 
      date: "Dec 3, 2024",
      excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua..."
    },
    {
      id: 4,
      title: "Policy Title 4",
      category: "Tax Policy",
      date: "Dec 4, 2024", 
      excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua..."
    },
    {
      id: 5,
      title: "Policy Title 5",
      category: "Tax Policy",
      date: "Dec 5, 2024",
      excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua..."
    },
    {
      id: 6,
      title: "Policy Title 6", 
      category: "Tax Policy",
      date: "Dec 6, 2024",
      excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua..."
    },
    {
      id: 7,
      title: "Policy Title 7",
      category: "Tax Policy",
      date: "Dec 7, 2024",
      excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua..."
    },
    {
      id: 8,
      title: "Policy Title 8", 
      category: "Tax Policy",
      date: "Dec 8, 2024",
      excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua..."
    },
    {
      id: 9,
      title: "Policy Title 9",
      category: "Tax Policy",
      date: "Dec 9, 2024",
      excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua..."
    }
  ];

  const tabs = [
    { key: 'all', label: 'All' },
    { key: 'central', label: 'Central Govt' },
    { key: 'state', label: 'State' },
    { key: 'tax', label: 'Tax' },
    { key: 'sector', label: 'Sector' }
  ];

  return (
    <Layout title="Policy Hub">
      <div className="space-y-6">
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
        <div className="grid md:grid-cols-3 gap-6">
          {policies.map((policy) => (
            <Card key={policy.id} className="bg-white border-gray-200 hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                    {policy.category}
                  </span>
                  <span className="text-xs text-gray-500">{policy.date}</span>
                </div>
                
                <Link to={`/policies/${policy.id}`}>
                  <h3 className="font-semibold text-gray-800 mb-3 hover:text-blue-600 cursor-pointer">
                    {policy.title}
                  </h3>
                </Link>
                
                <p className="text-gray-600 text-sm line-clamp-3">
                  {policy.excerpt}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center">
          <Button variant="outline">Load More</Button>
        </div>
      </div>
    </Layout>
  );
};

export default PoliciesHub;
