import Skeleton from '@/components/skeleton/skeleton';

export default function ArtWorkSkeleton() {
  return (
    <div className="p-5 max-w-6xl mx-auto" data-testid="artwork-skeleton">
      <Skeleton className="h-2.5 max-w-[180px] mt-1 mb-5" />
      <div className="flex flex-col lg:flex-row gap-5">
        <Skeleton className="w-full lg:w-1/2 h-96" />
        <div className="w-full lg:w-1/2">
          <Skeleton className="h-5 w-48 mt-2 mb-8" />
          <Skeleton className="h-2.5 max-w-[140px] mb-5" />
          <Skeleton className="h-2.5 max-w-[220px] mb-6" />
          <Skeleton className="h-2.5 max-w-[290px] mb-5" />
          <Skeleton className="h-2.5 max-w-[280px] mb-5" />
          <Skeleton className="h-2.5 max-w-[232px] mb-5" />
        </div>
      </div>
    </div>
  );
}
