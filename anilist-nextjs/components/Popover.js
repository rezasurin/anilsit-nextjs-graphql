import React, { useRef, useState, useContext, useEffect } from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

import { CollectionContext } from "../contexts/collection";


import { Button } from "./Basic/Button";
import Popover from 'rsuite/Popover'
import Whisper from 'rsuite/Whisper'
import Dropdown from 'rsuite/Dropdown'
import Checkbox from 'rsuite/Checkbox'


export const PopupWrap = styled.div`
  position: relative;
  width: 300px;
  height: 300px;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  overflow-y: scroll;
  overscroll-behavior: contain;
  border: 2px dashed #ff6b81;
  background-color: #281e36;
  
`


export const BoxDiv = styled.div`
  z-index: 40;
`

const tooltipCss = css`
  display: inline-block;
  background: #ffffff;
  color: #643045;
  font-weight: bold;
  padding: 5px 10px;
  font-size: 13px;
  border-radius: 4px;

  #tooltip[data-popper-placement^='bottom'] > #arrow {
    top: -4px;
  }
`

const popoverCss = css`
  background-color: red;
`
// eslint-disable-next-line react/display-name
const Overlay = React.forwardRef(({ style, data, handleAddCollection,isInCollection, handleShowModal, ...rest }, ref) => {
  const styles = {
    ...style,
    color:'#000',
    background: '#fff',
    width: 200,
    padding: 10,
    borderRadius: 4,
    position: 'absolute',
    border: '1px solid #ddd',
    boxShadow: '0 3px 6px -2px rgba(0, 0, 0, 0.6)'
  };

  const [checkedData, setCheckedData] = useState([])

  console.log(isInCollection.includes('asd'), "< INCLUDES")

  useEffect(() => {
    if (isInCollection.length !== 0) {
      setCheckedData(isInCollection)
    }
  }, [])
  const handleChange = (value, index) => {
    // setCheckedData([...checkedData, value])
    let prev = checkedData
    let itemIndex = prev.indexOf(value)
    

    if (itemIndex !== -1) {
      prev.splice(itemIndex, 1)
    } else {
      prev.push(value)
    }

    setCheckedData([...prev])

    handleAddCollection(value)
    console.log(prev.indexOf(value), prev, value, "<< value checkbox")
  }
  

  return (
    <div {...rest} style={styles} ref={ref}>
      <p>
        Collection list
      </p>
      <hr />
      <div>
        {
          data ? (
            data.map((item, idx) => (

              <Checkbox
                name="collectionName"
                value={item.collectionName}
                key={idx}
                checked={isInCollection.includes(item.collectionName)}
                onChange={() => handleChange(item.collectionName, idx)}
              >
                {item.collectionName}
              </Checkbox>
            ))
          )
          :
          <p> data not available</p>
        }
      </div>
      <button onClick={handleShowModal}>Create collection</button>
    </div>
  );
});

export const PopupBox = (props) => {
  const { addOrRemoveItem } = useContext(CollectionContext)
  const { setShowModal, handleAddCollection, collections,isInCollection } = props
  const ref = useRef()

  const handleShowModal = () => setShowModal(true)
  console.log(collections, "< pop data collect")

  return (
    <>
      <Whisper placement="bottom" ref={ref} trigger="active"  speaker={
        (props, ref) => {
          const { className, left, top, onClose, setShowModal } = props;
          return <Overlay style={{ left, top }}  handleAddCollection={handleAddCollection} data={collections} isInCollection={isInCollection} onClose={onClose} handleShowModal={handleShowModal} className={className} setShowModal={setShowModal} ref={ref} />;
        }
      }>
        {
          props.children
        }
      </Whisper>
    </>
  )
}