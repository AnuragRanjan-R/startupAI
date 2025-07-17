
import { Link } from "react-router-dom";
import { ArrowLeft, Download, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/Layout";

const PolicyDetail = () => {
  const keyBenefits = [
    "Tax exemption for first 3 years of operation",
    "Reduced compliance burden for startups", 
    "Fast-track patent examination",
    "Self-certification for labor and environment laws",
    "Access to government tenders"
  ];

  const eligibilityCriteria = [
    "Entity incorporated as private limited company or LLP",
    "Turnover should not exceed ₹100 crores in any financial year",
    "Entity should not be more than 10 years old", 
    "Should be working towards innovation or improvement of products"
  ];

  return (
    <Layout title="Policy Detail">
      <div className="space-y-6">
        {/* Back Button */}
        <Link 
          to="/policies" 
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Policies
        </Link>

        {/* Policy Header */}
        <div className="flex items-center gap-3 mb-6">
          <Badge variant="secondary">Tax Policy</Badge>
          <span className="text-gray-500 text-sm">December 1, 2024</span>
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Startup India Tax Benefits Policy 2024
        </h1>

        {/* Policy Content */}
        <Card className="bg-white border-gray-200">
          <CardContent className="p-8">
            <div className="space-y-8">
              {/* Policy Overview */}
              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Policy Overview</h2>
                <p className="text-gray-600 leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et 
                  dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
                </p>
              </section>

              {/* Key Benefits */}
              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Key Benefits</h2>
                <ul className="space-y-3">
                  {keyBenefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-600">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Eligibility Criteria */}
              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Eligibility Criteria</h2>
                <ul className="space-y-3">
                  {eligibilityCriteria.map((criteria, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-600">{criteria}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Application Process */}
              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Application Process</h2>
                <p className="text-gray-600">
                  Detailed step-by-step process for applying for the benefits under this policy...
                </p>
              </section>
            </div>
          </CardContent>
        </Card>

        {/* Download Button */}
        <div className="text-center">
          <Button className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Download PDF
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default PolicyDetail;
