import styled from "styled-components";
import { ButtonPrimary } from "../Buttons";
import Uploader from "../Uploader";
import { colors } from "../../utils/colors";
import { useMutation } from "react-query";
import axios from "axios";
import { useState } from "react";
import useWeb3Store from "@/store/useWeb3Store";

export default function Step1({ onNext }: { onNext: () => void }) {
  const [info, setInfo] = useState<string[]>([]);
  const { wallet } = useWeb3Store();

  return (
    <>
      <ContentContainer>
        <Uploader
          label="Upload your front photo"
          onChange={(file) => {
            if (!file) return;
            setInfo((prev) => [
              ...prev,
              "https://near-frontend-d.vercel.app/cccd-1.png",
            ]);
          }}
        />
        <Uploader
          label="Upload your back photo"
          onChange={(file) => {
            if (!file) return;
            setInfo((prev) => [
              ...prev,
              "https://near-frontend-d.vercel.app/cccd-2.png",
            ]);
          }}
        />
        <Uploader
          label={
            <>
              Upload bill photo<span>(Bank, electric, water...)</span>
            </>
          }
          onChange={(file) => {
            if (!file) return;
            setInfo((prev) => [
              ...prev,
              "https://near-frontend-d.vercel.app/bill.png",
            ]);
          }}
        />
      </ContentContainer>
      <ButtonPrimary
        style={{ marginTop: "40px" }}
        disabled={info.length < 3}
        onClick={() => {
          try {
            axios
              .post("/api/kyc", {
                identifyId: wallet?.accountId ?? "",
                accountId: wallet?.accountId ?? "",
                kycInfo: info,
              })
              .then(() => onNext());
          } catch (error) {
            console.log(error);
          }
        }}
      >
        Send Request
      </ButtonPrimary>
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
