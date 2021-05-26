import React, { useContext, useMemo } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { Pair, JSBI } from '@uniswap/sdk'
import { Link } from 'react-router-dom'
import { SwapPoolTabs } from '../../components/NavigationTabs'
import { useTranslation } from 'react-i18next'
import AppBody from '../AppBody'
import FullPositionCard from '../../components/PositionCard'
import { useUserHasLiquidityInAllTokens } from '../../data/V1'
import { useTokenBalancesWithLoadingIndicator } from '../../state/wallet/hooks'
import { StyledInternalLink, ExternalLink, TYPE } from '../../theme'
import { Text } from 'rebass'
import Card from '../../components/Card'
import { RowBetween, RowFixed, AutoRow } from '../../components/Row'
import { ButtonPink, ButtonSecondary } from '../../components/Button'
import { AutoColumn } from '../../components/Column'
import { useActiveWeb3React } from '../../hooks'
import { usePairs } from '../../data/Reserves'
import { toV2LiquidityToken, useTrackedTokenPairs } from '../../state/user/hooks'
import { Dots, Wrapper } from '../../components/swap/styleds'
// import { CardSection, DataCard, CardNoise, CardBGImage } from '../../components/earn/styled'
import { useStakingInfo } from '../../state/stake/hooks'
import { BIG_INT_ZERO, ZERO_ADDRESS } from '../../constants'
import { Layout } from 'antd'
import BgGlobal from '../../assets/svg/art/bg_global.png'
import Settings from '../../components/Settings'
// import QuestionHelper from '../../components/QuestionHelper'

export const LayoutCenter = styled(Layout)<{ disabled?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background: url(${BgGlobal}) no-repeat center center !important;
`

// const VoteCard = styled(DataCard)`
//   background: radial-gradient(76.02% 75.41% at 1.84% 0%, #27ae60 0%, #000000 100%);
//   overflow: hidden;
// `

const StyledHeader = styled.div`
  width: 100%;
  max-width: 100%;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  color: ${({ theme }) => theme.text1};

  small {
    margin-top: 4px;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 22px;
    color: #606080;
    display: block;
  }
`

const TitleRow = styled(RowBetween)`
  // margin-top: 1rem;
  padding: 20px 0 0;
  flex-wrap: wrap;
  gap: 12px;
  width: 100%;
  border-top: 1px solid rgba(21, 21, 38, 0.06);

  font-size: 14px;
  font-weight: 700;
  line-height: 22px;
`

const ButtonRow = styled(RowFixed)`
  gap: 20px;
  flex-wrap: wrap;
  width: 100%;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    width: 100%;
    flex-direction: column;
    justify-content: space-between;
  `};
`

const ResponsiveButtonPink = styled(ButtonPink)`
  background: #00bfa0;
  flex: 1;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    width: 100%;
  `};
`

const ResponsiveButtonSecondary = styled(ButtonSecondary)`
  flex: 1;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    width: 100%;
  `};
`

const EmptyProposals = styled.div`
  padding: 12px;
  margin: 16px 0 16px;
  border-radius: 12px;
  font-size: 14px;
  display: flex;
  height: 70px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export default function Pool() {
  const { t } = useTranslation()
  const theme = useContext(ThemeContext)
  const { account } = useActiveWeb3React()

  // fetch the user's balances of all tracked V2 LP tokens
  const trackedTokenPairs = useTrackedTokenPairs()
  const pairResults = usePairs(trackedTokenPairs)
  const tokenPairsWithLiquidityTokens = useMemo(
    () =>
      trackedTokenPairs.map((tokens, index) => ({
        liquidityToken: toV2LiquidityToken(tokens, pairResults[index][1]?.pairAddress ?? ZERO_ADDRESS),
        tokens
      })),
    [trackedTokenPairs, pairResults]
  )
  const liquidityTokens = useMemo(() => tokenPairsWithLiquidityTokens.map(tpwlt => tpwlt.liquidityToken), [
    tokenPairsWithLiquidityTokens
  ])
  const [v2PairsBalances, fetchingV2PairBalances] = useTokenBalancesWithLoadingIndicator(
    account ?? undefined,
    liquidityTokens
  )

  console.log('v2PairsBalances', liquidityTokens)

  // fetch the reserves for all V2 pools in which the user has a balance
  const liquidityTokensWithBalances = useMemo(
    () =>
      tokenPairsWithLiquidityTokens.filter(({ liquidityToken }) =>
        v2PairsBalances[liquidityToken.address]?.greaterThan('0')
      ),
    [tokenPairsWithLiquidityTokens, v2PairsBalances]
  )

  const v2Pairs = usePairs(liquidityTokensWithBalances.map(({ tokens }) => tokens))
  const v2IsLoading =
    fetchingV2PairBalances || v2Pairs?.length < liquidityTokensWithBalances.length || v2Pairs?.some(V2Pair => !V2Pair)

  const allV2PairsWithLiquidity = v2Pairs.map(([, pair]) => pair).filter((v2Pair): v2Pair is Pair => Boolean(v2Pair))

  const hasV1Liquidity = useUserHasLiquidityInAllTokens()

  // show liquidity even if its deposited in rewards contract
  const stakingInfo = useStakingInfo()
  const stakingInfosWithBalance = stakingInfo?.filter(pool => JSBI.greaterThan(pool.stakedAmount.raw, BIG_INT_ZERO))
  const stakingPairs = usePairs(stakingInfosWithBalance?.map(stakingInfo => stakingInfo.tokens))

  // remove any pairs that also are included in pairs with stake in mining pool
  const v2PairsWithoutStakedAmount = allV2PairsWithLiquidity.filter(v2Pair => {
    return (
      stakingPairs
        ?.map(stakingPair => stakingPair[1])
        .filter(stakingPair => stakingPair?.liquidityToken.address === v2Pair.liquidityToken.address).length === 0
    )
  })
  console.log('v2PairsWithoutStakedAmount', trackedTokenPairs)
  return (
    <LayoutCenter>
      <SwapPoolTabs active={'pool'} />
      <AppBody>
        <Wrapper>
          <AutoColumn gap="md">
            <AutoRow>
              <StyledHeader>
                <RowBetween>
                  <TYPE.black fontWeight={600}>
                    {t('exchange.pool')}
                    <small>{t('exchange.addLiquidityReceiveLPT')}</small>
                  </TYPE.black>
                  <Settings />
                </RowBetween>
              </StyledHeader>
              <ButtonRow margin="16px 0 0">
                <ResponsiveButtonSecondary as={Link} padding="12px 24px" borderRadius="8px" to="/create/ETH">
                  <Text>{t('exchange.createPair')}</Text>
                </ResponsiveButtonSecondary>
                <ResponsiveButtonPink
                  id="join-pool-button"
                  as={Link}
                  padding="12px 24px"
                  borderRadius="8px"
                  to="/add/OKT"
                >
                  <Text fontWeight={'bold'}>{t('exchange.addLiquidity')}</Text>
                </ResponsiveButtonPink>
              </ButtonRow>
            </AutoRow>
            <TitleRow>
              <span>{t('exchange.yourLiquidity')}</span>
              {/* <QuestionHelper text="Your Liquidity tip" /> */}
            </TitleRow>

            {!account ? (
              <Card padding="40px">
                <TYPE.body style={{ fontSize: '14px' }} color={theme.text3} textAlign="center">
                  {t('exchange.connectWalletViewYourLiquidity')}
                </TYPE.body>
              </Card>
            ) : v2IsLoading ? (
              <EmptyProposals>
                <TYPE.body color={theme.text3} textAlign="center">
                  <Dots>{t('global.loading')}</Dots>
                </TYPE.body>
              </EmptyProposals>
            ) : allV2PairsWithLiquidity?.length > 0 || stakingPairs?.length > 0 ? (
              <>
                <ButtonSecondary style={{ display: 'none' }}>
                  <RowBetween>
                    <ExternalLink href={'/account/' + account}>{t('exchange.accountAnalyticsFees')}</ExternalLink>
                    <span> ↗</span>
                  </RowBetween>
                </ButtonSecondary>
                {v2PairsWithoutStakedAmount.map(v2Pair => (
                  <FullPositionCard key={v2Pair.liquidityToken.address} pair={v2Pair} />
                ))}
                {stakingPairs.map(
                  (stakingPair, i) =>
                    stakingPair[1] && ( // skip pairs that arent loaded
                      <FullPositionCard
                        key={stakingInfosWithBalance[i].stakingRewardAddress}
                        pair={stakingPair[1]}
                        stakedBalance={stakingInfosWithBalance[i].stakedAmount}
                      />
                    )
                )}
              </>
            ) : (
              <EmptyProposals>
                <TYPE.body fontWeight={'bold'} color={'#B6B6BF'} textAlign="center">
                  {t('exchange.noLiquidityFound')}
                </TYPE.body>
              </EmptyProposals>
            )}

            <AutoColumn gap="md">
              <Text fontSize={14} style={{ padding: '.5rem 0 0 0' }}>
                {hasV1Liquidity ? 'Uniswap V1 liquidity found!' : t('exchange.noSeePoolJoined')}{' '}
                <StyledInternalLink id="import-pool-link" to={hasV1Liquidity ? '/migrate/v1' : '/find'}>
                  {hasV1Liquidity ? 'Migrate now.' : t('exchange.importLiquidity')}
                </StyledInternalLink>
              </Text>
            </AutoColumn>
          </AutoColumn>
        </Wrapper>
      </AppBody>
    </LayoutCenter>
  )
}
