import React from 'react'
import { HelpCircle } from 'react-feather'
import { ImageProps } from 'rebass'
import { LocalTokenIconPath } from '../../constants/assets'

const BAD_SRCS: { [tokenAddress: string]: true } = {}
const MAX_REFRESH: number = 2


export interface LogoProps extends Pick<ImageProps, 'style' | 'alt' | 'className'> {
  srcs: string[],
  address?: string
}

/**
 * Renders an image by sequentially trying a list of URIs, and then eventually a fallback triangle alert
 */
export default function Logo({ srcs, alt, address, ...rest }: LogoProps) {
  const [, refresh] = React.useState<number>(0)

  const src: string | undefined = srcs.find(src => !BAD_SRCS[src])

  if (src) {
    return (
      <img
        {...rest}
        alt={alt}
        src={src}
        onError={e => {
          const eTarget = e.target as any
          const localSrc = LocalTokenIconPath({ address })

          // Backup local dir
          if (eTarget.src && eTarget.src !== localSrc) {
            // # 2
            eTarget.src = localSrc
          }
          refresh(i => {
            if (i > MAX_REFRESH && !BAD_SRCS[src]) {
              BAD_SRCS[src] = true
            }
            return i + 1
          })

          // const eTarget = e.target as any
          // const localSrc = `/images/assets/main/OKExChain/${address}.png`

          //   if (src) {
          //     if (eTarget.src !== localSrc) {
          //       // # 2
          //       eTarget.src = localSrc
          //     } else if (src) {
          //       // # 3
          //       BAD_SRCS[src] = true
          //     }
          //     // BAD_SRCS[src] = true
          //   }
          //   // refresh(i => i + 1)
        }}
      />
    )
  }

  return <HelpCircle {...rest} />
}
