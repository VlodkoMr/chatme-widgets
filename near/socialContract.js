export const socialContractAddress = (network) => {
  if (network === "testnet") {
    return "v1.social08.testnet";
  }
  return "social.near";
}

export class SocialDBContract {
  constructor({ contractId, walletToUse }) {
    this.contractId = contractId;
    this.wallet = walletToUse;
  }

  /**
   * Read Data
   * @param keys
   * @returns {Promise<any>}
   */
  async get(keys) {
    try {
      return await this.wallet.viewMethod({
        contractId: this.contractId,
        method: 'get',
        args: {
          keys
        }
      });
    } catch (e) {
      console.log(`blockchain error`, e);
    }
  }

}