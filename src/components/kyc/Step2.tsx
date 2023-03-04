import { KycInfo } from "@/model/Kyc";
import useWeb3Store from "@/store/useWeb3Store";
import axios from "axios";
import { useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import styled from "styled-components";
import { ButtonPrimary } from "../../components/Buttons";
import Uploader from "../../components/Uploader";
import { colors } from "../../utils/colors";

export default function Step2({ onNext }: { onNext: () => void }) {
  const { wallet } = useWeb3Store();
  const [info, setInfo] = useState<string[]>([]);

  const { data } = useQuery(
    [wallet?.accountId],
    async () => {
      const res = await axios.get(`api/kyc`, {
        params: { accountId: wallet?.accountId },
      });
      return res?.data?.data?.[0] as KycInfo;
    },
    { enabled: !!wallet?.accountId }
  );

  console.log(data);
  return (
    <>
      {(data?.proof?.length ?? 0) > 0 ? (
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
              onChange={(file) => {
                if (!file) return;
                setInfo((prev) => [
                  ...prev,
                  "https://api.mintty.com/_upload_service/nft-image/71ad39cb-257c-407b-a2db-32c87668b2c6-1654611209207",
                ]);
              }}
            />
            <Uploader
              label="Upload picture 2"
              onChange={(file) => {
                if (!file) return;
                setInfo((prev) => [
                  ...prev,
                  "https://api.mintty.com/_upload_service/nft-image/71ad39cb-257c-407b-a2db-32c87668b2c6-1654611209207",
                ]);
              }}
            />
            <Uploader
              label="Upload picture 3"
              onChange={(file) => {
                if (!file) return;
                setInfo((prev) => [
                  ...prev,
                  "https://api.mintty.com/_upload_service/nft-image/71ad39cb-257c-407b-a2db-32c87668b2c6-1654611209207",
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
                  .put(`/api/kyc/${data?._id ?? ""}`, {
                    hasProof: true,
                    proof: info,
                  })
                  .then(() => onNext());
              } catch (error) {
                console.log(error);
              }
            }}
          >
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
