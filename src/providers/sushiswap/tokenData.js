import {formatTokenName, formatTokenSymbol} from "./../../utils/tokens";
import {GraphQLClient} from "graphql-request";
import type {TokenData} from "./../../interfaces";
import {tokenQuery, tokenTimeTravelQuery} from "./queries";

interface TokenFields {
  id: string,
  symbol: string,
  name: string,
  derivedETH: string,
  totalSupply: string,
  volume: string,
  volumeUSD: string,
  feesUSD: string,
  txCount: string,
  liquidity: string,
  untrackedVolumeUSD: string
}

export const mapToken = function (token: TokenFields): TokenData {
  return {
    address: token.id,
    derivedETH: parseFloat(token.derivedETH),
    name: formatTokenName(token.id, token.name),  // 'Art Blocks Curated Full Set',
    symbol: formatTokenSymbol(token.id, token.symbol),  // 'ABC123',
    totalSupply: parseFloat(token.totalSupply),
    totalValueLocked: parseFloat(token.liquidity),  // '2030.560502437830764385',
    txCount: parseFloat(token.txCount),  // '448',
    untrackedVolumeUSD: parseFloat(token.untrackedVolumeUSD),
    volume: parseFloat(token.volume),  // '13514.487363679039296109',
    volumeUSD: parseFloat(token.volumeUSD),
  }
}


/**
 *
 * @param client
 * @param tokenAddress
 * @returns {Promise<TokenData|null>}
 */
export const fetchTokenData = async (client: GraphQLClient,
                                     tokenAddress: string,
                                     blockNumber: number | undefined): TokenData | null => {
  try {
    const {token} = await client.request(blockNumber ? tokenTimeTravelQuery : tokenQuery, {
      id: tokenAddress,
      block: {
        number: blockNumber
      }
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
 * @param tokenAddress
 * @param blockNumber
 * @returns {Promise<*[]|PoolData[]>}
 */
export const fetchPastTokenData = async (client: GraphQLClient,
                                         tokenAddress: string,
                                         blockNumber: number | undefined) => {
  try {
    const {token} = await client.request(tokenTimeTravelQuery, {
      id: tokenAddress,
      block: {
        number: blockNumber
      },
    });
    return token ? mapToken(token) : null
  } catch (e) {
    console.error(e)
    return null
  }
}

