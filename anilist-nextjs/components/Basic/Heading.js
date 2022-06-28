import styled from '@emotion/styled';
import isPropValid from '@emotion/is-prop-valid';
import useBreakpoints from '../../hooks/useBreakpoints';
import { theme } from '../../utils/theme';
import { headingSize } from '../../utils/units';

const { h1 } = headingSize

export const H1 = styled.h1`
  font-size: ${props => h1.fontSize[props.size]};
  line-height: 1.2;
`

