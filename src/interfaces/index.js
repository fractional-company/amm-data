

export interface VaultData {
  address: string,
  token0: TokenData,
  token1: TokenData,
  token0Price: number,
  token1Price: number,
  volumeUSD: number,
  txCount: number,
  totalValueLocked: number,
}

export interface TokenData {
  address: string,
  symbol: string,
  name: string,
  derivedETH: number,
  volume: number,
  txCount: number,
  totalValueLocked: number,
}

export interface PoolData {
  address: string,
  token0: TokenData,
  token1: TokenData,
  token0Price: number,
  token1Price: number,
  volumeUSD: number,
  txCount: number,
  totalValueLockedToken0: number,
  totalValueLockedToken1: number,
}

interface MultipleVaultData {
  [address: string]: VaultData
}
