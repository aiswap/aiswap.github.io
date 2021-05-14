import React from 'react';
import styled from 'styled-components'
import { Currency } from '@uniswap/sdk'
import { ReactComponent as LogoSingleFarm } from '../../assets/svg/logo/single/farm.svg'
import { ReactComponent as ArrowForwardRight } from '../../assets/svg/base/arrow_forward_right.svg'
import { ReactComponent as ArrowDropDown } from '../../assets/svg/base/arrow_drop_down.svg'
import { useTranslation } from 'react-i18next'
import { Collapse } from 'antd'
import { ButtonPink, ButtonSecondary } from '../../components/Button'
import DoubleCurrencyLogo from '../../components/DoubleLogo'

const { Panel } = Collapse

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
    color: #3939E6;
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
    margin-right: 54px;
  }
`

const StyledCollapse = styled(Collapse)`
  &.ant-collapse {
    border-radius: 16px;
    border: 0px;
    background-color: transparent;
  }

  > .ant-collapse-item {
    background-color: #fff;
    border: 1px solid rgba(35, 40, 64, 0.07) !important;
    box-shadow: 0px 2px 2px rgba(35, 40, 64, 0.04);
    border-radius: 16px !important;
    margin-bottom: 8px;
  }

  > .ant-collapse-item .ant-collapse-header {
    padding: 24px !important;
    display: flex;
  }

  .ant-collapse-content-active {
    border-top: 1px solid rgba(21, 21, 38, 0.06);
    color: #606080;
  }

  .ant-collapse-content-box {
    padding: 24px 9px 4px !important;
    display: flex;
    flex-wrap: wrap;
  }

  > .ant-collapse-item:last-child > .ant-collapse-content {
    border-radius: 0 0 16px 16px;
  }

  .ant-collapse-arrow {
    right: 24px;
    left: auto !important;
    top: 18px !important;
  }
`

const StyledContentBoxItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

  h5 {
    font-weight: normal;
    font-size: 12px;
    line-height: 20px;
    color: #606080;
    display: flex;
    justify-content: space-between;
  }
  h5 a {
    font-weight: 500;
    font-size: 12px;
    line-height: 20px;
    color: #00BFA0;
    display: flex;
    align-items: center;
  }
  h3 {
    font-weight: 600;
    font-size: 12px;
    line-height: 20px;
    color: #151526;
    display: flex;
    align-items: baseline;
  }
  h3 b {
    font-size: 20px;
    line-height: 24px;
    margin-right: 4px;
  }
  > div {
    display: flex;
    padding: 16px 24px;
    border: 1px solid rgba(21, 21, 38, 0.06);
    border-radius: 8px;
    flex-wrap: wrap;
  }
  small {
    margin-top: 4px;
    font-weight: 600;
    font-size: 12px;
    line-height: 20px;
    color: #B6B6BF;
  }
`

const StyledButtonPink = styled(ButtonPink)`
  width: auto;
  padding: 14px 24px;
  font-size: 16px;
  line-height: 20px;
`

const StyledButtonSecondary = styled(ButtonSecondary)`
  width: auto;
  padding: 14px 24px;
  font-size: 16px;
  line-height: 20px;
`

const StyledContentHeader = styled.div`
  display: flex;
  flex: 1;

  span {
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    color: #151526;
    flex: 1;
    padding-right: 4px;
  }

  span em {
    font-style: normal;
    font-size: 12px;
  }

`

const callback = (key: string) => {
  console.log(key);
}

export default function Liquidity() {
  const { t } = useTranslation()

  const StyledExtra = styled.div`
    width: 54px;
  `

  // const extra = () => (
  //   <StyledExtra
  //     // onClick={e => {
  //     //   e.stopPropagation();
  //     // }}
  //   >
  //     {t('global.more')}
  //     <ArrowDropDown />
  //   </StyledExtra>
  // )

  const poolList: { code: string, name: string, lptAddress: string, token0?: Currency, token1?: Currency, todaysReward: string, rewardTokenName: string, earnings: string, apy: string, liquidityVol: string, multiple: string, pengdingReward: string, pengdingRewardUsd: string, mortgageVol: string, mortgageUsd: string}[]= [
    { code: 'WOKT-BTCK', name: 'WOKT - BTCK', lptAddress: '', todaysReward: '21,345.78', rewardTokenName: 'AI', earnings: '', apy: '2,111', liquidityVol: '7,128,708,779', multiple: '20', pengdingReward: '2,333.1', pengdingRewardUsd: '21.34', mortgageVol: '1', mortgageUsd: '2' },
  ]

  return(
    <Wrapper>
      <StyledHeader>
        <div>
          <h3>{t('farm.liquidityMining')}</h3>
          <small className="">{t('farm.liquidityMiningTip')}</small>
        </div>
        <StyledLogoSingleFarm />
      </StyledHeader>
      <StyledMain>
        <StyledListHeader>
          <span>{t('farm.pool')}</span>
          <span className="d-none d-md-flex">{t('farm.todaysReward')}</span>
          <span className="d-none d-md-flex">{t('farm.earningsPer1000')}</span>
          <span >{t('farm.apy')}</span>
          <span className="d-none d-md-flex">{t('farm.liquidityVol')}</span>
          <span className="d-none d-md-flex">{t('farm.multiple')}</span>
        </StyledListHeader>
        <StyledCollapse
          defaultActiveKey={[]}
          onChange={callback}
          expandIcon={({ isActive }) => (
            <StyledExtra
              onClick={e => {
                // e.stopPropagation();
              }}
            >
              {t(isActive ? 'global.hide' : 'global.more')}
              <ArrowDropDown style={{ transform: `rotate(${isActive ? 0 : 90})`}} />
            </StyledExtra>
          )}
        >
          {
            poolList.map((item, idx) => {
              return (
                <Panel
                  key={idx}
                  header={(
                    <StyledContentHeader>
                      <span>
                        <DoubleCurrencyLogo currency0={item.token0} currency1={item.token1} size={32} margin={true} />
                        <b>{item.name}</b>
                      </span>
                      <span>{item.todaysReward} <em>{item.rewardTokenName}</em></span>
                      <span className="d-none d-md-flex">{item.earnings} <em>{t('farm.earningsRate', { token: item.rewardTokenName})}</em></span>
                      <span className="d-none d-md-flex">{item.apy} <em>%</em></span>
                      <span className="d-none d-md-flex"><em>$</em> {item.liquidityVol}</span>
                      <span className="d-none d-md-flex">{item.multiple} <em>x</em></span>
                    </StyledContentHeader>
                  )}
                >
                  <StyledContentBoxItem className="col-12 col-md">
                    <h5>{t('farm.myRewardToBeClaimed')}</h5>
                    <div>
                      <span className="pb-3 pb-md-0 col-12 col-md px-0">
                        <h3><b>{item.pengdingReward}</b> {item.rewardTokenName}</h3>
                        <small>≈$ {item.pengdingRewardUsd}</small>
                      </span>
                      <StyledButtonPink
                      >
                        {t('farm.receiveAward')}
                      </StyledButtonPink>
                    </div>
                  </StyledContentBoxItem>
                  <StyledContentBoxItem className="col-12 col-md">
                    <h5>
                      {t('farm.myMortgage')}
                      <a href="###">
                        {t('farm.getLpt', { name: item.code })}
                        <ArrowForwardRight width="16px"  />
                      </a>
                    </h5>
                    <div>
                      <span className="pb-3 pb-md-0 col-12 col-md px-0">
                        <h3><b>{item.mortgageVol}</b> {item.code} LPT</h3>
                        <small>≈$ {item.mortgageUsd}</small>
                      </span>
                      <StyledButtonSecondary
                      >
                        {t('farm.lptMortgageRedemption')}
                      </StyledButtonSecondary>
                    </div>
                  </StyledContentBoxItem>
                </Panel>
              )
            })
          }
        </StyledCollapse>
      </StyledMain>
    </Wrapper>
  )
}