import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Building2,
  ChevronLeft,
  DollarSign,
  ExternalLink,
  Palmtree,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const ResourceGuides = () => {
  const guides = [
    {
      id: 1,
      title: 'ClearTax Startup Registration Guide',
      description:
        'Comprehensive 7-step guide for startup registration in India.',
      icon: Building2,
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      link: 'https://cleartax.in/s/7-steps-to-register-your-startup-in-startup-india',
      features: [
        'Step-by-step registration process',
        'Document requirements',
        'Tax benefits and exemptions',
        'Compliance guidelines',
      ],
    },
    {
      id: 2,
      title: 'Razorpay Rize Startup Registration',
      description:
        'Platform offering startup registration services with detailed documentation requirements.',
      icon: DollarSign,
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
      link: 'https://razorpay.com/rize/company-registration/startup',
      features: [
        'Company registration process',
        'Bank account setup',
        'Payment gateway integration',
        'Compliance management',
      ],
    },
    {
      id: 3,
      title: 'Treelife Startup Registration',
      description:
        'Professional service provider offering guidance on startup registration process and documentation.',
      icon: Palmtree,
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
      link: 'https://treelife.in/startups/startup-india-registration/',
      features: [
        'Registration assistance',
        'Legal documentation',
        'Trademark filing',
        'Business structure advice',
      ],
    },
  ];

  return (
    <Layout title="Startup Registration Guides">
      <div className="space-y-6 container mx-auto px-4">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/resources">
            <Button variant="ghost" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Startup Registration Guides
            </h1>
            <p className="text-gray-600">
              Comprehensive resources for registering your startup in India
            </p>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {guides.map((guide) => {
            const Icon = guide.icon;
            return (
              <Card key={guide.id} className="bg-white border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div
                      className={`h-12 w-12 rounded-xl ${guide.iconBg} flex items-center justify-center flex-shrink-0`}
                    >
                      <Icon className={`h-6 w-6 ${guide.iconColor}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        {guide.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">
                        {guide.description}
                      </p>

                      <div className="space-y-2 mb-4">
                        {guide.features.map((feature, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-2 text-sm text-gray-700"
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                            {feature}
                          </div>
                        ))}
                      </div>

                      <a
                        href={guide.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-purple-600 hover:text-purple-700 font-medium"
                      >
                        View Guide <ExternalLink className="h-4 w-4" />
                      </a>
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

export default ResourceGuides;
