import React from 'react'
import styled from 'styled-components'
import Settings from '../Settings'
import { RowBetween } from '../Row'
import { TYPE } from '../../theme'
import { IconHistory } from '../../components/Icon/Base'

const StyledHistoryIcon = styled(IconHistory)`
  height: 20px;
  width: 20px;

  > * {
    stroke: ${({ theme }) => theme.text2};
  }

  :hover {
    opacity: 0.7;
  }
`

const StyledHistoryButton = styled.button`
  position: relative;
  border: none;
  background-color: transparent;
  margin: 0;
  padding: 0;
  height: 35px;
  padding: 0.15rem 0 0.15rem 0.5rem;
  border-radius: 0.5rem;
  margin-left: 4px;

  :hover,
  :focus {
    cursor: pointer;
    outline: none;
  }

  svg {
    margin-top: 2px;
  }
`

const StyledSwapHeader = styled.div`
  padding: 20px 24px 0;
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

const StyledTypeBlack = styled.div`
  flex: 1;
`

export default function SwapHeader() {
  const historyToggle = () => {
    console.log('historyToggle')
  }

  return (
    <StyledSwapHeader>
      <RowBetween>
        <StyledTypeBlack>
          <TYPE.black fontWeight={500}>
            兑换
            <small>Trade tokens in an instant</small>
          </TYPE.black>
        </StyledTypeBlack>
        <Settings />
        <StyledHistoryButton disabled onClick={historyToggle} >
          <StyledHistoryIcon />
        </StyledHistoryButton>
      </RowBetween>
    </StyledSwapHeader>
  )
}
