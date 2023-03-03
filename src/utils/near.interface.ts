import { Wallet } from "./wallet";

const CONTRACT_FEE = '250000000000000000000000'

export class Contract {
  contractId: string
  wallet: Wallet
  constructor({contractId, wallet}: {contractId: string, wallet: Wallet}) {
    this.contractId = contractId
    this.wallet = wallet
  }

    // admin action
    async set_operator(args: {address: string; value: boolean}) {
      return await this.wallet.callMethod({
        contractId: this.wallet.contractAddress,
        method: "set_operator",
        args
      })
    }

    async approved_kyc(args: {address: string, identifyId: string}) {
      return await this.wallet.callMethod({
        contractId: this.wallet.contractAddress,
        method: 'approved_kyc',
        args
      })
    }

    // user action
    async add_wallet_to_kyc(address: string) {
    return await this.wallet.callMethod({
      contractId: this.wallet.contractAddress,
      method: "add_wallet_to_kyc",
      args: {address},
      deposit: CONTRACT_FEE
    })};


    async get_my_kyc() {
    return await this.wallet.callMethod({
      contractId: this.wallet.contractAddress,
      method: "get_my_kyc",
      deposit: '1'
    })}

    async check_kyc(address: string) {
    return await this.wallet.viewMethod({
      contractId: this.wallet.contractAddress,
      method: "check_kyc",
      args: {address}
    })};
}