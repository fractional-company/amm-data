import {UniswapV3Client} from "../src/providers/uniswap/v3";

test("import UniswapV3Client", () => {
  expect.anything(UniswapV3Client);
});

test("should receive eth price", async () => {
  let response = await (new UniswapV3Client).getEthPrice(14810889)
  expect(parseInt(response)).toBe(2044);
});
