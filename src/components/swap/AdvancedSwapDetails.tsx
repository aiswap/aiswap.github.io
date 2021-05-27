import { Trade, TradeType } from '@uniswap/sdk'
import React, { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { Field } from '../../state/swap/actions'
import { useUserSlippageTolerance } from '../../state/user/hooks'
import { TYPE, ExternalLink } from '../../theme'
import { computeSlippageAdjustedAmounts, computeTradePriceBreakdown } from '../../utils/prices'
import { AutoColumn } from '../Column'
import QuestionHelper from '../QuestionHelper'
import { RowBetween, RowFixed } from '../Row'
import FormattedPriceImpact from './FormattedPriceImpact'
import SwapRoute from './SwapRoute'
import { useTranslation } from 'react-i18next'
import { GetInfoUrl } from '../../constants/infoSetting'

const InfoLink = styled(ExternalLink)`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.bg3};
  padding: 6px 6px;
  border-radius: 8px;
  text-align: center;
  font-size: 14px;
  color: ${({ theme }) => theme.text1};
`

function TradeSummary({ trade, allowedSlippage }: { trade: Trade; allowedSlippage: number }) {
  const { t } = useTranslation()
  const theme = useContext(ThemeContext)
  const { priceImpactWithoutFee, realizedLPFee } = computeTradePriceBreakdown(trade)
  const isExactIn = trade.tradeType === TradeType.EXACT_INPUT
  const slippageAdjustedAmounts = computeSlippageAdjustedAmounts(trade, allowedSlippage)

  return (
    <AutoColumn style={{ padding: '0 16px' }}>
      <RowBetween>
        <RowFixed>
          <TYPE.black fontSize={14} fontWeight={400} color={theme.text2}>
            {t(isExactIn ? 'exchange.minimumReceived' : 'exchange.maximumSold')}
          </TYPE.black>
          <QuestionHelper text={t('exchange.unfavorableSwapTip')} />
        </RowFixed>
        <RowFixed>
          <TYPE.black color={theme.text1} fontSize={14}>
            {isExactIn
              ? `${slippageAdjustedAmounts[Field.OUTPUT]?.toSignificant(4)} ${trade.outputAmount.currency.symbol}` ??
                '-'
              : `${slippageAdjustedAmounts[Field.INPUT]?.toSignificant(4)} ${trade.inputAmount.currency.symbol}` ??
                '-'}
          </TYPE.black>
        </RowFixed>
      </RowBetween>
      <RowBetween>
        <RowFixed>
          <TYPE.black fontSize={14} fontWeight={400} color={theme.text2}>
            {t('exchange.priceImpact')}
          </TYPE.black>
          <QuestionHelper text={t('exchange.differenceBetweenTip')} />
        </RowFixed>
        <FormattedPriceImpact priceImpact={priceImpactWithoutFee} />
      </RowBetween>

      <RowBetween>
        <RowFixed>
          <TYPE.black fontSize={14} fontWeight={400} color={theme.text2}>
            {t('exchange.liquidityProviderFee')}
          </TYPE.black>
          <QuestionHelper text={t('exchange.tradeProtocolIncentive', { tradeFee: '0.30'})} />
        </RowFixed>
        <TYPE.black fontSize={14} color={theme.text1}>
          {realizedLPFee ? `${realizedLPFee.toSignificant(4)} ${trade.inputAmount.currency.symbol}` : '-'}
        </TYPE.black>
      </RowBetween>
    </AutoColumn>
  )
}

export interface AdvancedSwapDetailsProps {
  trade?: Trade
}

export function AdvancedSwapDetails({ trade }: AdvancedSwapDetailsProps) {
  const { t } = useTranslation()
  const theme = useContext(ThemeContext)

  const [allowedSlippage] = useUserSlippageTolerance()

  const showRoute = Boolean(trade && trade.route.path.length > 2)

  return (
    <AutoColumn gap="0px">
      {trade && (
        <>
          <TradeSummary trade={trade} allowedSlippage={allowedSlippage} />
          {showRoute && (
            <RowBetween style={{ padding: '0 16px' }}>
              <span style={{ display: 'flex', alignItems: 'center' }}>
                <TYPE.black fontSize={14} fontWeight={400} color={theme.text2}>
                  {t('global.route')}
                </TYPE.black>
                <QuestionHelper text={t('exchange.routingBestPriceTrade')} />
              </span>
              <SwapRoute trade={trade} />
            </RowBetween>
          )}
          {!showRoute && (
            <AutoColumn style={{ padding: '12px 16px 0 16px' }}>
              <InfoLink
                href={GetInfoUrl({ type: 'pair', address: trade.route.pairs[0].liquidityToken.address})}
                target="_blank"
              >
                {t('exchange.viewPairAnalytics')} ↗
              </InfoLink>
            </AutoColumn>
          )}
        </>
      )}
    </AutoColumn>
  )
}
