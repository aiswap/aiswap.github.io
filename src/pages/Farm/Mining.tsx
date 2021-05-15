import React, {
  useState
  // useCallback
} from 'react'
import styled from 'styled-components'
import { Currency } from '@uniswap/sdk'
// import { useActiveWeb3React } from '../../hooks'
// import { useIsTransactionUnsupported } from 'hooks/Trades'
import { ReactComponent as LogoSingleFarm } from '../../assets/svg/logo/single/farm.svg'
import { ReactComponent as ArrowForwardRight } from '../../assets/svg/base/arrow_forward_right.svg'
import { ReactComponent as ArrowDropDown } from '../../assets/svg/base/arrow_drop_down.svg'
import {
  // ButtonError,
  // ButtonLight,
  ButtonPrimary
  // ButtonConfirmed
} from '../../components/Button'
import { useTranslation } from 'react-i18next'
// import Loader from '../../components/Loader'
// import ProgressSteps from '../../components/ProgressSteps'
// import Column from '../../components/Column'
// import { AutoRow, RowBetween } from '../../components/Row'
// import { TYPE } from '../../theme'
// import { Text } from 'rebass'
// import { GreyCard } from '../../components/Card'

// import { Field } from '../../state/swap/actions'
import { Collapse } from 'antd'
// import BetterTradeLink, { DefaultVersionLink } from '../../components/swap/BetterTradeLink'
import {
  BottomGrouping
  // SwapCallbackError
} from '../../components/swap/styleds'
// import {
//   useSwapState,
//   // useDerivedSwapInfo
// } from '../../state/swap/hooks'
// import { useWalletModalToggle } from '../../state/application/hooks'
import { ButtonPink, ButtonSecondary } from '../../components/Button'
import DoubleCurrencyLogo from '../../components/DoubleLogo'
import Modal from '../../components/Modal'
import CloseSVG from '../../assets/svg/base/close.svg'
// import CurrencyInputPanel from '../../components/CurrencyInputPanel'
// import useWrapCallback, { WrapType } from '../../hooks/useWrapCallback'

const { Panel } = Collapse

// const {
//   // independentField,
//   typedValue,
//   // recipient
// } = useSwapState()
// const { independentField, typedValue } = useSwapState()

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
`

const callback = (key: string) => {
  console.log(key)
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

  const poolList: {
    code: string
    name: string
    lptAddress: string
    token0?: Currency
    token1?: Currency
    todaysReward: string
    rewardTokenName: string
    earnings: string
    apy: string
    liquidityVol: string
    multiple: string
    pengdingReward: string
    pengdingRewardUsd: string
    mortgageVol: string
    mortgageUsd: string
  }[] = [
    {
      code: 'WOKT-BTCK',
      name: 'WOKT - BTCK 1',
      lptAddress: '',
      todaysReward: '21,345.78',
      rewardTokenName: 'AI',
      earnings: '',
      apy: '2,111',
      liquidityVol: '7,128,708,779',
      multiple: '20',
      pengdingReward: '2,333.1',
      pengdingRewardUsd: '21.34',
      mortgageVol: '1',
      mortgageUsd: '2'
    },
    {
      code: 'WOKT-BTCK',
      name: 'WOKT - BTCK 2',
      lptAddress: '',
      todaysReward: '21,345.78',
      rewardTokenName: 'AI',
      earnings: '',
      apy: '2,111',
      liquidityVol: '7,128,708,779',
      multiple: '20',
      pengdingReward: '2,333.1',
      pengdingRewardUsd: '21.34',
      mortgageVol: '1',
      mortgageUsd: '2'
    }
  ]

  const [isShow, setShow] = useState(false)

  const UpperSection = styled.div`
    position: relative;
    width: 100%;

    h5 {
      margin: 0;
      margin-bottom: 0.5rem;
      font-size: 1rem;
      font-weight: 400;
    }

    h5:last-child {
      margin-bottom: 0px;
    }

    h4 {
      margin-top: 0;
      font-weight: 500;
    }
  `

  const CloseIcon = styled.div`
    position: absolute;
    right: 26px;
    top: 19px;
    &:hover {
      cursor: pointer;
      opacity: 0.6;
    }
  `

  const HeaderRow = styled.div`
    ${({ theme }) => theme.flexRowNoWrap};
    padding: 20px 24px;
    font-weight: 500;
    line-height: 16px;
    color: #151526;
    font-size: 16px;
  `

  function toggleModal(show: boolean): void {
    setShow(show)
  }

  // const formattedAmounts = {
  //   [independentField]: typedValue,
  //   [dependentField]: showWrap
  //     ? parsedAmounts[independentField]?.toExact() ?? ''
  //     : parsedAmounts[dependentField]?.toSignificant(6) ?? ''
  // }

  // const { onSwitchTokens, onCurrencySelection, onUserInput, onChangeRecipient } = useSwapActionHandlers()

  // const handleTypeInput = useCallback(
  //   (value: string) => {
  //     onUserInput(Field.INPUT, value)
  //   },
  //   [onUserInput]
  // )
  // const trade = showWrap ? undefined : tradesByVersion[toggledVersion]
  // const route = trade?.route
  // const noRoute = !route

  // const {
  //   // v1Trade,
  //   // v2Trade,
  //   // currencyBalances,
  //   // parsedAmount,
  //   currencies,
  //   inputError: swapInputError
  // } = useDerivedSwapInfo()
  // const toggleWalletModal = useWalletModalToggle()
  // const { wrapType, execute: onWrap, inputError: wrapInputError } = useWrapCallback(
  //   currencies[Field.INPUT],
  //   currencies[Field.OUTPUT],
  //   typedValue
  // )
  // const showWrap: boolean = wrapType !== WrapType.NOT_APPLICABLE

  // const { account } = useActiveWeb3React()
  // const swapIsUnsupported = useIsTransactionUnsupported(currencies?.INPUT, currencies?.OUTPUT)

  const StyledBottomGrouping = styled(BottomGrouping)`
    display: flex;
    padding: 20px 24px 24px;

    button {
      padding: 14px 0;
      font-size: 16px;
    }
  `

  return (
    <Wrapper>
      <Modal isOpen={isShow} onDismiss={() => setShow(false)}>
        <UpperSection>
          <CloseIcon
            onClick={() => {
              toggleModal(false)
            }}
          >
            <img src={CloseSVG} alt="close" />
          </CloseIcon>
          <HeaderRow>{t('farm.depositLpt', { token: 'LPT'})}</HeaderRow>
          {/* <CurrencyInputPanel
            value={formattedAmounts[Field.INPUT]}
            showMaxButton={!atMaxAmountInput}
            currency={currencies[Field.INPUT]}
            onUserInput={handleTypeInput}
            onMax={handleMaxInput}
            onCurrencySelect={handleInputSelect}
            otherCurrency={currencies[Field.OUTPUT]}
            id="deposit-currency-input"
          /> */}
          <StyledBottomGrouping>
            <StyledButtonSecondary className="col mr-3">{t('global.cancel')}</StyledButtonSecondary>
            <ButtonPrimary className="col">{t('farm.deposit')}</ButtonPrimary>

            {/* {swapIsUnsupported ? (
                <ButtonPrimary disabled={true}>
                  <TYPE.main mb="4px">{t('exchange.unsupportedAsset')}</TYPE.main>
                </ButtonPrimary>
              ) : !account ? (
                <ButtonLight onClick={toggleWalletModal}>{t('wallet.submitConnect')}</ButtonLight>
              ) : showWrap ? (
                <ButtonPrimary disabled={Boolean(wrapInputError)} onClick={onWrap}>
                  {wrapInputError ??
                    (wrapType === WrapType.WRAP ? 'Wrap' : wrapType === WrapType.UNWRAP ? 'Unwrap' : null)}
                </ButtonPrimary>
              ) : noRoute && userHasSpecifiedInputOutput ? (
                <GreyCard style={{ textAlign: 'center' }}>
                  <TYPE.main mb="4px">{t('exchange.tradeInsufficientLiquidity')}</TYPE.main>
                  {singleHopOnly && <TYPE.main mb="4px">{t('exchange.tryEnablingMultiHopTrades')}</TYPE.main>}
                </GreyCard>
              ) : showApproveFlow ? (
                <RowBetween>
                  <ButtonConfirmed
                    onClick={approveCallback}
                    disabled={approval !== ApprovalState.NOT_APPROVED || approvalSubmitted}
                    width="48%"
                    altDisabledStyle={approval === ApprovalState.PENDING} // show solid button while waiting
                    confirmed={approval === ApprovalState.APPROVED}
                  >
                    {approval === ApprovalState.PENDING ? (
                      <AutoRow gap="6px" justify="center">
                        Approving <Loader stroke="white" />
                      </AutoRow>
                    ) : approvalSubmitted && approval === ApprovalState.APPROVED ? (
                      t('exchange.approved')
                    ) : (
                      t('exchange.approve') + currencies[Field.INPUT]?.symbol
                    )}
                  </ButtonConfirmed>
                  <ButtonError
                    onClick={() => {
                      if (isExpertMode) {
                        handleSwap()
                      } else {
                        setSwapState({
                          tradeToConfirm: trade,
                          attemptingTxn: false,
                          swapErrorMessage: undefined,
                          showConfirm: true,
                          txHash: undefined
                        })
                      }
                    }}
                    width="48%"
                    id="swap-button"
                    disabled={
                      !isValid || approval !== ApprovalState.APPROVED || (priceImpactSeverity > 3 && !isExpertMode)
                    }
                    error={isValid && priceImpactSeverity > 2}
                  >
                    <Text fontSize={16} fontWeight={500}>
                      {priceImpactSeverity > 3 && !isExpertMode
                        ? t('exchange.priceImpactHigh')
                        : t( priceImpactSeverity > 2 ? 'exchange.swapAnyway' : 'exchange.swap')}
                    </Text>
                  </ButtonError>
                </RowBetween>
              ) : (
                <ButtonError
                  onClick={() => {
                    if (isExpertMode) {
                      handleSwap()
                    } else {
                      setSwapState({
                        tradeToConfirm: trade,
                        attemptingTxn: false,
                        swapErrorMessage: undefined,
                        showConfirm: true,
                        txHash: undefined
                      })
                    }
                  }}
                  id="swap-button"
                  disabled={!isValid || (priceImpactSeverity > 3 && !isExpertMode) || !!swapCallbackError}
                  error={isValid && priceImpactSeverity > 2 && !swapCallbackError}
                >
                  <Text fontSize={20} fontWeight={500}>
                    {swapInputError
                      ? swapInputError
                      : priceImpactSeverity > 3 && !isExpertMode
                        ? t('exchange.priceImpactTooHigh')
                        : t(priceImpactSeverity > 2 ? 'exchange.swapAnyway' : 'exchange.swap')}
                  </Text>
                </ButtonError>
              )}
              {showApproveFlow && (
                <Column style={{ marginTop: '1rem' }}>
                  <ProgressSteps steps={[approval === ApprovalState.APPROVED]} />
                </Column>
              )}
              {isExpertMode && swapErrorMessage ? <SwapCallbackError error={swapErrorMessage} /> : null}
              {betterTradeLinkV2 && !swapIsUnsupported && toggledVersion === Version.v1 ? (
                <BetterTradeLink version={betterTradeLinkV2} />
              ) : toggledVersion !== DEFAULT_VERSION && defaultTrade ? (
                <DefaultVersionLink />
              ) : null} */}
          </StyledBottomGrouping>
        </UpperSection>
      </Modal>

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
          <span>{t('farm.apy')}</span>
          <span className="d-none d-md-flex">{t('farm.liquidityVol')}</span>
          <span className="d-none d-md-flex">{t('farm.multiple')}</span>
        </StyledListHeader>
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
          {poolList.map((item, idx) => {
            return (
              <Panel
                key={idx}
                header={
                  <StyledContentHeader>
                    <span>
                      <DoubleCurrencyLogo currency0={item.token0} currency1={item.token1} size={32} margin={true} />
                      <b>{item.name}</b>
                    </span>
                    <span>
                      {item.todaysReward} <em>{item.rewardTokenName}</em>
                    </span>
                    <span className="d-none d-md-flex">
                      {item.earnings} <em>{t('farm.earningsRate', { token: item.rewardTokenName })}</em>
                    </span>
                    <span className="d-none d-md-flex">
                      {item.apy} <em>%</em>
                    </span>
                    <span className="d-none d-md-flex">
                      <em>$</em> {item.liquidityVol}
                    </span>
                    <span className="d-none d-md-flex">
                      {item.multiple} <em>x</em>
                    </span>
                  </StyledContentHeader>
                }
              >
                <StyledContentBoxItem className="col-12 col-md">
                  <h5>{t('farm.myRewardToBeClaimed')}</h5>
                  <div>
                    <span className="pb-3 pb-md-0 col-12 col-md px-0">
                      <h3>
                        <b>{item.pengdingReward}</b> {item.rewardTokenName}
                      </h3>
                      <small>≈$ {item.pengdingRewardUsd}</small>
                    </span>
                    <StyledButtonPink>{t('farm.receiveAward')}</StyledButtonPink>
                  </div>
                </StyledContentBoxItem>
                <StyledContentBoxItem className="col-12 col-md">
                  <h5>
                    {t('farm.myMortgage')}
                    <a href="###">
                      {t('farm.getLpt', { name: item.code })}
                      <ArrowForwardRight width="16px" />
                    </a>
                  </h5>
                  <div>
                    <span className="pb-3 pb-md-0 col-12 col-md px-0">
                      <h3>
                        <b>{item.mortgageVol}</b> {item.code} LPT
                      </h3>
                      <small>≈$ {item.mortgageUsd}</small>
                    </span>
                    <StyledButtonSecondary
                      className="mr-3"
                      onClick={() => {
                        toggleModal(true)
                      }}
                    >
                      {t('farm.deposit')}
                    </StyledButtonSecondary>
                    <StyledButtonSecondary
                      onClick={() => {
                        toggleModal(true)
                      }}
                    >
                      {t('farm.withdraw')}
                    </StyledButtonSecondary>
                  </div>
                </StyledContentBoxItem>
              </Panel>
            )
          })}
        </StyledCollapse>
      </StyledMain>
    </Wrapper>
  )
}
