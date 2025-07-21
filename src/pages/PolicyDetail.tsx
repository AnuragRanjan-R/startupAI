import Layout from '@/components/Layout';
import PolicyCategoryBadge from '@/components/PolicyCategoryBadge';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { policies } from '@/constants/policies';
import { useIsMobile } from '@/hooks/use-mobile';
import { useUser } from '@clerk/clerk-react';
import {
  ArrowLeft,
  CheckCircle,
  ChevronRight,
  Download as DownloadIcon,
  ExternalLink,
  Info,
  Share2,
  Star,
  StarOff,
} from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const PolicyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const policy = policies.find((p) => p.id === Number(id));
  const { isLoaded, user } = useUser();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [favorited, setFavorited] = useState(false);

  // Handle PDF download (simulated)
  const handleDownload = (e?: React.MouseEvent) => {
    if (!user) {
      if (isMobile && e) {
        e.preventDefault();
        toast({ title: 'Sign in to download' });
      }
      return;
    }
    toast({
      title: 'Download started',
      description: `${policy?.title} policy details will be downloaded shortly.`,
    });
  };

  // Share button handler
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: policy?.title,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: 'Link copied!',
        description: 'Policy link copied to clipboard.',
      });
    }
  };

  // Favorite button handler
  const handleFavorite = () => {
    setFavorited((f) => !f);
    toast({
      title: favorited ? 'Removed from favorites' : 'Added to favorites',
    });
  };

  // Related policies (same category or state, excluding self)
  const related = policies
    .filter(
      (p) =>
        p.id !== policy?.id &&
        (p.category === policy?.category ||
          (policy?.state && p.state === policy.state)),
    )
    .slice(0, 3);

  if (!policy) {
    return (
      <Layout title="Policy Not Found">
        <div className="text-center py-10">
          <h2 className="text-2xl font-bold mb-4">Policy Not Found</h2>
          <p className="mb-6">
            The policy you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/policies">
            <Button>Back to Policies</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  // Application process stepper (if multi-step)
  const steps = policy.applicationProcess?.split(/\.|\n|\r/).filter(Boolean);

  return (
    <Layout title="Policy Detail">
      <div className="space-y-6 md:px-4 px-2">
        {/* Breadcrumb */}
        <nav
          className="flex items-center gap-2 text-xs text-gray-500 mb-2"
          aria-label="Breadcrumb"
        >
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link to="/policies" className="hover:underline">
            Policies
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="font-medium text-gray-700">{policy.title}</span>
        </nav>
        {/* Top Actions */}
        <div className="flex flex-wrap gap-2 items-center mb-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate(-1)}
            aria-label="Back"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleShare}
            aria-label="Share"
          >
            <Share2 className="h-4 w-4" />
          </Button>
          {user && (
            <Button
              variant={favorited ? 'default' : 'outline'}
              size="icon"
              onClick={handleFavorite}
              aria-label="Favorite"
            >
              {favorited ? (
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
              ) : (
                <StarOff className="h-4 w-4" />
              )}
            </Button>
          )}
        </div>
        {/* Policy Header */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <PolicyCategoryBadge category={policy.category} />
          {policy.state && <Badge variant="outline">{policy.state}</Badge>}
          <span className="text-gray-500 text-sm">{policy.date}</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          {policy.title}
        </h1>
        {/* Highlighted Info */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <div className="font-semibold text-blue-800 mb-1">
                Key Grant/Support
              </div>
              <div className="text-blue-700 text-lg">
                {policy.keyBenefits[0]}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-4">
              <div className="font-semibold text-green-800 mb-1">
                Eligibility
              </div>
              <div className="text-green-700 text-lg">
                {policy.eligibilityCriteria[0]}
              </div>
            </CardContent>
          </Card>
        </div>
        {/* Policy Content */}
        <Card className="bg-white border-gray-200">
          <CardContent className="p-8">
            <div className="space-y-8">
              {/* Policy Overview */}
              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Policy Overview
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {policy.description}
                </p>
              </section>
              {/* Key Benefits */}
              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Key Benefits
                </h2>
                <ul className="space-y-3">
                  {policy.keyBenefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="text-green-500 w-5 h-5 mt-1 animate-bounce" />
                      <span className="text-gray-600">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </section>
              {/* Eligibility Criteria */}
              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Eligibility Criteria
                </h2>
                <ul className="space-y-3">
                  {policy.eligibilityCriteria.map((criteria, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Info className="text-blue-500 w-5 h-5 mt-1 animate-pulse" />
                      <span className="text-gray-600">{criteria}</span>
                    </li>
                  ))}
                </ul>
              </section>
              {/* Application Process Stepper */}
              {steps && steps.length > 1 && (
                <section>
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Application Process
                  </h2>
                  <ol className="space-y-4">
                    {steps.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-700 font-bold text-lg">
                          {idx + 1}
                        </span>
                        <span className="text-gray-700 leading-relaxed">
                          {step.trim()}
                        </span>
                      </li>
                    ))}
                  </ol>
                </section>
              )}
              {/* Application Process (single step) */}
              {(!steps || steps.length <= 1) && policy.applicationProcess && (
                <section>
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Application Process
                  </h2>
                  <p className="text-gray-600">{policy.applicationProcess}</p>
                </section>
              )}
              {/* Website */}
              {policy.website && (
                <section>
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Official Website
                  </h2>
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
          <Button className="flex items-center gap-2" onClick={handleDownload}>
            <DownloadIcon className="h-4 w-4 animate-bounce" />
            {user ? 'Download PDF' : 'Sign in to Download'}
          </Button>
        </div>
        {/* Related Policies */}
        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Related Policies
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {related.map((rp) => (
                <Card
                  key={rp.id}
                  className="bg-white border-gray-200 hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <PolicyCategoryBadge category={rp.category} />
                      {rp.state && <Badge variant="outline">{rp.state}</Badge>}
                      <span className="text-xs text-gray-500">{rp.date}</span>
                    </div>
                    <Link
                      to={`/policies/${rp.id}`}
                      className="font-semibold text-gray-800 hover:text-blue-600"
                    >
                      {rp.title}
                    </Link>
                    <p className="text-gray-600 text-xs mt-1 line-clamp-2">
                      {rp.excerpt}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default PolicyDetail;
