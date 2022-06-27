import { useLottie } from "lottie-react";
import loadingLottie from '../../assets/lotties-loading.json'

export default function Loading() {
  const options = {
    animationData: loadingLottie,
    loop: true
  }

  const { View } = useLottie(options)

  return <>{View}</>
}