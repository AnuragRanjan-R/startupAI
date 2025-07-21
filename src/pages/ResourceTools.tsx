import Layout from '@/components/Layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calculator, ChevronLeft, FileCheck, Scale } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const ResourceTools = () => {
  const [revenue, setRevenue] = useState('');
  const [growthRate, setGrowthRate] = useState('');
  const [marketSize, setMarketSize] = useState('');
  const [valuation, setValuation] = useState<number | null>(null);

  const calculateValuation = () => {
    // Simple example calculation - in reality, this would be more complex
    const revenueNum = parseFloat(revenue) || 0;
    const growthRateNum = parseFloat(growthRate) || 0;
    const marketSizeNum = parseFloat(marketSize) || 0;

    const multiplier = (growthRateNum / 100) * 5; // Growth rate affects multiplier
    const marketPotential = marketSizeNum > 0 ? marketSizeNum / 1000000 : 1;
    const calculatedValuation = revenueNum * multiplier * marketPotential;

    setValuation(calculatedValuation);
  };

  return (
    <Layout title="Startup Tools">
      <div className="space-y-6 container mx-auto px-4">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/resources">
            <Button variant="ghost" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Startup Tools</h1>
            <p className="text-gray-600">
              Interactive tools to help you manage and grow your startup
            </p>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Valuation Calculator */}
          <Card className="bg-white border-gray-200">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-indigo-100 flex items-center justify-center">
                  <Calculator className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <CardTitle className="text-xl">
                    Startup Valuation Calculator
                  </CardTitle>
                  <p className="text-sm text-gray-600">
                    Estimate your startup's value based on key metrics
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="revenue">Annual Revenue (INR)</Label>
                  <Input
                    id="revenue"
                    placeholder="e.g., 1000000"
                    value={revenue}
                    onChange={(e) => setRevenue(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="growthRate">Growth Rate (%)</Label>
                  <Input
                    id="growthRate"
                    placeholder="e.g., 20"
                    value={growthRate}
                    onChange={(e) => setGrowthRate(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="marketSize">
                    Total Addressable Market Size (INR)
                  </Label>
                  <Input
                    id="marketSize"
                    placeholder="e.g., 1000000000"
                    value={marketSize}
                    onChange={(e) => setMarketSize(e.target.value)}
                  />
                </div>
                <Button onClick={calculateValuation} className="w-full">
                  Calculate Valuation
                </Button>
                {valuation !== null && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-2">
                      Estimated Valuation:
                    </p>
                    <p className="text-2xl font-bold text-indigo-600">
                      ₹
                      {valuation.toLocaleString('en-IN', {
                        maximumFractionDigits: 0,
                      })}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      Note: This is a simplified calculation. Actual valuation
                      depends on many more factors.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Compliance Checker */}
          <Card className="bg-white border-gray-200">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-cyan-100 flex items-center justify-center">
                  <FileCheck className="h-5 w-5 text-cyan-600" />
                </div>
                <div>
                  <CardTitle className="text-xl">Compliance Checker</CardTitle>
                  <p className="text-sm text-gray-600">
                    Verify your startup's regulatory compliance
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium">
                    Company Registration
                  </span>
                  <Badge
                    variant="outline"
                    className="bg-green-50 text-green-700 border-green-200"
                  >
                    Required
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium">GST Registration</span>
                  <Badge
                    variant="outline"
                    className="bg-yellow-50 text-yellow-700 border-yellow-200"
                  >
                    Conditional
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium">PF Registration</span>
                  <Badge
                    variant="outline"
                    className="bg-yellow-50 text-yellow-700 border-yellow-200"
                  >
                    Conditional
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium">Professional Tax</span>
                  <Badge
                    variant="outline"
                    className="bg-yellow-50 text-yellow-700 border-yellow-200"
                  >
                    Conditional
                  </Badge>
                </div>
                <Button className="w-full">Start Compliance Check</Button>
                <p className="text-xs text-gray-500 text-center">
                  Coming soon: Interactive compliance questionnaire
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Legal Document Generator */}
          <Card className="bg-white border-gray-200 lg:col-span-2">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-rose-100 flex items-center justify-center">
                  <Scale className="h-5 w-5 text-rose-600" />
                </div>
                <div>
                  <CardTitle className="text-xl">
                    Legal Document Generator
                  </CardTitle>
                  <p className="text-sm text-gray-600">
                    Create basic legal documents for your startup
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  'Term Sheet',
                  'Employment Contract',
                  'NDA',
                  'Founder Agreement',
                ].map((doc) => (
                  <Button
                    key={doc}
                    variant="outline"
                    className="h-auto py-4 flex flex-col gap-2"
                  >
                    <span className="font-semibold">{doc}</span>
                    <span className="text-xs text-gray-500">Coming Soon</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default ResourceTools;
