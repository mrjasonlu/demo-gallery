import { screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { renderWithProviders } from '@/utils/test-utils';
import ArtWorks from '../ArtWorkList';
import * as ArtWorksApiSlice from '../artWorksApiSlice';
import * as ReduxHooks from '@/store/hooks';
import * as GlobalSlice from '@/store/globalSlice';
import messages from '@/messages/en.json';

describe('ArtWorks Component', () => {
  const mockDispatch = vi.fn();
  const defaultLimit = 30;
  const defaultPage = 1;

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(ReduxHooks, 'useAppDispatch').mockReturnValue(mockDispatch);
    vi.spyOn(ReduxHooks, 'useAppSelector').mockImplementation((selector) => {
      if (selector === GlobalSlice.selectLimit) return defaultLimit;
      if (selector === GlobalSlice.selectCurrentPage) return defaultPage;
      return undefined;
    });
  });

  const renderComponent = () =>
    renderWithProviders(
      <BrowserRouter>
        <ArtWorks />
      </BrowserRouter>,
    );

  it('renders loading state', () => {
    vi.spyOn(ArtWorksApiSlice, 'useGetArtWorksQuery').mockReturnValue({
      isLoading: true,
      isFetching: false,
      isError: false,
      isSuccess: false,
      data: null,
    } as any);

    renderComponent();
    expect(screen.getByTestId('artwork-list-skeleton')).toBeInTheDocument();
  });

  it('renders fetching state', () => {
    vi.spyOn(ArtWorksApiSlice, 'useGetArtWorksQuery').mockReturnValue({
      isLoading: false,
      isFetching: true,
      isError: false,
      isSuccess: false,
      data: null,
    } as any);

    renderComponent();
    expect(screen.getByTestId('artwork-list-skeleton')).toBeInTheDocument();
  });

  it('renders error state', () => {
    vi.spyOn(ArtWorksApiSlice, 'useGetArtWorksQuery').mockReturnValue({
      isLoading: false,
      isFetching: false,
      isError: true,
      isSuccess: false,
      data: null,
    } as any);

    renderComponent();
    expect(screen.getByText(messages.global.error)).toBeInTheDocument();
  });

  it('renders artworks and pagination on success', () => {
    const artWorksStub = {
      config: { iiif_url: 'https://img.example.com' },
      data: [
        {
          id: 1,
          title: 'Art 1',
          artist_title: 'Artist 1',
          image_id: '12345',
        },
        {
          id: 2,
          title: 'Art 2',
          artist_title: null,
          image_id: null,
        },
      ],
      pagination: {
        total_pages: 5,
        current_page: 1,
      },
    };

    vi.spyOn(ArtWorksApiSlice, 'useGetArtWorksQuery').mockReturnValue({
      isLoading: false,
      isFetching: false,
      isError: false,
      isSuccess: true,
      data: artWorksStub,
    } as any);

    renderComponent();

    const { config, data } = artWorksStub;

    // Artwork items
    expect(screen.getByText(data[0].title)).toBeInTheDocument();
    expect(screen.getByText(data[1].title)).toBeInTheDocument();
    expect(
      screen.getByText(`Artist: ${data[0].artist_title}`),
    ).toBeInTheDocument();
    expect(screen.getByText('Artist: Unknown')).toBeInTheDocument();

    expect(screen.getByRole('img', { name: /Art 1/i })).toHaveAttribute(
      'src',
      `${config.iiif_url}/${data[0].image_id}/full/843,/0/default.jpg`,
    );

    expect(screen.getByRole('img', { name: /Art 2/i })).toHaveAttribute(
      'src',
      '/not_found.png',
    );
  });

  it('dispatches setLimit when results per page is changed', () => {
    vi.spyOn(ArtWorksApiSlice, 'useGetArtWorksQuery').mockReturnValue({
      isLoading: false,
      isFetching: false,
      isError: false,
      isSuccess: true,
      data: {
        config: { iiif_url: 'https://img.example.com' },
        data: [],
        pagination: { total_pages: 1, current_page: 1 },
      },
    } as any);

    renderComponent();

    const select = screen.getByLabelText(
      messages.gallery.results_per_page + ':',
    );
    fireEvent.change(select, { target: { value: '50' } });
    expect(mockDispatch).toHaveBeenCalledWith(GlobalSlice.setLimit(50));
  });

  it('dispatches setCurrentPage when page is changed', () => {
    vi.spyOn(ArtWorksApiSlice, 'useGetArtWorksQuery').mockReturnValue({
      isLoading: false,
      isFetching: false,
      isError: false,
      isSuccess: true,
      data: {
        config: { iiif_url: 'https://img.example.com' },
        data: [],
        pagination: { total_pages: 2, current_page: 1 },
      },
    } as any);

    renderComponent();

    const page2 = screen.getByText(messages.pagination.next, { exact: false });
    fireEvent.click(page2);
    expect(mockDispatch).toHaveBeenCalledWith(GlobalSlice.setCurrentPage(2));
  });
});
