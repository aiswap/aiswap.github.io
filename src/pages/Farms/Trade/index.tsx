import React from 'react';
import styled from 'styled-components'
import aiido from '../../../assets/aiswap/ai-ido.svg'

const HeadFon = styled.div`
font-family: PingFang SC;
font-style: normal;
font-weight: 600;
font-size: 24px;
line-height: 32px;
/* identical to box height, or 133% */

letter-spacing: -0.02em;

/* Blue/6 */

color: #3939E6;
`
const HeaderD = styled.div`
justify-content: space-between;
display: flex;
align-items: flex-start;

`
const Head2Fon = styled.div`
font-family: PingFang SC;
font-style: normal;
font-weight: normal;
font-size: 16px;
line-height: 24px;
/* identical to box height, or 150% */

text-align: center;
letter-spacing: -0.005em;

/* Text/Caption */

color: #606080;
`

export default function Trade(){
    return(
        <>
            <div style={{color:'black',width:'100%'}}>
                <HeaderD className="pb-5 md:p-8">
                    <div>
                        <HeadFon>IDO : 去中心化新币发行平台</HeadFon>
                        <Head2Fon>使用全新的代币销售模型购买新代币</Head2Fon>
                    </div>
                    <img src={aiido}/>
                </HeaderD>
                
            </div>
        </>
    )
}