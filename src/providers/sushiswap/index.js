import {TOKEN_1, ENDPOINTS} from "./constants";
import {fetchPoolsData, fetchTokenPools} from "./poolData";
import {fetchTokenData} from "./tokenData";
import type {PoolData, TokenData} from "./../../interfaces";
import {BaseClient} from "../BaseClient";

export class SushiswapClient extends BaseClient {
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

  async getVaultPools(contractAddress: string) {
    let token0Pools = await fetchTokenPools(this.client, contractAddress.toLowerCase())
    let token1Pools = await fetchTokenPools(this.client, contractAddress.toLowerCase(), TOKEN_1)

    return (token0Pools || []).concat(token1Pools || [])
  }

  fetchPoolsData(pools: string[] = []): PoolData[] | [] {
    return fetchPoolsData(this.client, pools)
  }
}
