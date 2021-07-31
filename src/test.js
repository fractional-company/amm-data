// @flow

// /**
//  * This function says hello.
//  * @param name Some name to say hello for.
//  * @returns The hello.
//  */

import {UniswapV3Client} from "./providers/uniswap/v3";
let a = async () => {
  const uni3 = new UniswapV3Client(1)
  // await uni3.getVaultPools("0x9ff4f50efd40c915f7d1476bf36acb8908e0c56d")
  // console.log(await uni3.getVaultAnalytics("0x9ff4f50efd40c915f7d1476bf36acb8908e0c56d", ["0xFDaADF43efa83C3320A60e6b238C236ECe2787E1".toLowerCase()]))
  console.log(await uni3.getMultipleVaultAnalytics({
    "0x9ff4f50efd40c915f7d1476bf36acb8908e0c56d": ["0xFDaADF43efa83C3320A60e6b238C236ECe2787E1".toLowerCase()],
    "0x823730E4Ad0e2C6e1246df46CA7e552b4cf992E5": ["0x488DB9ce7A5d2CD90919f6203d20C9F9C8e4a7EA".toLowerCase()]
  }))
}
a()
