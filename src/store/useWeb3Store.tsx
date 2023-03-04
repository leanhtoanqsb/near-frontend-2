import { Contract } from "@/utils/near.interface";
import { CONTRACT_ADDRESS, Wallet } from "@/utils/wallet";
import { create } from "zustand";

interface Store {
  wallet: Wallet | null;
  isSignedIn: boolean;
  contractAddress: string;
  contract: Contract | null;
  kycWallets: string[];
  setWallet: (wallet: any) => void;
  setIsSignedIn: (isSignedIn: boolean) => void;
  setContract: (contract: Contract) => void;
  setKycWallets: (wallet: string | string[]) => void;
}

const useWeb3Store = create<Store>()((set) => ({
  wallet: null,
  isSignedIn: false,
  contractAddress: CONTRACT_ADDRESS,
  contract: null,
  kycWallets: [],
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
  setKycWallets: (wallet: string | string[]) =>
    set((state) => {
      if (typeof wallet === "string") {
        return {
          kycWallets: [...state.kycWallets, wallet],
        };
      }
      return {
        kycWallets: wallet,
      };
    }),
}));

export default useWeb3Store;
