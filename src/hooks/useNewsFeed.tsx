import { useEffect, useState } from 'react';

export interface NewsItem {
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

type RSSItem = {
  title: string;
  description: string;
  link: string;
  pubDate: string;
  guid?: string;
  thumbnail?: string;
  enclosure?: { link: string; type: string };
};

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
    name: 'TechCrunch',
    url: 'https://techcrunch.com/feed/',
    logo: 'https://techcrunch.com/favicon.ico',
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
];

function detectCategory(content: string): string {
  const lowerContent = content.toLowerCase();
  for (const category of CATEGORIES) {
    if (lowerContent.includes(category.toLowerCase())) {
      return category;
    }
  }
  return 'Trends';
}

export function useNewsFeed() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const fetchNews = async () => {
      setLoading(true);
      setError(null);
      try {
        const allNews: NewsItem[] = [];
        await Promise.all(
          RSS_SOURCES.map(async (src) => {
            const res = await fetch(
              `${RSS2JSON}${encodeURIComponent(src.url)}`,
            );
            const data = await res.json();
            if (data.status === 'ok') {
              allNews.push(
                ...data.items.map((item: RSSItem) => ({
                  title: item.title,
                  description: item.description,
                  link: item.link,
                  pubDate: item.pubDate,
                  guid: item.guid,
                  source: src.name,
                  sourceLogo: src.logo,
                  category: detectCategory(item.title + ' ' + item.description),
                  image:
                    item.thumbnail ||
                    (item.enclosure?.type?.startsWith('image/')
                      ? item.enclosure.link
                      : undefined),
                })),
              );
            }
          }),
        );
        allNews.sort(
          (a, b) =>
            new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime(),
        );
        if (!cancelled) setNewsItems(allNews);
      } catch (err) {
        if (!cancelled) setError('Failed to fetch news');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchNews();
    return () => {
      cancelled = true;
    };
  }, []);

  return { newsItems, loading, error };
}
