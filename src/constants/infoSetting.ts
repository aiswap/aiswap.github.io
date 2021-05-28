
// Community
export const COMMUNITY_DISCORD = "https://###"
export const COMMUNITY_TELEGRAM = "https://t.me/AIswap_Official"
export const COMMUNITY_TWITTER = "https://twitter.com/AISwapNo1"
export const COMMUNITY_MEDIUM = "https://medium.com/@aiswap"

export const GetInfoUrl = (
  {type, address}:
  {type: string, address: string | undefined}
): string => `https://info.aiswap.io/${type}/${String(address || '').toLocaleLowerCase()}`