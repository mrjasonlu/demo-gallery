export type Artwork = {
  id: number;
  title: string;
  artist_title: string;
  dimensions: string;
  image_id: string;
  department_title: string;
  classification_title: string;
  date_display: string;
  thumbnail: {
    lqip: string;
    alt_text: string;
  };
};

export type Pagination = {
  total: number;
  limit: number;
  offset: number;
  total_pages: number;
  current_page: number;
};

export type ArtWorkApiResponse<T> = {
  id: number;
  config: {
    iiif_url: string;
  };
  data: T;
  pagination: Pagination;
};
