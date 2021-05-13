import React from 'react'
// import { Layout, Menu } from 'antd';
import { ExternalLink } from '../../theme/components'
import styled from 'styled-components'

import {
  // COMMUNITY_DISCORD,
  COMMUNITY_TELEGRAM,
  COMMUNITY_TWITTER
} from '../../constants/infoSetting'

import {
  // IconDiscord,
  IconTelegram,
  IconTwitter,
  // IconWechat
} from '../Icon/Community'

const Wrapper = styled.div`
  display: flex;
  padding: 0 20px 20px;
  flex-wrap: wrap;
  // justify-content: space-between;
  a {
    height: 20px;
    width: 20px;
    display: flex;
    margin-right: 42px;
  }
`

export default function SiderCommunity() {

  return (
    <Wrapper>
      {/* <ExternalLink href={COMMUNITY_DISCORD}>
        <IconDiscord />
      </ExternalLink> */}
      <ExternalLink href={COMMUNITY_TELEGRAM}>
        <IconTelegram />
      </ExternalLink>
      <ExternalLink href={COMMUNITY_TWITTER}>
        <IconTwitter />
      </ExternalLink>
      {/* <ExternalLink href={`https://###`}>
        <IconWechat />
      </ExternalLink> */}
    </Wrapper>
  )
}