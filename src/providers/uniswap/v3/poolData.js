import {TOKEN_0} from "./../../../constants";
import {GraphQLClient} from "graphql-request";
import {
  findPoolsByToken0Query,
  findPoolsByToken1Query,
  poolDayDatas,
  poolDayDatasQuery,
  poolsQuery,
  poolTimeTravelQuery
} from "./queries";
import type {PoolData, PoolDayData} from "../../../interfaces";
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
    return (pools || [])
      .filter(x => x)
      .map((pool: PoolFields) => mapPool(pool))
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
    feesUSD: parseFloat(pool.feesUSD),
    token0Price: parseFloat(pool.token0Price),
    token1Price: parseFloat(pool.token1Price),
    totalValueLockedUSD: parseFloat(pool.totalValueLockedUSD),
    totalValueLockedToken0: parseFloat(pool.totalValueLockedToken0),
    totalValueLockedToken1: parseFloat(pool.totalValueLockedToken1)
  }
}

const mapPoolDayData = function (poolDayData): PoolDayData {
  return {
    address: poolDayData?.pool?.id,
    date: poolDayData.date,
    tvlUSD: parseFloat(poolDayData.tvlUSD),
    txCount: parseFloat(poolDayData.txCount),
    volumeUSD: parseFloat(poolDayData.volumeUSD),
  }
}

/**
 *
 * @param client
 * @param poolsArr
 * @param orderBy
 * @param orderDirection
 * @returns {Promise<void>}
 */
export const fetchPoolsData = async (client: GraphQLClient,
                                     poolsArr: any = [],
                                     orderBy: string | undefined = 'totalValueLockedUSD',
                                     orderDirection: string | undefined = 'desc'): PoolData[] | [] => {

  try {
    const {pools} = await client.request(poolsQuery, {
      pools: poolsArr,
      orderBy,
      orderDirection
    });
    return pools.map((pool: PoolFields) => mapPool(pool))
  } catch (e) {
    console.error(e)
    return []
  }
}

/**
 *
 * @param client
 * @param poolsArr
 * @param blockNumber
 * @param orderBy
 * @param orderDirection
 * @returns {Promise<*[]|PoolData[]>}
 */
export const fetchPoolsPastData = async (client: GraphQLClient,
                                         poolsArr: string[] = [],
                                         blockNumber: number | undefined,
                                         orderBy: string | undefined = 'totalValueLockedUSD',
                                         orderDirection: string | undefined = 'desc'): PoolDayData[] => {
  try {
    const {pools} = await client.request(poolTimeTravelQuery, {
      pools: poolsArr,
      block: {
        number: blockNumber
      },
      orderBy,
      orderDirection
    });
    return pools.map((pool: PoolFields) => mapPool(pool))
  } catch (e) {
    console.error(e)
    return null
  }
}


/**
 *
 * @param client
 * @param poolsArr
 * @param startTime
 * @param skip
 * @returns {Promise<null|*>}
 */
export const fetchPoolsDayData = async (client: GraphQLClient,
                                        poolsArr: string[] = [],
                                        startTime: number,
                                        skip: number = 0,
) => {
  try {
    const {poolDayDatas} = await client.request(poolDayDatasQuery, {
      pools: poolsArr,
      startTime: startTime,
      skip: skip,
    });

    return poolDayDatas.map((poolDayData) => mapPoolDayData(poolDayData))
  } catch (e) {
    console.error(e)
    return null
  }
}
