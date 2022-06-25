import { css } from "@emotion/react";
import { screenSize, fontSizes, spacing } from "../utils/units";
import { theme } from "../utils/theme";

const CardMedia = (props) => {
  return (
    <>
    </>
  )
}

const CardText = (props) => {
  return (
    <>
    </>
  )
}

export const CardMovie = (props) => {
  const {children} = props

  return (
    <div
    css={css`
      display: grid;
      position: relative;
      grid-template-rows: auto;
      border-radius: 12px;
      background-color: ${theme.palette.primary.light};
      margin: 2px;
      // padding: ${spacing.sm};
       @media screen and (min-width: ${screenSize.md}px) {
         &:hover {
           box-shadow: 1px 0px 16px rgba(0, 173, 181,0.8);
          }
        }
        &:active {
          box-shadow: 1px 0px 16px rgba(0, 173, 181,0.8);
         }
       
    `}
    >
      {children}
    </div>
  )
}