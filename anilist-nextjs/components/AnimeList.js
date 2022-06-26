import { useState, useMemo, useEffect } from "react";
import { useRouter } from 'next/router'

import { css } from "@emotion/react";

import { GET_ANIME_LIST } from "../services";
import client from "../config/graphql";

import { H1 } from "../components/Heading";

import { CardMovie } from "../components/Basic/Card";
import { Button } from "./Basic/Button";
import { theme } from "../utils/theme";

import { Pagination } from "../components/Pagination";

const AnimeData = (props) => {
  const { anime, onClick } = props;


  return (
    <>
    <div css={css`
      diplay:flex;
      flex-direction: column;
    `}>
      <CardMovie
        item={anime}
        onClick={onClick}
      />
      <div
      css={css`
        padding: 4px;
        margin: auto;
      `}
      >
          <p
            css={css`
              font-size: 14px;
              font-weight: 600;
              z-index: 10;
              text-align: start ;
              text-overflow: ellipsis;
              overflow: hidden;
              display: -webkit-box !important;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              white-space: normal;
              margin: 1px 4px;
              @media screen and (min-width: 600px) {
                bottom: 0;
                vertical-align: baseline;
              }
            `}
          >
            {anime.title.userPreferred}
          </p>
      </div>

    </div>
    </>
  );
};

const dataPerPage = 10

export default function AnimeList(props) {
  const { animeList, pageInfo, loading } = props
  const router = useRouter()
  const [animeData, setAnimeData] = useState([])
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (animeList) setAnimeData(animeList)

    setCurrentPage(Number(router.query.page) || 1)
  }, [currentPage])

  const Loading = <h2>Loading ....</h2>;

  const handlePagination = (page) => {
    const path = router.pathname
    const query = router.query
    query.page = page
    setCurrentPage(page)
    // console.log(page, "<< in handle pagination")
    router.push({
      pathname: path,
      query: query
    })
  }

  const handleClickCard = (item) => {
    console.log(item, "< btn clicked")
    
    const query = router.query
    query.animeId=item.id

    router.push(`/anime/${item.id}/${item.title.userPreferred}`)
  }

  return (
    <>
      <H1>Anime List</H1>
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
        {loading ? (
          <div css={css`height: 100vh;`}>
            <Loading />
          </div>
        ) : (
          animeList.map((anime, idx) => <AnimeData anime={anime} key={anime.id} onClick={handleClickCard} />)
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalCount={pageInfo?.total}
        pageSize={dataPerPage}
        onPageChange={handlePagination}
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
    </>
  );
}
