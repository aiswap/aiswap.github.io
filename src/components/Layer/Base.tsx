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
const StyledMainLayout = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`

export default function LayerBase({ children }: { children: React.ReactNode }) {
  return (
    <StyledLayout style={{ minHeight: '100vh' }}>
      <LayerSide>{null}</LayerSide>
      <StyledMainLayout>
        {children}
      </StyledMainLayout>
    </StyledLayout>
  )
}