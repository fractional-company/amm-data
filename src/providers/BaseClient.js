import type {BulkAnalyticsRequest, BulkPoolsAnalytics, PoolAnalytics, PoolData} from "../interfaces";
import {GraphQLClient} from "graphql-request";

export class BaseClient {
  constructor(chainId: number | undefined = 1, endpoint: string) {
    chainId = parseInt(chainId)
    this.chainId = chainId
    this.client = new GraphQLClient(endpoint)
  }

  async fetchPoolsData() {
    return []
  }

  async getPoolsAnalytics(contractAddress: string, pools: string[] = []): PoolAnalytics[] | null {
    if (pools.length === 0) {
      return null
    }

    const poolsData = await this.fetchPoolsData(pools.map(p => p.toLowerCase()))

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

  async getBulkPoolsAnalytics(request: BulkAnalyticsRequest): BulkPoolsAnalytics | null {
    const vaultAddresses = Object.keys(request)
    const pools = vaultAddresses.flatMap(vaultAddress => request[vaultAddress]).map(p => p.toLowerCase())
    const poolsData: PoolData[] | [] = await this.fetchPoolsData(pools)

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
