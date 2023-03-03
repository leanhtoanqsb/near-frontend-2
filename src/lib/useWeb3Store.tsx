import { Contract } from "@/utils/near.interface";
import { CONTRACT_ADDRESS, Wallet } from "@/utils/wallet";
import { create } from "zustand";

interface Store {
  wallet: Wallet | null;
  isSignedIn: boolean;
  contractAddress: string;
  contract: Contract | null;
  setWallet: (wallet: any) => void;
  setIsSignedIn: (isSignedIn: boolean) => void;
  setContract: (contract: Contract) => void;
}

const useWeb3Store = create<Store>()((set) => ({
  wallet: null,
  isSignedIn: false,
  contractAddress: CONTRACT_ADDRESS,
  contract: null,
  setWallet: (wallet: any) =>
    set({
      wallet,
    }),
  setIsSignedIn: (isSignedIn: boolean) =>
    set({
      isSignedIn,
    }),
  setContract: (contract: Contract) =>
    set({
      contract,
    }),
}));

export default useWeb3Store;
