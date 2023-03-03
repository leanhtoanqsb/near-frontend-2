import { useEffect } from "react";
import styled from "styled-components";
import { ButtonOutlinePrimary, ButtonPrimary } from "./Buttons";
import { CONTRACT_ADDRESS, Wallet } from "@/utils/wallet";
import useWeb3Store from "@/lib/useWeb3Store";
import { Contract } from "@/utils/near.interface";
import Link from "next/link";

// burden icon buyer immense there ride pen gold among dumb dash staff

export default function Navbar() {
  const {
    isSignedIn,
    setWallet,
    setIsSignedIn,
    wallet,
    setContract,
    contract,
  } = useWeb3Store();
  useEffect(() => {
    async function main() {
      try {
        const wallet = await new Wallet({
          createAccessKeyFor: CONTRACT_ADDRESS,
        });
        const isSignedIn = await wallet.startUp();
        const contract = new Contract({
          contractId: wallet.contractAddress,
          wallet,
        });
        setWallet(wallet);
        setIsSignedIn(isSignedIn);
        setContract(contract);
      } catch (error) {
        console.log(error);
      }
    }
    main();
  }, []);
  return (
    <NavbarContainer>
      <Link href="/">
        <p>Logo</p>
      </Link>

      {isSignedIn ? (
        <div style={{ display: "flex", gap: "16px" }}>
          <Link href="/kyc">
            <ButtonOutlinePrimary>KYC</ButtonOutlinePrimary>
          </Link>
          <ButtonPrimary onClick={() => wallet?.signOut()}>
            {wallet?.accountId}
          </ButtonPrimary>
        </div>
      ) : (
        <ButtonPrimary onClick={() => wallet?.signIn()}>
          Connect Wallet
        </ButtonPrimary>
      )}
    </NavbarContainer>
  );
}

const NavbarContainer = styled.div`
  padding: 40px 16px 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
