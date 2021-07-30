import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { X } from 'react-feather'
import { useOKExEventToggle, useOKExEventVisible } from '../../state/user/hooks'
import IconGift from '../../assets/svg/icon/gift.svg'
import ArrowForwardRight from '../../assets/svg/icon/arrow_forward_right.svg'

const EventAlert = styled.div<{ isActive: any }>`
  width: 100%;
  padding: 12px 16px;
  background-color: #FFF;
  color: #151526;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  align-items: center;
  display: ${({ isActive }) => (isActive ? 'flex' : 'none')};

  b {
    color: #3939E6;
  }

  div > img {
    width: 12px;
    height: 12px;
  }
`

export const StyledClose = styled(X)`
  :hover {
    cursor: pointer;
  }
`

export default function OKExEvent() {
  const { t } = useTranslation()
  const toggleURLWarning = useOKExEventToggle()
  const showURLWarning = useOKExEventVisible()
  const StyledIcon = styled.img`
    height: 32px;
    width: 32px;
    margin-right: 16px;
    flex-shrink: 0;
  `
  const StyleBox = styled.div`
    display: flex;
    flex-wrap: wrap;
  `
  const StyledSubmit = styled.a`
    padding: 2px 8px;
    border: 1px solid #3939E6;
    border-radius: 6px;
    font-weight: 500;
    font-size: 12px;
    line-height: 20px;
    color: #3939E6;
    flex-shrink: 0;
    align-items: center;
    display: flex;
  `
  return <EventAlert isActive={showURLWarning}>
    <StyledIcon src={IconGift} />
    <StyleBox>
      <span className="py-1 mr-3">{t('global.OKExEvent1')}<b>{t('global.OKExEvent2')}</b>{t('global.OKExEvent3')}</span>
      <StyledSubmit href="https://www.cherryswap.net/pools/" target="_blank">{t('global.OKExEventSubmit')} <img className="ml-1" src={ArrowForwardRight} alt="" /></StyledSubmit>
    </StyleBox>
    <StyledClose className="ml-auto" size={12} onClick={toggleURLWarning} />
  </EventAlert>
}
