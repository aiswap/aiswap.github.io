import React from 'react'
import styled from 'styled-components'
import { STAKING_REWARDS_INFO, useStakingInfo } from '../../state/stake/hooks'
import { useTranslation } from 'react-i18next'
import PoolCard from '../../components/earn/PoolCard'
import Loader from '../../components/Loader'
import { useActiveWeb3React } from '../../hooks'
import { OutlineCard } from '../../components/Card'
// import DoubleCurrencyLogo from '../../components/DoubleLogo'
import { ReactComponent as LogoSingleFarm } from '../../assets/svg/logo/single/farm.svg'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const StyledHeader = styled.header`
  padding: 32px 56px 24px;
  justify-content: space-between;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    padding: 32px 24px 24px;
  `};
  display: flex;

  h3 {
    font-weight: bold;
    font-size: 24px;
    line-height: 32px;
    color: #3939e6;
  }
  small {
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;
    color: #606080;
  }
`

const StyledMain = styled.main`
  padding: 0 32px 32px;
  display: flex;
  flex-direction: column;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    padding: 0 24px 24px;
  `};
`

const StyledLogoSingleFarm = styled(LogoSingleFarm)`
  width: 64px;
  height: 64px;
`

const StyledListHeader = styled.div`
  padding: 8px 24px 8px;
  display: flex;
  justify-content: space-between;

  > span {
    font-size: 12px;
    line-height: 16px;
    color: #606080;
    flex: 1;
    padding-right: 4px;
  }

  > span:last-child {
    // margin-right: 54px;
  }
`

export default function Earn() {
  const { t } = useTranslation()
  const { chainId } = useActiveWeb3React()


  // staking info for connected account
  const stakingInfos = useStakingInfo()
  console.log('stakingInfos', stakingInfos)
  /**
   * only show staking cards with balance
   * @todo only account for this if rewards are inactive
   */
  const stakingInfosWithBalance = stakingInfos

  // toggle copy if rewards are inactive
  const stakingRewardsExist = Boolean(typeof chainId === 'number' && (STAKING_REWARDS_INFO[chainId]?.length ?? 0) > 0)
  console.log('stakingRewardsExist', stakingRewardsExist)

  return (
    <Wrapper>
      <StyledHeader>
        <div>
          <h3>{t('farm.liquidityMining')}</h3>
          <small className="">{t('farm.liquidityMiningTip')}</small>
        </div>
        <StyledLogoSingleFarm />
      </StyledHeader>
      <StyledMain>
        {stakingRewardsExist && stakingInfos?.length === 0
          ? (<Loader style={{ margin: 'auto' }} />)
          : !stakingRewardsExist
            ? (<OutlineCard className="text-center">{t('farm.noActivePools')}</OutlineCard>)
            : stakingInfos?.length !== 0 && stakingInfosWithBalance.length === 0
              ? (<OutlineCard className="text-center">{t('farm.noActivePools')}</OutlineCard>)
              : (
                <>
                  <StyledListHeader>
                    <span>{t('farm.pool')}</span>
                    <span className="d-none d-md-flex">TVL</span>
                    <span>{t('farm.apy')}</span>
                    <span className="d-none d-md-flex">{t('farm.todaysReward')}</span>
                    {/* <span className="d-none d-md-flex">{t('farm.poolRate')}</span> */}

                    {/* <span className="d-none d-md-flex">{t('farm.todaysReward')}</span>
                    <span className="d-none d-md-flex">{t('farm.earningsPer1000')}</span>
                    <span>{t('farm.apy')}</span>
                    <span className="d-none d-md-flex">{t('farm.liquidityVol')}</span>
                    <span className="d-none d-md-flex">{t('farm.multiple')}</span> */}
                  </StyledListHeader>
                  {
                    stakingInfosWithBalance?.map(stakingInfo => {
                      // need to sort by added liquidity here
                      return (<PoolCard key={stakingInfo.stakingRewardAddress} stakingInfo={stakingInfo} />)
                    })
                  }
                </>
                )
        }
      </StyledMain>
    </Wrapper>  )
}
