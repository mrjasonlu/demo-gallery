import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ArtWorkApiResponse, Artwork } from '@/types/api';

export const artWorksApiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.artic.edu/api/v1/artworks',
  }),
  reducerPath: 'artworksApi',
  tagTypes: ['Artworks'],
  endpoints: (build) => ({
    getArtWorks: build.query<
      ArtWorkApiResponse<Artwork[]>,
      {
        limit: number;
        currentPage: number;
      }
    >({
      query: ({ limit = 10, currentPage = 1 }) =>
        `?limit=${limit.toString()}&page=${currentPage.toString()}`,
      providesTags: (_result, _error, { limit, currentPage }) => [
        { type: 'Artworks', limit, currentPage },
      ],
    }),
  }),
});

export const { useGetArtWorksQuery } = artWorksApiSlice;
