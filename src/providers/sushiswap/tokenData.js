import {formatTokenName, formatTokenSymbol} from "./../../utils/tokens";
import {GraphQLClient} from "graphql-request";
import type {TokenData} from "./../../interfaces";
import {tokensQuery} from "./queries";

interface TokenFields {
  id: string,
  symbol: string,
  name: string,
  derivedETH: string,
  totalSupply: string,
  volume: string,
  feesUSD: string,
  txCount: string,
  liquidity: string,
}

export const mapToken = function (token: TokenFields): TokenData {
  return {
    address: token.id,
    name: formatTokenName(token.id, token.name),  // 'Art Blocks Curated Full Set',
    symbol: formatTokenSymbol(token.id, token.symbol),  // 'ABC123',
    volume: parseFloat(token.volume),  // '13514.487363679039296109',
    txCount: parseFloat(token.txCount),  // '448',
    derivedETH: parseFloat(token.derivedETH),
    totalValueLocked: parseFloat(token.liquidity),  // '2030.560502437830764385',
  }
}

/**
 *
 * @param client
 * @param tokenAddress
 * @param orderBy
 * @param orderDirection
 * @returns {Promise<TokenData|null>}
 */
export const fetchTokenData = async (client: GraphQLClient,
                                     tokenAddress: string,
                                     orderBy: string | undefined = 'liquidity',
                                     orderDirection: string | undefined = 'desc'): TokenData | null => {
  try {
    const {tokens} = await client.request(tokensQuery, {
      ids: [tokenAddress],
      orderBy,
      orderDirection
    });
    if (tokens.length === 0) {
      return null
    }
    const token = tokens[0]
    return mapToken(token)
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
                                      block: null | number | undefined = null,
                                      orderBy: string | undefined = 'totalValueLockedUSD',
                                      orderDirection: string | undefined = 'desc'): TokenData[] | any[] => {

  const query = TOKENS_QUERY(block = null,
    tokens,
    orderBy,
    orderDirection)

  try {
    const {tokens} = await client.request(query);
    if (tokens.length === 0) {
      return []
    }
    return tokens.map(token => mapToken(token))
  } catch (e) {
    console.error(e)
    return []
  }
}
