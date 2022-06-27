import { useState, useContext } from "react";
import { css } from "@emotion/react";

import { CollectionContext } from "../../contexts/collection";
import { theme } from "../../utils/theme";
import { fontSizes } from "../../utils/units";

import { Button } from "../../components/Basic/Button";

import { useRouter } from "next/router";

import { CardMovie } from "../../components/Basic/Card";

import { AnimeData } from "../../components/AnimeList";

const containerCss = css`
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: center;
width: 100%;
height: 100%;
min-height: 100vh;
padding: 5rem 0; 
`;

const cardCollection = css`
  display: flex;
  width: 100%;
  padding: 1.125rem;
  justify-content: space-between;
  background-color: ${theme.palette.grey[400]};
  margin: 2rem 0;
  border-radius: 0.8125rem;
`;

export default function MyCollectionDetail() {
  const { collections, removeCollections } = useContext(CollectionContext);
  const router = useRouter();

  const { name } = router.query;

  const collection = collections?.find((item) => item.collectionName === name);

  if (typeof collections === undefined) {
    return <h2> LOADING ....</h2>;
  }


  return (
    <div css={containerCss}>
      <h2>{name}</h2>
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
        {
          collection?.data.map((anime, idx) => <AnimeData anime={anime} key={anime.id} />)
        }
      </div>
     

    </div>
  );
}
