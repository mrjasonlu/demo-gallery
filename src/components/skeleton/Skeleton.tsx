import cn from 'classnames';

export default function Skeleton({ className }: { className?: string }) {
  return (
    <div className={cn('bg-gray-200 animate-pulse rounded-lg', className)} />
  );
}
