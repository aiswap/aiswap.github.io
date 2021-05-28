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

let showLocalIcon: boolean = false

/**
 * Renders an image by sequentially trying a list of URIs, and then eventually a fallback triangle alert
 */
export default function Logo({ srcs, alt, address, ...rest }: LogoProps) {
  const [, refresh] = React.useState<number>(0)
  const localSrc: string = LocalTokenIconPath({ address })

  const src: string | undefined = showLocalIcon
    ? localSrc
    : srcs.find(src => !BAD_SRCS[src])

  if (src) {
    return (
      <img
        {...rest}
        alt={alt}
        src={src}
        onError={e => {
          const eTarget = e.target as any

          // Backup local dir
          if (eTarget.src && eTarget.src !== localSrc && !showLocalIcon) {
            showLocalIcon = true
            // localStorage.setItem('aaa', JSON.stringify({
            //   __EXPIREDATE__: 1,
            //   data: {

            //   }
            // }))
            // # 2
            eTarget.src = localSrc
          } else {
            eTarget.src = '/images/unknow_token.svg'
          }
          refresh(i => {
            if (i > MAX_REFRESH && !BAD_SRCS[src]) {
              BAD_SRCS[src] = true
              // showLocalIcon = false
              eTarget.src = '/images/unknow_token.svg'
            }
            return i + 1
          })
        console.log('refresh', eTarget.src  )
        }}
      />
    )
  }

  return <HelpCircle {...rest} />
}
