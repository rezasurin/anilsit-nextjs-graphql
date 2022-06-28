import { useState, useContext } from "react";
import { css } from "@emotion/react";

import { useRouter } from "next/router";

import { CollectionContext } from "../../contexts/collection";
import { theme } from "../../utils/theme";

import { Button } from "../../components/Basic/Button";
import { ModalAlert, ModalBasic } from "../../components/Basic/Modal";
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

import MyCollectionList from "../../components/MyCollectionList";

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

      <MyCollectionList handleClickDetail={handleClickDetail} handleClickModal={handleClickModal} />

      
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
