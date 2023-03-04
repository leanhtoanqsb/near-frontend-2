import { Contract } from "@/utils/near.interface";
import { CONTRACT_ADDRESS, Wallet } from "@/utils/wallet";
import { create } from "zustand";

interface Store {
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

const useKycStore = create<Store>()((set) => ({
  currentStep: 1,
  setCurrentStep: (step: number) =>
    set({
      currentStep: step,
    }),
}));

export default useKycStore;
