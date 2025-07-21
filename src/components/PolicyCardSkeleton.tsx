import { Card, CardContent } from "@/components/ui/card";

export default function PolicyCardSkeleton() {
  return (
    <Card className="bg-white border-gray-200 h-full animate-pulse">
      <CardContent className="p-6 flex flex-col h-full">
        <div className="flex items-start justify-between mb-3">
          <div className="w-20 h-5 bg-gray-200 rounded" />
          <div className="w-10 h-4 bg-gray-200 rounded" />
        </div>
        <div className="w-3/4 h-6 bg-gray-200 rounded mb-3" />
        <div className="flex flex-wrap gap-2 mb-2">
          <div className="w-16 h-5 bg-gray-200 rounded" />
        </div>
        <div className="h-4 bg-gray-200 rounded mb-2 w-full" />
        <div className="h-4 bg-gray-200 rounded mb-2 w-5/6" />
        <div className="h-4 bg-gray-200 rounded mb-2 w-2/3" />
        <div className="h-3 bg-gray-200 rounded mt-auto w-1/2" />
      </CardContent>
    </Card>
  );
} 