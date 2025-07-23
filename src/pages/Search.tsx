import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { investors } from '@/constants/angelInvestors';
import { eventsData } from '@/constants/eventsDetails';
import { policies } from '@/constants/policies';
import { vcData, VCFirm } from '@/constants/vcFirms';
import { useNewsFeed } from '@/hooks/useNewsFeed';
import { Loader2 } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';

// Helper to highlight search term in text
function highlightText(text: string, query: string) {
  if (!query) return text;
  const regex = new RegExp(
    `(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`,
    'gi',
  );
  const parts = text.split(regex);
  return parts.map((part, i) =>
    regex.test(part) ? (
      <mark key={i} className="bg-yellow-200 px-1 rounded">
        {part}
      </mark>
    ) : (
      part
    ),
  );
}

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const TABS = ['news', 'events', 'investors', 'vcfirms', 'policies'];

const SearchPage = () => {
  const query = useQuery().get('q') || '';
  const [activeTab, setActiveTab] = useState('news');
  // Remove local loading state, use newsLoading for news and simulated loading for others

  // News hook
  const { newsItems, loading: newsLoading, error: newsError } = useNewsFeed();

  // Flatten eventsData
  // Define a type for event
  interface EventItem {
    id: string;
    name: string;
    date: string;
    duration: string;
    location: string;
    details: string;
    whyAttend: string;
    image?: string;
  }
  const allEvents = useMemo<EventItem[]>(() => {
    const flat: EventItem[] = [];
    Object.values(eventsData).forEach((cat) => {
      Object.values(cat).forEach((event) => flat.push(event as EventItem));
    });
    return flat;
  }, []);

  // Flatten VC firms
  const allVCFirms = useMemo<VCFirm[]>(() => {
    return [...vcData.bengaluru, ...vcData.gurgaon, ...vcData.newFirms];
  }, []);

  // Auto-select tab if query matches a tab name
  useEffect(() => {
    if (!query) return;
    const match = TABS.find(
      (tab) => tab.toLowerCase() === query.trim().toLowerCase(),
    );
    if (match) setActiveTab(match);
  }, [query]);

  // Filter logic for each tab
  const filteredNews = useMemo(() => {
    if (!query) return newsItems;
    const q = query.toLowerCase();
    return newsItems.filter(
      (n) =>
        n.title.toLowerCase().includes(q) ||
        n.description?.toLowerCase().includes(q),
    );
  }, [newsItems, query]);

  const filteredEvents = useMemo(() => {
    if (!query) return allEvents;
    const q = query.toLowerCase();
    return allEvents.filter(
      (e) =>
        e.name?.toLowerCase().includes(q) ||
        e.details?.toLowerCase().includes(q) ||
        e.location?.toLowerCase().includes(q),
    );
  }, [allEvents, query]);

  const filteredInvestors = useMemo(() => {
    if (!query) return investors;
    const q = query.toLowerCase();
    return investors.filter(
      (i) =>
        i.name.toLowerCase().includes(q) ||
        i.location.toLowerCase().includes(q) ||
        i.sectors.toLowerCase().includes(q) ||
        i.stage.toLowerCase().includes(q),
    );
  }, [query]);

  const filteredVCFirms = useMemo(() => {
    if (!query) return allVCFirms;
    const q = query.toLowerCase();
    return allVCFirms.filter(
      (v) =>
        v.name.toLowerCase().includes(q) ||
        v.location.toLowerCase().includes(q) ||
        v.focus.toLowerCase().includes(q) ||
        (v.notable && v.notable.toLowerCase().includes(q)),
    );
  }, [allVCFirms, query]);

  const filteredPolicies = useMemo(() => {
    if (!query) return policies;
    const q = query.toLowerCase();
    return policies.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        (p.state && p.state.toLowerCase().includes(q)),
    );
  }, [query]);

  // Loading simulation for demo (for non-news tabs)
  const [tabLoading, setTabLoading] = useState(false);
  useEffect(() => {
    if (activeTab === 'news') return;
    setTabLoading(true);
    const t = setTimeout(() => setTabLoading(false), 400);
    return () => clearTimeout(t);
  }, [query, activeTab]);

  return (
    <Layout title="Search Results">
      <div className="max-w-3xl mx-auto px-3 md:px-8 py-8">
        <h1 className="text-3xl font-bold mb-6">
          Search Results for "{query}"
        </h1>
        <div className="mb-6">
          <div className="flex gap-4 border-b overflow-x-auto mb-4">
            {['news', 'events', 'investors', 'vcfirms', 'policies'].map(
              (tab) => (
                <button
                  key={tab}
                  className={`py-2 px-4 font-semibold border-b-2 transition-colors ${
                    activeTab === tab
                      ? 'border-purple-600 text-purple-700'
                      : 'border-transparent text-gray-500 hover:text-purple-700'
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() +
                    tab.slice(1).replace('vcfirms', 'VC Firms')}
                </button>
              ),
            )}
          </div>
          {activeTab !== 'news' && tabLoading && (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="animate-spin h-8 w-8 text-purple-500" />
            </div>
          )}
          {!newsLoading && newsError && (
            <div className="text-gray-500 py-8 text-center">
              Error loading news.
            </div>
          )}
          {!newsLoading && activeTab === 'news' && (
            <div>
              {filteredNews.length === 0 ? (
                <div className="text-gray-500 py-8 text-center">
                  No News found.
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredNews.map((item) => (
                    <Card
                      key={item.guid || item.link}
                      className="bg-white border border-gray-200"
                    >
                      <CardContent className="p-4">
                        <div className="font-bold text-lg mb-1">
                          {highlightText(item.title, query)}
                        </div>
                        <div className="text-gray-600 text-sm mb-2">
                          {highlightText(item.description || '', query)}
                        </div>
                        <div className="text-xs text-purple-500 mb-1">
                          {item.pubDate}
                        </div>
                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-32 object-cover rounded-lg mb-2"
                          />
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}
          {!newsLoading && activeTab === 'events' && (
            <div>
              {filteredEvents.length === 0 ? (
                <div className="text-gray-500 py-8 text-center">
                  No events found.
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredEvents.map((event) => (
                    <Card
                      key={event.id || event.name}
                      className="bg-white border border-gray-200"
                    >
                      <CardContent className="p-4">
                        <div className="font-bold text-lg mb-1">
                          {highlightText(event.name, query)}
                        </div>
                        <div className="text-gray-600 text-sm mb-2">
                          {highlightText(event.details || '', query)}
                        </div>
                        <div className="text-xs text-purple-500 mb-1">
                          {event.date} • {event.location}
                        </div>
                        {event.image && (
                          <img
                            src={event.image}
                            alt={event.name}
                            className="w-full h-32 object-cover rounded-lg mb-2"
                          />
                        )}
                        {event.whyAttend && (
                          <div className="text-xs text-gray-500 mt-2">
                            Why Attend: {highlightText(event.whyAttend, query)}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}
          {!newsLoading && activeTab === 'investors' && (
            <div>
              {filteredInvestors.length === 0 ? (
                <div className="text-gray-500 py-8 text-center">
                  No investors found.
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredInvestors.map((inv) => (
                    <Card
                      key={inv.id}
                      className="bg-white border border-gray-200"
                    >
                      <CardContent className="p-4">
                        <div className="font-bold text-lg mb-1">
                          {highlightText(inv.name, query)}
                        </div>
                        <div className="text-gray-600 text-sm mb-1">
                          {highlightText(inv.location, query)}
                        </div>
                        <div className="text-xs text-purple-500 mb-1">
                          Sectors: {highlightText(inv.sectors, query)}
                        </div>
                        <div className="text-xs text-gray-500">
                          Stage: {highlightText(inv.stage, query)}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}
          {!newsLoading && activeTab === 'vcfirms' && (
            <div>
              {filteredVCFirms.length === 0 ? (
                <div className="text-gray-500 py-8 text-center">
                  No VC firms found.
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredVCFirms.map((firm) => (
                    <Card
                      key={firm.name}
                      className="bg-white border border-gray-200"
                    >
                      <CardContent className="p-4">
                        <div className="font-bold text-lg mb-1">
                          {highlightText(firm.name, query)}
                        </div>
                        <div className="text-gray-600 text-sm mb-1">
                          {highlightText(firm.location, query)}
                        </div>
                        <div className="text-xs text-purple-500 mb-1">
                          Focus: {highlightText(firm.focus, query)}
                        </div>
                        {firm.notable && (
                          <div className="text-xs text-gray-500">
                            Notable: {highlightText(firm.notable, query)}
                          </div>
                        )}
                        {firm.why && (
                          <div className="text-xs text-gray-500 mt-2">
                            Why: {highlightText(firm.why, query)}
                          </div>
                        )}
                        {firm.contact && (
                          <div className="text-xs text-blue-600 mt-1">
                            Contact:{' '}
                            <a
                              href={`https://${firm.contact}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="underline"
                            >
                              {firm.contact}
                            </a>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}
          {!newsLoading && activeTab === 'policies' && (
            <div>
              {filteredPolicies.length === 0 ? (
                <div className="text-gray-500 py-8 text-center">
                  No policies found.
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredPolicies.map((policy) => (
                    <Card
                      key={policy.id}
                      className="bg-white border border-gray-200"
                    >
                      <CardContent className="p-4">
                        <div className="font-bold text-lg mb-1">
                          {highlightText(policy.title, query)}
                        </div>
                        <div className="text-gray-600 text-sm mb-1">
                          {highlightText(policy.excerpt, query)}
                        </div>
                        <div className="text-xs text-purple-500 mb-1">
                          {policy.category} • {policy.date}{' '}
                          {policy.state && `• ${policy.state}`}
                        </div>
                        <div className="text-xs text-gray-500">
                          {highlightText(policy.description, query)}
                        </div>
                        {policy.website && (
                          <div className="text-xs text-blue-600 mt-1">
                            Website:{' '}
                            <a
                              href={`https://${policy.website}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="underline"
                            >
                              {policy.website}
                            </a>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default SearchPage;
