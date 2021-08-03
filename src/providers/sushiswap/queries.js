import {gql} from "graphql-request";

export const pairTokenFieldsQuery = gql`
  fragment pairTokenFields on Token {
    id
    symbol
    name
    derivedETH
    volume
    txCount
    liquidity
  }
`;

export const pairFieldsQuery = gql`
  fragment pairFields on Pair {
    id
    reserveUSD
    reserveETH
    volumeUSD
    untrackedVolumeUSD
    trackedReserveETH
    token0 {
      ...pairTokenFields
    }
    token1 {
      ...pairTokenFields
    }
    reserve0
    reserve1
    token0Price
    token1Price
    totalSupply
    txCount
    timestamp
  }
  ${pairTokenFieldsQuery}
`;

export const tokensQuery = gql`
  query tokensQuery(
    $ids: [Bytes]!
    $orderBy: String! = "liquidity"
    $orderDirection: String! = "desc"
  ) {
    tokens(where:{id_in: $ids}, orderBy: $orderBy, orderDirection: $orderDirection) {
      ...pairTokenFields
    }
  }
${pairTokenFieldsQuery}`

export const pairsQuery = gql`
  query pairsQuery(
    $pairs: [Bytes]!
    $orderBy: String! = "txCount"
    $orderDirection: String! = "desc"
  ) {
    pairs(where:{id_in: $pairs}, orderBy: $orderBy, orderDirection: $orderDirection) {
      ...pairFields
    }
  }
${pairFieldsQuery}`

export const poolsByToken0Query = gql`
  query pairsQuery(
    $tokenAddress: String!
    $orderBy: String! = "txCount"
    $orderDirection: String! = "desc"
  ) {
    pairs(where:{token0: $tokenAddress}, orderBy: $orderBy, orderDirection: $orderDirection) {
      ...pairFields
    }
  }
${pairFieldsQuery}`

export const poolsByToken1Query = gql`
  query pairsQuery(
    $tokenAddress: String!
    $orderBy: String! = "txCount"
    $orderDirection: String! = "desc"
  ) {
    pairs(where:{token1: $tokenAddress}, orderBy: $orderBy, orderDirection: $orderDirection) {
      ...pairFields
    }
  }
${pairFieldsQuery}`
