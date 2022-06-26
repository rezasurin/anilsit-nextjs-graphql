import { useState, useContext } from "react";
import { css } from "@emotion/react";

import { CollectionContext } from "../../contexts/collection";
import { theme } from "../../utils/theme";
import { fontSizes } from "../../utils/units";

import { Button } from "../../components/Basic/Button";

import { useRouter } from "next/router";

import { CardMovie } from "../../components/Basic/Card";

const containerCss = css`
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: center;
width: 100%;
height: 100%;
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

  if (collections.length === 0) {
    return <h2> LOADING ....</h2>;
  }

  const onClick = () => {
    console.log('click')
  }

  // console.log( "< path")

  return (
    <div css={containerCss}>
      <h2>{name}</h2>

      {
      collection.data?.map((item) => (
        // <div css={cardCollection}>
        //   <div
        //     style={{
        //       display: "flex",
        //       flexDirection: "column",
        //       justifyContent: "space-between",
        //     }}
        //   >
        //     <p
        //       css={css`
        //         font-size: ${fontSizes["xxl"]};
        //         margin: 1rem 0 0 0.75rem;
        //         font-weight: 700;
        //         text-transform: capitalize;
        //       `}
        //     >
        //       {item.animeId}
        //     </p>
        //     <Button size="md" color="accent">
        //       View collection
        //     </Button>
        //   </div>
        //   <div style={{ margin: "0 2rem 0 0", borderRadius: "2rem" }}>
        //     <img style={{ borderRadius: "0.5rem" }} src={item.animeCover} />
        //   </div>
        // </div>


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
          <div
            css={css`
              diplay: flex;
              flex-direction: column;
            `}
          >
                <img style={{ borderRadius: "0.5rem" }} src={item.animeCover} />
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
                      text-align: start;
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
                    {item.animeId}
                  </p>
                </div>
          </div>
        </div>
      )
      )
      
      }

    </div>
  );
}
