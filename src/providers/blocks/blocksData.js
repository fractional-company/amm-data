import {resolveClient} from "./client";

export const GET_BLOCKS = (timestamps) => {
  let queryString = 'query blocks {'
  queryString += timestamps.map((timestamp) => {
    return `t${timestamp}:blocks(first: 1, orderBy: timestamp, orderDirection: desc, where: { timestamp_gt: ${timestamp}, timestamp_lt: ${
      timestamp + 600
    } }) {
        number
      }`
  })
  queryString += '}'
  return queryString
}

const fetchBlocksFromTimestamps = (timestamps = []) => {
  const query = GET_BLOCKS(timestamps)
  const client = resolveClient()
  return client.request(query)
}
