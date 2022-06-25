import styled from '@emotion/styled';
import isPropValid from '@emotion/is-prop-valid';

import { spacing, fontSizes } from '../utils/units';
import { theme as defaultTheme, rounded, shadows, palette } from '../utils/theme';
import { isObjectEmpty } from '../utils/helpers';

const buttonSizeProps = {
  small: {
    fontSize: fontSizes['xs'],
    padding: `${spacing.xs} ${spacing.xs}`,
    borderRadius: `${spacing.xs}`
  },
  medium: {
    fontSize: fontSizes['sm'],
    padding: `${spacing.sm} ${spacing.md}`,
    borderRadius: `${spacing.md}`
  },
  large: {
    fontSize: fontSizes['md'],
    padding: `${spacing.md} ${spacing.lg}`,
    borderRadius: `${spacing.lg}px`
  }
}

const getPropsByVariant = ({variant, color, theme}) => {
  const colorInPalette = theme.palette[color]


  const defaultOutlineVariantProps = {
    main: {
      border: `1px solid ${theme.palette.basic.black}`,
      backgroundColor: theme.palette.basic.white,
      color: theme.palette.basic.black
    },
    hover: {
      border: `1px solid ${theme.palette.basic.black}`,
      backgroundColor: theme.palette.basic.white,
      color: theme.palette.basic.black,
    }
  }

  const outlineVariantPropsByPalette = colorInPalette && {
    main: {
      border: `1px solid ${colorInPalette.main}`,
      backgroundColor: theme.palette.basic.white,
      color: colorInPalette.main,
    },
    hover: {
      border: `1px solid ${colorInPalette.light}`,
      backgroundColor: theme.palette.basic.white,
      color: colorInPalette.light,
    },
  };

  const defaultSolidVariantProps = {
    main: {
      border: `1px solid ${theme.palette.grey[100]}`,
      backgroundColor: theme.palette.grey[100],
      color: theme.palette.basic.black,
      borderRadius: `${theme.rounded[rounded]}`
    },
    hover: {
      border: `1px solid ${theme.palette.grey[200]}`,
      backgroundColor: theme.palette.grey[200],
    },
  };

  const solidVariantsPropsByPalette = colorInPalette && {
    main: {
      border: `1px solid ${colorInPalette.main}`,
      backgroundColor: colorInPalette.main,
      color: colorInPalette.contrastText,
    },
    hover: {
      border: `1px solid ${colorInPalette.light}`,
      backgroundColor: colorInPalette.light,
    },
  }

  
  const variants = {
    outline: colorInPalette ? outlineVariantPropsByPalette : defaultOutlineVariantProps,
    solid: colorInPalette ? solidVariantsPropsByPalette : defaultSolidVariantProps
  }


  return variants[variant] || variants.solid
}

const StyledButton = ({
  color, size, variant, dropShadow, disabled, theme, rounded
}) => {
  if (isObjectEmpty(theme)) {
    theme = defaultTheme
  }
  const fontSizeBySize = buttonSizeProps[size]?.fontSize
  const paddingBySize = buttonSizeProps[size]?.padding
  const propsByVariant = getPropsByVariant({ variant, theme, color, rounded})

  return {
    cursor: 'pointer',
    fontWeight: 500,
    opacity: disabled && 0.7,
    padding: buttonSizeProps.medium.padding,
    fontSize: buttonSizeProps.medium.fontSize,
    fontFamily: theme.typography.fontFamily,
    borderRadius: theme.rounded[rounded],
    boxShadow: dropShadow && theme.shadows[1],
    ...(propsByVariant && propsByVariant.main),
    ...(paddingBySize && {padding: paddingBySize}),
    ...(fontSizeBySize && { fontSize: fontSizeBySize}),
    '&:hover': !disabled && {
      boxShadow: dropShadow && theme.shadows[2],
      ...(propsByVariant && propsByVariant.hover)
    }
  }
}


const IGNORED_PROPS = ['color']

const buttonConfig = {
  shouldForwardProp: (prop) => 
    isPropValid(prop) && !IGNORED_PROPS.includes(prop)
}

export const Button = styled('button', buttonConfig)(StyledButton)