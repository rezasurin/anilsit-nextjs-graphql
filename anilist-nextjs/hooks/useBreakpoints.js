import { useMediaQuery } from 'react-responsive'
import { screenSize } from '../utils/units'

export default function useBreakpoints() {
  // let screen
  const screen  = {
    isSm: useMediaQuery({ query: `(max-width: ${screenSize['sm']}px)` }),
    isMd: useMediaQuery({ query: `(min-width: ${screenSize['sm']+1}px) and (max-width: ${screenSize['md']}px)` }),
    isLg: useMediaQuery({ query: `(min-width: ${screenSize['md']+1}px) and (max-width: ${screenSize['lg']}px)` }),
    isXl: useMediaQuery({ query: `(min-width: ${screenSize['lg']+1}px) and (max-width: ${screenSize['xl']}px)` }),
    isXxl: useMediaQuery({ query: `(min-width: ${screenSize['xl']+1}px)` }),
    active: 'sm',
    size: screenSize
  }

  // if (typeof window !== 'undefined' && window.matchMedia) {
  //   Object.values(screenSize).map(
  //     (breakpoint, index) =>
  //       useMediaQuery({ query: `(min-width: ${breakpoint}})` }) &&
  //       (screen = Object.keys(screenSize)[index])
  //   );
  //   console.log(useMediaQuery({ query: `(min-width: ${screenSize['sm']})` }))
  // }

  if (screen.isSm) screen.active = "sm";
  if (screen.isMd) screen.active = "md";
  if (screen.isLg) screen.active = "lg";
  if (screen.isXl || screen.isXxl) screen.active = "xl";
  return screen
}