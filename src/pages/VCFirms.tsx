
import { useState } from "react";
import { Link } from "react-router-dom";
import { Download, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import Layout from "@/components/Layout";

const VCFirms = () => {
  const [filters, setFilters] = useState({
    saas: false,
    fintech: false,
    healthcare: false,
    aiml: false,
    seed: false,
    seriesA: false,
    seriesB: false,
    bangalore: false,
    mumbai: false,
    delhi: false
  });

  const vcFirms = [
    {
      id: 1,
      name: "VC Firm 1",
      location: "Mumbai",
      sectors: "AI/ML, SaaS",
      stage: "Series A, B"
    },
    {
      id: 2,
      name: "VC Firm 2",
      location: "Mumbai",
      sectors: "AI/ML, SaaS", 
      stage: "Series A, B"
    },
    {
      id: 3,
      name: "VC Firm 3",
      location: "Mumbai",
      sectors: "AI/ML, SaaS",
      stage: "Series A, B"
    },
    {
      id: 4,
      name: "VC Firm 4",
      location: "Mumbai",
      sectors: "AI/ML, SaaS",
      stage: "Series A, B"
    },
    {
      id: 5,
      name: "VC Firm 5",
      location: "Mumbai",
      sectors: "AI/ML, SaaS",
      stage: "Series A, B"
    },
    {
      id: 6,
      name: "VC Firm 6",
      location: "Mumbai",
      sectors: "AI/ML, SaaS",
      stage: "Series A, B"
    },
    {
      id: 7,
      name: "VC Firm 7",
      location: "Mumbai",
      sectors: "AI/ML, SaaS",
      stage: "Series A, B"
    },
    {
      id: 8,
      name: "VC Firm 8",
      location: "Mumbai",
      sectors: "AI/ML, SaaS",
      stage: "Series A, B"
    }
  ];

  return (
    <Layout title="VC Firms Directory">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-gray-600">
            Explore venture capital firms and their investment focus areas.
          </p>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export Excel
          </Button>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-white border-gray-200">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Filter className="h-4 w-4" />
                  <h3 className="font-semibold">Filters</h3>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-2">
                      Global Search
                    </label>
                    <Input placeholder="Search..." className="border-gray-200" />
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">Sector</h4>
                    <div className="space-y-2">
                      {[
                        { key: 'saas', label: 'SaaS' },
                        { key: 'fintech', label: 'Fintech' },
                        { key: 'healthcare', label: 'Healthcare' },
                        { key: 'aiml', label: 'AI/ML' }
                      ].map((item) => (
                        <div key={item.key} className="flex items-center space-x-2">
                          <Checkbox 
                            id={item.key}
                            checked={filters[item.key as keyof typeof filters]}
                            onCheckedChange={(checked) => 
                              setFilters(prev => ({...prev, [item.key]: checked as boolean}))
                            }
                          />
                          <label htmlFor={item.key} className="text-sm text-gray-600">
                            {item.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">Stage</h4>
                    <div className="space-y-2">
                      {[
                        { key: 'seed', label: 'Seed' },
                        { key: 'seriesA', label: 'Series A' },
                        { key: 'seriesB', label: 'Series B+' }
                      ].map((item) => (
                        <div key={item.key} className="flex items-center space-x-2">
                          <Checkbox 
                            id={item.key}
                            checked={filters[item.key as keyof typeof filters]}
                            onCheckedChange={(checked) => 
                              setFilters(prev => ({...prev, [item.key]: checked as boolean}))
                            }
                          />
                          <label htmlFor={item.key} className="text-sm text-gray-600">
                            {item.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">Location</h4>
                    <div className="space-y-2">
                      {[
                        { key: 'bangalore', label: 'Bangalore' },
                        { key: 'mumbai', label: 'Mumbai' },
                        { key: 'delhi', label: 'Delhi' }
                      ].map((item) => (
                        <div key={item.key} className="flex items-center space-x-2">
                          <Checkbox 
                            id={item.key}
                            checked={filters[item.key as keyof typeof filters]}
                            onCheckedChange={(checked) => 
                              setFilters(prev => ({...prev, [item.key]: checked as boolean}))
                            }
                          />
                          <label htmlFor={item.key} className="text-sm text-gray-600">
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

          {/* VC Firms Table */}
          <div className="lg:col-span-3">
            <Card className="bg-white border-gray-200">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="text-left py-3 px-6 font-semibold text-gray-700">Name</th>
                        <th className="text-left py-3 px-6 font-semibold text-gray-700">Location</th>
                        <th className="text-left py-3 px-6 font-semibold text-gray-700">Sectors</th>
                        <th className="text-left py-3 px-6 font-semibold text-gray-700">Stage</th>
                      </tr>
                    </thead>
                    <tbody>
                      {vcFirms.map((firm) => (
                        <tr key={firm.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-4 px-6">
                            <Link 
                              to={`/database/investor/${firm.id}`}
                              className="text-blue-600 hover:text-blue-700 font-medium"
                            >
                              {firm.name}
                            </Link>
                          </td>
                          <td className="py-4 px-6 text-gray-600">{firm.location}</td>
                          <td className="py-4 px-6 text-gray-600">{firm.sectors}</td>
                          <td className="py-4 px-6 text-gray-600">{firm.stage}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-center gap-2 p-6 border-t border-gray-200">
                  <Button variant="outline" size="sm">Previous</Button>
                  <Button variant="default" size="sm">1</Button>
                  <Button variant="outline" size="sm">2</Button>
                  <Button variant="outline" size="sm">3</Button>
                  <Button variant="outline" size="sm">Next</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default VCFirms;
