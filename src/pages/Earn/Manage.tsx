import React, { useCallback, useState } from 'react'
import { AutoColumn } from '../../components/Column'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { JSBI, TokenAmount, ETHER } from '@uniswap/sdk'
import { RouteComponentProps } from 'react-router-dom'
import DoubleCurrencyLogo from '../../components/DoubleLogo'
import { useCurrency } from '../../hooks/Tokens'
import { useWalletModalToggle } from '../../state/application/hooks'
import { TYPE } from '../../theme'
// import { ReactComponent as LogoSingleFarm } from '../../assets/svg/logo/single/farm.svg'
import { RowBetween } from '../../components/Row'
import { CardSection, DataCard } from '../../components/earn/styled'
import { ButtonPrimary, ButtonSecondary } from '../../components/Button'
import StakingModal from '../../components/earn/StakingModal'
import { useStakingInfo } from '../../state/stake/hooks'
import UnstakingModal from '../../components/earn/UnstakingModal'
import ClaimRewardModal from '../../components/earn/ClaimRewardModal'
import { useTokenBalance } from '../../state/wallet/hooks'
import { useActiveWeb3React } from '../../hooks'
// import { useColor } from '../../hooks/useColor'
import { CountUp } from 'use-count-up'

import { wrappedCurrency } from '../../utils/wrappedCurrency'
import { currencyId } from '../../utils/currencyId'
import { useTotalSupply } from '../../data/TotalSupply'
import { usePair } from '../../data/Reserves'
import usePrevious from '../../hooks/usePrevious'
import useUSDCPrice from '../../utils/useUSDCPrice'
import { BIG_INT_ZERO, BIG_INT_SECONDS_IN_WEEK } from '../../constants'


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

// const StyledLogoSingleFarm = styled(LogoSingleFarm)`
//   width: 64px;
//   height: 64px;
// `

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

const PositionInfo = styled(AutoColumn)<{ dim: any }>`
  position: relative;
  width: 100%;
  opacity: ${({ dim }) => (dim ? 0.4 : 1)};
`

const BottomSection = styled(AutoColumn)`
  border-radius: 12px;
  width: 100%;
  position: relative;
`



const StyledDataCard = styled.div`
  z-index: 2;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  margin: 24px 0;
  width: 100%;
  background-color: #E6FFF7;
  border-radius: 12px;
`

const StyledBottomCard = styled(DataCard)<{ dim: any }>`
  background: ${({ theme }) => theme.bg3};
  opacity: ${({ dim }) => (dim ? 0.4 : 1)};
  margin-top: -32px;
  padding: 0 1.25rem 1rem 1.25rem;
  padding-top: 12px;
  z-index: 1;
  border: 1px solid #CED0D9;
`

const PoolData = styled(DataCard)`
  background: none;
  background-color: #fff;
  border: 1px solid ${({ theme }) => theme.bg4};
  padding: 1rem;
  z-index: 1;
`

const VoteCard = styled.div`
  overflow: hidden;
  background-color: #E6FFF7;
  border-radius: 12px;
`

const DataRow = styled(RowBetween)`
  justify-content: center;
  gap: 12px;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    flex-direction: column;
    gap: 12px;
  `};
`

const StyledButtonSecondary = styled(ButtonSecondary)`
  font-size: 14px;
  padding: 6px 12px;
`

export default function Manage({
  match: {
    params: { currencyIdA, currencyIdB }
  }
}: RouteComponentProps<{ currencyIdA: string; currencyIdB: string }>) {
  const { t } = useTranslation()
  const { account, chainId } = useActiveWeb3React()

  // get currencies and pair
  const [currencyA, currencyB] = [useCurrency(currencyIdA), useCurrency(currencyIdB)]
  const tokenA = wrappedCurrency(currencyA ?? undefined, chainId)
  const tokenB = wrappedCurrency(currencyB ?? undefined, chainId)

  const [, stakingTokenPair] = usePair(tokenA, tokenB)
  const stakingInfo = useStakingInfo(stakingTokenPair)?.[0]

  // detect existing unstaked LP position to show add button if none found
  const userLiquidityUnstaked = useTokenBalance(account ?? undefined, stakingInfo?.stakedAmount?.token)
  const showAddLiquidityButton = Boolean(stakingInfo?.stakedAmount?.equalTo('0') && userLiquidityUnstaked?.equalTo('0'))

  // toggle for staking modal and unstaking modal
  const [showStakingModal, setShowStakingModal] = useState(false)
  const [showUnstakingModal, setShowUnstakingModal] = useState(false)
  const [showClaimRewardModal, setShowClaimRewardModal] = useState(false)

  // fade cards if nothing staked or nothing earned yet
  // const disableTop = !stakingInfo?.stakedAmount || stakingInfo.stakedAmount.equalTo(JSBI.BigInt(0))

  // const token = currencyA === ETHER ? tokenB : tokenA
  const WETH = currencyA === ETHER ? tokenA : tokenB
  // const backgroundColor = useColor(token)

  // get WETH value of staked LP tokens
  const totalSupplyOfStakingToken = useTotalSupply(stakingInfo?.stakedAmount?.token)
  let valueOfTotalStakedAmountInWETH: TokenAmount | undefined
  if (totalSupplyOfStakingToken && stakingTokenPair && stakingInfo && WETH) {
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

  const countUpAmount = stakingInfo?.earnedAmount?.toFixed(6) ?? '0'
  const countUpAmountPrevious = usePrevious(countUpAmount) ?? '0'

  // get the USD value of staked WETH
  const USDPrice = useUSDCPrice(WETH)
  const valueOfTotalStakedAmountInUSDC =
    valueOfTotalStakedAmountInWETH && USDPrice?.quote(valueOfTotalStakedAmountInWETH)

  const toggleWalletModal = useWalletModalToggle()

  const handleDepositClick = useCallback(() => {
    if (account) {
      setShowStakingModal(true)
    } else {
      toggleWalletModal()
    }
  }, [account, toggleWalletModal])

  return (
    <Wrapper>
      <StyledHeader>
        <div>
          <h3 className="d-flex align-items-center">
            <DoubleCurrencyLogo currency0={currencyA ?? undefined} currency1={currencyB ?? undefined} size={24} />
            <span className="ml-3">
              {currencyA?.symbol}-{currencyB?.symbol} {t('farm.liquidityMining')}
            </span>
          </h3>
          <small className=""></small>
        </div>
        {/* <StyledLogoSingleFarm /> */}
      </StyledHeader>
      <StyledMain>
        <DataRow style={{ gap: '24px' }}>
          <PoolData>
            <AutoColumn gap="sm">
              <TYPE.body style={{ margin: 0 }}>{t('farm.totalDepositsValue')}</TYPE.body>
              <TYPE.body fontSize={24} fontWeight={500}>
                {valueOfTotalStakedAmountInUSDC
                  ? `$${valueOfTotalStakedAmountInUSDC.toFixed(0, { groupSeparator: ',' })}`
                  : `${valueOfTotalStakedAmountInWETH?.toSignificant(4, { groupSeparator: ',' }) ?? '-'} OKT`}
              </TYPE.body>
            </AutoColumn>
          </PoolData>
          {/* <PoolData>
            <AutoColumn gap="sm">
              <TYPE.body style={{ margin: 0 }}>{t('farm.poolRate')}</TYPE.body>
              <TYPE.body fontSize={24} fontWeight={500}>
                {stakingInfo?.active
                  ? stakingInfo?.totalRewardRate
                      ?.multiply(BIG_INT_SECONDS_IN_WEEK)
                      ?.toFixed(0, { groupSeparator: ',' }) ?? '-'
                  : '0'}
                {` SFG / ${t('global.week')}`}
              </TYPE.body>
            </AutoColumn>
          </PoolData> */}
        </DataRow>

        {showAddLiquidityButton && (
          <VoteCard className="mt-4">
            <CardSection>
              <AutoColumn gap="md">
                <RowBetween>
                  <TYPE.body fontWeight={600}>{t('farm.lptStep1')}</TYPE.body>
                </RowBetween>
                <RowBetween style={{ marginBottom: '1rem' }}>
                  <TYPE.body fontSize={14}>
                    {t('farm.tokensAreRequiredTip', { currencyA: currencyA?.symbol, currencyB: currencyB?.symbol})}
                  </TYPE.body>
                </RowBetween>
                <ButtonPrimary
                  padding="8px"
                  borderRadius="8px"
                  width={'fit-content'}
                  as={Link}
                  to={`/add/${currencyA && currencyId(currencyA)}/${currencyB && currencyId(currencyB)}`}
                >
                  {t('farm.addLptTip', { currencyA: currencyA?.symbol, currencyB: currencyB?.symbol})}
                </ButtonPrimary>
              </AutoColumn>
            </CardSection>
          </VoteCard>
        )}

        {stakingInfo && (
          <>
            <StakingModal
              isOpen={showStakingModal}
              onDismiss={() => setShowStakingModal(false)}
              stakingInfo={stakingInfo}
              userLiquidityUnstaked={userLiquidityUnstaked}
            />
            <UnstakingModal
              isOpen={showUnstakingModal}
              onDismiss={() => setShowUnstakingModal(false)}
              stakingInfo={stakingInfo}
            />
            <ClaimRewardModal
              isOpen={showClaimRewardModal}
              onDismiss={() => setShowClaimRewardModal(false)}
              stakingInfo={stakingInfo}
            />
          </>
        )}

        <PositionInfo gap="lg" justify="center" dim={showAddLiquidityButton}>
          <BottomSection gap="lg" justify="center">
            <StyledDataCard>
              <CardSection>
                <AutoColumn gap="md">
                  <RowBetween>
                    <TYPE.body fontWeight={600}>{t('farm.yourLiquidityDeposits')}</TYPE.body>
                  </RowBetween>
                  <RowBetween style={{ alignItems: 'baseline' }}>
                    <TYPE.body fontSize={36} fontWeight={600}>
                      {stakingInfo?.stakedAmount?.toSignificant(6) ?? '-'}
                    </TYPE.body>
                    <TYPE.body>
                      LP {currencyA?.symbol}-{currencyB?.symbol}
                    </TYPE.body>
                  </RowBetween>
                </AutoColumn>
              </CardSection>
            </StyledDataCard>
            <StyledBottomCard dim={stakingInfo?.stakedAmount?.equalTo(JSBI.BigInt(0))}>
              <AutoColumn gap="sm">
                <RowBetween>
                  <div>
                    <TYPE.black>{t('farm.yourUnclaimedToken', { token: 'SFG'})}</TYPE.black>
                  </div>
                  {stakingInfo?.earnedAmount && JSBI.notEqual(BIG_INT_ZERO, stakingInfo?.earnedAmount?.raw) && (
                    <StyledButtonSecondary
                      padding="8px"
                      borderRadius="8px"
                      width="fit-content"
                      onClick={() => setShowClaimRewardModal(true)}
                    >
                      {t('farm.claim')}
                    </StyledButtonSecondary>
                  )}
                </RowBetween>
                <RowBetween style={{ alignItems: 'baseline' }}>
                  <TYPE.largeHeader fontSize={36} fontWeight={600}>
                    <CountUp
                      key={countUpAmount}
                      isCounting
                      decimalPlaces={4}
                      start={parseFloat(countUpAmountPrevious)}
                      end={parseFloat(countUpAmount)}
                      thousandsSeparator={','}
                      duration={1}
                    />
                  </TYPE.largeHeader>
                  <TYPE.black fontSize={16} fontWeight={500}>
                    <span role="img" aria-label="wizard-icon" style={{ marginRight: '8px ' }}>
                      ⚡
                    </span>
                    {stakingInfo?.active
                      ? stakingInfo?.rewardRate
                          ?.multiply(BIG_INT_SECONDS_IN_WEEK)
                          ?.toSignificant(4, { groupSeparator: ',' }) ?? '-'
                      : '0'}
                    {` SFG / ${t('global.week')}`}
                  </TYPE.black>
                </RowBetween>
              </AutoColumn>
            </StyledBottomCard>
          </BottomSection>
          <TYPE.main style={{ textAlign: 'center' }} fontSize={14}>
            <span role="img" aria-label="wizard-icon" style={{ marginRight: '8px' }}>
              ⭐️
            </span>{t('farm.whenYouWithdrawTip2')}
          </TYPE.main>

          {!showAddLiquidityButton && (
            <DataRow style={{ marginBottom: '1rem' }}>
              {stakingInfo && stakingInfo.active && (
                <ButtonPrimary padding="8px" width="180px" onClick={handleDepositClick}>
                  {stakingInfo?.stakedAmount?.greaterThan(JSBI.BigInt(0)) ? t('global.deposit') : t('farm.depositLpt', { token: 'LP' })}
                </ButtonPrimary>
              )}

              {stakingInfo?.stakedAmount?.greaterThan(JSBI.BigInt(0)) && (
                <>
                  <ButtonPrimary
                    padding="8px"
                    width="180px"
                    onClick={() => setShowUnstakingModal(true)}
                  >
                    {t('farm.withdraw')}
                  </ButtonPrimary>
                </>
              )}
            </DataRow>
          )}
          {!userLiquidityUnstaked ? null : userLiquidityUnstaked.equalTo('0') ? null : !stakingInfo?.active ? null : (
            <TYPE.main>{t('farm.lptTokensAvailable', { unstaked: userLiquidityUnstaked.toSignificant(6) })}</TYPE.main>
          )}
        </PositionInfo>
      </StyledMain>
    </Wrapper>
  )
}
