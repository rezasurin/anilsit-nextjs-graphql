import { useState, useContext } from "react";
import { css } from "@emotion/react";

import { useRouter } from "next/router";

import { CollectionContext } from "../contexts/collection";
import { theme } from "../utils/theme";
import { fontSizes } from "../utils/units";

import { Button } from "./Basic/Button";

import { TrashIcon } from "@heroicons/react/outline";

import Tooltip from "rsuite/Tooltip";
import Whisper from "rsuite/Whisper";

import Loading from "./Basic/Loading";

const cardCollection = css`
  display: flex;
  width: 100%;
  padding: 1rem 1.125rem;
  justify-content: space-between;
  background-color: ${theme.palette.grey[400]};
  margin: 2rem 0;
  border-radius: 0.8125rem;
`;

const defaultImg = "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/nx21-tXMN3Y20PIL9.jpg"

export default function MyCollectionList(props) {
  const {handleClickDetail, handleClickModal } = props
  const { collections} = useContext(CollectionContext);

  if (typeof collections === undefined) {
    return <Loading />;
  }

  

  return (
    <>

      {collections?.map((item, idx) => (
        <div key={idx} css={cardCollection}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <p
              css={css`
                font-size: ${fontSizes["xxl"]};
                margin: 0.5rem 0 0 0.75rem;
                font-weight: 700;
                text-transform: capitalize;
              `}
            >
              {item.collectionName}
            </p>
            <Button
              size="md"
              color="accent"
              onClick={() => handleClickDetail(item)}
            >
              View collection
            </Button>
          </div>
          <div
            style={{
              margin: "0 2rem 0 0",
              borderRadius: "2rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Whisper
                placement="top"
                controlId="control-id-hover"
                trigger="hover"
                speaker={<Tooltip>Delete collection</Tooltip>}
              >
                <TrashIcon
                  css={css`
                    width: 1.5rem;
                    left: 4.5rem;
                    top: -0.25rem;
                    position: relative;
                    cursor: pointer;

                    &:hover {
                      color: ${theme.palette.primary.main};
                      border-radius: 99px;
                    }
                  `}
                  onClick={() => handleClickModal(item.collectionName)}
                />
              </Whisper>
            </div>
            {item.data ? (
              <img
                style={{ borderRadius: "0.5rem", width: "100px" }}
                src={
                  item.data.length !== 0
                    ? item.data[0].animeCover
                    : "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/nx21-tXMN3Y20PIL9.jpg"
                }
              />
            ) : (
              <img
                style={{ borderRadius: "0.5rem" }}
                src="https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/nx21-tXMN3Y20PIL9.jpg"
                lazy
                alt="cover-anime"
              />
            )}
          </div>
        </div>
      ))}
      
    </>
  );
}
