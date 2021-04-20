import React from 'react'
import { ColumnCenter } from '../../components/Column'
import { AutoRow } from '../../components/Row'
import { Link } from 'react-router-dom'

import styled from 'styled-components'
// import { STAKING_REWARDS_INFO, useStakingInfo } from '../../state/stake/hooks'
// import { TYPE, ExternalLink } from '../../theme'
// import PoolCard from '../../components/earn/PoolCard'
// import { RowBetween } from '../../components/Row'
// import { CardSection, DataCard, CardNoise, CardBGImage } from '../../components/earn/styled'
// import Loader from '../../components/Loader'
// import { useActiveWeb3React } from '../../hooks'
// import { JSBI } from '@uniswap/sdk'
// import { BIG_INT_ZERO } from '../../constants'
// import { OutlineCard } from '../../components/Card'

import { ExternalLink } from '../../theme'

import LogoMd from '../../assets/svg/logo/md.svg'
import LogoWhite from '../../assets/svg/logo/white.svg'
import CooperationKlend from '../../assets/svg/cooperation/klend.svg'
import CooperationDMEX from '../../assets/svg/cooperation/dmex.svg'
import CooperationSFinance from '../../assets/svg/cooperation/sfinance.svg'
import CooperationSupremeX from '../../assets/svg/cooperation/superemex.svg'
import CooperationBgLeft from '../../assets/svg/art/extra-left.svg'
import CooperationBgRight from '../../assets/svg/art/extra-right.svg'

import ArtSwap from '../../assets/svg/art/ai-swap.svg'
import ArtTrademin from '../../assets/svg/art/ai-trademin.svg'
import ArtLiquidity from '../../assets/svg/art/ai-liqmin.svg'
import ArtIdo from '../../assets/svg/art/ai-ido.svg'
import ArtDestruction from '../../assets/svg/art/ai-destruction.svg'

import ArtExtraSwap from '../../assets/svg/art/extra-swap.svg'
import ArtExtraTrademin from '../../assets/svg/art/extra-trademin.svg'
import ArtExtraLiquidity from '../../assets/svg/art/extra-liqmin.svg'
import ArtExtraIdo from '../../assets/svg/art/extra-ido.svg'
import ArtExtraDestruction from '../../assets/svg/art/extra-destruction.svg'

import ArtCover from '../../assets/svg/art/art_01.svg'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

// const TopSection = styled(AutoColumn)`
//   max-width: 720px;
//   width: 100%;
// `

const StyledHeader = styled.header`
  padding: 40px;
`

const StyledMain = styled.main`
  align-items: center;
  display: flex;
  flex-direction: column;
`

const StyledCover = styled.div`
  display: flex;
  max-width: 1152px;
  align-items: center;
  margin-top: 32px;
  flex-wrap: wrap;
  justify-content: center;

  h1 {
    color: #3939E6;
    padding-right: 120px;
    display: flex;
    flex-flow: wrap column;
    font-style: normal;
    font-weight: normal;
    font-size: 56px;
    line-height: 64px;
  }
  h1 b {
    font-weight: bold;
    font-size: 72px;
    line-height: 80px;
  }
  small {
    font-size: 20px;
    line-height: 28px;
    color: #151526;
    margin-top:16px;
  }
  img {
    width: 564px;
    height: 400px;
  }
`

const StyledFeatures = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1152px;
  margin: 64px 0 72px;
  width: 100%;
`

const StyledFeatureLink = styled(Link)`
  padding: 0 64px;
  display: flex;
  background-color: #FFFFFF;
  border: 1px solid rgba(35, 40, 64, 0.07);
  box-shadow: 0px 2px 2px rgba(35, 40, 64, 0.04);
  border-radius: 16px;
  margin-bottom: 24px;
  align-items: center;

  > img {
    width: 72px;
    height: 72px;
    margin: 56px 40px 56px 0;
  }
  h3 {
    display: flex;
    flex-direction: column;
    font-weight: 600;
    font-size: 24px;
    line-height: 32px;
    color: #151526;
    margin: 56px 0;
    flex: 1;
    justify-content: center;
    align-items: flex-start;
  }
  h3 em {
    padding: 2px 8px;
    height: 24px;
    font-weight: 600;
    font-size: 12px;
    line-height: 20px;
    color: #151526;
    background: #FFFFFF;
    border-radius: 8px;
    font-style: normal;
    margin-left: 4px;
  }
  small {
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;
    text-align: center;
    color: #151526;
    margin-top: 8px;
    text-align: left;
  }
  span > img {
    opacity: 0.11;
  }
  :hover {
    box-shadow: 0px 4px 4px rgba(35, 40, 64, 0.08);
  }
`

const StyledCooperation = styled(ColumnCenter)`
  justify-content: center;
  background: url(${CooperationBgLeft}) no-repeat 10% center,
              url(${CooperationBgRight}) no-repeat 90% center;
  background-color: #F0F2FF;
  padding: 96px 0;

  h3 {
    font-weight: 600;
    font-size: 32px;
    line-height: 40px;
    color: #151526;
    margin: 0 0 12px;
  }
`
const StyledCooperationBody = styled(AutoRow)`
  justify-content: center;
  padding: 0 40px;
`

const StyledCooperationLink = styled(ExternalLink)`
  margin: 12px;
  background-color: rgba(240,242,255, 0.5);

  :hover {
    opacity: 0.8;
  }
`

const StyledFooter = styled.footer`
  background-color: #151526;
  padding: 40px;
`

// const DataRow = styled(RowBetween)`
//   ${({ theme }) => theme.mediaWidth.upToSmall`
// flex-direction: column;
// `};
// `

export default function Earn() {
  // const { chainId } = useActiveWeb3React()

  // staking info for connected account
  // const stakingInfos = useStakingInfo()

  /**
   * only show staking cards with balance
   * @todo only account for this if rewards are inactive
   */
  // const stakingInfosWithBalance = stakingInfos?.filter(s => JSBI.greaterThan(s.stakedAmount.raw, BIG_INT_ZERO))

  // toggle copy if rewards are inactive
  // const stakingRewardsExist = Boolean(typeof chainId === 'number' && (STAKING_REWARDS_INFO[chainId]?.length ?? 0) > 0)
  const cooperations: {id: string, href: string, width: string, src: string}[] = [
    { id: 'Klend', href: '###', width: '112px', src: CooperationKlend },
    { id: 'S.Finance', href: '###', width: '146px', src: CooperationSFinance },
    { id: 'SupremeX', href: '###', width: '164px', src: CooperationSupremeX },
    { id: 'DMEX', href: '###', width: '120px', src: CooperationDMEX }
  ]

  const features: { to: string, title: string, tip?: string, small: string, icon: string, extra: string, style?: object}[] = [
    {to: '/swap', title: '资产兑换',small: '生态链最大的资产兑换平台', icon: ArtSwap,  extra: ArtExtraSwap, style: {backgroundColor: '#FFE5FB'}},
    {to: '/', title: '交易挖矿', small: '在 AIswap 指定兑换池交易可以获得治理代币 AI 奖励', icon: ArtTrademin,  extra: ArtExtraTrademin},
    {to: '/', title: '流动性挖矿', small: '在 AIswap 指定兑换池交易可以获得治理代币 AI 奖励', icon: ArtLiquidity,  extra: ArtExtraLiquidity},
    {to: '/ido', title: 'IDO', tip: 'Initial DeFi Offerings', small: '以一种全新的方式参与早期项目的认购，参与折价拍卖！', icon: ArtIdo,  extra: ArtExtraIdo, style: {backgroundColor: '#E1FAF6'}},
    {to: '/', title: '回购销毁', small: '打造 OKExChain 生态链最大的资产兑换平台', icon: ArtDestruction,  extra: ArtExtraDestruction}
  ]

  return (
    <Wrapper>
      <StyledHeader>
        <img width={'113px'} src={LogoMd} alt="logo" />
      </StyledHeader>
      <StyledMain>
        <StyledCover>
          <h1>
            <b>AIswap</b>更多AI，更有爱
            <small>OKExChain 生态一站式链上资产兑换与收益平台</small>
          </h1>
          <img src={ArtCover} />
        </StyledCover>

        <StyledFeatures>
          {
            features.map(item => {
              return (
                <StyledFeatureLink to={item.to} style={item.style}>
                  <img src={item.icon} />
                  <h3>
                    <span>{item.title}{item.tip ? (<em>{item.tip}</em>) : '' }</span>
                    <small>{item.small}</small>
                  </h3>
                  <span><img src={item.extra} /></span>
                </StyledFeatureLink>
              )
            })
          }
        </StyledFeatures>

        <StyledCooperation>
          <h3>生态合作伙伴</h3>
          <StyledCooperationBody>
            {
              cooperations.map(item => {
                return (
                  <StyledCooperationLink href={item.href} key={'item-' + item.id}>
                    <img width={item.width} src={item.src} alt={item.id} />
                  </StyledCooperationLink>
                )
              })
            }
          </StyledCooperationBody>
        </StyledCooperation>
      </StyledMain>
      <StyledFooter>
        <img width={'84px'} src={LogoWhite} alt="logo" />
      </StyledFooter>
    </Wrapper>
  )
}
