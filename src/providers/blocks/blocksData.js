import {startOfMinute, subDays, subWeeks} from "date-fns";
import {blockQuery, blocksTimestamp, blocksTimestamps} from "./queries";

export const fetchOneDayBlock = async (client) => {
  const date = startOfMinute(subDays(Date.now(), 1));
  const start = Math.floor(date / 1000);
  const end = Math.floor(date / 1000) + 600;
  const response = await client.request(blockQuery, {
    start,
    end,
  });
  return {number: Number(response?.blocks[0].number)};
}

export const fetchTwoDayBlock = async (client) => {
  const date = startOfMinute(subDays(Date.now(), 2));
  const start = Math.floor(date / 1000);
  const end = Math.floor(date / 1000) + 600;

  const response = await client.request(blockQuery, {
    start,
    end,
  });

  return {number: Number(response?.blocks[0].number)};
}

export const fetchSevenDayBlock = async (client) => {
  const date = startOfMinute(subWeeks(Date.now(), 1));
  const start = Math.floor(date / 1000);
  const end = Math.floor(date / 1000) + 600;

  const response = await client.request(blockQuery, {
    start,
    end,
  });

  return {number: Number(response?.blocks[0].number)};
}

export const fetchBlockTimestamps = async (client, blockNumbers) => {
  return client.request(blocksTimestamps, {
    blockNumbers
  });
}

export const fetchBlockByTimestamp = async (client, blockNumber) => {
  const response = await client.request(blocksTimestamp, {
    blockNumber
  });

  return {number: Number(response?.blocks[0].number), timestamp: Number(response?.blocks[0].timestamp)};
}
