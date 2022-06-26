import { createContext, useContext, useEffect, useState } from "react";

import { GET_ANIME_LIST } from "../services";
import client from "../config/graphql";

const AnimeContext = createContext()

export const getAnime = async (props) => {
  const { page } = props
  const { data, loading, error} = await client.query({
    query: GET_ANIME_LIST,
    variables: {page}
  })

  return {
    data,
    loading,
    error
  }
}

export const AnimeProvider = ({children}) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [animeList, setAnimeList] = useState([])

  // useEffect(() => {
  //   getAnime().then(({ data, loading, error}) => {
  //     if (!error) setAnimeList(data.Page.media)
  //   })
  // }, [])

  const state = {
    animeList
  }

  return (
    <AnimeContext.Provider value={[animeList, setAnimeList]}>
      {children}
    </AnimeContext.Provider>
  )
}

export const useAnimeContext = () => {
  const state = useContext(AnimeContext)

  if ( state === undefined ) {
    throw new Error ('useAnimeContext must be used inside AnimeProvider')
  }
  return state
}