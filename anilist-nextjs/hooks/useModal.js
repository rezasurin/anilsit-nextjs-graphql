import { useState } from "react"

export const useModal = () => {
  const [showModal, setShowModal] = useState(false)

  const toggle = () => {
    setShowModal(!showModal)
  }

  return [showModal, toggle]
}