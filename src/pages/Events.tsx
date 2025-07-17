
import { useState } from "react";
import { Calendar, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/Layout";

const Events = () => {
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');

  const events = [
    {
      id: 1,
      name: "Startup Event 1",
      date: "Dec 11, 2024",
      time: "6:00 PM",
      location: "Event Venue 1",
      organizer: "Event Org 1"
    },
    {
      id: 2,
      name: "Startup Event 2", 
      date: "Dec 12, 2024",
      time: "6:00 PM",
      location: "Event Venue 2",
      organizer: "Event Org 2"
    },
    {
      id: 3,
      name: "Startup Event 3",
      date: "Dec 13, 2024", 
      time: "6:00 PM",
      location: "Event Venue 3",
      organizer: "Event Org 3"
    }
  ];

  const calendarDays = Array.from({ length: 31 }, (_, i) => i + 1);
  const eventDays = [4, 12, 13]; // Days with events

  return (
    <Layout title="Events" breadcrumb="/events">
      <div className="space-y-6">
        {/* View Toggle */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Events</h2>
          <div className="flex rounded-lg border border-gray-200 overflow-hidden">
            <Button
              variant={viewMode === 'calendar' ? 'default' : 'ghost'}
              onClick={() => setViewMode('calendar')}
              className="rounded-none flex items-center gap-2"
            >
              <Calendar className="h-4 w-4" />
              Calendar
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              onClick={() => setViewMode('list')}
              className="rounded-none flex items-center gap-2"
            >
              <List className="h-4 w-4" />
              List
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Calendar View */}
          {viewMode === 'calendar' && (
            <div className="lg:col-span-2">
              <Card className="bg-white border-gray-200">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-center mb-4">December 2024</h3>
                  <div className="grid grid-cols-7 gap-2 text-center">
                    {/* Week headers */}
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
                      <div key={day} className="p-2 font-medium text-gray-500 text-sm">
                        {day}
                      </div>
                    ))}
                    
                    {/* Calendar days */}
                    {calendarDays.map((day) => (
                      <div
                        key={day}
                        className={`p-2 text-sm relative cursor-pointer hover:bg-gray-50 ${
                          eventDays.includes(day) ? 'bg-blue-50' : ''
                        }`}
                      >
                        {day}
                        {eventDays.includes(day) && (
                          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
                            <div className="w-1 h-1 bg-blue-600 rounded-full"></div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Event List */}
          <div className={viewMode === 'calendar' ? 'lg:col-span-1' : 'lg:col-span-3'}>
            <div className="space-y-4">
              {events.map((event) => (
                <Card key={event.id} className="bg-white border-gray-200">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-1">{event.name}</h3>
                        <p className="text-gray-600 text-sm mb-1">
                          {event.date} • {event.time}
                        </p>
                        <p className="text-gray-600 text-sm mb-1">
                          Location: {event.location}
                        </p>
                        <p className="text-gray-600 text-sm">
                          Organizer: {event.organizer}
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Events;
