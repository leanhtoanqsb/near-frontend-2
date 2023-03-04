import styled from "styled-components";
import { colors } from "../utils/colors";

export const ButtonPrimary = styled.button`
  line-height: 16px !important;
  font-size: 16px !important;
  padding: 16px;
  font-weight: 600;
  background-color: #52df9b;
`;
export const ButtonOutlinePrimary = styled.button`
  font-size: 16px;
  line-height: 16px;
  padding: 16px;
  background-color: #060314;
  color: white;
  border: 2px solid ${colors.primary1};
`;
export const Button = styled.button`
  font-size: 16px;
  line-height: 16px;
  padding: 16px;
  color: white;
  background-color: #333333;
`;
