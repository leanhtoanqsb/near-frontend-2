import { useEffect } from "react";
import styled from "styled-components";
import { ButtonPrimary } from "./Buttons";
import { CONTRACT_ADDRESS, Wallet } from "@/utils/wallet";
import useWeb3Store from "@/lib/useWeb3Store";

// burden icon buyer immense there ride pen gold among dumb dash staff

export default function Navbar() {
  const { isSignedIn, setWallet, setIsSignedIn, wallet } = useWeb3Store();
  useEffect(() => {
    async function main() {
      const wallet = await new Wallet({ createAccessKeyFor: CONTRACT_ADDRESS });
      const isSignedIn = await wallet.startUp();
      setWallet(wallet);
      setIsSignedIn(isSignedIn);
    }
    main();
  }, []);
  return (
    <NavbarContainer>
      <p>Logo</p>

      {isSignedIn ? (
        <ButtonPrimary onClick={() => wallet?.signOut()}>
          {wallet?.accountId}
        </ButtonPrimary>
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
