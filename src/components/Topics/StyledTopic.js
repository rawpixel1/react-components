import styled, { css } from "styled-components";

import { fontFamily, palette } from "../../utils/cssVars";
import { ifProp, prop } from "styled-tools";

const taggedGreen = "#A1D1B7";
const taggingGreen = "#95BDAA";

export const StyledTopicButton = styled.button`
  background: none;
  border: none;
  color: #4a4a4a;
  width: 60px;
  min-height: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
  text-decoration: none;
  justify-self: start;
  padding: 0;
  overflow: visible;

  &:hover {
    cursor: pointer;

    .img-wrapper {
      background: ${props =>
        props.isTagged
          ? palette.grayLighter
          : props.isTagMode
          ? taggedGreen
          : palette.grayLight};
    }
  }

  .img-wrapper {
    width: 100%;
    background: ${props =>
      props.isTagged && props.isTagMode
        ? taggedGreen
        : props.active
        ? palette.topicActive
        : palette.topicButtonBackground};
    transition: background-color linear 250ms;
  }

  // Showing the loader sets the disabled attr, so we can use this to style
  // loading state.
  &[disabled] .img-wrapper {
    background: ${props =>
      props.isTagged || !props.isTagMode ? palette.grayLight : taggingGreen};
  }
`;

export const StyledTitle = styled.span`
  font-family: ${fontFamily.base};
  font-size: 12px;
  text-align: center;
  line-height: 1.2;
  margin-top: 3px;
  width: 100%;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-wrap: normal;
  overflow: hidden;
  word-break: break-word;
  position: relative;

  ${ifProp(
    "isHyphenated",
    css`
      word-break: break-all;
      padding-right: 4px;

      &:after {
        content: "-";
        position: absolute;
        right: 0;
        top: 0;
      }
    `
  )}
`;

export const StyledIcon = styled.div`
  display: inline-block;
  height: 10px;
  width: 10px;
  margin-right: 2px;
  vertical-align: baseline;
  mask: url(${prop("icon")}) no-repeat center;
  mask-size: contain;
  background: ${palette.gray};
`;
