import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, BarChart3, FileText, Wrench } from 'lucide-react';
import { Link } from 'react-router-dom';

const Resources = () => {
  return (
    <Layout title="Resources Hub">
      <div className="space-y-8 md:px-8 px-3">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Startup Resources Hub
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Access comprehensive guides, interactive tools, and insightful
            reports to support your startup journey
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Link to="/resources/guides">
            <Card className="bg-white border-gray-200 hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader className="text-center">
                <FileText className="h-12 w-12 mx-auto text-purple-600 mb-4" />
                <CardTitle className="text-xl">Registration Guides</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-4">
                  Step-by-step guides for startup registration, documentation,
                  and compliance.
                </p>
                <div className="flex items-center justify-center text-purple-600 font-medium">
                  View Guides <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link to="/resources/tools">
            <Card className="bg-white border-gray-200 hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader className="text-center">
                <Wrench className="h-12 w-12 mx-auto text-blue-600 mb-4" />
                <CardTitle className="text-xl">Startup Tools</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-4">
                  Interactive tools for valuation, compliance checking, and
                  document generation.
                </p>
                <div className="flex items-center justify-center text-blue-600 font-medium">
                  Explore Tools <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link to="/resources/reports">
            <Card className="bg-white border-gray-200 hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader className="text-center">
                <BarChart3 className="h-12 w-12 mx-auto text-green-600 mb-4" />
                <CardTitle className="text-xl">Market Reports</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-4">
                  Industry insights, market analysis, and startup ecosystem
                  reports.
                </p>
                <div className="flex items-center justify-center text-green-600 font-medium">
                  Read Reports <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Resources;
