import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Briefcase, Target, ArrowRight } from "lucide-react";
import { investors } from "@/constants/angelInvestors";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const InvestorSpotlight = () => {
  // Select top 6 featured investors (you can modify this selection logic as needed)
  const featuredInvestors = investors.slice(0, 6);

  return (
    <section className="py-12 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-3 md:px-8">
        <h2 className="text-4xl font-bold mb-2 text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Featured Investors
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Meet some of India's most influential angel investors
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredInvestors.map((investor) => (
            <Card
              key={investor.id}
              className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white"
            >
              <CardContent className="p-6">
                <div className="flex flex-col">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {investor.name}
                  </h3>

                  <div className="flex items-center text-gray-600 mb-3">
                    <MapPin className="h-4 w-4 mr-2 text-indigo-500" />
                    <span className="text-sm">{investor.location}</span>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-start mb-2">
                      <Briefcase className="h-4 w-4 mr-2 text-indigo-500 mt-1 flex-shrink-0" />
                      <div className="flex flex-wrap gap-1">
                        {investor.sectors.split(", ").map((sector, idx) => (
                          <Badge
                            key={idx}
                            variant="secondary"
                            className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
                          >
                            {sector}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Target className="h-4 w-4 mr-2 text-indigo-500 mt-1 flex-shrink-0" />
                      <div className="flex flex-wrap gap-1">
                        {investor.stage.split(", ").map((stage, idx) => (
                          <Badge
                            key={idx}
                            variant="outline"
                            className="border-purple-200 text-purple-700"
                          >
                            {stage}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Link
                    to={`/database/angels`}
                    className="text-indigo-600 hover:underline text-sm"
                  >
                    <button className="mt-4 w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 rounded-md hover:opacity-90 transition-opacity">
                      More Details
                    </button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={() => (window.location.href = "/database/angels")}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full hover:opacity-90 transition-opacity text-lg font-semibold shadow-lg hover:shadow-xl"
          >
            View All Angel Investors
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default InvestorSpotlight;
