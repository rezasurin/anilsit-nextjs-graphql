import { spacing } from "./units"

const black = '#111'
const white = '#f5f5f5'

const palette = {
  basic: {
    black,
    white,
  },
  primary: {
    main: '#222831',
    light: '#393E46',
    contrastText: white
  },
  accent: {
    main: '#00ADB5',
    light: '#34D2CC',
    contrastText: white
  },
  grey: {
    100: '#EAEAEA',
    200: '#C9C5C5',
    300: '#888',
    400: '#666',
  },
}

const shadows = {
  none: 0,
  1: '0px 5px 10px rgba(0, 0, 0, 0.12)',
  2: '0px 8px 30px rgba(0, 0, 0, 0.24)',
}

const rounded = {
  sm: spacing['xs'],
  md: spacing['sm']
}

const typography = {
  fontFamily: "'Poppins', sans-serif"
}

const textSizes = {
  base: '14px',
  h1: {
    sm: {
      fontSize: '40px',

    }
  }
}

export const theme = {
  typography,
  rounded,
  shadows,
  palette
}