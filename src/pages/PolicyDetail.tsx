
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/Layout";
import { policies } from "@/constants/policies";
import { useUser } from "@clerk/clerk-react";
import { useToast } from "@/components/ui/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

const PolicyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const policy = policies.find(p => p.id === Number(id));
  const { isLoaded, user } = useUser();
  const { toast } = useToast();
  const isMobile = useIsMobile();

  // Handle PDF download (simulated)
  const handleDownload = (e?: React.MouseEvent) => {
    if (!user) {
      if (isMobile && e) {
        e.preventDefault();
        toast({ title: 'Sign in to download' });
      }
      return;
    }
    
    // In a real app, you would generate or serve a PDF file
    // For now, we'll just show a toast
    toast({ 
      title: "Download started", 
      description: `${policy?.title} policy details will be downloaded shortly.`
    });
  };

  if (!policy) {
    return (
      <Layout title="Policy Not Found">
        <div className="text-center py-10">
          <h2 className="text-2xl font-bold mb-4">Policy Not Found</h2>
          <p className="mb-6">The policy you're looking for doesn't exist or has been removed.</p>
          <Link to="/policies">
            <Button>Back to Policies</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Policy Detail">
      <div className="space-y-6 md:px-4 px-2">
        {/* Back Button */}
        <Link 
          to="/policies" 
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Policies
        </Link>

        {/* Policy Header */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <Badge variant="secondary" className="capitalize">{policy.category}</Badge>
          {policy.state && (
            <Badge variant="outline">{policy.state}</Badge>
          )}
          <span className="text-gray-500 text-sm">{policy.date}</span>
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          {policy.title}
        </h1>

        {/* Policy Content */}
        <Card className="bg-white border-gray-200">
          <CardContent className="p-8">
            <div className="space-y-8">
              {/* Policy Overview */}
              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Policy Overview</h2>
                <p className="text-gray-600 leading-relaxed">
                  {policy.description}
                </p>
              </section>

              {/* Key Benefits */}
              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Key Benefits</h2>
                <ul className="space-y-3">
                  {policy.keyBenefits.map((benefit, index) => (
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
                  {policy.eligibilityCriteria.map((criteria, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-600">{criteria}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Application Process */}
              {policy.applicationProcess && (
                <section>
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Application Process</h2>
                  <p className="text-gray-600">
                    {policy.applicationProcess}
                  </p>
                </section>
              )}
              
              {/* Website */}
              {policy.website && (
                <section>
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Official Website</h2>
                  <a 
                    href={`https://${policy.website}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
                  >
                    {policy.website}
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </section>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Download Button */}
        <div className="text-center">
          <Button 
            className="flex items-center gap-2"
            onClick={handleDownload}
          >
            <Download className="h-4 w-4" />
            {user ? 'Download PDF' : 'Sign in to Download'}
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default PolicyDetail;
