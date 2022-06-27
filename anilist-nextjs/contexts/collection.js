import { createContext, useEffect, useReducer, useState } from "react";



const Storage = (collections) => {
  localStorage.setItem(
    "collections",
    JSON.stringify(collections.length > 0 ? collections : [{}])
    )
    console.log(localStorage.getItem('collections'), "< local storage")
}


const CollectionReducer = (state, action) => {
  // console.log(action.payload, "<< payload")
  const {collectionName, data} = action.payload
  switch (action.type) {
    case 'CREATE_COLLECTION':
      console.log(action.payload, "<< PAYLOAD COLLECTION")
      if (!state.collections.find((item) => item.collectionName === action.payload.collectionName)) {
        state.collections.push({
          collectionName: collectionName,
          data: data !== null ? [data] : []
          })
        } else {
          console.log(action.payload," COLLECTION ALREADY AVAILABLE")
          state.errorMsg = "COLLECTION ALREADY AVAILABLE"
        }
        
      if (action.payload) console.log(state.collections, "<< state collections")
      Storage(state.collections)
      return {
        ...state,
        collections: [...state.collections]
      }
      
    case 'ADD_OR_REMOVE_ITEM': 
    state.collections.forEach((item) => {
      if (item.collectionName === collectionName) {
        if (!item.data.find((item) => item.animeId === data.animeId)) {
          console.log(action.payload, "<< PAYLOAD DI ADDORREMOVE")
          item.data.push(action.payload.data)

          console.log(item.data, "you have added the items")
          // Storage(state.collections)
        } else {
           item.data = item.data.filter(item => item.animeId !== data.animeId)
          // item.data = newData
          console.log(item.data, "you have removed the items")
          localStorage.removeItem('collections')

        }
      }
    })
    Storage(state.collections)
      return {
        ...state,
        collections: [
          ...state.collections
        ]
      }

    case 'REMOVE_COLLECTION':
      localStorage.removeItem('collections')
      const newCollection = state.collections.filter(item => item.collectionName !== action.payload.collectionName)
      console.log(newCollection, "<< new collection")
      if (newCollection.length !== 0) {
        Storage(newCollection)
      } else {
        localStorage.removeItem('collections')
      }
      

      return {
        ...state,
        collections: [...newCollection]
      }
    
    default:
      return state
  }
}


export const CollectionContext = createContext()

//  const storage = localStorage.getItem('collections') ? JSON.parse(localStorage.getItem('collections')) : []

const CollectionProvider = ({children}) => {
  const [storage, setStorage] = useState([])
  
  const initialState = {
    collections: storage,
    errorMsg: ""
  }
  const [state, dispatch] = useReducer(CollectionReducer, initialState)

  useEffect(() => {
    const collectionData = localStorage.getItem('collections') ? JSON.parse(localStorage.getItem('collections')) : []
    if (collectionData.length !== 0) {
      setStorage(collectionData)
      state.collections =  collectionData
    }
  }, [])
  // console.log(storage[0], "<< storage")
  
  
  const addOrRemoveItem = (payload) => {
    dispatch({type: "ADD_OR_REMOVE_ITEM", payload})
  }

  const getCollectionList = () => {
    localStorage.getItem("collectionList")
  }

  const createCollection = (payload) => {
    dispatch({type: "CREATE_COLLECTION", payload})
  }

  const checkCollection = async (value) => {
    const isAlreadyThere = !state.collections.find(item => item.collectionName === value)
    console.log(state.collections,isAlreadyThere, "<< CHECK COLLECTION" )
    return isAlreadyThere
  }

  const removeCollection = (payload) => {
    dispatch({ type: "REMOVE_COLLECTION", payload})
  }

  // console.log(state.collections, "<< state.collection")
  
  return (
    <CollectionContext.Provider
    value={{
      addOrRemoveItem,
      removeCollection,
      createCollection,
      checkCollection,
      collections: state.collections,
      errorMsg: state.errorMsg,
      ...state
    }}
    >
      {children}
    </CollectionContext.Provider>
  )
}

export default CollectionProvider