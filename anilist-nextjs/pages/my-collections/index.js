import { useState, useContext } from "react"
import { css } from "@emotion/react"

import { useRouter } from "next/router"

import { CollectionContext } from "../../contexts/collection"
import { theme } from "../../utils/theme"
import { fontSizes } from "../../utils/units"

import { Button } from "../../components/Basic/Button"

const containerCss = css`
  height: 100%;
  min-height: 100vh;
  padding-top: 5rem;
`

const cardCollection = css`
  display: flex;
  width: 100%;
  padding: 1.125rem;
  justify-content: space-between;
  background-color: ${theme.palette.grey[400]};
  margin: 2rem 0;
  border-radius: 0.8125rem;
`

export default function MyCollections() {
  const { collections, removeCollections} = useContext(CollectionContext)
  const router = useRouter()
  

  
  if (collections.length === 0) {
    
    return <h2> LOADING ....</h2>

  }

  const handleClickDetail = (item) => {
    router.push(`/my-collections/${item.collectionName}`)
  }

  return (
    <div css={containerCss}>
      <h1> My Collection Page</h1>

      {
        collections?.map(item => (
          <div css={cardCollection}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
              <p css={css`font-size: ${fontSizes['xxl']}; margin: 1rem 0 0 0.75rem; font-weight: 700;text-transform:capitalize;`}>{item.collectionName}</p>
              <Button
              size="md"
              color="accent"
              onClick={() => handleClickDetail(item)}
              >
                View collection
              </Button>
            </div>
            <div style={{ margin: '0 2rem 0 0', borderRadius: '2rem'}}>
              {
                item.data ?
                <img style={{borderRadius: '0.5rem'}} src={item.data[item.data.length - 1].animeCover} />
                :
                <img style={{borderRadius: '0.5rem'}} src='#' alt="cover-anime" />
              }
            </div>

          </div>
        ))
      }

    </div>
  )
}