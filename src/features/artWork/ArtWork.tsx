import { Link, useParams } from 'react-router';
import { useGetArtWorkQuery } from './artWorkApiSlice';
import Image from '@/components/image/Image';
import messages from '@/messages/en.json';
import ArtWorkSkeleton from './ArtWorkSkeleton';

export default function ArtWork() {
  let { id } = useParams();

  const { data, isError, isLoading, isSuccess } = useGetArtWorkQuery(
    id ? Number(id) : 0,
  );

  const { data: artWork, config } = data || {};

  if (isLoading) {
    return <ArtWorkSkeleton />;
  }
  if (isError) {
    return (
      <div className="px-auto py-10 w-full text-center">
        {messages.global.error}
      </div>
    );
  }

  if (isSuccess) {
    const {
      image_id,
      title,
      artist_title,
      dimensions,
      department_title,
      classification_title,
      date_display,
    } = artWork || {};

    const image_url = image_id
      ? `${config?.iiif_url}/${image_id}/full/843,/0/default.jpg`
      : '/not_found.png';
    const imageAltText = title ? title : 'Artwork Image';

    const artDetailsList = [
      { title: messages.artwork.artist, value: artist_title ?? 'Unknown' },
      { title: messages.artwork.date, value: date_display },
      { title: messages.artwork.department, value: department_title },
      { title: messages.artwork.classification, value: classification_title },
      { title: messages.artwork.dimensions, value: dimensions },
    ];
    const artDetails = artDetailsList.map((detail, index) => (
      <div key={index} className="mt-2">
        <span className="font-semibold">{detail.title}:</span> {detail.value}
      </div>
    ));

    return (
      <div className="p-5 max-w-6xl mx-auto">
        <Link to="/" className="text-blue-500 hover:underline mb-3 block">
          {`< ${messages.artwork.back}`}
        </Link>

        <div className="flex flex-col lg:flex-row gap-5">
          <div className="w-full lg:w-1/2">
            <div className="overflow-hidden object-cover">
              <Image
                className="w-full h-full object-cover"
                src={image_url}
                alt={imageAltText}
                title={imageAltText}
              />
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <h1 className="text-2xl font-bold mb-5">{title}</h1>
            {artDetails}
          </div>
        </div>
      </div>
    );
  }
}
