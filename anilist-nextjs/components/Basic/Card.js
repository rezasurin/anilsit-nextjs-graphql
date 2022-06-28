import { css } from "@emotion/react";
import { screenSize, fontSizes, spacing } from "../../utils/units";
import { theme } from "../../utils/theme";
import { Button } from "./Button";
import { useRouter } from "next/router";
import { PopupBox } from "./Popover";

const cardMovieCss = css`
  display: grid;
  position: relative;
  grid-template-rows: auto;
  border-radius: 12px;
  background-color: ${theme.palette.primary.light};
  margin: 2px;
  // padding: ${spacing.sm};
  @media screen and (min-width: ${screenSize.md}px) {
    min-height: 280px;
    &:hover {
      box-shadow: 1px 0px 16px rgba(0, 173, 181, 0.8);
      .item__overlay {
      }

      .item__body {
        opacity: 1;
        background: linear-gradient(
          rgba(137, 255, 241, 0) 0%,
          rgba(0, 0, 0, 1) 100%
        );
      }
    }
  }
  &:active {
    box-shadow: 1px 0px 16px rgba(0, 173, 181, 0.8);
  }
`;

const itemOverlayCss = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 40%;
  position: absolute;
  width: 100%;
  bottom: 19.56vh;
  border-radius: 12px;
  transition: transform 300ms, background 500ms 100ms;
  background: linear-gradient(
    rgba(137, 255, 241, 0) 0%,
    rgba(0, 0, 0, 0.82) 100%
  );
  transform: translate3d(0, 100%, 0);
  @media screen and (max-width: ${screenSize.sm}px) {
    opacity: 0;
  }
`;

const itemBodyCss = css`
  display: flex;
  flex-grow: 1;
  padding: 1rem;
  justify-content: center;
  opacity: 0;
  border-radius: 12px;
  transition: opacity 500ms 100ms;

  p {
    margin: 0;
  }
  @media screen and (max-width: ${screenSize.sm}px) {
    opacity: 0;
  }
`;

export const CardMedia = ({ imgSrc }) => {
  return (
    <>
      <img
        src={imgSrc}
        css={css`
          width: 100%;
          height: 100%;
          border-radius: 12px;
        `}
      />
    </>
  );
};

const CardContent = (props) => {
  return <></>;
};

export const CardMovie = (props) => {
  const { onClick, item } = props;
  const router = useRouter()


  const handleClick = (item) => {
    router.push(`/anime/${item?.id || item.animeId}/${item.title?.userPreferred || item.animeName}`)
  }
  return (
    <div css={cardMovieCss}>
      <CardMedia imgSrc={item.coverImage?.large || item.animeCover} />
      <div className="item__overlay" css={itemOverlayCss}>
        <div className="item__body" css={itemBodyCss}>
          {/* <p>{props.title}</p> */}
          <div style={{display: 'flex', flexDirection: 'column', alignItems:'center'}}>
            <Button color="accent" size="md" rounded="sm"
            onClick={(e) => handleClick(item)}
            >
              See detail
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
