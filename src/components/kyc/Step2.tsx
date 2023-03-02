import styled from "styled-components";
import { ButtonPrimary } from "../../components/Buttons";
import Uploader from "../../components/Uploader";
import { colors } from "../../utils/colors";

export default function Step2() {
  return (
    <>
      {true ? (
        <>
          <UploadedContainer>
            <p className="heading">Proof Uploaded</p>
            <p className="info">Please wait for us to check</p>
            <p className="sub_info">It might be taken 1 - 2 bussiness days</p>
          </UploadedContainer>
        </>
      ) : (
        <>
          <ContentContainer>
            <Uploader
              label="Upload picture 1"
              onChange={(file) => console.log(file)}
            />
            <Uploader
              label="Upload picture 2"
              onChange={(file) => console.log(file)}
            />
            <Uploader
              label="Upload picture 3"
              onChange={(file) => console.log(file)}
            />
          </ContentContainer>
          <ButtonPrimary style={{ marginTop: "40px" }}>
            Upload Proof
          </ButtonPrimary>
        </>
      )}
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

const UploadedContainer = styled.div`
  min-height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .heading {
    font-weight: 600;
    font-size: 20px;
    line-height: 20px;
    color: ${colors.primary1};
    margin-bottom: 24px;
  }
  .info {
    font-weight: 600;
    font-size: 16px;
    line-height: 16px;
    color: white;
    margin-bottom: 12px;
  }
  .sub_info {
    font-size: 14px;
    line-height: 16px;
    color: #c0c0c0;
  }
`;
