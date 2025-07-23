import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useGlobalSearch } from '@/hooks/useGlobalSearch';
import {
  ArrowRight,
  Calendar,
  ChevronRight,
  Crown,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const { search, setSearch, handleSearch } = useGlobalSearch();
  const newsItems = [
    {
      id: 1,
      title: 'AI Startup Raises $50M Series B',
      excerpt:
        'Revolutionary AI platform securing major funding from top VCs for global expansion and product development.',
      date: 'Dec 1, 2024',
      image:
        'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop',
    },
    {
      id: 2,
      title: 'Fintech Revolution: Digital Banking',
      excerpt:
        'Next-generation digital banking solutions transforming financial services across emerging markets.',
      date: 'Dec 2, 2024',
      image:
        'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=250&fit=crop',
    },
    {
      id: 3,
      title: 'Healthcare Tech Breakthrough',
      excerpt:
        'Innovative telemedicine platform wins prestigious innovation award for rural healthcare delivery.',
      date: 'Dec 3, 2024',
      image:
        'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=250&fit=crop',
    },
  ];

  const upcomingEvents = [
    {
      id: 1,
      name: 'Global Startup Summit 2024',
      date: 'Dec 11, 2024',
      location: 'San Francisco',
      organizer: 'TechVentures Global',
      image:
        'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=300&h=200&fit=crop',
    },
    {
      id: 2,
      name: 'AI Innovation Conference',
      date: 'Dec 12, 2024',
      location: 'New York',
      organizer: 'AI Consortium',
      image:
        'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=300&h=200&fit=crop',
    },
    {
      id: 3,
      name: 'Fintech Forum 2024',
      date: 'Dec 13, 2024',
      location: 'London',
      organizer: 'Financial Innovation Hub',
      image:
        'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=200&fit=crop',
    },
  ];

  const featuredInvestors = [
    {
      id: 1,
      name: 'Sarah Johnson',
      title: 'Managing Partner',
      company: 'Royal Ventures',
      image:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face',
      focus: 'AI & Deep Tech',
    },
    {
      id: 2,
      name: 'Michael Chen',
      title: 'Angel Investor',
      company: 'Tech Pioneers Fund',
      image:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
      focus: 'FinTech & SaaS',
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      title: 'Investment Director',
      company: 'Purple Capital',
      image:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face',
      focus: 'Healthcare Tech',
    },
  ];

  return (
    <Layout
      title="Elite Startup Insights"
      breadcrumb="Your Royal Gateway to Innovation"
    >
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
                <h2 className="text-4xl font-bold mb-4 drop-shadow-lg">
                  Welcome to the Elite Network
                </h2>
                <p className="text-xl mb-8 text-purple-100 max-w-2xl mx-auto">
                  Connect with premium investors, discover groundbreaking
                  startups, and access exclusive insights in the royal startup
                  ecosystem.
                </p>
                <div className="max-w-md mx-auto flex gap-2">
                  <Input
                    placeholder="Search elite opportunities..."
                    className="bg-white/90 border-0 text-gray-800 placeholder:text-gray-500"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  />
                  <Button
                    className="bg-white text-purple-700 hover:bg-gray-100 font-semibold px-6"
                    onClick={handleSearch}
                  >
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
            <Link
              to="/news"
              className="text-purple-600 hover:text-purple-700 flex items-center gap-2 text-sm font-semibold"
            >
              Explore All <ChevronRight className="h-5 w-5" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {newsItems.map((item) => (
              <Card
                key={item.id}
                className="royal-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden group"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="font-bold text-gray-900 mb-3 text-lg group-hover:text-purple-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {item.excerpt}
                  </p>
                  <div className="flex justify-between items-center">
                    <p className="text-purple-500 text-xs font-medium">
                      {item.date}
                    </p>
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
            <Link
              to="/database/angels"
              className="text-purple-600 hover:text-purple-700 flex items-center gap-2 text-sm font-semibold"
            >
              View Directory <ChevronRight className="h-5 w-5" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredInvestors.map((investor) => (
              <Card
                key={investor.id}
                className="relative group overflow-hidden rounded-2xl border-0 shadow-xl bg-white/60 backdrop-blur-lg flex flex-col md:flex-row p-0 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl
                  md:items-stretch
                  border-none
                  md:bg-white/60
                  md:shadow-xl
                  md:backdrop-blur-lg
                  md:p-0 border-purple-100/60
                  bg-gradient-to-b from-purple-50/80 to-pink-50/60
                "
                style={{ boxShadow: '0 8px 32px 0 rgba(76,0,255,0.10)' }}
              >
                {/* Image Section */}
                <div
                  className="flex-shrink-0 flex items-center justify-center md:w-40 p-5 md:p-0 md:pl-6 relative
                  flex-col w-full
                "
                >
                  <div className="relative flex flex-col items-center justify-center w-full">
                    <div
                      className="rounded-full bg-white/30 p-1 shadow-lg flex items-center justify-center mx-auto
                      md:w-24 md:h-24
                      w-28 h-28
                      ring-4 ring-purple-200/60
                      "
                    >
                      <img
                        src={investor.image}
                        alt={investor.name}
                        className="w-full h-full rounded-full object-cover border-2 border-white shadow-xl group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-tr from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center shadow-md animate-pulse border-2 border-white">
                      <Crown className="h-4 w-4 text-white" />
                    </div>
                  </div>
                </div>
                {/* Details Section */}
                <CardContent
                  className="relative z-10 flex-1 flex flex-col justify-between p-4 md:pl-0 md:pr-8 md:p-6 text-center md:text-left
                  items-center md:items-start
                  "
                >
                  <div className="w-full flex flex-col gap-2 md:gap-0">
                    <h3 className="font-extrabold text-gray-900 text-lg group-hover:text-purple-700 transition-colors tracking-tight mb-1 md:mb-0">
                      {investor.name}
                    </h3>
                    <p className="text-purple-600 font-medium text-base md:text-sm mb-1">
                      {investor.title}{' '}
                      <span className="text-gray-500 text-xs mb-2 md:mb-3">
                        {investor.company}
                      </span>{' '}
                    </p>

                    <span className="inline-block bg-gradient-to-r from-purple-100/80 to-pink-100/60 text-purple-700 font-semibold text-sm rounded-md px-4 py-1 mb-3 shadow-inner">
                      {investor.focus}
                    </span>
                  </div>
                  <div className="flex flex-col md:flex-row gap-2 w-full mt-2 md:mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-purple-300 border  text-purple-700 hover:bg-purple-50 w-full md:w-auto"
                    >
                      View Profile
                    </Button>
                  </div>
                  {/* Shine/gradient hover overlay */}
                  <div className="absolute left-0 top-0 w-full h-full pointer-events-none group-hover:opacity-100 opacity-0 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-purple-200/10 rounded-2xl blur-lg" />
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
            <Link
              to="/events"
              className="text-purple-600 hover:text-purple-700 flex items-center gap-2 text-sm font-semibold"
            >
              View Calendar <ChevronRight className="h-5 w-5" />
            </Link>
          </div>

          <div className="space-y-6">
            {upcomingEvents.map((event) => (
              <Card
                key={event.id}
                className="royal-card hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
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
                      <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-purple-700 transition-colors">
                        {event.name}
                      </h3>
                      <p className="text-purple-600 font-medium mb-1">
                        {event.date} • {event.location}
                      </p>
                      <p className="text-gray-600 text-sm">
                        Hosted by {event.organizer}
                      </p>
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
