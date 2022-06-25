import { gql } from "@apollo/client/core";

export const GET_ANIME_LIST = gql`
  query GetAnimeList {
    Page (page: 1, perPage: 10) {
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
          romaji
          english
          native
          userPreferred
        },
        coverImage {
          extraLarge
          large
          medium
          color
        }
      }
    }
  }
`