import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Users,
  Building2,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

const HeroSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (searchQuery.trim()) {
      // Navigate to news page with search query
      window.location.href = `/news?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const stats = [
    {
      icon: Users,
      label: "Angel Investors",
      value: "100+",
      color: "text-blue-600",
    },
    {
      icon: Building2,
      label: "VC Firms",
      value: "50+",
      color: "text-purple-600",
    },
    { icon: Calendar, label: "Events", value: "20+", color: "text-green-600" },
    {
      icon: TrendingUp,
      label: "Policies",
      value: "200+",
      color: "text-orange-600",
    },
  ];

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-purple-50/30 to-purple-100/20">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-300/5 to-blue-300/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Main Heading */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              Your Startup Ecosystem Hub
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
              Connect with{" "}
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Elite Investors
              </span>{" "}
              & Discover{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Opportunities
              </span>
            </h1>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Access comprehensive startup insights, connect with angel
              investors, discover events, and stay updated with the latest
              policies shaping India's startup ecosystem.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative flex items-center bg-white rounded-2xl shadow-lg border border-gray-200 p-2">
              <Search className="w-5 h-5 text-gray-400 ml-4" />
              <Input
                placeholder="Search for news, events, investors,  or policies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 border-none text-gray-700 placeholder:text-gray-400 max-md:placeholder:text-xs bg-transparent px-4 focus:outline-none focus-visible:ring-0"
              />
              <Button
                onClick={handleSearch}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-2 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Search
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/database/angels">
              <Button
                variant="outline"
                className="border-purple-200 text-purple-700 hover:bg-purple-50 px-6 py-2 rounded-xl"
              >
                <Users className="w-4 h-4 mr-2" />
                Find Investors
              </Button>
            </Link>
            <Link to="/events">
              <Button
                variant="outline"
                className="border-blue-200 text-blue-700 hover:bg-blue-50 px-6 py-2 rounded-xl"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Upcoming Events
              </Button>
            </Link>
            <Link to="/news">
              <Button
                variant="outline"
                className="border-green-200 text-green-700 hover:bg-green-50 px-6 py-2 rounded-xl"
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                Latest News
              </Button>
            </Link>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="bg-white/50 backdrop-blur-sm border-gray-200/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <CardContent className="p-6 text-center">
                  <stat.icon className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} />
                  <div className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
