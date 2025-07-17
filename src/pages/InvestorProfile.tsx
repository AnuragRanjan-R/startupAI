
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MapPin, Building2, Calendar, Globe, Linkedin, Twitter, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/Layout";

const InvestorProfile = () => {
  const { id } = useParams();

  const investor = {
    id: 1,
    name: "John Smith",
    title: "Angel Investor & Tech Entrepreneur",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    location: "San Francisco, CA",
    company: "TechVentures Inc.",
    investmentRange: "$25K - $500K",
    sectors: ["FinTech", "AI/ML", "SaaS", "Healthcare"],
    totalInvestments: 47,
    successfulExits: 12,
    yearsActive: 8,
    bio: "Experienced angel investor with a passion for early-stage technology companies. Former founder of two successful startups with exits totaling over $200M. Focus on B2B SaaS and AI-driven solutions.",
    website: "https://johnsmith.vc",
    linkedin: "https://linkedin.com/in/johnsmith",
    twitter: "https://twitter.com/johnsmith",
    email: "john@techventures.com",
    phone: "+1 (555) 123-4567",
    recentInvestments: [
      { company: "DataFlow AI", sector: "AI/ML", amount: "$150K", date: "Nov 2024" },
      { company: "FinanceHub", sector: "FinTech", amount: "$100K", date: "Oct 2024" },
      { company: "HealthTech Pro", sector: "Healthcare", amount: "$200K", date: "Sep 2024" }
    ]
  };

  return (
    <Layout title="Investor Profile">
      <div className="space-y-8">
        {/* Back Button */}
        <Link 
          to="/database/angels" 
          className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 text-sm font-medium transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Angels
        </Link>

        {/* Profile Header */}
        <Card className="bg-gradient-to-r from-purple-50 to-white border-purple-200 shadow-lg">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-shrink-0">
                <img 
                  src={investor.image} 
                  alt={investor.name}
                  className="w-32 h-32 rounded-full object-cover border-4 border-purple-200 shadow-lg"
                />
              </div>
              
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{investor.name}</h1>
                <p className="text-lg text-purple-700 font-medium mb-4">{investor.title}</p>
                
                <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {investor.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Building2 className="h-4 w-4" />
                    {investor.company}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {investor.yearsActive} years active
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {investor.sectors.map((sector) => (
                    <Badge key={sector} variant="secondary" className="bg-purple-100 text-purple-800 hover:bg-purple-200">
                      {sector}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-3">
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white">Connect</Button>
                  <Button variant="outline" className="border-purple-300 text-purple-700 hover:bg-purple-50">
                    Save Profile
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Investment Stats */}
            <Card className="border-purple-200 shadow-md">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900">Investment Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600">{investor.totalInvestments}</div>
                    <div className="text-sm text-gray-600">Total Investments</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600">{investor.successfulExits}</div>
                    <div className="text-sm text-gray-600">Successful Exits</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600">{investor.investmentRange}</div>
                    <div className="text-sm text-gray-600">Investment Range</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* About */}
            <Card className="border-purple-200 shadow-md">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900">About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{investor.bio}</p>
              </CardContent>
            </Card>

            {/* Recent Investments */}
            <Card className="border-purple-200 shadow-md">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900">Recent Investments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {investor.recentInvestments.map((investment, index) => (
                    <div key={index} className="flex justify-between items-center p-4 bg-purple-50 rounded-lg border border-purple-100">
                      <div>
                        <h4 className="font-semibold text-gray-900">{investment.company}</h4>
                        <p className="text-sm text-gray-600">{investment.sector}</p>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-purple-700">{investment.amount}</div>
                        <div className="text-sm text-gray-500">{investment.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Info */}
            <Card className="border-purple-200 shadow-md">
              <CardHeader>
                <CardTitle className="text-lg text-gray-900">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <a href={investor.website} className="flex items-center gap-3 text-purple-600 hover:text-purple-700 transition-colors">
                  <Globe className="h-4 w-4" />
                  <span className="text-sm">Website</span>
                </a>
                <a href={investor.linkedin} className="flex items-center gap-3 text-purple-600 hover:text-purple-700 transition-colors">
                  <Linkedin className="h-4 w-4" />
                  <span className="text-sm">LinkedIn</span>
                </a>
                <a href={investor.twitter} className="flex items-center gap-3 text-purple-600 hover:text-purple-700 transition-colors">
                  <Twitter className="h-4 w-4" />
                  <span className="text-sm">Twitter</span>
                </a>
                <a href={`mailto:${investor.email}`} className="flex items-center gap-3 text-purple-600 hover:text-purple-700 transition-colors">
                  <Mail className="h-4 w-4" />
                  <span className="text-sm">Email</span>
                </a>
                <a href={`tel:${investor.phone}`} className="flex items-center gap-3 text-purple-600 hover:text-purple-700 transition-colors">
                  <Phone className="h-4 w-4" />
                  <span className="text-sm">Phone</span>
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default InvestorProfile;
