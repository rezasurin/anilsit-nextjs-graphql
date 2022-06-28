import { useState, useContext } from "react";
import { useRouter } from "next/router";

import { css } from "@emotion/react";

import client from "../../graphql/config";

import { CollectionContext } from "../../contexts/collection";

import { GET_ANIME_DETAIL } from "../../graphql";
import { CardMedia } from "../../components/Basic/Card";
import { fontSizes, screenSize, spacing } from "../../utils/units";
import useBreakpoints from "../../hooks/useBreakpoints";
import { Button } from "../../components/Basic/Button";
import { mediaQueries } from "../../utils/helpers";

import { createPopper } from "@popperjs/core";

import { PopupBox, PopupBox2 } from "../../components/Basic/Popover";
import { ModalBasic } from "../../components/Basic/Modal";
import { theme } from "../../utils/theme";

export default function AnimeDetail(props) {
  const { anime } = props;
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const screen = useBreakpoints();
  const slug = router.query.slug || [];
  const { addOrRemoveItem, checkCollection, createCollection, collections } =
    useContext(CollectionContext);
  // console.log(router.query);

  const handleAddCollection = (collectionName) => {
    // console.log(JSON.parse(localStorage.getItem('collections', "< local storage")))
    // console.log(collections, "<<< COLLECTIONS STATE")
    addOrRemoveItem({
      collectionName,
      data: {
        animeId: anime.id,
        animeCover: anime.coverImage.large,
        animeName: anime.title.userPreferred,
      },
    });
  };

  const handleCloseModal = () => setShowModal(false);

  const handleCreateCollection = (collectionName, anime) => {
    createCollection({
      collectionName,
      data: {
        animeId: anime.id,
        animeCover: anime.coverImage.medium,
        animeName: anime.title.userPreferred,
      },
    });
    setShowModal(false);
  };

  const isInCollection = (anime) => {
    let collectionName = [];

    collections.forEach((item) => {
      item.data.forEach((data) => {
        if (data.animeId === anime.id) {
          collectionName.push(item.collectionName);
        }
      });
    });

    return collectionName;
  };

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
          ${mediaQueries("md")} {
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
            min-height: 100vh;
            max-height: 100%;
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
            ${mediaQueries("md")} {
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
              ${mediaQueries("md")} {
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

              <PopupBox
                setShowModal={setShowModal}
                collections={collections}
                handleAddCollection={handleAddCollection}
                isInCollection={isInCollection(anime)}
              >
                <Button
                  color="accent"
                  size="md"
                  rounded="sm"
                  css={css`
                    margin-top: 1.125rem;
                  `}
                >
                  Add to Colelction
                </Button>
              </PopupBox>
              <ModalBasic
                showModal={showModal}
                handleClose={handleCloseModal}
                onSubmit={handleCreateCollection}
                anime={anime}
              />
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

              ${mediaQueries("md")} {
                font-size: ${fontSizes["base"]};
                top: 64px;
                position: relative;
              }
            `}
          >
            <h2>{slug[1]}</h2>
            <p>{anime.description}</p>
            <div style={{ display: "flex" }}>
              <div
                style={{
                  padding: `0.25rem ${spacing.md}`,
                  borderRadius: "999px",
                  backgroundColor: `${theme.palette.primary.light}`,
                  textAlign: "center",
                  margin: `0.5rem ${spacing.md}`,
                }}
              >
               <p>
                  Type <br /> <span style={{color: 'yellowgreen'}}>{anime.type}</span>
                </p>
              </div>
              <div
                style={{
                  padding: `0.25rem ${spacing.md}`,
                  borderRadius: "999px",
                  backgroundColor: `${theme.palette.primary.light}`,
                  textAlign: "center",
                  margin: `0.5rem ${spacing.md}`,
                }}
              >
                <p>
                  Format <br /> <span style={{color: 'yellowgreen'}}>{anime.format}</span>
                </p>
              </div>
              <div
                style={{
                  padding: `0.25rem ${spacing.md}`,
                  borderRadius: "999px",
                  backgroundColor: `${theme.palette.primary.light}`,
                  textAlign: "center",
                  margin: `0.5rem ${spacing.md}`,
                }}
              >
                <p>
                  Genres <br /> <span style={{color: 'yellowgreen'}}>{anime.genres.join(" ")}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async (props) => {
  const { params } = props;
  const { slug } = params;
  const { data, loading, error } = await client.query({
    query: GET_ANIME_DETAIL,
    variables: { id: +slug[0] },
  });
  console.log(data, "<<errpr");
  return {
    props: {
      anime: data.Media,
      loading: loading || null,
      error: error || null,
    },
  };
};
