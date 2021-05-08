import React from 'react'
import { Layout } from 'antd'
import LayerSide from './Sider'
import styled from 'styled-components'

const StyledLayout = styled(Layout)`
  display: flex;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    flex-direction: column !important;
  `};
`

export default function LayerBase({ children }: { children: React.ReactNode }) {
  return (
    <StyledLayout style={{ minHeight: '100vh' }}>
      <LayerSide>{null}</LayerSide>
      {children}
    </StyledLayout>
  )
}
