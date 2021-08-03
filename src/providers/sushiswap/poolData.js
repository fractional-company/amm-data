import {GraphQLClient} from "graphql-request";
import {pairsQuery, poolsByToken0Query, poolsByToken1Query} from "./queries";
import {TOKEN_0} from "../../constants";
import type {PoolData} from "../../interfaces";
import {mapToken} from "./tokenData";

export type Token = {
  id: string,
  symbol: string,
  name: string,
  derivedETH: string,
  volume: string,
  txCount: string,
  liquidity: string,
  totalSupply: string,
}

const mapPool = function (pool): PoolData {
  return {
    address: pool.id,
    token0: {
      ...mapToken(pool.token0)
    },
    token1: {
      ...mapToken(pool.token1)
    },
    txCount: parseFloat(pool.txCount),
    volumeUSD: parseFloat(pool.volumeUSD),
    token0Price: parseFloat(pool.token0Price),
    token1Price: parseFloat(pool.token1Price),
    totalValueLockedToken0: parseFloat(pool.reserve0),
    totalValueLockedToken1: parseFloat(pool.reserve1),
  }
}

/**
 *
 * @param client
 * @param pools
 * @param orderBy
 * @param orderDirection
 * @returns {Promise<void>}
 */
export const fetchPoolsData = async (client: GraphQLClient,
                                     pools: any = [],
                                     orderBy: string | undefined = 'txCount',
                                     orderDirection: string | undefined = 'desc'): PoolData[] | [] => {

  try {
    const {pairs} = await client.request(pairsQuery, {
      pairs: pools,
      orderBy,
      orderDirection
    });

    return (pairs || []).map((pool) => mapPool(pool))
  } catch (e) {
    console.error(e)
    return []
  }
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
    const {pairs} = await client.request(tokenSide === TOKEN_0 ? poolsByToken0Query : poolsByToken1Query,
      {tokenAddress});
    return (pairs || []).map((pool) => mapPool(pool))
  } catch (e) {
    console.error(e)
    return null
  }
}