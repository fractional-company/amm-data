import {TOKEN_1, ENDPOINTS} from "./constants";
import {fetchPoolsData, fetchPoolsDayData, fetchPoolsPastData, fetchTokenPools} from "./poolData";
import {fetchTokenData} from "./tokenData";
import type {PoolData, TokenData} from "../../../interfaces";
import {BaseAMMClient} from "../../BaseAMMClient";
import {getPastEthPrice, getEthPrice} from "./core";

export class UniswapV3Client extends BaseAMMClient {
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

  getPoolsData(pools: string[] = []): PoolData[] | [] {
    return fetchPoolsData(this.client, pools.map(p => p.toLowerCase()))
  }

  getPoolsPastData(pools: Array, blockNumber: number) {
    return fetchPoolsPastData(this.client, pools.map(p => p.toLowerCase()), blockNumber)
  }

  // @todo implement skip
  getPoolsDayDatas(pools: Array, startTime: number) {
    return fetchPoolsDayData(this.client, pools.map(p => p.toLowerCase()), startTime)
  }

  getEthPrice(blockNumber: number | undefined) {
    return blockNumber
      ? getPastEthPrice(this.client, blockNumber)
      : getEthPrice(this.client)
  }
}

