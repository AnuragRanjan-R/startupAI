
import { Link } from "react-router-dom";
import { Users, Building2, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Layout from "@/components/Layout";

const Database = () => {
  return (
    <Layout>
      <div className="space-y-8 md:px-8 px-3">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Startup Database</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our comprehensive database of angel investors and venture capital firms
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Link to="/database/angels">
            <Card className="bg-white border-gray-200 hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="text-center">
                <Users className="h-12 w-12 mx-auto text-blue-600 mb-4" />
                <CardTitle className="text-xl">Angel Investors Directory</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-4">
                  Discover and connect with angel investors across various sectors and stages.
                </p>
                <div className="flex items-center justify-center text-blue-600 font-medium">
                  Explore Angels <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link to="/database/vc">
            <Card className="bg-white border-gray-200 hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="text-center">
                <Building2 className="h-12 w-12 mx-auto text-blue-600 mb-4" />
                <CardTitle className="text-xl">VC Firms Directory</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-4">
                  Explore venture capital firms and their investment focus areas.
                </p>
                <div className="flex items-center justify-center text-blue-600 font-medium">
                  Explore VCs <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Database;
