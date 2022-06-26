import { screenSize } from "./units";
import { css, SerializedStyles } from "@emotion/react";

export const isObjectEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

export const getBreakpoints = (props) =>  {
  let screen

  if (typeof window !== 'undefined' && window.matchMedia) {
    Object.values(screenSize).map((breakpoint, index) => window.matchMedia(`(min-width: ${breakpoint})`).matches && (screen = screenSize[breakpoint]))
  }

  return screen
}

export const media = (breakpoint) => {
  const breakpoints = screenSize

  if (!Object.keys(breakpoints).includes(breakpoint)) {
    throw new Error (`Breakpoint ${breakpoint} not found`)
  }

  return `@media (min-width: ${breakpoints[breakpoint]})`
}

export const responsive = (breakpoints, mapper) => {
  if (isObjectEmpty(breakpoints)) {
    return Object.values(screenSize).map(breakpoint => css`
      ${media(breakpoint)} {
        ${mapper(breakpoint)}
      }
    `)
  }
}

export const mediaQueries = (screen) => `@media screen and (min-width: ${screenSize[screen]}px)`