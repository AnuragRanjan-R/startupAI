
import { useState } from "react";
import { Calendar, List, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/Layout";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, getDay, eachDayOfInterval, isSameMonth, isSameDay, parse } from "date-fns";
import { eventsData } from "@/constants/eventsDetails";

const Events = () => {
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(() => new Date(2025, 0, 1)); // Default to December 2024

  const eventTypes = [
    { key: 'DeepTech', label: 'DeepTech Events', color: 'bg-blue-400' },
    { key: 'Startup', label: 'Startup Events', color: 'bg-green-400' },
    { key: 'Pitching', label: 'Pitching & Funding Events', color: 'bg-purple-400' },
  ];
  const [activeTypes, setActiveTypes] = useState(eventTypes.map(t => t.key));

  // Flatten eventsData into an array with type
  const events = [
    ...Object.values(eventsData.deepTech).map(e => ({ ...e, type: 'DeepTech' })),
    ...Object.values(eventsData.startupEvents).map(e => ({ ...e, type: 'Startup' })),
    ...Object.values(eventsData.pitchEvents).map(e => ({ ...e, type: 'Pitching' })),
  ];

  // Filter events by active types
  const filteredEvents = events.filter(event => activeTypes.includes(event.type));
  // Parse event dates to Date objects (skip TBA)
  const parsedEvents = filteredEvents.map(event => {
    let dateObj = null;
    try {
      // Only parse if not TBA
      if (!/^TBA/i.test(event.date)) {
        // Try to parse with or without parentheses
        const dateStr = event.date.replace(/\s*\(.*\)/, '');
        dateObj = parse(dateStr, 'MMMM d, yyyy', new Date());
        if (isNaN(dateObj)) dateObj = null;
      }
    } catch { dateObj = null; }
    return { ...event, dateObj };
  });

  // Get all days in the current month
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Map event days for the current month, with type
  const eventDays = parsedEvents.filter(event => event.dateObj && isSameMonth(event.dateObj, currentMonth)).map(event => ({
    day: event.dateObj.getDate(),
    type: event.type
  }));

  // Helper to get event by day in current month
  const getEventByDay = (day) => parsedEvents.find(event => event.dateObj && isSameMonth(event.dateObj, currentMonth) && event.dateObj.getDate() === day);

  // Handler for calendar day click
  const handleDayClick = (day) => {
    const event = getEventByDay(day);
    if (event) {
      setSelectedEvent(event);
      setModalOpen(true);
    }
  };

  // Handler for Details button
  const handleDetailsClick = (event) => {
    setSelectedEvent(event);
    setModalOpen(true);
  };

  // Month navigation
  const handlePrevMonth = () => setCurrentMonth(prev => subMonths(prev, 1));
  const handleNextMonth = () => setCurrentMonth(prev => addMonths(prev, 1));

  // Get the weekday index of the first day (0=Sunday, 1=Monday, ...)
  const firstDayIndex = getDay(monthStart);

  return (
    <Layout title="Events">
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          {selectedEvent && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedEvent.name}</DialogTitle>
                <DialogDescription>
                  {selectedEvent.date} • {selectedEvent.duration}
                </DialogDescription>
              </DialogHeader>
              <div className="mt-4 space-y-2">
                <div><span className="font-semibold">Location:</span> {selectedEvent.location}</div>
                <div><span className="font-semibold">Details:</span> {selectedEvent.details}</div>
                <div><span className="font-semibold">Why Attend:</span> {selectedEvent.whyAttend}</div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
      <div className="space-y-6">
        {/* Event Type Filter */}
        <div className="hidden md:flex gap-2 mb-2">
          {eventTypes.map(type => (
            <Button
              key={type.key}
              variant={activeTypes.includes(type.key) ? 'default' : 'outline'}
              className={`flex items-center gap-2 ${activeTypes.includes(type.key) ? type.color + ' text-white' : ''}`}
              onClick={() => {
                setActiveTypes(prev => prev.includes(type.key)
                  ? prev.filter(t => t !== type.key)
                  : [...prev, type.key]);
              }}
            >
              <span className={`w-2 h-2 rounded-full ${type.color}`}></span>
              {type.label}
            </Button>
          ))}
        </div>
        {/* Color Legend */}
        <div className="flex gap-4 items-center mb-4">
          <span className="text-sm text-gray-500">Legend:</span>
          {eventTypes.map(type => (
            <span key={type.key} className="flex items-center gap-1 text-xs">
              <span className={`w-3 h-3 rounded-full inline-block ${type.color}`}></span> {type.label}
            </span>
          ))}
        </div>
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
                  <div className="flex items-center justify-between mb-4">
                    <Button variant="ghost" size="icon" onClick={handlePrevMonth}><ChevronLeft className="h-5 w-5" /></Button>
                    <h3 className="text-lg font-semibold text-center">{format(currentMonth, 'MMMM yyyy')}</h3>
                    <Button variant="ghost" size="icon" onClick={handleNextMonth}><ChevronRight className="h-5 w-5" /></Button>
                  </div>
                  <div className="grid grid-cols-7 gap-2 text-center">
                    {/* Week headers */}
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
                      <div key={day} className="p-2 font-medium text-gray-500 text-sm">
                        {day}
                      </div>
                    ))}
                    {/* Empty cells for first week */}
                    {Array.from({ length: firstDayIndex }).map((_, i) => (
                      <div key={`empty-${i}`} className="p-2" />
                    ))}
                    {/* Calendar days */}
                    {daysInMonth.map((dateObj) => {
                      const day = dateObj.getDate();
                      const eventDayObj = eventDays.find(e => e.day === day);
                      const eventTypeColor = eventDayObj ? eventTypes.find(t => t.key === eventDayObj.type)?.color : '';
                      return (
                        <div
                          key={day}
                          className={`p-2 text-sm relative cursor-pointer hover:bg-gray-50 ${
                            eventDayObj ? eventTypeColor + ' bg-opacity-10' : ''
                          }`}
                          onClick={() => handleDayClick(day)}
                        >
                          {day}
                          {eventDayObj && (
                            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
                              <div className={`w-1 h-1 rounded-full ${eventTypeColor}`}></div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Event List */}
          <div className={viewMode === 'calendar' ? 'lg:col-span-1' : 'lg:col-span-3'}>
            <div className="space-y-8">
              {eventTypes.filter(type => activeTypes.includes(type.key)).map(type => {
                const sectionEvents = filteredEvents.filter(event => event.type === type.key);
                if (sectionEvents.length === 0) return null;
                // Limit to 3 events per section in calendar view
                const eventsToShow = viewMode === 'calendar' ? sectionEvents.slice(0, 1) : sectionEvents;
                return (
                  <div key={type.key}>
                    <h3 className={`text-lg font-bold mb-3 flex items-center gap-2`}>
                      <span className={`w-3 h-3 rounded-full inline-block ${type.color}`}></span>
                      {type.label}
                    </h3>
                    <div className="space-y-4">
                      {eventsToShow.map(event => (
                        <Card key={event.id} className="bg-white border-gray-200">
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="font-semibold text-gray-800 mb-1">{event.name}</h3>
                                <p className="text-gray-600 text-sm mb-1">
                                  {event.date} • {event.duration}
                                </p>
                                <p className="text-gray-600 text-sm mb-1">
                                  Location: {event.location}
                                </p>
                              </div>
                              <Button variant="outline" size="sm" onClick={() => handleDetailsClick(event)}>
                                Details
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Events;
