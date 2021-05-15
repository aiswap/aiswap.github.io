import React from 'react'
import { Collapse } from 'antd'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { StyledInternalLink } from '../../theme'
import DoubleCurrencyLogo from '../DoubleLogo'
import { ETHER, JSBI, TokenAmount } from '@uniswap/sdk'
import { StakingInfo } from '../../state/stake/hooks'
import { currencyId } from '../../utils/currencyId'
import { unwrappedToken } from '../../utils/wrappedCurrency'
import { useTotalSupply } from '../../data/TotalSupply'
import { usePair } from '../../data/Reserves'
import useUSDCPrice from '../../utils/useUSDCPrice'
// import { BIG_INT_SECONDS_IN_WEEK } from '../../constants'
// import { ReactComponent as ArrowForwardRight } from '../../assets/svg/base/arrow_forward_right.svg'
import { ReactComponent as ArrowDropDown } from '../../assets/svg/base/arrow_drop_down.svg'
import { ButtonPink, ButtonSecondary } from '../../components/Button'

const { Panel } = Collapse

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
    color: #00bfa0;
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
    color: #b6b6bf;
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
  //
`

// const poolList: {
//   code: string
//   name: string
//   lptAddress: string
//   // token0?: Currency
//   // token1?: Currency
//   todaysReward: string
//   rewardTokenName: string
//   earnings: string
//   apy: string
//   liquidityVol: string
//   multiple: string
//   pengdingReward: string
//   pengdingRewardUsd: string
//   mortgageVol: string
//   mortgageUsd: string
// }[] = [
//   {
//     code: 'WOKT-BTCK',
//     name: 'WOKT - BTCK 1',
//     lptAddress: '',
//     todaysReward: '21,345.78',
//     rewardTokenName: 'AI',
//     earnings: '',
//     apy: '2,111',
//     liquidityVol: '7,128,708,779',
//     multiple: '20',
//     pengdingReward: '2,333.1',
//     pengdingRewardUsd: '21.34',
//     mortgageVol: '1',
//     mortgageUsd: '2'
//   },
//   {
//     code: 'WOKT-BTCK',
//     name: 'WOKT - BTCK 2',
//     lptAddress: '',
//     todaysReward: '21,345.78',
//     rewardTokenName: 'AI',
//     earnings: '',
//     apy: '2,111',
//     liquidityVol: '7,128,708,779',
//     multiple: '20',
//     pengdingReward: '2,333.1',
//     pengdingRewardUsd: '21.34',
//     mortgageVol: '1',
//     mortgageUsd: '2'
//   }
// ]

const StyledExtra = styled.div`
  width: 54px;
`

export default function PoolCard({ stakingInfo }: { stakingInfo: StakingInfo }) {
  const { t } = useTranslation()

  const token0 = stakingInfo.tokens[0]
  const token1 = stakingInfo.tokens[1]

  const currency0 = unwrappedToken(token0)
  const currency1 = unwrappedToken(token1)

  const isStaking = Boolean(stakingInfo.stakedAmount.greaterThan('0'))

  // get the color of the token
  // const token = currency0 === ETHER ? token1 : token0
  const WETH = currency0 === ETHER ? token0 : token1

  const totalSupplyOfStakingToken = useTotalSupply(stakingInfo.stakedAmount.token)
  const [, stakingTokenPair] = usePair(...stakingInfo.tokens)

  // let returnOverMonth: Percent = new Percent('0')
  let valueOfTotalStakedAmountInWETH: TokenAmount | undefined
  if (totalSupplyOfStakingToken && stakingTokenPair) {
    // take the total amount of LP tokens staked, multiply by ETH value of all LP tokens, divide by all LP tokens
    valueOfTotalStakedAmountInWETH = new TokenAmount(
      WETH,
      JSBI.divide(
        JSBI.multiply(
          JSBI.multiply(stakingInfo.totalStakedAmount.raw, stakingTokenPair.reserveOf(WETH).raw),
          JSBI.BigInt(2) // this is b/c the value of LP shares are ~double the value of the WETH they entitle owner to
        ),
        totalSupplyOfStakingToken.raw
      )
    )
  }

  // get the USD value of staked WETH
  const USDPrice = useUSDCPrice(WETH)
  const valueOfTotalStakedAmountInUSDC =
    valueOfTotalStakedAmountInWETH && USDPrice?.quote(valueOfTotalStakedAmountInWETH)
  const callback = (key: string) => {
    console.log(key)
  }
  return (
    <StyledCollapse
      defaultActiveKey={[1]}
      onChange={callback}
      expandIcon={({ isActive }) => (
        <StyledExtra
          onClick={e => {
            // e.stopPropagation();
          }}
        >
          {t(isActive ? 'global.hide' : 'global.more')}
          <ArrowDropDown style={{ transform: `rotate(${isActive ? 0 : 90})` }} />
        </StyledExtra>
      )}
    >
      <Panel
        key={1}
        header={
          <StyledContentHeader>
            <span className="d-flex">
              <DoubleCurrencyLogo currency0={currency0} currency1={currency1} size={24} />
              <b className="ml-3">
                {currency0.symbol}-{currency1.symbol}
              </b>
            </span>
            {/* <span>
              {item.todaysReward} <em>{item.rewardTokenName}</em>
            </span>
            <span className="d-none d-md-flex">
              {item.earnings} <em>{t('farm.earningsRate', { token: item.rewardTokenName })}</em>
            </span> */}
            <span className="d-none d-md-flex">
              {/* <em>$</em> {item.liquidityVol} */}
              {valueOfTotalStakedAmountInUSDC
                ? `$${valueOfTotalStakedAmountInUSDC.toFixed(0, { groupSeparator: ',' })}`
                : `${valueOfTotalStakedAmountInWETH?.toSignificant(4, { groupSeparator: ',' }) ?? '-'} ALPT`}
            </span>
            <span>
              - <em>%</em>
            </span>
            <span></span>
            {/* <span className="d-none d-md-flex">
              {item.multiple} <em>x</em>
              {stakingInfo
                ? stakingInfo.active
                  ? `${stakingInfo.totalRewardRate
                      ?.multiply(BIG_INT_SECONDS_IN_WEEK)
                      ?.toFixed(0, { groupSeparator: ',' })} SFG / ${t('global.week')}`
                  : `0 SFG / ${t('global.week')}`
                : '-'}
            </span> */}
          </StyledContentHeader>
        }
      >
        <StyledContentBoxItem className="col-12 col-md d-none">
          <h5>{t('farm.myRewardToBeClaimed')}</h5>
          <div>
            <span className="pb-3 pb-md-0 col-12 col-md px-0">
              <h3>
                <b>item.pengdingReward</b> item.rewardTokenName
              </h3>
              <small>≈$ item.pengdingRewardUsd</small>
            </span>
            <StyledButtonPink>{t('farm.receiveAward')}</StyledButtonPink>
          </div>
        </StyledContentBoxItem>
        <StyledContentBoxItem className="col-12 col-md">
          {/* <h5>
            {t('farm.myMortgage')}
            <a href="###">
              {t('farm.getLpt', { name: 'item.code' })}
              ALPT
              <ArrowForwardRight width="16px" />
            </a>
          </h5>
          <div className="d-flex"> */}
          {/* <span className="px-0 mr-auto">
              <small>{t('farm.myPoolRate')}</small>
              <h3>
                { isStaking && stakingInfo
                  ? stakingInfo.active
                    ? `${stakingInfo.rewardRate
                        ?.multiply(BIG_INT_SECONDS_IN_WEEK)
                        ?.toSignificant(4, { groupSeparator: ',' })} SFG / ${t('global.week')}`
                    : `0 SFG / ${t('global.week')}`
                  : '-'}
                <b>item.mortgageVol</b> item.code LPT
              </h3>
            </span> */}
          <StyledInternalLink className="ml-auto" to={`/SFG/${currencyId(currency0)}/${currencyId(currency1)}`}>
            <StyledButtonSecondary>{isStaking ? t('global.manage') : t('global.deposit')}</StyledButtonSecondary>
          </StyledInternalLink>
          {/* </div> */}
        </StyledContentBoxItem>
      </Panel>
    </StyledCollapse>
  )
}
