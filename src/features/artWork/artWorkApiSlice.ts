import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ArtWorkApiResponse, Artwork } from '@/types/api';

export const artWorkApiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.artic.edu/api/v1/artworks',
  }),
  reducerPath: 'artworkApi',
  tagTypes: ['Artwork'],
  endpoints: (build) => ({
    getArtWork: build.query<ArtWorkApiResponse<Artwork>, number>({
      query: (id) => `/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Artwork', id }],
    }),
  }),
});

export const { useGetArtWorkQuery } = artWorkApiSlice;
