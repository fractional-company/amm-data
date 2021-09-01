// Eth Price
import {GraphQLClient} from "graphql-request";
import {ethPriceQuery, ethPriceTimeTravelQuery} from "./queries";

export const getEthPrice = async (client: GraphQLClient) => {

  try {
    const {bundles} = await client.request(ethPriceQuery);
    return bundles.length > 0 ? bundles[0]?.ethPrice : 0
  } catch (e) {
    console.error(e)
    return null
  }
}

export async function getPastEthPrice(client: GraphQLClient, blockNumber: number) {
  try {
    const {bundles} = await client.request(ethPriceTimeTravelQuery, {
      block: {number: blockNumber},
    });
    return bundles.length > 0 ? bundles[0]?.ethPrice : 0
  } catch (e) {
    console.error(e)
    return null
  }
}
