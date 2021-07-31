import {GraphQLClient} from 'graphql-request'
import {UNISWAP_V3_ENDPOINTS} from "./../../../constants";

export const resolveClient = (chainId = 1) => {
  return new GraphQLClient(UNISWAP_V3_ENDPOINTS[chainId] ? UNISWAP_V3_ENDPOINTS[chainId] : UNISWAP_V3_ENDPOINTS[1])
}
