import React from 'react'
// import { Layout, Menu } from 'antd';
import { ExternalLink } from '../../theme/components'
import styled from 'styled-components'

import { IconDiscord, IconTelegram, IconTwitter, IconWechat } from '../Icon/Community'

const Wrapper = styled.div`
  display: flex;
  padding: 0 20px 20px;
  flex-wrap: wrap;
  justify-content: space-between;
  a {
    height: 20px;
    width: 20px;
    display: flex;
  }
`

export default function SiderCommunity() {

  return (
    <Wrapper>
      <ExternalLink href={`https://###`}>
        <IconDiscord />
      </ExternalLink>
      <ExternalLink href={`https://###`}>
        <IconTelegram />
      </ExternalLink>
      <ExternalLink href={`https://###`}>
        <IconTwitter />
      </ExternalLink>
      <ExternalLink href={`https://###`}>
        <IconWechat />
      </ExternalLink>
    </Wrapper>
  )
}