import {gql} from "graphql-request";
/**
 * ======================================
 * Fragments
 * ======================================
 */
export const poolTokenFieldsQuery = gql`
  fragment poolTokenFields on Token {
    id
    symbol
    decimals
    name
    derivedETH
    volume
    volumeUSD
    feesUSD
    txCount
    untrackedVolumeUSD
    totalValueLocked
    totalValueLockedUSD
  }
`;

export const poolFieldsQuery = gql`
  fragment poolFields on Pool {
    id
    feeTier
    liquidity
    sqrtPrice
    tick
    token0Price
    token1Price
    volumeUSD
    txCount
    totalValueLockedToken0
    totalValueLockedToken1
    totalValueLockedUSD
    feesUSD
    token0 {
      ...poolTokenFields
    }
    token1 {
      ...poolTokenFields
    }
  }
  ${poolTokenFieldsQuery}
`;

export const bundleFields = gql`
  fragment bundleFields on Bundle {
    id
    ethPriceUSD
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
    $orderBy: String! = "totalValueLockedUSD"
    $orderDirection: String! = "desc"
  ) {
    tokens(where:{id_in: $ids}, orderBy: $orderBy, orderDirection: $orderDirection) {
      ...poolTokenFields
    }
  }
  ${poolTokenFieldsQuery}
`

export const tokenQuery = gql`
  query tokensQuery(
    $id: String!
  ) {
    token(id:$id) {
      ...poolTokenFields
    }
  }
  ${poolTokenFieldsQuery}
`

export const tokenPastQuery = gql`
  query tokenPastQuery(
    $id: String!, $block: Block_height!
  ) {
    token(id:$id, block:$block) {
      ...poolTokenFields
    }
  }
  ${poolTokenFieldsQuery}
`

export const findPoolsByToken0Query = gql`
  query findPoolsByToke0nQuery(
    $tokenAddress: String!
    $orderBy: String! = "totalValueLockedUSD"
    $orderDirection: String! = "desc"
  ) {
    pools(where:{token0: $tokenAddress}, orderBy: $orderBy, orderDirection: $orderDirection) {
      ...poolFields
    }
  }
${poolFieldsQuery}`

export const findPoolsByToken1Query = gql`
  query findPoolsByToke0nQuery(
    $tokenAddress: String!
    $orderBy: String! = "totalValueLockedUSD"
    $orderDirection: String! = "desc"
  ) {
    pools(where:{ token1: $tokenAddress }, orderBy: $orderBy, orderDirection: $orderDirection) {
      ...poolFields
    }
  }
${poolFieldsQuery}`

export const poolsQuery = gql`
  query poolsQuery(
    $pools: [Bytes]!
    $orderBy: String! = "totalValueLockedUSD"
    $orderDirection: String! = "desc"
  ) {
    pools(where:{id_in: $pools}, orderBy: $orderBy, orderDirection: $orderDirection) {
      ...poolFields
    }
  }
${poolFieldsQuery}`


export const poolDayDatasQuery = gql`
  query poolDayDatasQuery($startTime: Int!, $skip: Int!, $pools: [Bytes!]) {
    poolDayDatas(
      first: 1000
      skip: $skip
      where: { pool_in: $pools, date_gt: $startTime }
      orderBy: date
      orderDirection: asc
    ) {
      date
      pool {
        id
      }
      volumeUSD
      tvlUSD
      txCount
    }
  }
`

export const poolTimeTravelQuery = gql`
  query poolTimeTravelQuery(
    $pools: [Bytes]!
    $block: Block_height!
    $orderBy: String! = "totalValueLockedUSD"
    $orderDirection: String! = "desc"
  ) {
    pools(where:{id_in: $pools}, block: $block, orderBy: $orderBy, orderDirection: $orderDirection) {
      ...poolFields
    }
  }
${poolFieldsQuery}`

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
