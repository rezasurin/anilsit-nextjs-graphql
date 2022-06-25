import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import { css } from "@emotion/react";

import { useQuery } from "@apollo/client/react";
// import { getAnimeList } from '../config/graphql'

import { GET_ANIME_LIST } from "../services";
import client from "../config/graphql";

import { H1 } from "../components/Heading";

import { CardMovie } from "../components/Card";
import { Button } from "../components/Button";
import { theme } from "../utils/theme";

import { Pagination } from "../components/Pagination";
import { useMemo, useState } from "react";

const homeContainerCls = css`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 32px 0;  
`

const dataPerPage = 10

export default function Home({ animeList, pageInfo, loading }) {
  const [currentPage, setCurrentPage] = useState(1)

  const currentAnimeData = useMemo(() => {
    const firstPageIdx = (currentPage - 1) * dataPerPage
    const lastPageIdx = firstPageIdx + dataPerPage

    return animeList
  })
  console.log(animeList, "<<< FROM SSR");

  const AnimeData = (props) => {
    const { anime } = props
    return (
      <>
        <CardMovie>
            <img
              src={anime.coverImage.large}
              css={css`
                width: 100%;
                height: 100%;
                border-radius: 12px;
              `}
            />
            <div
            css={css`
              display: flex;
              justify-content: center;
              align-items:center;
              width: 100%;
              height: 72px;
              position: absolute;
              border-radius: 12px;
              bottom: 0px;
              background: linear-gradient(to bottom,  rgba(137,255,241,0) 0%,rgba(0,0,0,0.82) 100%);
              @media screen and (min-width: 600px) {
                height: 96px;
              }
            `}
            >
              <p
              css={css`
                font-weight: 600;
                z-index: 10;
                text-align: center;
                text-overflow: ellipsis;
                overflow: hidden;
                display: -webkit-box !important;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                white-space: normal;
                margin: 1px 4px;
                @media screen and (min-width: 600px) {
                  bottom:  0;
                  vertical-align: baseline;
                }
              `}
              >{anime.title.english}</p>
            </div>
        </CardMovie>
      </>
    );
  };

  const Loading = <h2>Loading ....</h2>;

  console.log(currentPage, "< CURENT PAGE HOME")

  return (
    <div css={homeContainerCls}>
      {/* <button
        onClick={() => console.log(data, "<< INI DATA")}
        css={css`
          padding: 32px;
          background-color: hotpink;
          font-size: 24px;
          border-radius: 4px;
          color: black;
          font-weight: bold;
          &:hover {
            color: white;
          }
        `}
      >
        THIS IS MY BUTTOn
      </button> */}
      <H1>
        Anime List
      </H1>
      <div
      css={css`
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
      grid-auto-rows: minmax(10px, auto);
      margin: 12px 0 16px 0;
      @media screen and (min-width: 600px) {
        grid-template-columns: repeat(5, 180px);
        gap: 24px;
        grid-auto-rows: minmax(20px, auto);
        
      }
      `}
      >
        {loading ? <Loading /> : (
          animeList.map((anime, idx) => (
            <AnimeData anime={anime} key={idx}/>
          ))
        )
        }
      </div>

      <Pagination
        currentPage = {currentPage}
        totalCount = {pageInfo?.total}
        pageSize = {dataPerPage}
        onPageChange = { page => setCurrentPage(page)}
      />


      <Button
        variant="solid"
        color="accent"
        size="large"
        dropShadow
        rounded="sm "
      >
        Load more
      </Button>
    </div>
  );
}

export async function getServerSideProps() {
  const { data, loading, error } = await client.query({
    query: GET_ANIME_LIST,
  });

  return {
    props: {
      pageInfo: data.Page.pageInfo,
      animeList: data.Page.media,
      loading: loading,
    },
  };
}
