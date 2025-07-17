
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, TrendingUp, Users, ChevronRight, Crown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Layout from "@/components/Layout";

const Index = () => {
  const newsItems = [
    {
      id: 1,
      title: "AI Startup Raises $50M Series B",
      excerpt: "Revolutionary AI platform securing major funding from top VCs for global expansion and product development.",
      date: "Dec 1, 2024",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop"
    },
    {
      id: 2,
      title: "Fintech Revolution: Digital Banking",
      excerpt: "Next-generation digital banking solutions transforming financial services across emerging markets.",
      date: "Dec 2, 2024",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=250&fit=crop"
    },
    {
      id: 3,
      title: "Healthcare Tech Breakthrough",
      excerpt: "Innovative telemedicine platform wins prestigious innovation award for rural healthcare delivery.",
      date: "Dec 3, 2024",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=250&fit=crop"
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      name: "Global Startup Summit 2024",
      date: "Dec 11, 2024",
      location: "San Francisco",
      organizer: "TechVentures Global",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=300&h=200&fit=crop"
    },
    {
      id: 2,
      name: "AI Innovation Conference",
      date: "Dec 12, 2024",
      location: "New York",
      organizer: "AI Consortium",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=300&h=200&fit=crop"
    },
    {
      id: 3,
      name: "Fintech Forum 2024",
      date: "Dec 13, 2024",
      location: "London",
      organizer: "Financial Innovation Hub",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=200&fit=crop"
    }
  ];

  const featuredInvestors = [
    {
      id: 1,
      name: "Sarah Johnson",
      title: "Managing Partner",
      company: "Royal Ventures",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face",
      focus: "AI & Deep Tech"
    },
    {
      id: 2,
      name: "Michael Chen",
      title: "Angel Investor",
      company: "Tech Pioneers Fund",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
      focus: "FinTech & SaaS"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      title: "Investment Director",
      company: "Purple Capital",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
      focus: "Healthcare Tech"
    }
  ];

  return (
    <Layout title="Elite Startup Insights" breadcrumb="Your Royal Gateway to Innovation">
      <div className="space-y-12">
        {/* Hero Section */}
        <Card className="royal-card border-none shadow-2xl overflow-hidden">
          <CardContent className="p-0">
            <div className="royal-gradient text-white p-12 text-center relative overflow-hidden">
              <div className="absolute inset-0">
                <img 
                  src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=600&fit=crop" 
                  alt="Innovation Background"
                  className="w-full h-full object-cover opacity-20"
                />
              </div>
              <div className="relative z-10">
                <Crown className="h-16 w-16 mx-auto mb-6 text-yellow-300" />
                <h2 className="text-4xl font-bold mb-4 drop-shadow-lg">Welcome to the Elite Network</h2>
                <p className="text-xl mb-8 text-purple-100 max-w-2xl mx-auto">
                  Connect with premium investors, discover groundbreaking startups, and access exclusive insights in the royal startup ecosystem.
                </p>
                <div className="max-w-md mx-auto flex gap-2">
                  <Input 
                    placeholder="Search elite opportunities..." 
                    className="bg-white/90 border-0 text-gray-800 placeholder:text-gray-500" 
                  />
                  <Button className="bg-white text-purple-700 hover:bg-gray-100 font-semibold px-6">
                    <Sparkles className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Latest News */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold royal-text-gradient flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-purple-600" />
              Premium News
            </h2>
            <Link to="/news" className="text-purple-600 hover:text-purple-700 flex items-center gap-2 text-lg font-semibold">
              Explore All <ChevronRight className="h-5 w-5" />
            </Link>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {newsItems.map((item) => (
              <Card key={item.id} className="royal-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden group">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="font-bold text-gray-900 mb-3 text-lg group-hover:text-purple-700 transition-colors">{item.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">{item.excerpt}</p>
                  <div className="flex justify-between items-center">
                    <p className="text-purple-500 text-xs font-medium">{item.date}</p>
                    <ArrowRight className="h-4 w-4 text-purple-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Investor Spotlight */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold royal-text-gradient flex items-center gap-3">
              <Crown className="h-8 w-8 text-purple-600" />
              Elite Investors
            </h2>
            <Link to="/database/angels" className="text-purple-600 hover:text-purple-700 flex items-center gap-2 text-lg font-semibold">
              View Directory <ChevronRight className="h-5 w-5" />
            </Link>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {featuredInvestors.map((investor) => (
              <Card key={investor.id} className="royal-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                <CardContent className="p-8 text-center">
                  <div className="relative mb-6">
                    <img 
                      src={investor.image} 
                      alt={investor.name}
                      className="w-24 h-24 rounded-full object-cover mx-auto border-4 border-purple-200 shadow-lg group-hover:border-purple-400 transition-colors"
                    />
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center">
                      <Crown className="h-4 w-4 text-white" />
                    </div>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1 group-hover:text-purple-700 transition-colors">{investor.name}</h3>
                  <p className="text-purple-600 font-medium text-sm mb-2">{investor.title}</p>
                  <p className="text-gray-600 text-sm mb-4">{investor.company}</p>
                  <div className="bg-purple-50 rounded-lg p-3 mb-6">
                    <p className="text-purple-700 font-medium text-sm">{investor.focus}</p>
                  </div>
                  <div className="flex gap-2 justify-center">
                    <Button variant="outline" size="sm" className="border-purple-300 text-purple-700 hover:bg-purple-50">
                      View Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Upcoming Events */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold royal-text-gradient flex items-center gap-3">
              <Calendar className="h-8 w-8 text-purple-600" />
              Exclusive Events
            </h2>
            <Link to="/events" className="text-purple-600 hover:text-purple-700 flex items-center gap-2 text-lg font-semibold">
              View Calendar <ChevronRight className="h-5 w-5" />
            </Link>
          </div>
          
          <div className="space-y-6">
            {upcomingEvents.map((event) => (
              <Card key={event.id} className="royal-card hover:shadow-xl transition-all duration-300 overflow-hidden group">
                <div className="flex">
                  <div className="w-48 h-32 flex-shrink-0 overflow-hidden">
                    <img 
                      src={event.image} 
                      alt={event.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="flex-1 p-6 flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-purple-700 transition-colors">{event.name}</h3>
                      <p className="text-purple-600 font-medium mb-1">{event.date} • {event.location}</p>
                      <p className="text-gray-600 text-sm">Hosted by {event.organizer}</p>
                    </div>
                    <Button className="royal-gradient hover:opacity-90 text-white font-medium">
                      Register
                    </Button>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Index;
