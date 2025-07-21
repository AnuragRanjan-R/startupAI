import { Badge } from '@/components/ui/badge';
import { ReactNode } from 'react';

type Category = 'central' | 'state' | 'tax' | 'sector';

const categoryConfig: Record<
  Category,
  { color: string; icon: ReactNode; label: string }
> = {
  central: {
    color: 'bg-blue-100 text-blue-800',
    icon: (
      <span role="img" aria-label="Central">
        🏛️
      </span>
    ),
    label: 'Central',
  },
  state: {
    color: 'bg-green-100 text-green-800',
    icon: (
      <span role="img" aria-label="State">
        🏢
      </span>
    ),
    label: 'State',
  },
  tax: {
    color: 'bg-yellow-100 text-yellow-800',
    icon: (
      <span role="img" aria-label="Tax">
        💰
      </span>
    ),
    label: 'Tax',
  },
  sector: {
    color: 'bg-purple-100 text-purple-800',
    icon: (
      <span role="img" aria-label="Sector">
        🔬
      </span>
    ),
    label: 'Sector',
  },
};

export function PolicyCategoryBadge({ category }: { category: Category }) {
  const config = categoryConfig[category];
  return (
    <Badge
      className={`flex items-center gap-1 px-2 py-1 text-xs font-medium rounded ${config.color}`}
    >
      {config.icon} {config.label}
    </Badge>
  );
}

export default PolicyCategoryBadge;
