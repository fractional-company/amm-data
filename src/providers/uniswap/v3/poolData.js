import {TOKEN_0} from "./../../../constants";
import {GraphQLClient} from "graphql-request";
import {findPoolsByToken0Query, findPoolsByToken1Query, poolsQuery} from "./queries";
import type {PoolData} from "../../../interfaces";
import {mapToken} from "./tokenData";

export type Token = {
  id: string,
  symbol: string,
  name: string,
  derivedETH: string,
  totalSupply: string,
  volume: string,
  txCount: string,
  totalValueLocked: string,
}

interface PoolFields {
  id: string,
  feeTier: string,
  liquidity: string,
  sqrtPrice: string,
  tick: string,
  token0: Token,
  token1: Token,
  token0Price: string,
  token1Price: string,
  volumeUSD: string,
  txCount: string,
  totalValueLockedToken0: string,
  totalValueLockedToken1: string,
  totalValueLockedUSD: string,
}

/**
 * Fetch token pools
 * @param client
 * @param tokenAddress
 * @param tokenSide
 * @returns {Promise<null|*>}
 */
export const fetchTokenPools = async (client: GraphQLClient,
                                      tokenAddress: string,
                                      tokenSide: string | undefined = TOKEN_0): PoolData[] | [] => {
  try {
    const {pools} = await client.request(tokenSide === TOKEN_0 ? findPoolsByToken0Query : findPoolsByToken1Query,
      {tokenAddress});
    return (pools || []).map((pool: PoolFields) => mapPool(pool))
  } catch (e) {
    console.error(e)
    return null
  }
}

const mapPool = function (pool): PoolData {
  return {
    address: pool.id,
    token0: {
      ...mapToken(pool.token0),
    },
    token1: {
      ...mapToken(pool.token1),
    },
    txCount: parseFloat(pool.txCount),
    volumeUSD: parseFloat(pool.volumeUSD),
    token0Price: parseFloat(pool.token0Price),
    token1Price: parseFloat(pool.token1Price),
    totalValueLockedToken0: parseFloat(pool.totalValueLockedToken0),
    totalValueLockedToken1: parseFloat(pool.totalValueLockedToken1)
  }
}

/**
 *
 * @param client
 * @param poolArr
 * @param orderBy
 * @param orderDirection
 * @returns {Promise<void>}
 */
export const fetchPoolsData = async (client: GraphQLClient,
                                     poolArr: any = [],
                                     orderBy: string | undefined = 'totalValueLockedUSD',
                                     orderDirection: string | undefined = 'desc'): PoolData[] | [] => {

  try {
    const {pools} = await client.request(poolsQuery, {
      pools: poolArr,
      orderBy,
      orderDirection
    });
    return pools.map((pool: PoolFields) => mapPool(pool))
  } catch (e) {
    console.error(e)
    return []
  }
}
