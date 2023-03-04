import { ButtonOutlinePrimary } from "@/components/Buttons";
import { Container } from "@/components/Container";
import { KycInfo } from "@/model/Kyc";
import useWeb3Store from "@/store/useWeb3Store";
import { colors } from "@/utils/colors";
import axios from "axios";
import { TickCircle, Warning2 } from "iconsax-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";

export default function Admin({
  operators,
}: {
  operators: string[] | undefined;
}) {
  const { wallet } = useWeb3Store();

  const { data } = useQuery(
    [wallet?.accountId],
    async () => {
      const res = await axios.get(`api/kyc`);
      return res.data.data as KycInfo[];
    },
    { enabled: !!wallet?.accountId }
  );
  if (!wallet?.accountId || !operators?.includes(wallet.accountId)) {
    return (
      <Container>
        <MainContainer>You dont have right to access this page</MainContainer>Y
      </Container>
    );
  }
  if (!data || data.length === 0) {
    return (
      <Container>
        <MainContainer>No request</MainContainer>
      </Container>
    );
  }
  return (
    <Container>
      <MainContainer>
        {data.map((item) => {
          return (
            <RequestItemContainer>
              <div>{item.accountId}</div>
              <ButtonContainer>
                {item.isApproved ? (
                  <div style={{ lineHeight: 0, color: colors.blue2 }}>
                    <TickCircle />
                  </div>
                ) : (
                  <div style={{ lineHeight: 0, color: colors.yellow }}>
                    <Warning2 />
                  </div>
                )}
                <Link href={`/admin/${item._id}`}>
                  <ButtonOutlinePrimary>Details</ButtonOutlinePrimary>
                </Link>
              </ButtonContainer>
            </RequestItemContainer>
          );
        })}
      </MainContainer>
    </Container>
  );
}

export async function getStaticProps() {
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
`;

const RequestItemContainer = styled.div`
  padding: 16px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 16px;
  justify-content: space-between;
  background-color: ${colors.gray1};
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
`;
