import React from 'react'
import { ColumnCenter } from '../../components/Column'
import { AutoRow } from '../../components/Row'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

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
import {
  // COMMUNITY_DISCORD,
  COMMUNITY_TELEGRAM,
  COMMUNITY_TWITTER,
  COMMUNITY_MEDIUM
} from '../../constants/infoSetting'

import LogoMd from '../../assets/svg/logo/md.svg'
import LogoWhite from '../../assets/svg/logo/white.svg'
// import CooperationKlend from '../../assets/svg/cooperation/klend.svg'
// import CooperationDMEX from '../../assets/svg/cooperation/dmex.svg'
// import CooperationSFinance from '../../assets/svg/cooperation/sfinance.svg'
// import CooperationSupremeX from '../../assets/svg/cooperation/superemex.svg'
// import CooperationBg from '../../assets/svg/art/extra-bg.svg'
import CooperationBgPng from '../../assets/svg/art/extra-bg.png'

import CommunityTelegram from '../../assets/svg/community/telegram_b.svg'
import CommunityTwitter from '../../assets/svg/community/twitter_b.svg'
// import CommunityDiscord from '../../assets/svg/community/discord_b.svg'
import CommunityMedium from '../../assets/svg/community/medium.svg'

import ArtSwap from '../../assets/svg/art/ai-swap.svg'
// import ArtTrademin from '../../assets/svg/art/ai-trademin.svg'
import ArtLiquidity from '../../assets/svg/art/ai-liqmin.svg'
import ArtIdo from '../../assets/svg/art/ai-ido.svg'
import ArtDestruction from '../../assets/svg/art/ai-destruction.svg'

import ArtExtraSwap from '../../assets/svg/art/extra-swap-11.png'
// import ArtExtraTrademin from '../../assets/svg/art/extra-trademin-11.png'
import ArtExtraLiquidity from '../../assets/svg/art/extra-liqmin-11.png'
import ArtExtraIdo from '../../assets/svg/art/extra-ido-11.png'
import ArtExtraDestruction from '../../assets/svg/art/extra-destruction-11.png'

import ArtCover from '../../assets/svg/art/art_01.svg'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const StyledHeader = styled.header`
  padding: 40px 40px 0;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    padding: 24px;
  `};
`

const StyledMain = styled.main`
  align-items: center;
  display: flex;
  flex-direction: column;
`

const StyledCover = styled.div`
  display: flex;
  // max-width: 1152px;
  max-width: 1200px;
  width: 100%;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 24px;

  h1 {
    color: #3939e6;
    // margin-right: 110px;
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
    margin-top: 16px;
  }
  img {
    // max-width: 564px;
    // max-height: 400px;
    position: relative;
    // margin: 0 24px;
  }
  ${({ theme }) => theme.mediaWidth.upToMedium`
    h1 {
      font-size: 32px;
      line-height: 40px;
    }
    h1 b {
      font-size: 40px;
      line-height: 48px;
    }
  `};
`

const StyledFeatures = styled.div`
  display: flex;
  flex-direction: column;
  // padding: 96px 0 72px;
  padding: 48px 0 24px;
  margin-top: -30px;
  width: 100%;
  background-color: #ffffff;
  align-items: center;

  a {
    // max-width: 1152px;
  }

  > div {
    padding: 0 24px;
    width: 100%;
    // max-width: 1152px;
    max-width: 1200px;
  }
`

const StyledFeatureLink = styled(Link)`
  padding: 0 24px;
  display: flex;
  background-color: #ffffff;
  border: 1px solid rgba(35, 40, 64, 0.07);
  box-shadow: 0px 2px 2px rgba(35, 40, 64, 0.04);
  border-radius: 16px;
  margin: 0 0 24px;
  align-items: center;
  width: 100%;
  // max-width: 1152px;
  max-width: 1200px;

  > div {
    padding: 20px 0;
    display: flex;
    // align-items: center;
  }
  > div > img {
    width: 72px;
    height: 72px;
    // margin: 56px 40px 56px 0;
  }
  h3 {
    margin-bottom: 0;
    display: flex;
    flex-direction: column;
    font-weight: 600;
    font-size: 24px;
    line-height: 32px;
    color: #151526;
    // margin: 56px 0;
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
    background: #ffffff;
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
  :hover {
    box-shadow: 0px 4px 4px rgba(35, 40, 64, 0.08);
  }
`

const StyledCooperation = styled(ColumnCenter)`
  justify-content: center;
  background: url(${CooperationBgPng}) no-repeat center;
  background-color: #f0f2ff;
  padding: 48px 0;

  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  h3 {
    font-weight: 600;
    font-size: 32px;
    line-height: 40px;
    color: #151526;
    margin: 0 0 12px;
  }

  ${({ theme }) => theme.mediaWidth.upToMedium`
    h3 {
      font-size: 24px;
      line-height: 32px;
      margin: 0 0 8px;
    }
  `};
`
const StyledCooperationBody = styled(AutoRow)`
  justify-content: center;
  padding: 0 40px;
`

const StyledCooperationLink = styled(ExternalLink)`
  margin: 12px 16px;
  background-color: rgba(240, 242, 255, 0.5);
  display: flex;
  flex-direction: column;
  color: #151526;
  align-items: center;
  font-weight: 600;
  font-size: 12px;
  line-height: 20px;

  :hover {
    opacity: 0.8;
    color: #151526;
    text-decoration: none;
  }
`

const StyledFooter = styled.footer`
  background-color: #151526;
  padding: 40px;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    padding: 24px;
  `};
`

// const DataRow = styled(RowBetween)`
//   ${({ theme }) => theme.mediaWidth.upToSmall`
// flex-direction: column;
// `};
// `

export default function About() {
  const { t } = useTranslation()

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
  // const cooperations: {id: string, href: string, width: string, src: string}[] = [
  //   { id: 'Klend', href: '###', width: '112px', src: CooperationKlend },
  //   { id: 'S.Finance', href: '###', width: '146px', src: CooperationSFinance },
  //   { id: 'SupremeX', href: '###', width: '164px', src: CooperationSupremeX },
  //   { id: 'DMEX', href: '###', width: '120px', src: CooperationDMEX }
  // ]

  const communities: { id: string; href: string; width: string; height: string; src: string }[] = [
    { id: 'telegram', href: COMMUNITY_TELEGRAM, width: '40px', height: '40px', src: CommunityTelegram },
    { id: 'twitter', href: COMMUNITY_TWITTER, width: '40px', height: '40px', src: CommunityTwitter },
    // { id: 'discord', href: COMMUNITY_DISCORD, width: '40px', height: '40px', src: CommunityDiscord },
    { id: 'medium', href: COMMUNITY_MEDIUM, width: '40px', height: '40px', src: CommunityMedium }
  ]

  const features: { to: string; title: string; tip?: string; small: string; icon: string; style?: object }[] = [
    {
      to: '/swap',
      title: 'about.featuresSwap',
      small: 'about.featuresSwapSub',
      icon: ArtSwap,
      style: {
        background: `url(${ArtExtraSwap}) no-repeat 97% center`,
        backgroundSize: 'contain',
        backgroundColor: '#FFE5FB'
      }
    },
    // {to: '/expect', title: 'about.featuresTrademin', small: 'about.featuresTrademinSub', icon: ArtTrademin, style: {background: `url(${ArtExtraTrademin}) no-repeat 97% center`, backgroundSize: 'contain'}},
    {
      to: '/SFG',
      title: 'about.featuresLiquidity',
      small: 'about.featuresLiquiditySub',
      icon: ArtLiquidity,
      style: { background: `url(${ArtExtraLiquidity}) no-repeat 97% center`, backgroundSize: 'contain' }
    },
    {
      to: '/expect',
      title: 'about.featuresIdo',
      tip: 'about.featuresIdoTip',
      small: 'about.featuresIdoSub',
      icon: ArtIdo,
      style: {
        background: `url(${ArtExtraIdo}) no-repeat 97% center`,
        backgroundSize: 'contain',
        backgroundColor: '#E1FAF6'
      }
    },
    {
      to: '/expect',
      title: 'about.featuresDestruction',
      small: 'about.featuresDestructionSub',
      icon: ArtDestruction,
      style: { background: `url(${ArtExtraDestruction}) no-repeat 97% center`, backgroundSize: 'contain' }
    }
  ]

  return (
    <Wrapper>
      <StyledHeader className="px-4 px-md-5">
        <img width={'113px'} src={LogoMd} alt="logo" />
      </StyledHeader>
      <StyledMain>
        <StyledCover className="no-gutters justify-content-center">
          <h1 className="col-12 col-lg-5">
            <b>AIswap</b>
            {t('about.title')}
            <small>{t('about.subtitle')}</small>
          </h1>
          <img className="col-12 col-md-6 ml-0 ml-lg-auto" src={ArtCover} alt="" />
        </StyledCover>

        <StyledFeatures>
          <div className="py-0 py-md-3">
            {features.map(item => {
              return (
                <StyledFeatureLink to={item.to} style={item.style} className="">
                  <div className="px-0 mx-0 px-md-4 my-0 my-md-4 mx-md-2 flex-column flex-md-row">
                    <img src={item.icon} className="mb-4 mb-md-0 mr-md-5" alt="" />
                    <h3>
                      <span>
                        {t(item.title)}
                        {item.tip ? <em>{t(item.tip)}</em> : ''}
                      </span>
                      <small>{t(item.small)}</small>
                    </h3>
                  </div>
                </StyledFeatureLink>
              )
            })}
          </div>
        </StyledFeatures>

        <StyledCooperation>
          <div className="py-0 py-md-5">
            <h3>{t('about.community')}</h3>
            <StyledCooperationBody>
              {communities.map(item => {
                return (
                  <StyledCooperationLink href={item.href} key={'item-' + item.id}>
                    <img width={item.width} height={item.height} src={item.src} alt={item.id} />
                    {item.id}
                  </StyledCooperationLink>
                )
              })}
            </StyledCooperationBody>
          </div>
        </StyledCooperation>
      </StyledMain>
      <StyledFooter>
        <img width={'84px'} src={LogoWhite} alt="logo" />
      </StyledFooter>
    </Wrapper>
  )
}
