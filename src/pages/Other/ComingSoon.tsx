import React from 'react'
import styled from 'styled-components'
import Oops from '../../assets/images/art/oops.png'
import { useTranslation } from 'react-i18next'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
`

const StyledHeader = styled.header`

`

const StyledMain = styled.main`
  align-items: center;
  display: flex;
  flex-direction: column;

  img {
    width: 200px;
    height: 200px;
  }
  h4 {
    margin-top: 20px;
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 32px;
    color: #606080;
  }
`

const StyledFooter = styled.footer`

`

export default function ComingSoon() {
  const { t } = useTranslation()

  return (
    <Wrapper>
      <StyledHeader>
      </StyledHeader>
      <StyledMain>
        <img src={Oops} alt=""/>
        <h4>{t('global.comingSoon_')}</h4>
      </StyledMain>
      <StyledFooter>
      </StyledFooter>
    </Wrapper>
  )
}
