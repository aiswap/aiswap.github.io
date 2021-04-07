import React from 'react'
import styled from 'styled-components'
import Settings from '../Settings'
import { RowBetween } from '../Row'
import { TYPE } from '../../theme'

const StyledSwapHeader = styled.div`
  padding: 20px 24px 0;
  width: 100%;
  max-width: 100%;
  font-size: 16px;
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

export default function SwapHeader() {
  return (
    <StyledSwapHeader>
      <RowBetween>
        <TYPE.black fontWeight={500}>
          兑换
          <small>Trade tokens in an instant</small>
        </TYPE.black>
        <Settings />
      </RowBetween>
    </StyledSwapHeader>
  )
}
