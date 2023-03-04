import { TickCircle } from "iconsax-react";
import Kyc from "@/model/Kyc";
import { useState } from "react";
import styled from "styled-components";
import { ButtonPrimary } from "@/components/Buttons";
import { Container } from "@/components/Container";
import Uploader from "@/components/Uploader";
import { colors } from "@/utils/colors";
import Step1 from "@/components/kyc/Step1";
import Step2 from "@/components/kyc/Step2";
import Step3 from "@/components/kyc/Step3";
import { useQuery } from "react-query";
import useWeb3Store from "@/store/useWeb3Store";
import axios from "axios";
// import dbConnect from "@/lib/dbConnect";

export default function KYC() {
  const { wallet } = useWeb3Store();
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <Container>
      <KYCContainer>
        <StepContainer>
          <StepItem isActive={currentStep >= 1}>
            <p className="heading">Step 1</p>
            <p className="description">Request KYC</p>
          </StepItem>
          <StepLinkIndicator isActive={currentStep > 1} />
          <StepItem isActive={currentStep >= 2}>
            <p className="heading">Step 2</p>
            <p className="description">Uload proof</p>
          </StepItem>
          <StepLinkIndicator isActive={currentStep >= 2} />
          <StepItem isActive={currentStep === 3}>
            <p className="heading">Step 3</p>
            <p className="description">Add wallet</p>
          </StepItem>
        </StepContainer>

        <ContentWrapper style={{ width: "100%" }}>
          {/* Step 1 */}
          {currentStep === 1 ? <Step1 /> : null}

          {/* Step 2 */}
          {currentStep === 2 ? <Step2 /> : null}

          {/* Step 3 */}
          {currentStep === 3 ? <Step3 /> : null}
        </ContentWrapper>
      </KYCContainer>
    </Container>
  );
}

/* Retrieves pet(s) data from mongodb database */
// export async function getServerSideProps() {
//   await dbConnect();

//   /* find all the data in our database */
//   const result = await Kyc.find({});
//   const kycs = result.map((doc) => {
//     const kyc = doc.toObject();
//     return kyc;
//   });

//   return { props: { kycs } };
// }

const KYCContainer = styled.div`
  display: flex;
  gap: 40px;
  margin-top: 40px;
  padding-bottom: 30px;
`;
const StepContainer = styled.div`
  width: 260px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const StepLinkIndicator = styled.div<{ isActive: boolean }>`
  width: 1px;
  height: 40px;
  background-color: ${({ isActive }) =>
    isActive ? colors.primary1 : "#595959"};
`;
const StepItem = styled.div<{ isActive: boolean }>`
  width: 260px;
  padding: 16px 24px;
  background-color: black;
  border: 1px solid
    ${({ isActive }) => (isActive ? colors.primary1 : "transparent")};
  .heading {
    color: white;
    font-size: 24px;
    line-height: 34px;
    font-weight: 700;
  }
  .description {
    color: #c0c0c0;
    font-size: 16px;
    line-height: 34px;
  }
`;
const ContentWrapper = styled.div`
  background: rgba(15, 15, 15, 0.5);
  backdrop-filter: blur(5px);
  border: 1px solid #595959;
  padding: 40px;
`;
