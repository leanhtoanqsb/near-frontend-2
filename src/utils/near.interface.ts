import { Wallet } from "./wallet";

export class Contract {
  contractId: string
  wallet: Wallet
  constructor({contractId, wallet}: {contractId: string, wallet: Wallet}) {
    this.contractId = contractId
    this.wallet = wallet
  }

    async get_my_kyc() {
    return await this.wallet.viewMethod({
      contractId: this.wallet.contractAddress,
      method: "get_my_kyc",
    })}

    async check_kyc() {
    return await this.wallet.viewMethod({
      contractId: this.wallet.contractAddress,
      method: "check_kyc",
    })};
    async get_fee() {
    return await this.wallet.viewMethod({
      contractId: this.wallet.contractAddress,
      method: "get_fee",
    })};
}