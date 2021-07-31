import {GraphQLClient} from 'graphql-request'
import {ETHEREUM_BLOCKS} from "../../constants";

export const resolveClient = () => {
  // activeChainId
  const chainId = 1
  return new GraphQLClient(ETHEREUM_BLOCKS[chainId] ? ETHEREUM_BLOCKS[chainId] : ETHEREUM_BLOCKS[1])
}
