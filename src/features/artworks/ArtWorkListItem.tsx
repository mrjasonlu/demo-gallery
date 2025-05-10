import { Link } from 'react-router';
import Image from '@/components/image/Image';

type ArtworkListItemProps = {
  id: number;
  alt?: string;
  title: string;
  artist: string;
  image_url?: string;
};

export default function ArtworkListItem({
  id,
  image_url,
  title,
  artist,
  alt,
}: ArtworkListItemProps) {
  const imageAltText = alt ? alt : title;

  return (
    <Link
      to={`/artwork/${id}`}
      className="flex flex-col hover:bg-gray-100 group rounded-sm"
      key={id}
    >
      <div className="w-full h-52 overflow-hidden object-cover">
        <Image
          className="transition-transform duration-300 transform group-hover:scale-110 w-full h-full object-cover"
          src={image_url ? image_url : '/not_found.png'}
          alt={imageAltText}
          title={imageAltText}
        />
      </div>

      <footer className="flex flex-col p-3">
        <h3 className="font-semibold line-clamp-3">{title}</h3>
        <div className="text-sm">Artist: {artist}</div>
      </footer>
    </Link>
  );
}

export const ArtworkListItemSkeleton = () => {
  return (
    <div className="flex flex-col hover:bg-gray-100 group rounded-sm">
      <div className="w-full h-52 overflow-hidden object-cover animate-pulse bg-gray-200" />
      <footer className="flex flex-col p-3">
        <h3 className="font-semibold line-clamp-3 bg-gray-200 animate-pulse h-5 w-full" />
        <div className="text-sm bg-gray-200 animate-pulse h-5 w-full" />
      </footer>
    </div>
  );
};
