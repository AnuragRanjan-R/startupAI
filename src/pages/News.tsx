
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import Layout from "@/components/Layout";

const News = () => {
  const [filters, setFilters] = useState({
    funding: false,
    acquisition: false,
    ipo: false,
    techcrunch: false,
    venturebeat: false
  });

  const newsItems = [
    {
      id: 1,
      title: "News Headline 1 - Major Funding Round",
      excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
      date: "Dec 1, 2024",
      source: "TechCrunch"
    },
    {
      id: 2,
      title: "News Headline 2 - Major Funding Round", 
      excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
      date: "Dec 2, 2024",
      source: "Inc42"
    },
    {
      id: 3,
      title: "News Headline 3 - Major Funding Round",
      excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
      date: "Dec 3, 2024",
      source: "VentureBeat"
    },
    {
      id: 4,
      title: "News Headline 4 - Major Funding Round",
      excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
      date: "Dec 4, 2024",
      source: "TechCrunch"
    },
    {
      id: 5,
      title: "News Headline 5 - Major Funding Round",
      excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
      date: "Dec 5, 2024",
      source: "TechCrunch"
    },
    {
      id: 6,
      title: "News Headline 6 - Major Funding Round",
      excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
      date: "Dec 6, 2024",
      source: "TechCrunch"
    }
  ];

  return (
    <Layout title="Startup News" breadcrumb="/news">
      <div className="space-y-6">
        {/* Filters */}
        <Card className="bg-white border-gray-200">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-4 gap-6">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">Date:</label>
                <Input type="date" className="border-gray-200" />
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">Category:</label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="funding" 
                      checked={filters.funding}
                      onCheckedChange={(checked) => setFilters(prev => ({...prev, funding: checked as boolean}))}
                    />
                    <label htmlFor="funding" className="text-sm text-gray-600">Funding</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="acquisition"
                      checked={filters.acquisition}
                      onCheckedChange={(checked) => setFilters(prev => ({...prev, acquisition: checked as boolean}))}
                    />
                    <label htmlFor="acquisition" className="text-sm text-gray-600">Acquisition</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="ipo"
                      checked={filters.ipo}
                      onCheckedChange={(checked) => setFilters(prev => ({...prev, ipo: checked as boolean}))}
                    />
                    <label htmlFor="ipo" className="text-sm text-gray-600">IPO</label>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">Source:</label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="techcrunch"
                      checked={filters.techcrunch}
                      onCheckedChange={(checked) => setFilters(prev => ({...prev, techcrunch: checked as boolean}))}
                    />
                    <label htmlFor="techcrunch" className="text-sm text-gray-600">TechCrunch</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="venturebeat"
                      checked={filters.venturebeat}
                      onCheckedChange={(checked) => setFilters(prev => ({...prev, venturebeat: checked as boolean}))}
                    />
                    <label htmlFor="venturebeat" className="text-sm text-gray-600">VentureBeat</label>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* News List */}
        <div className="space-y-4">
          {newsItems.map((item) => (
            <Card key={item.id} className="bg-white border-gray-200 hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <div className="w-24 h-16 bg-gray-100 rounded flex-shrink-0"></div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 mb-2 hover:text-blue-600 cursor-pointer">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">{item.excerpt}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>{item.date}</span>
                      <span>• {item.source}</span>
                    </div>
                  </div>
                </div>
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

export default News;
