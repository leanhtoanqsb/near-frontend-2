import styled from "styled-components";
import { colors } from "@/utils/colors";
import { Danger, TickCircle } from "iconsax-react";
import { Container } from "@/components/Container";
import { ButtonPrimary } from "@/components/Buttons";

export default function Home() {
  return (
    <Container>
      <CheckBlueTickCard>
        <CardHeading>Check Blue Tick</CardHeading>
        <InputContainer>
          <Input placeholder="Enter wallet address" />
          <CheckButton>Check</CheckButton>
        </InputContainer>

        <ResultContainer>
          <p className="label">Result</p>
          <div className="result">
            {/* has result */}
            {true ? (
              <>
                <span>0x825c848dD113E1Ac96aF68fB495C0988cafe602N</span>
                {
                  // is verified
                  true ? (
                    <span className="icon success">
                      <TickCircle size={40} variant="Bold" />
                    </span>
                  ) : (
                    <span className="icon danger">
                      <Danger size={40} variant="Bold" />
                    </span>
                  )
                }
              </>
            ) : (
              <>
                <span>Wrong address</span>
              </>
            )}
          </div>
        </ResultContainer>
      </CheckBlueTickCard>
    </Container>
  );
}

const CheckBlueTickCard = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  margin-top: 10%;
`;
const CardHeading = styled.div`
  border: 2px solid rgba(35, 16, 94, 0.25);
  padding: 32px;
  background: linear-gradient(
    270deg,
    rgba(30, 30, 30, 0.5) 11.94%,
    rgba(6, 3, 20, 0.5) 38.06%
  );
  color: ${colors.primary1};
  font-size: 32px;
  line-height: 32px;
  text-align: center;
  font-weight: 700;
`;
const InputContainer = styled.div`
  display: flex;
  gap: 16px;
  padding: 32px;
  background: white;
  & > * {
    font-size: 32px;
    line-height: 32px;
    font-weight: 600;
  }
`;
const Input = styled.input`
  flex: 1;
  background: transparent;
  border: none;
`;
const CheckButton = styled(ButtonPrimary)`
  flex-shrink: 0;
`;

const ResultContainer = styled.div`
  margin-top: 32px;
  color: white;
  font-weight: 600;

  p.label {
    font-size: 20px;
    line-height: 34px;
    margin-bottom: 12px;
  }
  div.result {
    padding: 32px;
    background-color: ${colors.gray1};
    font-size: 24px;
    line-height: 40px;
    display: flex;
    gap: 16px;
    align-items: center;

    .icon {
      line-height: 0;
    }
    .icon.success {
      color: ${colors.blue2};
    }
    .icon.danger {
      color: ${colors.yellow};
    }
  }
`;
