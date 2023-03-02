import { CONTRACT_ADDRESS, Wallet } from "@/utils/wallet";
import { create } from "zustand";

interface Store {
  wallet: Wallet | undefined;
  isSignedIn: boolean;
  contractAddress: string;
  setWallet: (wallet: any) => void;
  setIsSignedIn: (isSignedIn: boolean) => void;
}

const useWeb3Store = create<Store>()((set) => ({
  wallet: undefined,
  isSignedIn: false,
  contractAddress: CONTRACT_ADDRESS,
  setWallet: (wallet: any) =>
    set({
      wallet,
    }),
  setIsSignedIn: (isSignedIn: boolean) =>
    set({
      isSignedIn,
    }),
}));

export default useWeb3Store;
