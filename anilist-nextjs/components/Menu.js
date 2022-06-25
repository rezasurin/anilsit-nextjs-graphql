import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useState } from "react";

import Link from 'next/link'

const menuItems = [
  {
    id: 'home',
    name: 'Home',
    active: false
  },
  {
    id: 'my-collections',
    name: 'My Collections',
    active: false
  }
]

const navbarCls = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 60px;
  padding 15px;
  position: absolute;
  background-color: black;

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
      }
    }
  }
`

const drawerCls = css`

`

export const Menu = (props) => {
  const [visible, setVisible] = useState(false)

  return (
    <nav css={navbarCls}>
      <ul>
        {
          menuItems.map((item, idx) => (
            <li>
              <Link
              id={item.id}
              href={`/${item.id}`}
              >
                {item.name}
              </Link>
            </li>
           ) )
        }
      </ul>
    </nav>
  )
}