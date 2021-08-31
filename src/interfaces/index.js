export interface PoolAnalytics {
  address: string,
  token0: TokenData,
  token1: TokenData,
  token0Price: number,
  token1Price: number,
  volumeUSD: number,
  txCount: number,
  totalValueLockedToken0: number,
  totalValueLockedToken1: number,
  weight: number,
}

export interface TokenData {
  address: string,
  derivedETH: number,
  name: string,
  symbol: string,
  totalSupply: number,
  totalValueLocked: number,
  txCount: number,
  untrackedVolumeUSD: number,
  volume: number,
  volumeUSD: number,
}

export interface PoolData {
  address: string,
  token0: TokenData,
  token1: TokenData,
  token0Price: number,
  token1Price: number,
  volumeUSD: number,
  feesUSD: number,
  txCount: number,
  totalValueLockedToken0: number,
  totalValueLockedToken1: number,
}


export interface PoolDayData {
  date: string,
  address: string,
  volumeUSD: number,
  tvlUSD: number,
  txCount: number,
}

export interface BulkPoolsAnalytics {
  [address: string]: PoolAnalytics[]
}

export interface BulkAnalyticsRequest {
  [address: string]: [string]
}
