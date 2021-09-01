import {TOKEN_1, ENDPOINTS} from "./constants";
import {fetchPoolsData, fetchPoolsDayData, fetchTokenPools} from "./poolData";
import {fetchPastTokenData, fetchTokenData} from "./tokenData";
import type {PoolData, TokenData} from "./../../interfaces";
import {BaseAMMClient} from "../BaseAMMClient";
import {fetchPoolsPastData} from "./poolData";

export class SushiswapClient extends BaseAMMClient {
  constructor(chainId: number | undefined = 1) {
    super(parseInt(chainId), ENDPOINTS[chainId]
      ? ENDPOINTS[chainId]
      : ENDPOINTS[1]);
  }

  isChainSupported() {
    return !!ENDPOINTS[this.chainId]
  }

  getTokenData(contractAddress: string): TokenData {
    return fetchTokenData(this.client, contractAddress.toLowerCase())
  }

  async getTokenPools(contractAddress: string) {
    let token0Pools = await fetchTokenPools(this.client, contractAddress.toLowerCase())
    let token1Pools = await fetchTokenPools(this.client, contractAddress.toLowerCase(), TOKEN_1)

    return (token0Pools || []).concat(token1Pools || [])
  }

  async getPastTokenData(contractAddress: string, blockNumber: number) {
    return fetchPastTokenData(this.client, contractAddress.toLowerCase(), blockNumber)
  }

  getPoolsData(pools: string[] = []): PoolData[] | [] {
    return fetchPoolsData(this.client, pools)
  }

  async getPoolsPastData(pools: Array, blockNumber: number) {
    return fetchPoolsPastData(this.client, pools.map(p => p.toLowerCase()), blockNumber)
  }

  async getPoolsDayDatas(pools: Array, startTime: number) {
    return fetchPoolsDayData(this.client, pools.map(p => p.toLowerCase()), startTime)
  }
}
