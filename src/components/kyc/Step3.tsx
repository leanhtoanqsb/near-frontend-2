import useWeb3Store from "@/store/useWeb3Store";
import { TickCircle } from "iconsax-react";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { ButtonPrimary } from "../../components/Buttons";
import { colors } from "../../utils/colors";

export default function Step3() {
  const { wallet, kycWallets, contract, setKycWallets } = useWeb3Store();

  const [address, setAddress] = useState("");

  const addAddressToKyc = async () => {
    if (!address) return;
    try {
      contract?.add_wallet_to_kyc(address);
    } catch (error) {
      console.log(error);
    }
  };

  const isFetched = useRef(false);
  const urlParams = new URLSearchParams(window.location.search);
  const txhash = urlParams.get("transactionHashes");

  useEffect(() => {
    if (!wallet || isFetched.current) return;
    async function getResult() {
      if (txhash !== null) {
        // Get result from the transaction
        const result = (await wallet?.getTransactionResult(txhash)) as string[];
        if (Array.isArray(result)) {
          setKycWallets(result);
          isFetched.current = true;
          return;
        }
        try {
          contract?.get_my_kyc_address_list();
          isFetched.current = true;
        } catch (error) {
          isFetched.current = true;
          console.log(error);
        }
      }
    }

    getResult();
  }, [wallet?.accountId]);

  useEffect(() => {
    async function getResult() {
      if (txhash !== null) {
        // Get result from the transaction
        const result = (await wallet?.getTransactionResult(txhash)) as string[];
        if (result.length > 0) {
          setKycWallets(result);
        }
      }
    }
    if (!!txhash) {
      if (!wallet) return;
      getResult();
      return;
    } else {
      if (
        isFetched.current ||
        !wallet?.accountId ||
        !contract ||
        kycWallets.length > 0
      )
        return;
      try {
        contract.get_my_kyc_address_list();
        isFetched.current = true;
      } catch (error) {
        isFetched.current = true;
        console.log(error);
      }
    }
  }, [wallet?.accountId]);

  // useEffect(() => {
  //   if (!wallet) return;
  //   async function getResult() {
  //     // Check if there is a transaction hash in the URL
  //     const urlParams = new URLSearchParams(window.location.search);
  //     const txhash = urlParams.get("transactionHashes");

  //     if (txhash !== null) {
  //       // Get result from the transaction
  //       const result = await wallet?.getTransactionResult(txhash);
  //       if (Array.isArray(result)) return;
  //       if (typeof result === 'string') set
  //       console.log("result", result);
  //     }
  //   }
  //   getResult();
  // }, [wallet?.accountId]);
  return (
    <>
      <Step3Title>Your KYC request has been approved</Step3Title>
      <Step3SubTitle>
        You can add your wallets to get blue tick - Fee: 2 Near/ wallet
      </Step3SubTitle>

      <Step3InputLabel>Wallets</Step3InputLabel>
      {kycWallets.length > 0 ? (
        kycWallets.map((wallet) => {
          return (
            <div
              key={wallet}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                height: "48px",
                padding: "0 16px",
                backgroundColor: "#333333",
                marginBottom: "8px",
              }}
            >
              <span>{wallet}</span>
              <span style={{ color: colors.blue2, lineHeight: 0 }}>
                <TickCircle variant="Bold" size={20} />
              </span>
            </div>
          );
        })
      ) : (
        <></>
      )}

      <p
        style={{
          marginTop: "48px",
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
          marginTop: "16px",
        }}
      />
      <Step3Input
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <ButtonPrimary onClick={addAddressToKyc}>Add</ButtonPrimary>
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
