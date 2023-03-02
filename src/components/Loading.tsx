import styled from "styled-components";
import { colors } from "../utils/colors";

export const Loading = styled.div`
  border: 2px solid ${colors.neutral1}16;
  border-top: 2px solid ${colors.primary1};
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: spin 1s linear infinite;
  margin: 10px auto;
`;
