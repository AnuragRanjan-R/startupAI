import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { useEffect, useState } from 'react';

// Icons as components for better reuse
const Icons = {
  Calendar: () => (
    <svg
      className="w-4 h-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  ),
  Filter: () => (
    <svg
      className="w-4 h-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
      />
    </svg>
  ),
  Source: () => (
    <svg
      className="w-4 h-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1M19 20a2 2 0 002-2V8m-2 12a2 2 0 01-2-2v-1"
      />
    </svg>
  ),
  ArrowRight: () => (
    <svg
      className="w-4 h-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5l7 7-7 7"
      />
    </svg>
  ),
  Loading: () => (
    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  ),
};

// SVG fallback for source logos
const LogoFallbackSVG = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <rect width="40" height="40" rx="8" fill="#E5E7EB" />
    <text
      x="50%"
      y="55%"
      textAnchor="middle"
      fill="#9CA3AF"
      fontSize="18"
      fontFamily="Arial"
      dy=".3em"
    >
      N
    </text>
  </svg>
);

const RSS_SOURCES = [
  {
    name: 'Inc42',
    url: 'https://inc42.com/feed/',
    logo: 'https://inc42.com/favicon.ico',
  },
  {
    name: 'YourStory',
    url: 'https://yourstory.com/feed',
    logo: 'https://yourstory.com/favicon.ico',
  },
  {
    name: 'Entrackr',
    url: 'https://entrackr.com/feed/',
    logo: 'https://entrackr.com/favicon.ico',
  },
  {
    name: 'TechCrunch',
    url: 'https://techcrunch.com/feed/',
    logo: 'https://techcrunch.com/favicon.ico',
  },
  {
    name: 'Crunchbase News',
    url: 'https://news.crunchbase.com/feed/',
    logo: 'https://news.crunchbase.com/favicon.ico',
  },
  {
    name: 'VentureBeat',
    url: 'https://venturebeat.com/feed/',
    logo: 'https://venturebeat.com/favicon.ico',
  },
];

const RSS2JSON = 'https://api.rss2json.com/v1/api.json?rss_url=';

const CATEGORIES = [
  'Funding',
  'Acquisition',
  'IPO',
  'Product Launch',
  'Policy',
  'Trends',
  'Interview',
];

interface NewsItem {
  title: string;
  description: string;
  link: string;
  pubDate: string;
  guid?: string;
  source: string;
  sourceLogo: string;
}

const News = () => {
  const [selectedSources, setSelectedSources] = useState<string[]>(
    RSS_SOURCES.map((s) => s.name),
  );
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [dateFilter, setDateFilter] = useState<string>('');
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isFiltersPanelOpen, setIsFiltersPanelOpen] = useState(true);

  // Fetch news from all selected sources
  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);
      try {
        const allNews: NewsItem[] = [];
        await Promise.all(
          RSS_SOURCES.filter((src) => selectedSources.includes(src.name)).map(
            async (src) => {
              const res = await fetch(
                `${RSS2JSON}${encodeURIComponent(src.url)}`,
              );
              const data = await res.json();
              if (data.status === 'ok') {
                allNews.push(
                  ...data.items.map((item: unknown) => {
                    const rssItem = item as {
                      title: string;
                      description: string;
                      link: string;
                      pubDate: string;
                      guid?: string;
                    };
                    return {
                      title: rssItem.title,
                      description: rssItem.description,
                      link: rssItem.link,
                      pubDate: rssItem.pubDate,
                      guid: rssItem.guid,
                      source: src.name,
                      sourceLogo: src.logo,
                    };
                  }),
                );
              }
            },
          ),
        );
        allNews.sort(
          (a, b) =>
            new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime(),
        );
        setNewsItems(allNews);
      } catch (err) {
        setError(
          'Failed to fetch news. You may need a backend proxy if CORS issues occur.',
        );
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, [selectedSources]);

  // Helper to format date to YYYY-MM-DD
  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  // Filter news by date and category
  const filteredNews = newsItems.filter((item) => {
    // Date filter - compare only the date part
    if (dateFilter) {
      const itemDate = formatDate(new Date(item.pubDate));
      const filterDate = dateFilter;
      if (itemDate !== filterDate) return false;
    }
    if (selectedCategories.length > 0) {
      const text = `${item.title} ${item.description}`.toLowerCase();
      const matches = selectedCategories.some((cat) =>
        text.includes(cat.toLowerCase()),
      );
      if (!matches) return false;
    }
    return true;
  });

  // Helper for pill-style filter with animation
  const Pill = ({
    selected,
    onClick,
    children,
  }: {
    selected: boolean;
    onClick: () => void;
    children: React.ReactNode;
  }) => (
    <button
      type="button"
      className={`
        h-8 px-3 rounded-full border text-sm font-medium
        transition-all duration-200 ease-in-out
        transform hover:scale-105 active:scale-95
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300
        ${
          selected
            ? 'bg-blue-600 text-white border-blue-600 shadow-md'
            : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-50 hover:border-blue-200'
        }
      `}
      onClick={onClick}
    >
      {children}
    </button>
  );

  // SourceLogoWithFallback component for pills
  const SourceLogoWithFallback = ({
    src,
    alt,
  }: {
    src: string;
    alt: string;
  }) => {
    const [imgError, setImgError] = useState(false);
    if (imgError) {
      return (
        <svg width="16" height="16" viewBox="0 0 40 40" fill="none">
          <rect width="40" height="40" rx="8" fill="#E5E7EB" />
          <text
            x="50%"
            y="55%"
            textAnchor="middle"
            fill="#9CA3AF"
            fontSize="12"
            fontFamily="Arial"
            dy=".3em"
          >
            N
          </text>
        </svg>
      );
    }
    return (
      <img
        src={src}
        alt={alt}
        className="w-4 h-4 rounded-full object-contain"
        onError={() => setImgError(true)}
      />
    );
  };

  return (
    <Layout title="Startup News">
      <div className="space-y-6 max-w-7xl mx-auto px-2 sm:px-4 md:px-6">
        {/* Filters Toggle Button (Mobile) */}
        <button
          className="md:hidden w-full flex items-center justify-between p-3 bg-white rounded-lg shadow-sm border border-gray-200 text-gray-700"
          onClick={() => setIsFiltersPanelOpen(!isFiltersPanelOpen)}
        >
          <span className="flex items-center gap-2">
            <Icons.Filter />
            <span className="font-medium">Filters</span>
          </span>
          <Icons.ArrowRight />
        </button>

        {/* Filters Bar - Fixed height container */}
        <div
          className={`
          transform transition-all duration-300 ease-in-out
          ${
            isFiltersPanelOpen
              ? 'translate-y-0 opacity-100'
              : '-translate-y-4 opacity-0 md:translate-y-0 md:opacity-100'
          }
          bg-white rounded-xl shadow-sm border border-gray-200
        `}
        >
          <div className="p-4">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">
              {/* Source Filter - Fixed height container */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Icons.Source />
                  <span>Sources</span>
                </div>
                <div className="h-full pr-2">
                  <div className="flex flex-wrap gap-2 p-2">
                    {RSS_SOURCES.map((src) => (
                      <Pill
                        key={src.name}
                        selected={selectedSources.includes(src.name)}
                        onClick={() =>
                          setSelectedSources((prev) =>
                            prev.includes(src.name)
                              ? prev.filter((s) => s !== src.name)
                              : [...prev, src.name],
                          )
                        }
                      >
                        <span className="flex items-center gap-1.5">
                          <SourceLogoWithFallback
                            src={src.logo}
                            alt={src.name}
                          />
                          <span>{src.name}</span>
                        </span>
                      </Pill>
                    ))}
                  </div>
                </div>
              </div>

              {/* Category Filter - Fixed height container */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Icons.Filter />
                  <span>Categories</span>
                </div>
                <div className="h-full pr-2">
                  <div className="flex flex-wrap p-2 gap-2">
                    {CATEGORIES.map((cat) => (
                      <Pill
                        key={cat}
                        selected={selectedCategories.includes(cat)}
                        onClick={() =>
                          setSelectedCategories((prev) =>
                            prev.includes(cat)
                              ? prev.filter((c) => c !== cat)
                              : [...prev, cat],
                          )
                        }
                      >
                        {cat}
                      </Pill>
                    ))}
                  </div>
                </div>
              </div>

              {/* Date Filter - Aligned with fixed height */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Icons.Calendar />
                  <span>Date</span>
                </div>
                <div className="h-[120px] flex items-start">
                  <input
                    type="date"
                    className="h-8 px-3 rounded-lg border border-gray-300 text-sm
                      focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300
                      transition-shadow duration-200"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Active Filters Summary - Fixed height to prevent jumping */}
        <div className="h-8">
          {(selectedCategories.length > 0 || dateFilter) && (
            <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600 animate-fadeIn">
              <span className="font-medium">Active filters:</span>
              {selectedCategories.map((cat) => (
                <span
                  key={cat}
                  className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full"
                >
                  {cat}
                </span>
              ))}
              {dateFilter && (
                <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full">
                  {new Date(dateFilter).toLocaleDateString()}
                </span>
              )}
            </div>
          )}
        </div>

        {/* News Grid with animation */}
        <div className="min-h-[300px]">
          {loading && (
            <div className="flex flex-col items-center justify-center py-16 text-gray-500 animate-fadeIn">
              <Icons.Loading />
              <span className="mt-2">Loading news...</span>
            </div>
          )}
          {error && (
            <div className="flex flex-col items-center justify-center py-16 text-red-500 animate-fadeIn">
              <svg width="40" height="40" fill="none">
                <circle
                  cx="20"
                  cy="20"
                  r="18"
                  stroke="#F87171"
                  strokeWidth="3"
                  fill="#FEE2E2"
                />
                <text
                  x="50%"
                  y="55%"
                  textAnchor="middle"
                  fill="#F87171"
                  fontSize="18"
                  fontFamily="Arial"
                  dy=".3em"
                >
                  !
                </text>
              </svg>
              <span className="mt-2">{error}</span>
            </div>
          )}
          {!loading && !error && filteredNews.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-gray-500 animate-fadeIn">
              <svg width="40" height="40" fill="none">
                <rect width="40" height="40" rx="8" fill="#E5E7EB" />
                <text
                  x="50%"
                  y="55%"
                  textAnchor="middle"
                  fill="#9CA3AF"
                  fontSize="18"
                  fontFamily="Arial"
                  dy=".3em"
                >
                  N
                </text>
              </svg>
              <span className="mt-2">
                No news found for the selected filters.
              </span>
              {dateFilter && (
                <button
                  className="mt-4 text-blue-600 hover:underline"
                  onClick={() => setDateFilter('')}
                >
                  Clear date filter
                </button>
              )}
            </div>
          )}
          {!loading && !error && filteredNews.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
              {filteredNews.map((item, idx) => (
                <Card
                  key={item.guid || item.link || idx}
                  className="group bg-white border border-gray-200 rounded-xl shadow-sm
                    hover:shadow-lg transition-all duration-300 ease-in-out
                    transform hover:-translate-y-1
                    flex flex-col h-full overflow-hidden"
                >
                  <CardContent className="p-5 flex flex-col h-full">
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full border border-gray-200 overflow-hidden
                        group-hover:scale-110 transition-transform duration-300"
                      >
                        <img
                          src={item.sourceLogo}
                          alt={item.source}
                          className="w-8 h-8 object-contain"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null;
                            target.style.display = 'none';
                            const fallback = document.createElementNS(
                              'http://www.w3.org/2000/svg',
                              'svg',
                            );
                            fallback.setAttribute('width', '32');
                            fallback.setAttribute('height', '32');
                            fallback.innerHTML =
                              '<rect width="32" height="32" rx="8" fill="#E5E7EB"/><text x="50%" y="55%" text-anchor="middle" fill="#9CA3AF" font-size="14" font-family="Arial" dy=".3em">N</text>';
                            target.parentElement?.appendChild(fallback);
                          }}
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold text-blue-700 uppercase tracking-wide">
                          {item.source}
                        </span>
                        <span className="text-xs text-gray-400">
                          {new Date(item.pubDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-lg text-gray-800 hover:text-blue-600 transition-colors mb-2 line-clamp-2
                        group-hover:text-blue-600"
                    >
                      {item.title}
                    </a>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                      {item.description.replace(/<[^>]+>/g, '').slice(0, 200)}
                      ...
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {CATEGORIES.filter((cat) =>
                        `${item.title} ${item.description}`
                          .toLowerCase()
                          .includes(cat.toLowerCase()),
                      ).map((cat) => (
                        <span
                          key={cat}
                          className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium
                          transform transition-transform duration-200 hover:scale-105"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                    <div className="mt-auto flex justify-end">
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-700
                          font-semibold text-sm group-hover:gap-2.5 transition-all duration-200"
                      >
                        Read more
                        <Icons.ArrowRight />
                      </a>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default News;
