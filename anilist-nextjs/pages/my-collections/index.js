import { useState, useContext } from "react";
import { css } from "@emotion/react";

import { useRouter } from "next/router";

import { CollectionContext } from "../../contexts/collection";
import { theme } from "../../utils/theme";
import { fontSizes } from "../../utils/units";

import { Button } from "../../components/Basic/Button";
import ButtonToolbar from "rsuite/ButtonToolbar";

import { TrashIcon } from "@heroicons/react/outline";

import Tooltip from "rsuite/Tooltip";
import Whisper from "rsuite/Whisper";
import { ModalAlert, ModalBasic } from "../../components/Modal";
import { useModal } from "../../hooks/useModal";

const containerCss = css`
  height: 100vh;
  min-height: 100vh;
  height: 100%;
  padding: 5rem 0;
  text-align: center;
`;

const cardCollection = css`
  display: flex;
  width: 100%;
  padding: 1rem 1.125rem;
  justify-content: space-between;
  background-color: ${theme.palette.grey[400]};
  margin: 2rem 0;
  border-radius: 0.8125rem;
`;

export default function MyCollections() {
  const { collections, removeCollection, createCollection } =
    useContext(CollectionContext);
  const router = useRouter();
  const [showModalDelete, setShowModalDelete] = useModal();
  const [modalCreate, setModalCreate] = useModal();
  const [itemDelete, setItemDelete] = useState("");

  if (typeof collections === undefined) {
    return <h2> LOADING ....</h2>;
  }

  const handleClickDetail = (item) => {
    router.push(`/my-collections/${item?.collectionName}`);
  };

  const handleClickModal = (item) => {
    setShowModalDelete(true);
    setItemDelete(item);
  };

  const handleClickDelete = (item) => {
    removeCollection({ collectionName: item });
    setItemDelete("");
    setShowModalDelete(false);
  };
  const handleCloseModal = () => {
    setShowModalDelete(false);
    setItemDelete("");
  };

  const handleCreateCollection = (collectionName) => {
    createCollection({ collectionName, data: null });
    setModalCreate(false);
  };

  return (
    <div css={containerCss}>
      <h1> My Collection Page</h1>
      <div style={{display: 'flex', flexDirection: 'column'}}>
            <Button
              variant="solid"
              size="md"
              color="accent"
              onClick={() => setModalCreate(true)}
            >
              Create collections
            </Button>
        </div>

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
                    ? item.data[item.data.length - 1].animeCover
                    : "#"
                }
              />
            ) : (
              <img
                style={{ borderRadius: "0.5rem" }}
                src="#"
                alt="cover-anime"
              />
            )}
          </div>
        </div>
      ))}
      <ModalBasic
        showModal={modalCreate}
        handleClose={setModalCreate}
        onSubmit={handleCreateCollection}
      />
      <ModalAlert
        showModal={showModalDelete}
        onClose={handleCloseModal}
        onSubmit={() => handleClickDelete(itemDelete)}
        title="Delete Confirmation"
      >
        <p
          css={css`
            color: ${theme.palette.basic.black};
            margin-bottom: 1.5rem;
          `}
        >
          Are you sure want to delete this collection?
        </p>
      </ModalAlert>
    </div>
  );
}
