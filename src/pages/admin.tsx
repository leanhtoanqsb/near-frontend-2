import useWeb3Store from "@/store/useWeb3Store";
import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

export default function Admin({
  operators,
}: {
  operators: string[] | undefined;
}) {
  const { wallet } = useWeb3Store();

  const { data } = useQuery(
    [wallet?.accountId],
    async () => {
      const res = await axios.get(`api/kyc`, {
        params: { accountId: wallet?.accountId },
      });
      return res.data;
    },
    { enabled: !!wallet?.accountId }
  );
  console.log(data);
  if (!wallet?.accountId || !operators?.includes(wallet.accountId)) {
    return <div>You dont have right to access this page</div>;
  }
  return <div></div>;
}

export async function getStaticProps() {
  return {
    props: {
      operators: [
        process.env.OPERATOR_1 ?? null,
        process.env.OPERATOR_2 ?? null,
        process.env.OPERATOR_3 ?? null,
      ],
    },
  };
}
