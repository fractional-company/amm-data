import {SushiswapClient} from "../src/providers/sushiswap";

test("import SushiswapClient", () => {
  expect.anything(SushiswapClient);
});

test("should receive eth price", async () => {
  let response = await (new SushiswapClient(1))
    .getEthPrice(14810889)
  expect(parseInt(response)).toBe(2045);
});


