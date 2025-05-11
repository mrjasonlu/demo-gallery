import { useGetArtWorksQuery } from './artWorksApiSlice';
import messages from '@/messages/en.json';
import ArtWorkListItem from './ArtWorkListItem';
import ArtWorkListSkeleton from './ArtWorkListSkeleton';
import Pagination from '@/components/pagination/Pagination';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  setLimit,
  setCurrentPage,
  selectLimit,
  selectCurrentPage,
} from '@/store/globalSlice';

const options = [30, 50, 75, 100];

export default function ArtWorks() {
  const dispatch = useAppDispatch();
  const limit = useAppSelector(selectLimit);
  const currentPage = useAppSelector(selectCurrentPage);

  const { data, isError, isLoading, isSuccess, isFetching } =
    useGetArtWorksQuery({
      limit,
      currentPage,
    });

  if (isError) {
    return (
      <div className="px-auto py-10 w-full text-center">
        {messages.global.error}
      </div>
    );
  }

  if (isLoading || isFetching) {
    return <ArtWorkListSkeleton />;
  }

  if (isSuccess) {
    const { config, data: artWorks, pagination } = data;

    return (
      <div className="p-5 max-w-7xl mx-auto w-full">
        <header className="flex items-center pb-8">
          <div className="ml-auto flex p-5 items-center">
            <label htmlFor="results-per-page">
              {messages.gallery.results_per_page}:
            </label>
            <select
              id="results-per-page"
              value={limit}
              className="ml-2 border border-gray-300 rounded-md p-1"
              onChange={(e) => {
                dispatch(setLimit(Number(e.target.value)));
              }}
            >
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {artWorks.map(({ title, id, artist_title, image_id }) => (
            <ArtWorkListItem
              key={id}
              id={id}
              title={title}
              artist={artist_title ?? 'Unknown'}
              image_url={
                image_id
                  ? `${config.iiif_url}/${image_id}/full/843,/0/default.jpg`
                  : undefined
              }
            />
          ))}
        </div>
        <Pagination
          className="mt-15"
          total_pages={pagination.total_pages}
          current_page={pagination.current_page}
          onPageChange={(page) => dispatch(setCurrentPage(page))}
        />
      </div>
    );
  }

  return null;
}
