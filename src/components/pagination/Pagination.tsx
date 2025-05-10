import cn from 'classnames';
import messages from '@/messages/en.json';

type PaginationProps = {
  total_pages: number;
  current_page: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  total_pages,
  current_page,
  onPageChange,
}: PaginationProps) {
  const handlePageChange = (page: number) => {
    const newPage = Math.max(1, Math.min(page, total_pages));
    onPageChange(newPage);
  };

  return (
    <div className="flex justify-center mt-4">
      <button
        type="button"
        className={cn(
          'mr-6',
          current_page === 1 ? 'text-gray-500' : 'hover:underline ',
        )}
        disabled={current_page === 1}
        onClick={() => handlePageChange(1)}
      >
        {`<< ${messages.pagination.first}`}
      </button>
      <button
        type="button"
        className={cn(
          'mr-6',
          current_page === 1 ? 'text-gray-500' : 'hover:underline ',
        )}
        disabled={current_page === 1}
        onClick={() => handlePageChange(current_page - 1)}
      >
        {'< Prev'}
      </button>
      <span className="mx-2">
        {`${messages.pagination.page} ${current_page} ${messages.pagination.of} ${total_pages}`}
      </span>
      <button
        type="button"
        className={cn(
          'ml-6',
          current_page === total_pages ? 'text-gray-500' : 'hover:underline',
        )}
        disabled={current_page === total_pages}
        onClick={() => handlePageChange(current_page + 1)}
      >
        {`${messages.pagination.next} >`}
      </button>
      <button
        type="button"
        className={cn(
          'ml-6',
          current_page === total_pages ? 'text-gray-500' : 'hover:underline ',
        )}
        disabled={current_page === total_pages}
        onClick={() => handlePageChange(total_pages)}
      >
        {`${messages.pagination.last} >>`}
      </button>
    </div>
  );
}
