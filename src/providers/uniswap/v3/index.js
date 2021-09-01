import {TOKEN_1, ENDPOINTS} from "./constants";
import {fetchPoolsData, fetchPoolsDayData, fetchPoolsPastData, fetchTokenPools} from "./poolData";
import {fetchTokenData} from "./tokenData";
import type {PoolData, TokenData} from "../../../interfaces";
import {BaseAMMClient} from "../../BaseAMMClient";

export class UniswapV3Client extends BaseAMMClient {
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
}

