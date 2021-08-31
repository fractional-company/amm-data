import type {BulkAnalyticsRequest, BulkPoolsAnalytics, PoolAnalytics, PoolData} from "../interfaces";
import {BaseClient} from "./BaseClient";

export class BaseAMMClient extends BaseClient {
  constructor(chainId: number | undefined = 1, endpoint: string) {
    super(chainId, endpoint)
  }

  async getTokenPools(contractAddress: string) {
    return []
  }

  async getPoolsData() {
    return []
  }

  async getTokenPoolsWithWeight(contractAddress: string, pools: string[] = []): PoolAnalytics[] | null {
    pools = pools.length === 0
      ? await this.getTokenPools(contractAddress)
      : pools

    if (pools.length === 0) {
      return []
    }

    const poolsData = await this.getPoolsData(pools.map(p => p.toLowerCase()))

    if (poolsData.length === 0) {
      return null
    }

    return poolsData.map(pool => {
      pool.weight = pool.token1.address.toLowerCase() === contractAddress.toLowerCase()
        ? pool.totalValueLockedToken1
        : pool.totalValueLockedToken0
      return pool
    })
  }

  /**
   * fractional specific fnc
   * @param request
   * @returns {Promise<{}|null>}
   */
  async getTokensPoolsWithWeight(request: BulkAnalyticsRequest): BulkPoolsAnalytics | null {
    const vaultAddresses = Object.keys(request)
    const pools = vaultAddresses.flatMap(vaultAddress => request[vaultAddress]).map(p => p.toLowerCase())
    const poolsData: PoolData[] | [] = await this.getPoolsData(pools)

    if (poolsData.length === 0) {
      return null
    }

    return vaultAddresses.reduce((carry, vaultAddress) => {
      const poolAddresses = request[vaultAddress]
      carry[vaultAddress] = poolAddresses
        .map(address => poolsData.find(p => p.address === address))
        .map(pool => {
          pool.weight = pool.token1.address.toLowerCase() === vaultAddress.toLowerCase()
            ? pool.totalValueLockedToken1
            : pool.totalValueLockedToken0
          return pool
        })

      return carry
    }, {})
  }
}
