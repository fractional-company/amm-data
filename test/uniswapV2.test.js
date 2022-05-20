import {UniswapV2Client} from "../src/providers/uniswap/v2";

test("import UniswapV2Client", () => {
  expect.anything(UniswapV2Client);
});

test("should receive eth price", async () => {
  let response = await (new UniswapV2Client)
    .getEthPrice(14810889)
  expect(parseInt(response)).toBe(2044);
});
