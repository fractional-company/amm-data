<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### Table of Contents

-   -   [fetchTokenPools][1]
        -   [Parameters][2]
    -   [fetchPoolsData][3]
        -   [Parameters][4]
    -   [fetchPoolsPastData][5]
        -   [Parameters][6]
    -   [fetchPoolsDayData][7]
        -   [Parameters][8]
    -   [fetchTokenData][9]
        -   [Parameters][10]
    -   [fetchTokensData][11]
        -   [Parameters][12]
    -   [formatTokenName][13]
        -   [Parameters][14]
    -   [getBulkPoolsData][15]
        -   [Parameters][16]
    -   [getBulkPoolsDayDatas][17]
        -   [Parameters][18]
    -   [poolTokenFieldsQuery][19]
-   [Fragments][20]
    -   [tokensQuery][21]
-   [Queries][22]

## fetchTokenPools

Fetch token pools

### Parameters

-   `client` **GraphQLClient** 
-   `tokenAddress` **[string][23]** 
-   `tokenSide` **([string][23] \| [undefined][24])**  (optional, default `TOKEN_0`)

Returns **[Promise][25]&lt;(null | any)>** 

## fetchPoolsData

### Parameters

-   `client` **GraphQLClient** 
-   `poolsArr` **any**  (optional, default `[]`)
-   `orderBy` **([string][23] \| [undefined][24])**  (optional, default `'totalValueLockedUSD'`)
-   `orderDirection` **([string][23] \| [undefined][24])**  (optional, default `'desc'`)

Returns **[Promise][25]&lt;void>** 

## fetchPoolsPastData

### Parameters

-   `client` **GraphQLClient** 
-   `poolsArr` **[Array][26]&lt;[string][23]>**  (optional, default `[]`)
-   `blockNumber` **([number][27] \| [undefined][24])** 
-   `orderBy` **([string][23] \| [undefined][24])**  (optional, default `'totalValueLockedUSD'`)
-   `orderDirection` **([string][23] \| [undefined][24])**  (optional, default `'desc'`)

Returns **[Promise][25]&lt;([Array][26]&lt;any> | [Array][26]&lt;PoolData>)>** 

## fetchPoolsDayData

### Parameters

-   `client` **GraphQLClient** 
-   `poolsArr` **[Array][26]&lt;[string][23]>**  (optional, default `[]`)
-   `startTime` **[number][27]** 
-   `skip` **[number][27]**  (optional, default `0`)

Returns **[Promise][25]&lt;(null | any)>** 

## fetchTokenData

### Parameters

-   `client` **GraphQLClient** 
-   `tokenAddress` **[string][23]** 
-   `blockNumber` **([number][27] | null)**  (optional, default `null`)

Returns **[Promise][25]&lt;(TokenData | null)>** 

## fetchTokensData

### Parameters

-   `client` **GraphQLClient** 
-   `tokens` **[Array][26]&lt;[string][23]>**  (optional, default `[]`)
-   `blockNumber` **(null | [number][27] \| [undefined][24])**  (optional, default `null`)
-   `orderBy` **([string][23] \| [undefined][24])**  (optional, default `'totalValueLockedUSD'`)
-   `orderDirection` **([string][23] \| [undefined][24])**  (optional, default `'desc'`)
-   `block`  

Returns **[Promise][25]&lt;([Array][26]&lt;any> | any)>** 

## formatTokenName

### Parameters

-   `address` **[string][23]** 
-   `name` **[string][23]** 

Returns **[string][23]** 

## getBulkPoolsData

### Parameters

-   `request` **BulkAnalyticsRequest** 
-   `blockNumber`   (optional, default `null`)

Returns **[Promise][25]&lt;({} | null)>** 

## getBulkPoolsDayDatas

### Parameters

-   `request` **BulkAnalyticsRequest** 
-   `timestamp`  

Returns **[Promise][25]&lt;{}>** 

## poolTokenFieldsQuery

======================================

# Fragments

## tokensQuery

======================================

# Queries

[1]: #fetchtokenpools

[2]: #parameters

[3]: #fetchpoolsdata

[4]: #parameters-1

[5]: #fetchpoolspastdata

[6]: #parameters-2

[7]: #fetchpoolsdaydata

[8]: #parameters-3

[9]: #fetchtokendata

[10]: #parameters-4

[11]: #fetchtokensdata

[12]: #parameters-5

[13]: #formattokenname

[14]: #parameters-6

[15]: #getbulkpoolsdata

[16]: #parameters-7

[17]: #getbulkpoolsdaydatas

[18]: #parameters-8

[19]: #pooltokenfieldsquery

[20]: #fragments

[21]: #tokensquery

[22]: #queries

[23]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String

[24]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/undefined

[25]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise

[26]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array

[27]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number
