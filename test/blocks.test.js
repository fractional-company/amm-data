import {BlocksClient} from "../src/providers/blocks";

test("should receive the right info", async () => {
  let client = new BlocksClient(1)
  let response = await client.getNearestBlockByTimestamp(1653046634)
  expect(response.number).toBe(14810890);
  expect(response.timestamp).toBe(1653046633)
});
