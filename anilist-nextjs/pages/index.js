
import { css } from "@emotion/react";

import { useQuery } from "@apollo/client/react";
// import { getAnimeList } from '../config/graphql'

import { GET_ANIME_LIST } from "../services";
import client from "../config/graphql";

import { useState } from "react";
import AnimeList from "../components/AnimeList";

import Loading from "../components/Basic/Loading";

const homeContainerCls = css`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 5rem 0;
`

const dataPerPage = 10

export default function Home({ animeList, pageInfo, loading }) {
  const [currentPage, setCurrentPage] = useState(1)

  if (loading) {
    return <Loading />
  }

  return (
    <div css={homeContainerCls}>

      <AnimeList animeList={animeList} pageInfo={pageInfo} loading={loading} />
      
    </div>
  );
}

export async function getServerSideProps(props) {
  
  const { query } = props
  const { data, loading, error } = await client.query({
    query: GET_ANIME_LIST,
    variables: {page: Number(query.page) || 1}
  });

  return {
    props: {
      pageInfo: data.Page.pageInfo,
      animeList: data.Page.media,
      loading: loading,
    },
  };
}
