import {TOKEN_1, ENDPOINTS} from "./constants";
import {fetchPoolsData, fetchPoolsDayData, fetchTokenPools} from "./poolData";
import {fetchPastTokenData, fetchTokenData} from "./tokenData";
import type {PoolData, TokenData} from "./../../interfaces";
import {BaseAMMClient} from "../BaseAMMClient";
import {fetchPoolsPastData} from "./poolData";
import {getEthPrice, getPastEthPrice} from "./core";

export class SushiswapClient extends BaseAMMClient {
  constructor(chainId: number | undefined = 1) {
    super(parseInt(chainId), ENDPOINTS[chainId]
      ? ENDPOINTS[chainId]
      : ENDPOINTS[1]);
  }

  isChainSupported() {
    return !!ENDPOINTS[this.chainId]
  }

  getTokenData(contractAddress: string, blockNumber: number | undefined): TokenData {
    return fetchTokenData(this.client, contractAddress.toLowerCase(), blockNumber)
  }

  async getTokenPools(contractAddress: string) {
    let token0Pools = await fetchTokenPools(this.client, contractAddress.toLowerCase())
    let token1Pools = await fetchTokenPools(this.client, contractAddress.toLowerCase(), TOKEN_1)

    return (token0Pools || []).concat(token1Pools || [])
  }

  getEthPrice(blockNumber: number | undefined) {
    return blockNumber
      ? getPastEthPrice(this.client, blockNumber)
      : getEthPrice(this.client)
  }

  getPastTokenData(contractAddress: string, blockNumber: number) {
    return fetchPastTokenData(this.client, contractAddress.toLowerCase(), blockNumber)
  }

  getPoolsData(pools: string[] = []): PoolData[] | [] {
    return fetchPoolsData(this.client, pools)
  }

  getPoolsPastData(pools: Array, blockNumber: number) {
    return fetchPoolsPastData(this.client, pools.map(p => p.toLowerCase()), blockNumber)
  }

  getPoolsDayDatas(pools: Array, startTime: number) {
    return fetchPoolsDayData(this.client, pools.map(p => p.toLowerCase()), startTime)
  }
}
