

export interface VaultData {
  address: string,
  token0: Token,
  token1: Token,
  token0Price: number,
  token1Price: number,
  volumeUSD: number,
  txCount: number,
  totalValueLockedUSD: number,
}
