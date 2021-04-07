import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import arrow_forward_24px from '../../assets/aiswap/arrow_forward_24px.svg'


/**
 * The styled container element that wraps the content of most pages and the tabs.
 */
const Hedsdd= styled.div`
background: #E3E7FF;
/* Input-Innershadow */

box-shadow: inset 0px 1px 0px rgba(0, 0, 0, 0.1);
border-radius: 20px;
color:#6368F2;
width:220px;
height:35px;
display:flex;
align-items:center;
margin:24px;

`
const Dekdje = styled.div`
background: #3939E6;
/* Button-Shadow/Blue */

box-shadow: 0px 2px 4px rgba(57, 57, 229, 0.25);
border-radius: 20px;
color:#FFFFFF;
width:110px;
height:35px;
display:flex;
align-items:center;
justify-content: center;
cursor:pointer;
`
const Fodkd= styled.div`
font-family: PingFang SC;
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 20px;
/* identical to box height, or 167% */

letter-spacing: -0.005em;

/* Green/6 */

color: #00BFA0;
`
export default function HeaderChoose({ isPool }: { isPool:Boolean }) {
  return <>
    <Fodkd style={{marginTop:'90px'}}>
      <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
        资产跨链&nbsp;&nbsp;
        <img src={arrow_forward_24px}/>
      </div>
    </Fodkd>
    {
        isPool ?(
            <>
            <Link to="/swap">
            <Hedsdd>
                <div style={{width:'50%',textAlign:'center',cursor:'pointer'}}>兑换</div>
                <Dekdje>资金池</Dekdje>
            </Hedsdd>
            </Link>
            </>
        ):(<>
            <Link to = "pool">
                <Hedsdd>
            <Dekdje>兑换</Dekdje>
                <div style={{width:'50%',textAlign:'center',cursor:'pointer'}}>资金池</div>
            </Hedsdd>
            </Link>
            </>
        )
    }
  </>
}
