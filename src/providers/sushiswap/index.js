import {TOKEN_1, ENDPOINTS} from "./constants";
import {fetchPoolsData, fetchTokenPools} from "./poolData";
import {fetchTokenData} from "./tokenData";
import type {PoolData, VaultData, TokenData} from "./../../interfaces";
import {GraphQLClient} from "graphql-request";

interface MultipleVaultData {
  [address: string]: VaultData
}

interface MultipleDataRequest {
  [address: string]: [string]
}

const poolDataReducer = function (contractAddress) {

  return function (carry, poolData: PoolData): VaultData {
    if (!carry.token0) {
      carry.token0 = poolData.token0
      carry.token1 = poolData.token1
      carry.token0Price = poolData.token0Price
      carry.token1Price = poolData.token1Price
    }
    carry.totalValueLocked += carry.token1.address.toLowerCase() === contractAddress.toLowerCase()
      ? poolData.totalValueLockedToken1
      : poolData.totalValueLockedToken0
    carry.volumeUSD += poolData.volumeUSD
    carry.txCount += poolData.txCount

    return carry
  }
}

export class SushiswapClient {
  constructor(chainId: number | undefined = 1) {
    chainId = parseInt(chainId)
    this.chainId = chainId
    this.client = new GraphQLClient(ENDPOINTS[chainId]
      ? ENDPOINTS[chainId]
      : ENDPOINTS[1])
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

  async getVaultData(contractAddress: string, pools: string[] = []): VaultData | null {
    if (pools.length === 0) {
      return null
    }

    const poolsData = await fetchPoolsData(this.client, pools.map(p => p.toLowerCase()))

    if (poolsData.length === 0) {
      return null
    }

    return poolsData.reduce(poolDataReducer(contractAddress), {
      address: contractAddress,
      token0: null,
      token1: null,
      token0Price: 0,
      token1Price: 0,
      volumeUSD: 0,
      txCount: 0,
      totalValueLocked: 0,
    })
  }

  async getMultipleVaultData(request: MultipleDataRequest): MultipleVaultData | null {

    const vaultAddresses = Object.keys(request)
    const pools = vaultAddresses.flatMap(vaultAddress => request[vaultAddress]).map(p => p.toLowerCase())
    const poolsData = await fetchPoolsData(this.client, pools)

    if (poolsData.length === 0) {
      return null
    }

    return vaultAddresses.reduce((c, vaultAddress) => {
      const poolAddresses = request[vaultAddress]
      c[vaultAddress] = poolAddresses
        .map(address => poolsData.find(p => p.address === address))
        .reduce(poolDataReducer(vaultAddress))

      return c
    }, {})
  }
}
