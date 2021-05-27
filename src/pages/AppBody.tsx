import React from 'react'
import styled from 'styled-components'

export const BodyWrapper = styled.div`
  position: relative;
  max-width: 436px;
  width: 100%;
  box-shadow: 0px 2px 2px rgba(35, 40, 64, 0.04);
  background: #FFFFFF;
  border: 1px solid rgba(35, 40, 64, 0.07);
  border-radius: 16px;
  z-index: 1;
`

/**
 * The styled container element that wraps the content of most pages and the tabs.
 */
export default function AppBody({ children }: { children: React.ReactNode }) {
  return <BodyWrapper>{children}</BodyWrapper>
}
