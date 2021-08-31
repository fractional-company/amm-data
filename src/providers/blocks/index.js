import {ENDPOINTS} from "./constants";
import {BaseClient} from "../BaseClient";
import {fetchOneDayBlock, fetchSevenDayBlock, fetchTwoDayBlock} from "./blocksData";

export class BlocksClient extends BaseClient {
  constructor(chainId: number | undefined = 1) {
    super(parseInt(chainId), ENDPOINTS[chainId]
      ? ENDPOINTS[chainId]
      : ENDPOINTS[1]);
  }

  async getOneDayBlock() {
    return fetchOneDayBlock(this.client)
  }

  async getTwoDayBlock() {
    return fetchTwoDayBlock(this.client);
  }

  async getSevenDayBlock() {
    return fetchSevenDayBlock(this.client)
  }
}
