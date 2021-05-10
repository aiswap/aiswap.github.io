import { ChainId } from '@uniswap/sdk'
import MULTICALL_ABI from './abi.json'
// @ts-ignore
const MULTICALL_NETWORKS: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: '0x86267f0116c923cbb2f3460c2b421562b6189f5d'
}

export { MULTICALL_ABI, MULTICALL_NETWORKS }
