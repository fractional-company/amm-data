import {formatTokenName, formatTokenSymbol} from "./../../../utils/tokens";
import {GraphQLClient} from "graphql-request";
import type {TokenData} from "../../../interfaces";
import {tokenPastQuery, tokenQuery, tokensQuery} from "./queries";

interface TokenFields {
  id: string,
  symbol: string,
  decimals: string,
  name: string,
  derivedETH: string,
  volume: string,
  volumeUSD: string,
  feesUSD: string,
  txCount: string,
  untrackedVolumeUSD: string,
  totalValueLocked: string,
  totalValueLockedUSD: string,
}


export const mapToken = function (token: TokenFields): TokenData {
  return {
    address: token.id,
    derivedETH: parseFloat(token.derivedETH),
    feesUSD: parseFloat(token.feesUSD),
    name: formatTokenName(token.id, token.name),  // 'Art Blocks Curated Full Set',
    symbol: formatTokenSymbol(token.id, token.symbol),  // 'ABC123',
    txCount: parseFloat(token.txCount),  // '448',
    totalValueLocked: parseFloat(token.totalValueLocked),  // '2030.560502437830764385',
    totalValueLockedUSD: parseFloat(token.totalValueLockedUSD),
    untrackedVolumeUSD: parseFloat(token.untrackedVolumeUSD),
    volume: parseFloat(token.volume),  // '13514.487363679039296109',
    volumeUSD: parseFloat(token.volumeUSD),  // '13514.487363679039296109',
  }
}

/**
 *
 * @param client
 * @param tokenAddress
 * @param blockNumber
 * @returns {Promise<TokenData|null>}
 */
export const fetchTokenData = async (client: GraphQLClient,
                                     tokenAddress: string,
                                     blockNumber: number | null = null): TokenData | null => {

  try {
    const {token} = await client.request(blockNumber ? tokenPastQuery : tokenQuery, {
      id: tokenAddress,
      block: {number: blockNumber}
    });
    return token ? mapToken(token) : null
  } catch (e) {
    console.error(e)
    return null
  }
}


/**
 *
 * @param client
 * @param tokens
 * @param block
 * @param orderBy
 * @param orderDirection
 * @returns {Promise<*[]|*>}
 */
export const fetchTokensData = async (client: GraphQLClient,
                                      tokens: string[] = [],
                                      blockNumber: null | number | undefined = null,
                                      orderBy: string | undefined = 'totalValueLockedUSD',
                                      orderDirection: string | undefined = 'desc'): TokenData[] | any[] => {
  try {
    const {tokens} = await client.request(tokensQuery, {
      ids: tokens,
      block: blockNumber,
      orderBy,
      orderDirection
    });
    if (tokens.length === 0) {
      return []
    }
    return tokens.filter(x => x).map(token => mapToken(token))
  } catch (e) {
    console.error(e)
    return []
  }
}
