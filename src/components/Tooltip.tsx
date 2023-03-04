import { ReactNode } from "react";
import styled from "styled-components";
import { ButtonPrimary } from "./Buttons";

export default function Tooltip(props: {
  tooltipText: string;
  children: ReactNode;
}) {
  return (
    <TooltipContainer>
      {props.children}
      <span className="tooltiptext">{props.tooltipText}</span>
    </TooltipContainer>
  );
}

const TooltipContainer = styled(ButtonPrimary)`
  position: relative;
  display: inline-block;
  cursor: default !important;

  /* Tooltip text */
  & .tooltiptext {
    visibility: hidden;
    width: 200px;
    background-color: black;
    color: #fff;
    text-align: center;
    padding: 5px 0;
    border-radius: 6px;

    /* Position the tooltip text - see examples below! */
    position: absolute;
    bottom: 100%;
    left: 50%;
    margin-left: -100px;
    z-index: 1;
  }

  /* Show the tooltip text when you mouse over the tooltip container */
  &:hover .tooltiptext {
    visibility: visible;
  }
`;
