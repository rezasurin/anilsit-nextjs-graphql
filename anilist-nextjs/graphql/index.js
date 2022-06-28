import { gql } from "@apollo/client/core";

export const GET_ANIME_LIST = gql`
  query GetAnimeList($page: Int!) {
    Page (page: $page, perPage: 10) {
      pageInfo {
        total
        perPage
        currentPage
        lastPage
        hasNextPage
      }
      media {
        id,
        source,
        title {
          userPreferred
        },
        coverImage {
          large
          medium
          color
        },
        type,
        format,
        popularity,
        episodes,
        genres,
        season,
        status,
        favourites
      }

    }
  }
`

export const GET_ANIME_DETAIL = gql`
  query getAnimeDetail ($id: Int!) {
    Media (id: $id) {
      id,
      source,
      title {
        userPreferred
      },
      coverImage {
        extraLarge
        large
        medium
        color
      },
      bannerImage,
      description,
      type,
      format,
      startDate {
        year
        month
        day
      },
      endDate {
        year
        month
        day
      },
      popularity,
      episodes,
      genres,
      season,
      status,
      favourites
    }
  }

`