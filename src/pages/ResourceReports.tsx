import Layout from '@/components/Layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  BarChart3,
  BookOpen,
  ChevronLeft,
  Download,
  Globe,
  PieChart,
  TrendingUp,
  Users,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const ResourceReports = () => {
  const reports = [
    {
      id: 1,
      title: 'NASSCOM Startup Report 2024',
      description:
        'Comprehensive analysis of Indian startup ecosystem trends and insights.',
      icon: BarChart3,
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600',
      type: 'Industry Report',
      date: 'March 2024',
      status: 'Coming Soon',
    },
    {
      id: 2,
      title: 'Startup India Annual Report',
      description:
        'Government initiatives, funding data, and sector-wise growth analysis.',
      icon: BookOpen,
      iconBg: 'bg-pink-100',
      iconColor: 'text-pink-600',
      type: 'Government Report',
      date: 'February 2024',
      status: 'Coming Soon',
    },
    {
      id: 3,
      title: 'Indian Tech Startup Funding Report',
      description:
        'Detailed analysis of funding trends, investor insights, and sector performance.',
      icon: TrendingUp,
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      type: 'Funding Report',
      date: 'Q1 2024',
      status: 'Coming Soon',
    },
    {
      id: 4,
      title: 'State of Indian SaaS',
      description:
        'Deep dive into the Indian SaaS ecosystem, growth metrics, and global comparison.',
      icon: Globe,
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
      type: 'Sector Report',
      date: '2024',
      status: 'Coming Soon',
    },
    {
      id: 5,
      title: 'Startup Ecosystem Overview',
      description:
        'Key statistics, trends, and insights about the Indian startup landscape.',
      icon: PieChart,
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
      type: 'Market Overview',
      date: '2024',
      status: 'Coming Soon',
    },
    {
      id: 6,
      title: 'Startup Talent Report',
      description:
        'Analysis of hiring trends, salary benchmarks, and skill requirements in startups.',
      icon: Users,
      iconBg: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
      type: 'HR Report',
      date: '2024',
      status: 'Coming Soon',
    },
  ];

  return (
    <Layout title="Market Reports">
      <div className="space-y-6 container mx-auto px-4">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/resources">
            <Button variant="ghost" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Market Reports & Analysis
            </h1>
            <p className="text-gray-600">
              Latest insights and trends in the Indian startup ecosystem
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reports.map((report) => {
            const Icon = report.icon;
            return (
              <Card key={report.id} className="bg-white border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div
                      className={`h-12 w-12 rounded-xl ${report.iconBg} flex items-center justify-center flex-shrink-0`}
                    >
                      <Icon className={`h-6 w-6 ${report.iconColor}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <Badge variant="secondary" className="mb-2">
                          {report.type}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {report.date}
                        </span>
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        {report.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">
                        {report.description}
                      </p>
                      <Button
                        variant="outline"
                        className="w-full flex items-center justify-center gap-2"
                        disabled
                      >
                        <Download className="h-4 w-4" />
                        {report.status}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default ResourceReports;
