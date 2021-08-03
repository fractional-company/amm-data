import {GraphQLClient} from 'graphql-request'
import {ETHEREUM_BLOCKS_ENDPOINTS} from "./constants";

export const resolveClient = () => {
  // activeChainId
  const chainId = 1
  return new GraphQLClient(ETHEREUM_BLOCKS_ENDPOINTS[chainId] ? ETHEREUM_BLOCKS_ENDPOINTS[chainId] : ETHEREUM_BLOCKS_ENDPOINTS[1])
}
