import React from 'react'
import styled from 'styled-components'
import useCopyClipboard from '../../hooks/useCopyClipboard'
import { useTranslation } from 'react-i18next'
import { LinkStyledButton } from '../../theme'
import { CheckCircle, Copy } from 'react-feather'

const CopyIcon = styled(LinkStyledButton)`
  color: #606080;
  flex-shrink: 0;
  display: flex;
  text-decoration: none;
  font-size: 0.825rem;
  padding: 0px;
  :hover,
  :active,
  :focus {
    text-decoration: none;
    color: ${({ theme }) => theme.text2};
  }
`
const TransactionStatusText = styled.span`
  color: #606080;
  font-size: 14px;
  padding: 0;
  line-height: 24px;
  ${({ theme }) => theme.flexRowNoWrap};
  align-items: center;
`

export default function CopyHelper(props: { toCopy: string; children?: React.ReactNode }) {
  const [isCopied, setCopied] = useCopyClipboard()
  const { t } = useTranslation()

  return (
    <CopyIcon onClick={() => setCopied(props.toCopy)}>
      {isCopied ? (
        <TransactionStatusText>
          <CheckCircle size={'16'} />
          <TransactionStatusText>{t('global.copied')}</TransactionStatusText>
        </TransactionStatusText>
      ) : (
        <TransactionStatusText>
          <Copy size={'16'} />
        </TransactionStatusText>
      )}
      {isCopied ? '' : props.children}
    </CopyIcon>
  )
}
