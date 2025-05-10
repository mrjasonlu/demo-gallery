import { screen } from '@testing-library/react';
import { vi, Mock } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { renderWithProviders } from '@/utils/test-utils';
import ArtWork from '../ArtWork';
import * as ArtWorkApiSlice from '../artWorkApiSlice';
import messages from '@/messages/en.json';

describe('ArtWork Component', () => {
  const renderComponent = () =>
    renderWithProviders(
      <BrowserRouter>
        <ArtWork />
      </BrowserRouter>,
    );

  it('should render loading state', () => {
    vi.spyOn(ArtWorkApiSlice, 'useGetArtWorkQuery').mockReturnValue({
      isLoading: true,
      isError: false,
      isSuccess: false,
      data: null,
    } as unknown as ReturnType<typeof ArtWorkApiSlice.useGetArtWorkQuery>);

    renderComponent();

    expect(screen.getByTestId('artwork-skeleton')).toBeInTheDocument();
  });

  it('should render error state', () => {
    vi.spyOn(ArtWorkApiSlice, 'useGetArtWorkQuery').mockReturnValue({
      isLoading: false,
      isError: true,
      isSuccess: false,
      data: null,
    } as unknown as ReturnType<typeof ArtWorkApiSlice.useGetArtWorkQuery>);

    renderComponent();
    expect(screen.getByText(messages.global.error)).toBeInTheDocument();
  });

  it('should render success state with artwork details', () => {
    const artWorkStub = {
      data: {
        image_id: '12345',
        title: 'Artwork Title',
        artist_title: 'Artist Name',
        dimensions: '10x10',
        department_title: 'Department',
        classification_title: 'Classification',
        date_display: '2023',
      },
      config: { iiif_url: 'https://example.com' },
    };

    vi.spyOn(ArtWorkApiSlice, 'useGetArtWorkQuery').mockReturnValue({
      isLoading: false,
      isError: false,
      isSuccess: true,
      data: artWorkStub,
    } as unknown as ReturnType<typeof ArtWorkApiSlice.useGetArtWorkQuery>);

    renderComponent();

    const { data, config } = artWorkStub;

    expect(
      screen.getByText(messages.artwork.back, { exact: false }),
    ).toBeInTheDocument();
    expect(screen.getByText(data.title)).toBeInTheDocument();
    expect(screen.getByText(data.artist_title)).toBeInTheDocument();
    expect(screen.getByText(data.dimensions)).toBeInTheDocument();
    expect(screen.getByText(data.department_title)).toBeInTheDocument();
    expect(screen.getByText(data.classification_title)).toBeInTheDocument();
    expect(screen.getByText(data.date_display)).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute(
      'src',
      `${config.iiif_url}/${data.image_id}/full/843,/0/default.jpg`,
    );
  });

  it('should render fallback image when image_id is missing', () => {
    const artWorkStub = {
      data: {
        image_id: undefined,
        title: 'Artwork Title',
        artist_title: 'Artist Name',
        dimensions: '10x10',
        department_title: 'Department',
        classification_title: 'Classification',
        date_display: '2023',
      },
      config: { iiif_url: 'https://example.com' },
    };

    vi.spyOn(ArtWorkApiSlice, 'useGetArtWorkQuery').mockReturnValue({
      isLoading: false,
      isError: false,
      isSuccess: true,
      data: artWorkStub,
    } as unknown as ReturnType<typeof ArtWorkApiSlice.useGetArtWorkQuery>);

    renderComponent();

    expect(screen.getByRole('img')).toHaveAttribute('src', '/not_found.png');
  });
});
