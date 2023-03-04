import useWeb3Store from "@/store/useWeb3Store";
import { TickCircle } from "iconsax-react";
import { useEffect } from "react";
import styled from "styled-components";
import { ButtonPrimary } from "../../components/Buttons";
import { colors } from "../../utils/colors";

export default function Step3() {
  const { wallet } = useWeb3Store();

  useEffect(() => {
    if (!wallet) return;
    async function getResult() {
      // Check if there is a transaction hash in the URL
      const urlParams = new URLSearchParams(window.location.search);
      const txhash = urlParams.get("transactionHashes");

      if (txhash !== null) {
        // Get result from the transaction
        const result = await wallet?.getTransactionResult(txhash);
        console.log(result);
      }
    }
    getResult();
  }, [wallet]);
  return (
    <>
      <Step3Title>Your KYC request has been approved</Step3Title>
      <Step3SubTitle>
        You can add your wallets to get blue tick - Fee: 2 Near/ wallet
      </Step3SubTitle>

      <Step3InputLabel>Wallet 1</Step3InputLabel>
      {
        // is kyc
        true ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              height: "48px",
              padding: "0 16px",
              backgroundColor: "#333333",
            }}
          >
            <span>0x825c848dD113E1Ac96aF68fB494C0988cafe609B</span>
            <span style={{ color: colors.blue2, lineHeight: 0 }}>
              <TickCircle variant="Bold" size={20} />
            </span>
          </div>
        ) : (
          <Step3Input />
        )
      }

      <p
        style={{
          marginTop: "16px",
          color: colors.primary1,
          cursor: "pointer",
        }}
        onClick={() => {}}
      >
        Add more wallet{" "}
      </p>

      <div
        style={{
          width: "100%",
          height: "1px",
          backgroundColor: "#333333",
          marginTop: "32px",
        }}
      />

      <ButtonPrimary style={{ marginTop: "40px" }}>Add</ButtonPrimary>
    </>
  );
}

const Step3Title = styled.p`
  font-size: 16px;
  line-height: 16px;
  font-weight: 600;
  margin-bottom: 12px;
  color: white;
`;
const Step3SubTitle = styled.p`
  font-size: 14px;
  line-height: 16px;
  margin-bottom: 40px;
  color: #c0c0c0;
`;
const Step3InputLabel = styled.p`
  font-size: 16px;
  line-height: 16px;
  margin-bottom: 12px;
  color: white;
`;
const Step3Input = styled.input`
  width: 100%;
  font-size: 14px;
  line-height: 24px;
  padding: 12px 16px;
  border: 2px solid #595959;
  margin-bottom: 24px;
  background-color: transparent;
  color: white;
  font-weight: 600;
`;
