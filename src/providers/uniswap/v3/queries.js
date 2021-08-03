import {gql} from "graphql-request";
//
// const CHART_POOL_DAY = (poolAddress, startTime, skip = 0, orderBy = 'date', orderDirection = 'orderDirection') => {
//   return `{
//     poolDayDatas(
//         first: 1000
//         skip: ${skip}
//         where: {pool: "${poolAddress}", date_gt: ${startTime}}
//         orderBy: ${orderBy}
//         orderDirection: ${orderDirection}
//       ) {
//         date
//         volumeUSD
//         tvlUSD
//         __typename
//       }
//     }`
// }

export const poolTokenFieldsQuery = gql`
  fragment poolTokenFields on Token {
    id
    symbol
    name
    derivedETH
    volume
    txCount
    totalValueLocked
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
    token0 {
      ...poolTokenFields
    }
    token1 {
      ...poolTokenFields
    }
  }
  ${poolTokenFieldsQuery}
`;


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

