import { fontSizes, screenSize, headingSize, spacing } from "../utils/units";
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import Head from "next/head";
import isPropValid from "@emotion/is-prop-valid";

import { responsive, media } from "../utils/helpers";

import { theme } from "../utils/theme";

import useBreakpoints from "../hooks/useBreakpoints";

import { H1 } from "./Heading";
import { Menu } from "./Menu";

const StyledContainer = ({justify, screenSize}) => {
  // console.log(theme.typography.fontFamily, 'styled container n')
  return {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    alignItems: 'center',
    backgroundColor: `${theme.palette.primary.main}`
  }
}

const IGNORE_PROPS = ['width']
const containerConfig = {
  shouldForwardProp: (prop) => isPropValid(prop) && !IGNORE_PROPS.includes(prop)
}

const Container = styled('div', containerConfig)(StyledContainer)

const Layout = ({children}) => {
  const screen = useBreakpoints()
  const { h1 } = headingSize
  // console.log(screen.active, "<< SCREEN SKRNG")
  return (
    <>
      <Head>
      <title>My page title</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>
      {/* NAVBAR HERE */}
      {/* RESPONSIVE LAYOUT HERE */}
      <Menu />
      <Container justify="center" screenSize={screen.active}>
        {/* <H1 size={screen.active}>
          HEading custom
        </H1> */}
        {/* <h1>Anime List</h1> */}
        {children}
      </Container>
    </>
  )
}

export default Layout