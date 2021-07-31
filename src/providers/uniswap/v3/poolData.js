import {TOKEN_0} from "./../../../constants";
import {GraphQLClient} from "graphql-request";
import {formatTokenName, formatTokenSymbol} from "./../../../../dist/utils/tokens";

type Token = {
    id: string,
    symbol: string,
    name: string,
    decimals: string,
    derivedETH: string,
  }

interface PoolSearchFields {
  id: string,
  token0: Token,
  token1: Token
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


export interface PoolData {
  id: string,
  feeTier: string,
  liquidity: number,
  sqrtPrice: number,
  tick: string,
  token0: Token,
  token1: Token,
  token0Price: number,
  token1Price: number,
  volumeUSD: number,
  txCount: number,
  totalValueLockedToken0: number,
  totalValueLockedToken1: number,
  totalValueLockedUSD: number,
}

const CHART_POOL_DAY = (poolAddress, startTime, skip = 0, orderBy = 'date', orderDirection = 'orderDirection') => {
  return `{
    poolDayDatas(
        first: 1000
        skip: ${skip}
        where: {pool: "${poolAddress}", date_gt: ${startTime}}
        orderBy: ${orderBy}
        orderDirection: ${orderDirection}
      ) {
        date
        volumeUSD
        tvlUSD
        __typename
      }
    }`
}

const POOLS_SEARCH_QUERY = (tokenAddress: string,
                            tokenSide: string,
                            orderBy: string | undefined = 'totalValueLockedUSD',
                            orderDirection: string | undefined = 'desc') => {
  return `{
      pools(where: {${tokenSide}: "${tokenAddress}"},` +
    ` orderBy: ${orderBy}, orderDirection: ${orderDirection}) {
        id
        token0 {
          id
          symbol
          name
          decimals
          derivedETH
        }
        token1 {
          id
          symbol
          name
          decimals
          derivedETH
        }
      }
    }`
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
                                      tokenSide: string | undefined = TOKEN_0): PoolSearchFields | null => {
  const query = POOLS_SEARCH_QUERY(tokenAddress, tokenSide)
  try {
    const {pools} = await client.request(query);
    if (pools.length === 0) {
      return null
    }
    return pools[0]
  } catch (e) {
    console.error(e)
    return null
  }
}


const POOLS_QUERY = (
  pools: string[] = [],
  orderBy: string | undefined = 'totalValueLockedUSD',
  orderDirection: string | undefined = 'desc') => {

  let poolString = `[`
  pools.map((address) => {
    return (poolString += `"${address}",`)
  })
  poolString += ']'
  return `{
      pools(where: {id_in: ${poolString}},` +
    ` orderBy: ${orderBy}, orderDirection: ${orderDirection}) {
        id
        feeTier
        liquidity
        sqrtPrice
        tick
        token0 {
          id
          symbol
          name
          decimals
          derivedETH
        }
        token1 {
          id
          symbol
          name
          decimals
          derivedETH
        }
        token0Price
        token1Price
        volumeUSD
        txCount
        totalValueLockedToken0
        totalValueLockedToken1
        totalValueLockedUSD
      }
    }`
}

const mapPool = function (pool): PoolData {
  return {
    address: pool.id,
    feeTier:  pool.feeTier,
    liquidity: parseFloat(pool.liquidity),
    sqrtPrice: parseFloat(pool.sqrtPrice),
    tick: parseFloat(pool.tick),
    token0: {
      address: pool.token0.id,
      name: formatTokenName(pool.token0.id, pool.token0.name),
      symbol: formatTokenSymbol(pool.token0.id, pool.token0.symbol),
      decimals: parseInt(pool.token0.decimals),
      derivedETH: parseFloat(pool.token0.derivedETH),
    },
    token1: {
      address: pool.token1.id,
      name: formatTokenName(pool.token1.id, pool.token1.name),
      symbol: formatTokenSymbol(pool.token1.id, pool.token1.symbol),
      decimals: parseInt(pool.token1.decimals),
      derivedETH: parseFloat(pool.token1.derivedETH),
    },
    token0Price: parseFloat(pool.token0Price),
    token1Price: parseFloat(pool.token1Price),
    volumeUSD: parseFloat(pool.volumeUSD),
    txCount: parseFloat(pool.txCount),
    totalValueLockedToken0: parseFloat(pool.totalValueLockedToken0),
    totalValueLockedToken1: parseFloat(pool.totalValueLockedToken1),
    totalValueLockedUSD: parseFloat(pool.totalValueLockedUSD),
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
                                     orderBy: string | undefined = 'totalValueLockedUSD',
                                     orderDirection: string | undefined = 'desc'): PoolData[] | [] => {

  const query = POOLS_QUERY(
    pools,
    orderBy,
    orderDirection)

  try {
    const {pools} = await client.request(query);
    return pools.map((pool: PoolFields) => mapPool(pool))
  } catch (e) {
    console.error(e)
    return []
  }
}
