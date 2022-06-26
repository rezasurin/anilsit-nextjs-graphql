import { useState, useContext } from "react";
import { useRouter } from "next/router";

import { css } from "@emotion/react";

import client from "../../config/graphql";

import { CollectionContext } from "../../contexts/collection";

import { GET_ANIME_DETAIL } from "../../services";
import { CardMedia } from "../../components/Basic/Card";
import { fontSizes, screenSize, spacing } from "../../utils/units";
import useBreakpoints from "../../hooks/useBreakpoints";
import { Button } from "../../components/Basic/Button";
import { mediaQueries } from "../../utils/helpers";

import { createPopper} from '@popperjs/core'

import { PopupBox, PopupBox2 } from "../../components/Popover";
import { ModalBasic } from "../../components/Modal";

export default function AnimeDetail(props) {
  const { anime } = props;
  const [showModal, setShowModal] = useState(false)
  const router = useRouter();
  const screen = useBreakpoints();
  const slug = router.query.slug || [];
  const { addOrRemoveItem, checkCollection, createCollection, collections } = useContext(CollectionContext)
  // console.log(router.query);

  const handleAddCollection = (collectionName) => {
    // console.log(JSON.parse(localStorage.getItem('collections', "< local storage")))
    // console.log(collections, "<<< COLLECTIONS STATE")
    addOrRemoveItem({collectionName, animeId: anime.id, animeCover: anime.coverImage.medium, animeName: anime.title.userPreferred})
  }

  const handleRemoveFromCollection = (item) => {
    removeFromCollection(item)
  }

  const handleCloseModal = () => setShowModal(false)

  const handleCreateCollection = (collectionName, anime) => {
    console.log(anime.id)
    createCollection({collectionName, animeId: anime.id, animeCover: anime.coverImage.medium, animeName: anime.title.userPreferred})
    setShowModal(false)
  }

  if (collections.length !== 0) {
    // console.log(localStorage.getItem("collections"), "<< INI COLLECTION DARI STATE")
  }

  const isInCollection = (anime) => {
    let collectionName = []
    
    collections.forEach(item => {
      item.data.forEach(data => {
        if (data.animeId === anime.id) {
          collectionName.push(item.collectionName)
        }
      })
    })
    
    return collectionName
  }

  return (
    <div
      css={css`
        max-width: 100vw;
        height: 100%;
        min-height: 100vh;
      `}
    >
      {/* <p>anime.</p> */}
      <div
        css={css`
          width: 100%;
          height: 128px;
          position: relative;
          margin-bottom: ${spacing.sm};
          top: -20px;
          ${mediaQueries('md')} {
            width: 100vw;
            height: 240px;
          }
        `}
      >
        <CardMedia imgSrc={anime.bannerImage} />
      </div>
      <div
        css={css`
          diplay: flex;
          @media screen and (min-width: ${screenSize.md}px) {
            margin-top: ${spacing.md};
            flex-direction: row;
          }
        `}
      >
        <div
          css={css`
            display: flex;
            justify-content: center;
            flex-direction: column;
            padding: 0 2rem;
            position: relative;
            ${mediaQueries('md')} {
              flex-direction: row;
              top: -96px;
            }
          `}
        >
          <div
            css={css`
              width: 40vw;
              height: 100%;
              margin: 0 auto;
              ${mediaQueries('md')} {
                width: 200px;
                margin-left: 2.5rem;
              }
            `}
          >
            <CardMedia imgSrc={anime.coverImage.large} />

            <div
              css={css`
                display: flex;
                justify-content: center;
              `}
            >
              {/* {
                isInCollection(anime) ?
                <Button onClick={() => handleRemoveFromCollection(anime)}>Remove from collection</Button>
                :
                <Button onClick={() => handleAddCollection(anime)}>Add to collection</Button>
              } */}

              <PopupBox setShowModal={setShowModal} collections={collections} handleAddCollection={handleAddCollection} isInCollection={isInCollection(anime)} />
              <ModalBasic showModal={showModal} handleClose={handleCloseModal} onSubmit={handleCreateCollection} anime={anime} />
            </div>
          </div>
          <div
            css={css`
              display: flex;
              flex-direction: column;
              
              align-items: center;
              max-width: 64vw;
              margin: ${spacing.sm} auto;
              font-size: ${fontSizes["sm"]};

              ${mediaQueries('md')} {
                font-size: ${fontSizes["base"]};
                top: 64px;
                position: relative;
              }
            `}
          >
            <h2>{slug[1]}</h2>
            <p>{anime.description}</p>
            <p>{anime.type}</p>
            <p>{anime.format}</p>
            <p>{anime.popularity}</p>
            <p>{anime.genres.join(" ")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async (props) => {
  const { query } = props;
  const { data, loading, error } = await client.query({
    query: GET_ANIME_DETAIL,
    variables: { id: Number(query.slug[0]) },
  });
  console.log(data);

  return {
    props: {
      anime: data.Media,
    },
  };
};
