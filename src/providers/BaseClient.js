import {GraphQLClient} from "graphql-request";

export class BaseClient {
  constructor(chainId: number | undefined = 1, endpoint: string) {
    chainId = parseInt(chainId)
    this.chainId = chainId
    this.client = new GraphQLClient(endpoint)
  }
}
