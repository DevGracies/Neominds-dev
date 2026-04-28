// components/shared/SkeletonLoader.tsx
export const CardSkeleton = () => (
  <div className="bg-white p-6 rounded-xl border border-gray-100 animate-pulse">
    <div className="flex items-center space-x-4 mb-4">
      <div className="rounded-full bg-gray-200 h-12 w-12" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-200 rounded w-1/2" />
      </div>
    </div>
    <div className="space-y-3">
      <div className="h-3 bg-gray-100 rounded" />
      <div className="h-3 bg-gray-100 rounded" />
      <div className="h-3 bg-gray-100 rounded w-5/6" />
    </div>
  </div>
);