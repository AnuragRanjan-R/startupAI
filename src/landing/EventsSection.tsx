import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  ArrowRight, 
  MapPin, 
  Clock, 
  Users, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { eventsData } from '@/constants/eventsDetails';

const EventsSection: React.FC = () => {
  // Get featured events from different categories
  const featuredEvents = [
    { ...eventsData.pitchEvents.sgGlobalPitch, type: 'Pitch', color: 'from-red-400 to-pink-500' },
    { ...eventsData.startupEvents.entrepreneurIndia, type: 'Startup', color: 'from-blue-400 to-indigo-500' },
    { ...eventsData.deepTech.deepTechCon, type: 'DeepTech', color: 'from-purple-400 to-blue-500' }
  ];

  const getEventTypeStyle = (type: string) => {
    const styles = {
      'Pitch': 'bg-red-100 text-red-700',
      'Startup': 'bg-blue-100 text-blue-700',
      'DeepTech': 'bg-purple-100 text-purple-700'
    };
    return styles[type] || 'bg-gray-100 text-gray-700';
  };

  const formatDate = (dateString: string) => {
    if (dateString.toLowerCase().includes('tba')) {
      return 'TBA';
    }
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-purple-50/30">
      <div className="container mx-auto px-3 md:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div className="mb-6 md:mb-0">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
              <Calendar className="w-4 h-4" />
              Upcoming Events
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Connect & Learn
            </h2>
            <p className="text-gray-600 max-w-2xl">
              Join exclusive startup events, pitch competitions, and networking opportunities 
              to accelerate your entrepreneurial journey.
            </p>
          </div>
          
          <Link to="/events">
            <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200">
              View All Events
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {featuredEvents.map((event, index) => (
            <Card 
              key={event.id} 
              className="group cursor-pointer border-gray-200 hover:border-gray-300 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
            >
              <CardContent className="p-0">
                {/* Event Header */}
                <div className={`bg-gradient-to-br ${event.color} h-32 relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/10" />
                  <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEventTypeStyle(event.type)}`}>
                      {event.type} Event
                    </span>
                    <div className="bg-white/20 backdrop-blur-sm px-2 py-1 rounded-lg">
                      <div className="text-white text-xs font-medium">
                        {formatDate(event.date)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-2 text-white/90">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{event.duration}</span>
                    </div>
                  </div>
                </div>

                {/* Event Content */}
                <div className="p-6">
                  <h3 className="font-bold text-gray-900 text-lg mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {event.name}
                  </h3>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">{event.location}</span>
                    </div>
                    
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {event.details}
                    </p>
                  </div>

                  {/* Event Benefits */}
                  <div className="mb-4">
                    <div className="text-xs font-medium text-gray-500 mb-2">Why Attend:</div>
                    <p className="text-sm text-gray-700 line-clamp-2">
                      {event.whyAttend}
                    </p>
                  </div>

                  {/* CTA */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-blue-600 group-hover:text-blue-700">
                      <Users className="w-4 h-4" />
                      <span className="text-sm font-medium">Join Event</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-blue-600 group-hover:text-blue-700">
                      <span className="text-sm">Learn more</span>
                      <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Event Types */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="text-center mb-8">
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Event Categories</h4>
            <p className="text-sm text-gray-600">Explore different types of startup events and opportunities</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-white rounded-xl border border-gray-200">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-red-600" />
              </div>
              <h5 className="font-semibold text-gray-900 mb-2">Pitch Events</h5>
              <p className="text-sm text-gray-600">Present your startup to investors and get funding opportunities</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl border border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <h5 className="font-semibold text-gray-900 mb-2">Networking</h5>
              <p className="text-sm text-gray-600">Connect with fellow entrepreneurs, mentors, and industry experts</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl border border-gray-200">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
              <h5 className="font-semibold text-gray-900 mb-2">Conferences</h5>
              <p className="text-sm text-gray-600">Learn from industry leaders and discover latest trends</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
