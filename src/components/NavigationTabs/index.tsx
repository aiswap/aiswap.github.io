import React from 'react'
import styled from 'styled-components'
import { darken } from 'polished'
import { useTranslation } from 'react-i18next'
import { NavLink, Link as HistoryLink } from 'react-router-dom'

import { RowBetween } from '../Row'
import QuestionHelper from '../QuestionHelper'
import Settings from '../Settings'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'state'
import { resetMintState } from 'state/mint/actions'
import ChevronLeft from '../../assets/svg/base/chevron_left.svg'

const Tabs = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  justify-content: space-evenly;
  border-radius: 20px;
  flex-wrap: wrap;

  a {
    padding: 8px 44px;
    font-size: 16px;
    border-radius: 20px;
    height: 40px;
    color: #6368F2;
    font-weight: 600;

    &.ACTIVE {
      background: rgb(57, 57, 230);
      border-radius: 20px;
      color: #fff;
      box-shadow: rgb(57 57 229 / 25%) 0px 2px 4px;
    }
  }
`

const StyledTabs = styled.div`
  align-items: center;
  border-radius: 16px;
  padding: 20px 24px 0;

  a {
    width: 24px;
    height: 24px;
    &.ACTIVE {
      background: rgb(57, 57, 230);
      border-radius: 20px;
      color: #fff;
      box-shadow: rgb(57 57 229 / 25%) 0px 2px 4px;
    }
  }
`

const activeClassName = 'ACTIVE'

const StyledNavLink = styled(NavLink).attrs({
  activeClassName
})`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  justify-content: center;
  height: 3rem;
  border-radius: 3rem;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.text3};
  font-size: 20px;

  &.${activeClassName} {
    border-radius: 12px;
    font-weight: 500;
    color: ${({ theme }) => theme.text1};
  }

  :hover,
  :focus {
    color: ${({ theme }) => darken(0.1, theme.text1)};
  }
`

const ActiveText = styled.div`
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #00BFA0;
  flex: 1;
`

const StyledQuestionHelper = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 6px;
  align-items: center;
`

export function SwapPoolTabs({ active }: { active: 'swap' | 'pool' }) {
  const { t } = useTranslation()
  return (
    <Tabs style={{ marginBottom: '24px' }}>
      <StyledNavLink id={`swap-nav-link`} to={'/swap'} isActive={() => active === 'swap'}>
        {t('swap')}
      </StyledNavLink>
      <StyledNavLink id={`pool-nav-link`} to={'/pool'} isActive={() => active === 'pool'}>
        {t('pool')}
      </StyledNavLink>
    </Tabs>
  )
}

export function FindPoolTabs() {
  return (
    <StyledTabs>
      <RowBetween>
        <HistoryLink to="/pool">
          <img src={ChevronLeft} alt="back"/>
        </HistoryLink>
        <ActiveText>Import Pool</ActiveText>
        <Settings />
        <StyledQuestionHelper>
          <QuestionHelper text="Use this tool to find pairs that don&apos;t automatically appear in the interface." />
        </StyledQuestionHelper>
      </RowBetween>
    </StyledTabs>
  )
}

export function AddRemoveTabs({ adding, creating }: { adding: boolean; creating: boolean }) {
  // reset states on back
  const dispatch = useDispatch<AppDispatch>()

  return (
    <StyledTabs>
      <RowBetween>
        <HistoryLink
          to="/pool"
          onClick={() => {
            adding && dispatch(resetMintState())
          }}
        >
          <img src={ChevronLeft} alt="back"/>
        </HistoryLink>
        <ActiveText>{creating ? '创建交易对' : adding ? '添加流动性' : '移除流动性'}</ActiveText>
        <Settings />
        <StyledQuestionHelper>
          <QuestionHelper text={
            creating
              ? 'You are the first liquidity provider.The ratio of tokens you add will set the price of this pool.Once you are happy with the rate click supply to review.'
              : 'When you add liquidity, you will receive pool tokens representing your position.These tokens automatically earn fees proportional to your share of the pool, and can be redeemed at any time.'
          } />
        </StyledQuestionHelper>
      </RowBetween>
    </StyledTabs>
  )
}
