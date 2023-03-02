import styled from "styled-components";
import { ButtonPrimary } from "../Buttons";
import Uploader from "../Uploader";
import { colors } from "../../utils/colors";

export default function Step1() {
  return (
    <>
      <ContentContainer>
        <Uploader
          label="Upload your front photo"
          onChange={(file) => console.log(file)}
        />
        <Uploader
          label="Upload your back photo"
          onChange={(file) => console.log(file)}
        />
        <Uploader
          label={
            <>
              Upload bill photo<span>(Bank, electric, water...)</span>
            </>
          }
          onChange={(file) => console.log(file)}
        />
      </ContentContainer>
      <ButtonPrimary style={{ marginTop: "40px" }}>Send Request</ButtonPrimary>
    </>
  );
}

const ContentContainer = styled.div`
  flex: 1;
  display: grid;
  gap: 40px;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  grid-auto-rows: 280px;
`;
