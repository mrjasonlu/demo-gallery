import Skeleton from '@/components/skeleton/Skeleton';

export default function ArtWorkListSkeleton() {
  return (
    <div className="p-5 max-w-7xl mx-auto" data-testid="artwork-list-skeleton">
      <div className="flex mb-10">
        <div className="ml-auto flex p-5">
          <Skeleton className="w-42 h-5" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {Array.from({ length: 20 }).map((_, index) => (
          <Skeleton key={index} className="w-full h-64" />
        ))}
      </div>
    </div>
  );
}
//}
