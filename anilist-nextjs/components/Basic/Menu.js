import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useState } from "react";

import Link from 'next/link'
import { useRouter } from "next/router";
import { theme } from "../../utils/theme";
import { screenSize } from "../../utils/units";
import { mediaQueries, smScreen } from "../../utils/helpers";

const menuItems = [
  {
    id: 'home',
    name: 'Home',
    path: '/',
    active: false
  },
  {
    id: 'my-collections',
    name: 'My Collections',
    path: '/my-collections',
    active: false
  }
]


const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100vw;
  height: 40px;
  position: relative;
  z-index: 10;
  background-color: black;
  ${mediaQueries('sm')} {
    position: fixed;
    height: 60px;

  }

  ul {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items; center;
    list-style-type: none;
    
    li {
      margin-right: 12px;

      a {
        text-decoration: none;
        color: white;
        font-weight: ${props => console.log(props.isActive)}
      }

    }
  }
  .active-path {
    color: ${theme.palette.accent.main};
    font-weight: 600 ;
  }
`

const drawerCls = css`
  color: red;
`

export const Menu = (props) => {
  const [visible, setVisible] = useState(false)
  const router = useRouter()
  // console.log(router.pathname, "<< ptaj")
  
  return (
    <Nav >
      <ul>
        {
          menuItems.map((item, idx) => (
            <li key={idx}>
              <Link
              id={item.id}
              href={`/${item.path}`}
              >
                <a className={`${item.path === router.pathname && 'active-path'}`}>
                {item.name}

                </a>
              </Link>
            </li>
           ) )
        }
      </ul>
    </Nav>
  )
}