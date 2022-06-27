import { Global, css } from "@emotion/react";
import { theme } from "../../utils/theme";
import { screenSize } from "../../utils/units";

const globalStyles = (
  <Global 
    styles={() => css`
      
      body {
        margin: 0;
        font-family: ${theme.typography.fontFamily};
        font-size: 14px;
        font-weight: 400;
        color: ${theme.palette.basic.white};

        @media screen and (min-width:${screenSize['sm']}px){
          font-size:16px;
        }
    
        @media screen and (min-width:${screenSize['md']}px){
            font-size:18px;
        }
    
        @media screen and (min-width:${screenSize['lg']}px){
            font-size:20px;
        }
      }
      h1 { font-size: 3em; line-height: 1; margin-bottom: 0.5em;text-transform: capitalize; }
      h2 {
        font-size: 2.75em; line-height: 0.75; margin-bottom: 0.5em;text-transform: capitalize;
      }
    `}
  />
)

export { globalStyles }