import PolicyCategoryBadge from '@/components/PolicyCategoryBadge';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Policy } from '@/constants/policies';
import { ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PolicyCardProps {
  policy: Policy;
}

const categoryIcons: Record<string, JSX.Element> = {
  central: (
    <span role="img" aria-label="Central">
      🏛️
    </span>
  ),
  state: (
    <span role="img" aria-label="State">
      🏢
    </span>
  ),
  tax: (
    <span role="img" aria-label="Tax">
      💰
    </span>
  ),
  sector: (
    <span role="img" aria-label="Sector">
      🔬
    </span>
  ),
};

export function PolicyCard({ policy }: PolicyCardProps) {
  return (
    <Card className="bg-white border-gray-200 transition-transform duration-200 h-full hover:scale-[1.03] hover:shadow-2xl active:scale-95 cursor-pointer">
      <CardContent className="p-6 flex flex-col h-full">
        <div className="flex items-start justify-between mb-3">
          <PolicyCategoryBadge category={policy.category} />
          <span className="text-xs text-gray-500">{policy.date}</span>
        </div>
        <Link to={`/policies/${policy.id}`} className="flex-grow group">
          <h3 className="font-semibold text-gray-800 mb-3 group-hover:text-blue-600 cursor-pointer transition-colors">
            {policy.title}
          </h3>
        </Link>
        <div className="flex flex-wrap gap-2 mb-2">
          {policy.state && (
            <Badge variant="outline" className="capitalize">
              {policy.state}
            </Badge>
          )}
        </div>
        <p className="text-gray-600 text-sm line-clamp-3 mt-auto">
          {policy.excerpt}
        </p>
        {policy.website && (
          <a
            href={`https://${policy.website}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-xs mt-3"
          >
            Website <ExternalLink className="h-3 w-3" />
          </a>
        )}
      </CardContent>
    </Card>
  );
}

export default PolicyCard;
