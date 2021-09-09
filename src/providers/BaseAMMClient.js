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

  async getPoolsPastData(pools: Array = [], blockNumber: number) {
    return []
  }

  async getTokenPoolsData(contractAddress: string, pools: string[] = [], blockNumber = null): PoolAnalytics[] | null {
    pools = pools.length === 0
      ? await this.getTokenPools(contractAddress)
      : pools

    if (pools.length === 0) {
      return []
    }

    pools = pools.map(p => p.toLowerCase())
    const poolsData = blockNumber !== null
      ? await this.getPoolsPastData(pools, blockNumber)
      : await this.getPoolsData(pools)

    if (poolsData.length === 0) {
      return []
    }

    return poolsData.map(pool => {
      pool.weight = pool.token1.address.toLowerCase() === contractAddress.toLowerCase()
        ? pool.totalValueLockedToken1
        : pool.totalValueLockedToken0
      return pool
    })
  }

  /**
   *
   * @param request
   * @param blockNumber
   * @returns {Promise<{}|null>}
   */
  async getBulkPoolsData(request: BulkAnalyticsRequest, blockNumber = null): BulkPoolsAnalytics | null {
    const vaultAddresses = Object.keys(request)
    const pools = vaultAddresses.flatMap(vaultAddress => request[vaultAddress]).map(p => p.toLowerCase())
    const poolsData: PoolData[] | [] = blockNumber !== null
      ? await this.getPoolsPastData(pools, blockNumber)
      : await this.getPoolsData(pools)

    if (poolsData.length === 0) {
      return []
    }

    return vaultAddresses.reduce((carry, vaultAddress) => {
      const poolAddresses = request[vaultAddress]
      carry[vaultAddress] = poolAddresses
        .map(address => poolsData.find(p => p.address === address))
        .filter(x => x)
        .map(pool => {
          pool.weight = pool.token1.address.toLowerCase() === vaultAddress.toLowerCase()
            ? pool.totalValueLockedToken1
            : pool.totalValueLockedToken0
          return pool
        })

      return carry
    }, {})
  }

  /**
   *
   * @param request
   * @param timestamp
   * @returns {Promise<{}>}
   */
  async getBulkPoolsDayDatas(request: BulkAnalyticsRequest, timestamp) {
    const vaultAddresses = Object.keys(request)
    const pools = vaultAddresses.flatMap(vaultAddress => request[vaultAddress]).map(p => p.toLowerCase())
    const data = await this.getPoolsDayDatas(pools, timestamp)
    if (data.length === 0) {
      return {}
    }
    return vaultAddresses.reduce((carry, vaultAddress) => {
      const poolAddresses = request[vaultAddress]
      carry[vaultAddress] = poolAddresses
        .map(address => data.filter(p => p.address === address))
        .filter(x => x)

      return carry
    }, {})
  }
}


