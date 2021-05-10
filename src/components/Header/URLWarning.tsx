import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { AlertTriangle, X } from 'react-feather'
import { useURLWarningToggle, useURLWarningVisible } from '../../state/user/hooks'
import { isMobile } from 'react-device-detect'

const PhishAlert = styled.div<{ isActive: any }>`
  width: 100%;
  padding: 6px 6px;
  background-color: ${({ theme }) => theme.blue1};
  color: white;
  font-size: 11px;
  justify-content: space-between;
  align-items: center;
  display: ${({ isActive }) => (isActive ? 'flex' : 'none')};

  > div {
    display: flex;
    align-items: center;
  }

  :last-child {

  }

  > code {
    padding: 0 4px;
    display: inline;
    font-weight: bold;
  }

`

export const StyledClose = styled(X)`
  :hover {
    cursor: pointer;
  }
`

export default function URLWarning() {
  const { t } = useTranslation()
  const toggleURLWarning = useURLWarningToggle()
  const showURLWarning = useURLWarningVisible()

  const SAFE_DOMAIN = process.env.REACT_APP_SAFE_DOMAIN

  return isMobile
    ? (<PhishAlert isActive={showURLWarning}>
        <AlertTriangle style={{ marginRight: 6 }} size={12} />{t('global.makeSureUrlIs')}
        <code style={{ padding: '0 4px', display: 'inline', fontWeight: 'bold' }}>{SAFE_DOMAIN}</code>
        <StyledClose size={12} onClick={toggleURLWarning} />
      </PhishAlert>)
    : window.location.hostname === SAFE_DOMAIN
      ? (<PhishAlert isActive={showURLWarning}>
          <div style={{ display: 'flex' }}>
            <AlertTriangle style={{ marginRight: 6 }} size={12} />{t('global.AlwaysMakeSureUrlIs')}
            <code style={{ padding: '0 4px', display: 'inline', fontWeight: 'bold' }}>{SAFE_DOMAIN}</code> - {t('globa.bookmarkToBeSafe')}
          </div>
          <StyledClose size={12} onClick={toggleURLWarning} />
        </PhishAlert>)
      : (<PhishAlert isActive={showURLWarning}>
          <AlertTriangle style={{ marginRight: 6 }} size={12} />{t('global.makeSureUrlIs')}
          <code>{SAFE_DOMAIN}</code>
          <StyledClose className="ml-auto" size={12} onClick={toggleURLWarning} />
        </PhishAlert>)
}
