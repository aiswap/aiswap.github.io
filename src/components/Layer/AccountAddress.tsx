import React, { useState } from 'react'
// import { Text } from 'rebass'

import styled from 'styled-components'

import { useActiveWeb3React } from '../../hooks'
// import { useETHBalances } from '../../state/wallet/hooks'



import Web3Status from '../Web3Status'
import ClaimModal from '../claim/ClaimModal'

import Modal from '../Modal'
import UniBalanceContent from '../Header/UniBalanceContent'

const HeaderFrame = styled.div`
  padding: 12px;
`

const AccountElement = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme, active }) => (!active ? theme.bg1 : theme.bg3)};
  box-shadow: 0px 2px 4px rgba(0, 191, 159, 0.25);
  border-radius: 8px;
  white-space: nowrap;
  width: 100%;
  cursor: pointer;

  :focus {
    border: 1px solid blue;
  }
`

// const BalanceText = styled(Text)`
//   ${({ theme }) => theme.mediaWidth.upToExtraSmall`
//     display: none;
//   `};
// `

export const StyledMenuButton = styled.button`
  position: relative;
  width: 100%;
  height: 100%;
  border: none;
  background-color: transparent;
  margin: 0;
  padding: 0;
  height: 35px;
  background-color: ${({ theme }) => theme.bg3};
  margin-left: 8px;
  padding: 0.15rem 0.5rem;
  border-radius: 0.5rem;

  :hover,
  :focus {
    cursor: pointer;
    outline: none;
    background-color: ${({ theme }) => theme.bg4};
  }

  svg {
    margin-top: 2px;
  }
  > * {
    stroke: ${({ theme }) => theme.text1};
  }
`



export default function Header() {
  const { account } = useActiveWeb3React()

  // const userEthBalance = useETHBalances(account ? [account] : [])?.[account ?? '']
  // const [isDark] = useDarkModeManager()




  const [showUniBalanceModal, setShowUniBalanceModal] = useState(false)


  return (
    <HeaderFrame>
      <ClaimModal />
      <Modal isOpen={showUniBalanceModal} onDismiss={() => setShowUniBalanceModal(false)}>
        <UniBalanceContent setShowUniBalanceModal={setShowUniBalanceModal} />
      </Modal>

      <AccountElement active={!!account} style={{ pointerEvents: 'auto' }}>
        {/* {account && userEthBalance ? (
          <BalanceText style={{ flexShrink: 0 }} pl="0.75rem" pr="0.5rem" fontWeight={500}>
            {userEthBalance?.toSignificant(4)} OKT
          </BalanceText>
        ) : null} */}
        <Web3Status />
      </AccountElement>
    </HeaderFrame>
  )
}
