import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  TrendingUp,
  ArrowRight,
  Clock,
  ExternalLink,
  Newspaper,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const RSS_SOURCES = [
  {
    name: "Inc42",
    url: "https://inc42.com/feed/",
    logo: "https://inc42.com/favicon.ico",
  },
  {
    name: "YourStory",
    url: "https://yourstory.com/feed",
    logo: "https://yourstory.com/favicon.ico",
  },
  {
    name: "TechCrunch",
    url: "https://techcrunch.com/feed/",
    logo: "https://techcrunch.com/favicon.ico",
  },
];

const RSS2JSON = "https://api.rss2json.com/v1/api.json?rss_url=";

const CATEGORIES = [
  "Funding",
  "Acquisition",
  "IPO",
  "Product Launch",
  "Policy",
  "Trends",
];

interface NewsItem {
  title: string;
  description: string;
  link: string;
  pubDate: string;
  guid?: string;
  source: string;
  sourceLogo: string;
  category?: string;
  image?: string;
}

const NewsSection: React.FC = () => {
  const [featuredNews, setFeaturedNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);
      try {
        const allNews: NewsItem[] = [];
        await Promise.all(
          RSS_SOURCES.map(async (src) => {
            const res = await fetch(
              `${RSS2JSON}${encodeURIComponent(src.url)}`
            );
            const data = await res.json();
            if (data.status === "ok") {
              allNews.push(
                ...data.items.map(
                  (item: {
                    title: string;
                    description: string;
                    link: string;
                    pubDate: string;
                    guid?: string;
                    thumbnail?: string;
                    enclosure?: { link: string; type: string };
                  }) => ({
                    title: item.title,
                    description: item.description,
                    link: item.link,
                    pubDate: item.pubDate,
                    guid: item.guid,
                    source: src.name,
                    sourceLogo: src.logo,
                    category: detectCategory(
                      item.title + " " + item.description
                    ),
                    image:
                      item.thumbnail ||
                      (item.enclosure?.type?.startsWith("image/")
                        ? item.enclosure.link
                        : undefined),
                  })
                )
              );
            }
          })
        );

        // Sort by date and get latest 3 news items
        allNews.sort(
          (a, b) =>
            new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
        );
        setFeaturedNews(allNews.slice(0, 3));
      } catch (err) {
        setError("Failed to fetch news");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  // Helper to detect category based on content
  const detectCategory = (content: string): string => {
    const lowerContent = content.toLowerCase();
    for (const category of CATEGORIES) {
      if (lowerContent.includes(category.toLowerCase())) {
        return category;
      }
    }
    return "Trends";
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      Funding: "bg-green-100 text-green-700",
      "AI/ML": "bg-blue-100 text-blue-700",
      Policy: "bg-purple-100 text-purple-700",
      default: "bg-gray-100 text-gray-700",
    };
    return colors[category] || colors.default;
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-3 md:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div className="mb-6 md:mb-0">
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
              <Newspaper className="w-4 h-4" />
              Latest Updates
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Startup News & Insights
            </h2>
            <p className="text-gray-600 max-w-2xl">
              Stay informed with the latest developments in India's startup
              ecosystem, from funding announcements to policy updates.
            </p>
          </div>

          <Link to="/news">
            <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200">
              View All News
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        {/* News Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {loading ? (
            // Loading skeleton
            [...Array(3)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-0">
                  <div className="bg-gray-200 h-48" />
                  <div className="p-6 space-y-4">
                    <div className="h-6 bg-gray-200 rounded" />
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-3/4" />
                      <div className="h-4 bg-gray-200 rounded" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : error ? (
            <div className="col-span-3 text-center text-red-500 py-8">
              {error}
            </div>
          ) : (
            featuredNews.map((news, index) => (
              <Card
                key={news.guid || news.link}
                className="group cursor-pointer border-gray-200 hover:border-gray-300 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden h-full"
              >
                <CardContent className="p-0 flex flex-col h-full">
                  {news.image ? (
                    // Image container with aspect ratio
                    <div className="relative pt-[56.25%] bg-gray-100">
                      <img
                        src={news.image}
                        alt={news.title}
                        className="absolute inset-0 w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = "none";
                          target.parentElement!.classList.add(
                            "fallback-gradient"
                          );
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                        {news.category && (
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium shadow-sm ${getCategoryColor(
                              news.category
                            )}`}
                          >
                            {news.category}
                          </span>
                        )}
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="text-white text-sm font-medium">
                          {news.source}
                        </div>
                      </div>
                    </div>
                  ) : (
                    // Fallback design without image
                    <div className="relative p-6 bg-gradient-to-br from-orange-50 to-red-50 border-b">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2">
                          <img
                            src={news.sourceLogo}
                            alt={news.source}
                            className="w-6 h-6 rounded-full"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = "none";
                            }}
                          />
                          <span className="text-sm font-medium text-gray-700">
                            {news.source}
                          </span>
                        </div>
                        {news.category && (
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(
                              news.category
                            )}`}
                          >
                            {news.category}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* News Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors line-clamp-2 text-lg">
                      {news.title}
                    </h3>

                    <p className="text-gray-600 mb-4 line-clamp-3 text-sm">
                      {news.description.replace(/<[^>]+>/g, "").slice(0, 200)}
                      ...
                    </p>

                    <div className="mt-auto pt-4 flex items-center justify-between text-sm border-t border-gray-100">
                      <div className="flex items-center gap-1 text-gray-500">
                        <Calendar className="w-3 h-3" />
                        <time dateTime={new Date(news.pubDate).toISOString()}>
                          {new Date(news.pubDate).toLocaleDateString(
                            undefined,
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            }
                          )}
                        </time>
                      </div>

                      <a
                        href={news.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-orange-600 group-hover:text-orange-700 font-medium"
                      >
                        Read more
                        <ExternalLink className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* News Sources */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="text-center mb-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-2">
              Trusted News Sources
            </h4>
            <p className="text-sm text-gray-600">
              We aggregate news from India's leading startup publications
            </p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {RSS_SOURCES.map((source) => (
              <div
                key={source.name}
                className="text-gray-500 font-medium text-sm"
              >
                {source.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
