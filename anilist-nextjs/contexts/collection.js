import { createContext, useEffect, useReducer, useState } from "react";

const Storage = (collections) => {
  localStorage.setItem(
    "collections",
    JSON.stringify(collections.length > 0 ? collections : [{}])
  );
};

const CollectionReducer = (state, action) => {
  const { collectionName, data } = action.payload;
  switch (action.type) {
    case "CREATE_COLLECTION":
      if (
        !state.collections.find(
          (item) => item.collectionName === action.payload.collectionName
        )
      ) {
        state.collections.push({
          collectionName: collectionName,
          data: data !== null ? [data] : [],
        });
      } else {
        state.errorMsg = "COLLECTION ALREADY AVAILABLE";
      }
      Storage(state.collections);
      return {
        ...state,
        collections: [...state.collections],
      };

    case "ADD_OR_REMOVE_ITEM":
      state.collections.forEach((item) => {
        if (item.collectionName === collectionName) {
          if (!item.data.find((item) => item.animeId === data.animeId)) {
            item.data.push(action.payload.data);
            Storage(state.collections);
          } else {
            item.data = item.data.filter(
              (item) => item.animeId !== data.animeId
            );
            localStorage.removeItem("collections");
          }
        }
      });
      Storage(state.collections);
      return {
        ...state,
        collections: [...state.collections],
      };

    case "REMOVE_COLLECTION":
      localStorage.removeItem("collections");
      const newCollection = state.collections.filter(
        (item) => item.collectionName !== action.payload.collectionName
      );

      if (newCollection.length !== 0) {
        Storage(newCollection);
      } else {
        localStorage.removeItem("collections");
      }

      return {
        ...state,
        collections: [...newCollection],
      };

    default:
      return state;
  }
};

export const CollectionContext = createContext();

//  const storage = localStorage.getItem('collections') ? JSON.parse(localStorage.getItem('collections')) : []

const CollectionProvider = ({ children }) => {
  const [storage, setStorage] = useState([]);

  const initialState = {
    collections: storage,
    errorMsg: "",
  };
  const [state, dispatch] = useReducer(CollectionReducer, initialState);

  useEffect(() => {
    const collectionData = localStorage.getItem("collections")
      ? JSON.parse(localStorage.getItem("collections"))
      : [];
    if (collectionData.length !== 0) {
      setStorage(collectionData);
      state.collections = collectionData;
    }
  }, []);

  const addOrRemoveItem = (payload) => {
    dispatch({ type: "ADD_OR_REMOVE_ITEM", payload });
  };

  const createCollection = (payload) => {
    dispatch({ type: "CREATE_COLLECTION", payload });
  };

  const checkCollection = async (value) => {
    const isAlreadyThere = !state.collections.find(
      (item) => item.collectionName === value
    );

    return isAlreadyThere;
  };

  const removeCollection = (payload) => {
    dispatch({ type: "REMOVE_COLLECTION", payload });
  };


  return (
    <CollectionContext.Provider
      value={{
        addOrRemoveItem,
        removeCollection,
        createCollection,
        checkCollection,
        collections: state.collections,
        errorMsg: state.errorMsg,
        ...state,
      }}
    >
      {children}
    </CollectionContext.Provider>
  );
};

export default CollectionProvider;
