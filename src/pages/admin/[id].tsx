import { ButtonPrimary } from "@/components/Buttons";
import { Container } from "@/components/Container";
import { KycInfo } from "@/model/Kyc";
import useWeb3Store from "@/store/useWeb3Store";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import styled from "styled-components";

export default function Request({ operators }: { operators: string[] }) {
  const router = useRouter();
  const { id } = router.query;

  const { wallet, contract } = useWeb3Store();

  const { data, refetch } = useQuery(
    [wallet?.accountId],
    async () => {
      const res = await axios.get(`/api/kyc/${id}`);
      return res.data.data as KycInfo;
    },
    { enabled: !!wallet?.accountId }
  );
  const { mutate } = useMutation(async () => {
    const res = await axios.put(`/api/kyc/${id}`, { isApproved: true });
    refetch();
  });

  const approveKyc = async () => {
    try {
      contract?.approved_kyc({
        address: data?.accountId ?? "",
        identifyId: data?.identifyId ?? "",
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (!wallet) return;
    async function getResult() {
      // Check if there is a transaction hash in the URL
      const urlParams = new URLSearchParams(window.location.search);
      const txhash = urlParams.get("transactionHashes");

      if (txhash !== null) {
        // Get result from the transaction
        const result = await wallet?.getTransactionResult(txhash);
        mutate();
        console.log(result);
      }
    }
    getResult();
  }, [wallet]);

  if (!wallet?.accountId || !operators?.includes(wallet.accountId)) {
    return (
      <Container>
        <MainContainer>You dont have right to access this page</MainContainer>
      </Container>
    );
  }
  // if (!data || data.length === 0) {
  if (!data) {
    return (
      <Container>
        <MainContainer>No Data</MainContainer>
      </Container>
    );
  }
  return (
    <Container>
      <MainContainer>
        <div className="area">
          <p>
            Requester:{" "}
            <span style={{ fontWeight: 600 }}>{data?.accountId}</span>
          </p>
        </div>

        {data?.kycInfo?.length > 0 && (
          <div className="area">
            <p>KYC Info</p>
            <ImagesContainer>
              {data.kycInfo.map((imageUrl) => {
                return (
                  <ImageContainer>
                    <img
                      src={imageUrl}
                      alt="preview-image"
                      width="100%"
                      style={{
                        objectFit: "contain",
                        objectPosition: "center",
                      }}
                    />
                  </ImageContainer>
                );
              })}
            </ImagesContainer>
          </div>
        )}
        {data?.proof?.length > 0 && (
          <div className="area">
            <p>Proof</p>
            <ImagesContainer>
              {data.proof.map((imageUrl) => {
                return (
                  <ImageContainer>
                    <img
                      src={imageUrl}
                      alt="preview-image"
                      width="100%"
                      style={{
                        objectFit: "contain",
                        objectPosition: "center",
                      }}
                    />
                  </ImageContainer>
                );
              })}
            </ImagesContainer>
          </div>
        )}

        {data.isApproved ? (
          <ButtonPrimary disabled style={{ marginTop: "32px" }}>
            Approved
          </ButtonPrimary>
        ) : (
          <ButtonPrimary
            style={{ marginTop: "32px" }}
            onClick={() => {
              approveKyc();
            }}
          >
            Approve
          </ButtonPrimary>
        )}
      </MainContainer>
    </Container>
  );
}
export async function getServerSideProps() {
  return {
    props: {
      operators: [
        process.env.OPERATOR_1 ?? null,
        process.env.OPERATOR_2 ?? null,
        process.env.OPERATOR_3 ?? null,
        process.env.OPERATOR_4 ?? null,
        process.env.OPERATOR_5 ?? null,
        process.env.OPERATOR_6 ?? null,
      ],
    },
  };
}

const MainContainer = styled.div`
  padding-top: 64px;
  p {
    font-size: 24px;
    line-height: 24px;
    margin-bottom: 16px;
  }
  .area {
    margin-bottom: 32px;
  }
`;
const ImagesContainer = styled.div`
  display: grid;
  gap: 40px;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  grid-auto-rows: 280px;
`;
const ImageContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 12px;
`;
