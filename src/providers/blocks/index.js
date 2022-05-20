import {ENDPOINTS} from "./constants";
import {BaseClient} from "../BaseClient";
import {
  fetchBlockByTimestamp,
  fetchBlockTimestamps,
  fetchOneDayBlock,
  fetchSevenDayBlock,
  fetchTwoDayBlock
} from "./blocksData";

export class BlocksClient extends BaseClient {
  constructor(chainId: number | undefined = 1) {
    super(parseInt(chainId), ENDPOINTS[chainId]
      ? ENDPOINTS[chainId]
      : ENDPOINTS[1]);
  }

  async getNearestBlockByTimestamp(timestamp) {
    return fetchBlockByTimestamp(this.client, timestamp)
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

  async getBlockTimestamps(timestamps) {
    return fetchBlockTimestamps(this.client, timestamps)
  }
}
