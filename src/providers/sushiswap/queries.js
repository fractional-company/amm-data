import {gql} from "graphql-request";

/**
 * ======================================
 * Fragments
 * ======================================
 */

export const pairTokenFieldsQuery = gql`
  fragment pairTokenFields on Token {
    id
    symbol
    name
    decimals
    totalSupply
    volume
    volumeUSD
    untrackedVolumeUSD
    txCount
    liquidity
    derivedETH
  }
`;

export const tokenFieldsQuery = gql`
  fragment tokenFields on Token {
    id
    symbol
    name
    decimals
    totalSupply
    volume
    volumeUSD
    untrackedVolumeUSD
    txCount
    liquidity
    derivedETH
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


export const bundleFields = gql`
  fragment bundleFields on Bundle {
    id
    ethPrice
  }
`;

/**
 * ======================================
 * Queries
 * ======================================
 */

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

export const pairsPastQuery = gql`
  query pairsQuery(
    $pairs: [Bytes]!
    $block: Block_height!
    $orderBy: String! = "txCount"
    $orderDirection: String! = "desc"
  ) {
    pairs(where:{id_in: $pairs}, block: $block, orderBy: $orderBy, orderDirection: $orderDirection) {
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

export const tokenTimeTravelQuery = gql`
  query tokenTimeTravelQuery($id: String!, $block: Block_height!) {
    token(id: $id, block: $block) {
      ...tokenFields
    }
  }
  ${tokenFieldsQuery}
`;

export const tokenQuery = gql`
  query tokenTimeTravelQuery($id: String!) {
    token(id: $id) {
      ...tokenFields
    }
  }
${tokenFieldsQuery}
`;

export const pairDayDatasQuery = gql`
  query pairDayDatasQuery(
    $first: Int = 1000
    $date: Int = 0
    $pairs: [Bytes]!
  ) {
    pairDayDatas(
      first: $first
      orderBy: date
      orderDirection: desc
      where: { pair_in: $pairs, date_gt: $date }
    ) {
      date
      pair {
        id
      }
      reserveUSD
      volumeUSD
      txCount
    }
  }
`;

export const ethPriceQuery = gql`
  query ethPriceQuery($id: Int! = 1) {
    bundles(id: $id) {
      ...bundleFields
    }
  }
  ${bundleFields}
`;

export const ethPriceTimeTravelQuery = gql`
  query ethPriceTimeTravelQuery($id: Int! = 1, $block: Block_height!) {
    bundles(id: $id, block: $block) {
      ...bundleFields
    }
  }
  ${bundleFields}
`;
