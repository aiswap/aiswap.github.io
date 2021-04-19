import React from 'react'
import styled from 'styled-components'
import bg_global from '../assets/aiswap/bg_global.png'

export const BodyWrapper = styled.div`
  position: relative;
  max-width: 420px;
  width: 100%;
  background: ${({ theme }) => theme.bg1};
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 16px 24px rgba(0, 0, 0, 0.04),
    0px 24px 32px rgba(0, 0, 0, 0.01);
  border-radius: 16px;
  /* padding: 1rem; */
  z-index:40;
`


export default function AppBody({ children }: { children: React.ReactNode }) {
  return <>
    <div style={{position:'absolute',marginTop:'22%'}} className="hidden md:block"><img src={bg_global}/></div>
    <BodyWrapper className="mt-10 md:mt-0">
    {children}
  </BodyWrapper>
  </>
}
