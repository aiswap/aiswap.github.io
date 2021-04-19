import React from 'react';
import styled from 'styled-components'
import AI from '../../assets/aipng/ai.png'
import Moresvg from '../../assets/aiswap/arrow_forward_24px.svg';
import Usdksvg from '../../assets/aiswap/usdk.svg';
import Sfgsvg from '../../assets/aiswap/sfg.svg';
import bg1 from '../../assets/aiswap/bg1.svg';
import extraleft from '../../assets/aiswap/extra-left.svg';
import extraright from '../../assets/aiswap/extra-right.svg';


const BoxDiv = styled.div`
    display:flex;
    justify-content:center;
    width:95%;
    color:black;
`
const HomeHead = styled.div`
    padding:32px 0;
`
const HeaderDiv = styled.div`
font-family: PingFang SC;
font-style: normal;
font-weight: normal;
line-height: 48px;

letter-spacing: -0.02em;
color: #3939E6;
`
const HeaderDivs = styled.div`
font-family: Cairo;
font-style: normal;
font-weight: normal;
line-height: 24px;
/* identical to box height, or 150% */

letter-spacing: -0.005em;

/* Text/primary */

color: #151526;
`

const HomeBar = styled.div`
    padding:20px 24px;
    display:flex;
    justify-content:left;
    height:284px;
    background: #FFFFFF;
/* Card Shadow */

box-shadow: 0px 2px 2px rgba(35, 40, 64, 0.04);
border-radius: 16px;
`
const HomeBarD = styled.div`
    display:flex;
    justify-content:space-between
    padding:4px 0;
    font-family: PingFang SC;
font-style: normal;
font-weight: normal;
font-size: 14px;
line-height: 22px;
/* identical to box height, or 157% */

letter-spacing: -0.005em;

/* Text/Caption */

color: #606080;
`
const HomeBody = styled.div`
    margin-top:3%;
`
const HomeFoot = styled.div`
background: linear-gradient(180deg, #9FF5E7 0%, #ABEFF5 100%);
/* Card/Stroke */

border: 1px solid rgba(35, 40, 64, 0.07);
box-sizing: border-box;
/* Card Shadow */

box-shadow: 0px 2px 2px rgba(35, 40, 64, 0.04);
border-radius: 16px;
padding:20px 24px;
margin:3% 0;
`
const BodyboxDiv = styled.div`
background: #FFFFFF;
/* Card/Stroke */

border: 1px solid rgba(35, 40, 64, 0.07);
box-sizing: border-box;
/* Card Shadow */

box-shadow: 0px 2px 2px rgba(35, 40, 64, 0.04);
border-radius: 16px;
padding:20px 24px;
margin

`
const LiquiditNum = styled.div`
font-family: Cairo;
font-style: normal;
font-weight: bold;
font-size: 30px;
line-height: 48px;
/* identical to box height, or 120% */

letter-spacing: -0.02em;

/* Blue/6 */

color: #3939E6;
`

const APys = styled.div`
font-family: Cairo;
font-style: normal;
font-weight: bold;
font-size: 16px;
line-height: 24px;
/* identical to box height, or 150% */

letter-spacing: -0.005em;

/* Blue/6 */

color: #3939E6;
display:flex;
align-items:center;
`
const UsdkFont = styled.div`
font-family: Cairo;
font-style: normal;
font-weight: bold;
font-size: 16px;
line-height: 24px;
/* identical to box height, or 150% */

letter-spacing: -0.005em;

/* Text/primary */

color: #151526;
`
const MoareFont = styled.span`
font-family: PingFang SC;
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 20px;
/* identical to box height, or 167% */

letter-spacing: -0.005em;

/* Green/6 */

color: #00BFA0;
`


export default function Home(){
    return(
        <>
            <BoxDiv className="mt-10 md:mt-0">
                <div style={{width:'100%'}}>
                    <HomeHead className="text-left md:flex md:justify-between">
                       <img src={extraleft}/>
                       <div>
                        <HeaderDiv className="text-3xl md:text-4xl"> AIswap - 更多AI,更有爱</HeaderDiv>
                        <HeaderDivs className="text-sm md:text-lg">OKExChain生态一站式链上资产兑换与收益平台</HeaderDivs>
                       </div>
                       <img src={extraright}/>
                    </HomeHead>
                    <HomeBar style={{backgroundImage:"url('"+bg1+"')",backgroundRepeat:'no-repeat',backgroundPosition: '87% 50%',backgroundSize: '33%'}}>
                        <div style={{width:'47%'}}>
                            <UsdkFont>当前流动性质押</UsdkFont>
                            <LiquiditNum>$39399393</LiquiditNum>
                            <div style={{padding:"10px 0px"}}>
                            <img src={AI}/>
                            </div>
                            <HomeBarD>
                                <div>AI总供应量</div>
                                <div>333333</div>
                            </HomeBarD>
                            <HomeBarD>
                                <div>AI总销毁量</div>
                                <div>333333</div>
                            </HomeBarD>
                            <HomeBarD>
                                <div>AI待分发数量</div>
                                <div>333333</div>
                            </HomeBarD>
                            <HomeBarD>
                                <div>实时通缩率</div>
                                <div>333333</div>
                            </HomeBarD>
                        </div>
                        {/* <div>
                            <img src={bg1}/>
                        </div> */}
                    </HomeBar>
                    <HomeBody className="flex-wrap md:flex md:justify-between">
                        <div  className="w-full md:w-1/2 md:pr-5">
                        <BodyboxDiv>
                            <div style={{display:'flex',justifyContent:'space-between'}}>
                                <UsdkFont>交易挖矿</UsdkFont>
                                <div  style={{display:'flex',alignItems:'center'}}>
                                    <MoareFont>更多&nbsp;&nbsp;</MoareFont>
                                    <img src={Moresvg}/></div>
                            </div>
                            <div style={{marginTop:'20px'}}>
                                <div style={{display:'flex',justifyContent:'space-between'}}>
                                    <div style={{display:'flex',alignItems:'center',padding:'10px',justifyContent:'space-between',width:'40%'}}>
                                        <span>1</span>
                                        <div style={{position:'relative',width:'50px',paddingTop:'5px'}}>
                                            <img src={AI}/>
                                            <img style={{position:'absolute',right:'5px',top:'0'}} src={Usdksvg}/>
                                        </div>
                                        <UsdkFont>AI-USDK</UsdkFont>
                                    </div>
                                    <APys>
                                    838.33%&nbsp;APY
                                    </APys>
                                </div>

                                <div style={{display:'flex',justifyContent:'space-between'}}>
                                    <div style={{display:'flex',alignItems:'center',padding:'10px',justifyContent:'space-between',width:'40%'}}>
                                        <span>1</span>
                                        <div style={{position:'relative',width:'50px',paddingTop:'5px'}}>
                                            <img src={AI}/>
                                            <img style={{position:'absolute',right:'5px',top:'0'}} src={Usdksvg}/>
                                        </div>
                                        <UsdkFont>AI-USDK</UsdkFont>
                                    </div>
                                    <APys>
                                    838.33%&nbsp;APY
                                    </APys>
                                </div>

                                <div style={{display:'flex',justifyContent:'space-between'}}>
                                    <div style={{display:'flex',alignItems:'center',padding:'10px',justifyContent:'space-between',width:'40%'}}>
                                        <span>1</span>
                                        <div style={{position:'relative',width:'50px',paddingTop:'5px'}}>
                                            <img src={AI}/>
                                            <img style={{position:'absolute',right:'5px',top:'0'}} src={Usdksvg}/>
                                        </div>
                                        <UsdkFont>AI-USDK</UsdkFont>
                                    </div>
                                    <APys>
                                    838.33%&nbsp;APY
                                    </APys>
                                </div>
                            </div>
                        </BodyboxDiv>
                        </div>
                        <div  className="w-full md:w-1/2 md:pl-5">
                        <BodyboxDiv>
                            <div style={{display:'flex',justifyContent:'space-between'}}>
                                <UsdkFont>流动性挖矿</UsdkFont>
                                <div style={{display:'flex',alignItems:'center'}}>
                                    <MoareFont>更多&nbsp;&nbsp;</MoareFont>
                                    <img src={Moresvg}/>
                                </div>
                            </div>
                            <div style={{marginTop:'20px'}}>
                                <div style={{display:'flex',justifyContent:'space-between'}}>
                                    <div style={{display:'flex',alignItems:'center',padding:'10px',justifyContent:'space-between',width:'40%'}}>
                                        <span>1</span>
                                        <div style={{position:'relative',width:'50px',paddingTop:'5px'}}>
                                            <img src={AI}/>
                                            <img style={{position:'absolute',right:'5px',top:'0'}} src={Usdksvg}/>
                                        </div>
                                        <UsdkFont>AI-USDK</UsdkFont>
                                    </div>
                                    <APys>
                                    838.33%&nbsp;APY
                                    </APys>
                                </div>

                                <div style={{display:'flex',justifyContent:'space-between'}}>
                                    <div style={{display:'flex',alignItems:'center',padding:'10px',justifyContent:'space-between',width:'40%'}}>
                                        <span>1</span>
                                        <div style={{position:'relative',width:'50px',paddingTop:'5px'}}>
                                            <img src={AI}/>
                                            <img style={{position:'absolute',right:'5px',top:'0'}} src={Usdksvg}/>
                                        </div>
                                        <UsdkFont>AI-USDK</UsdkFont>
                                    </div>
                                    <APys>
                                    838.33%&nbsp;APY
                                    </APys>
                                </div>

                                <div style={{display:'flex',justifyContent:'space-between'}}>
                                    <div style={{display:'flex',alignItems:'center',padding:'10px',justifyContent:'space-between',width:'40%'}}>
                                        <span>1</span>
                                        <div style={{position:'relative',width:'50px',paddingTop:'5px'}}>
                                            <img src={AI}/>
                                            <img style={{position:'absolute',right:'5px',top:'0'}} src={Usdksvg}/>
                                        </div>
                                        <UsdkFont>AI-USDK</UsdkFont>
                                    </div>
                                    <APys>
                                    838.33%&nbsp;APY
                                    </APys>
                                </div>
                            </div>
                        </BodyboxDiv>
                        </div>
                    </HomeBody>
                    
                    <HomeFoot>
                        <UsdkFont>
                            即将到来的IDO
                        </UsdkFont>
                        <div style={{marginTop:'20px',padding:'20px', backgroundColor:'white',borderRadius:'8px',width:'100%',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                            <div style={{display:'flex',justifyContent:'center',alignItems:'center',width:'50%'}}>
                                <img style={{width:'15%',marginRight:'16px'}} src={Sfgsvg}/>
                                <div >
                                    <UsdkFont>S.Finance <span>SFG</span></UsdkFont>
                                    <UsdkFont style={{fontSize:'14px',color:'#606080'}}>AMM protocol incorporating multi-strategy yield optimization</UsdkFont>
                                </div>
                            </div>
                            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                                <div style={{backgroundColor:'#F0F2FF',borderRadius:'8px',padding:'5px 10px'}}>⏰&nbsp;<span>Mar. 4,5PM SGT</span></div>
                                <span style={{display:'inline-block',margin:'0 5px 0 15px',color:'#00BFA0'}}>详细信息</span>
                                <img src={Moresvg}/>
                            </div>
                        </div>
                    </HomeFoot>
                </div>
            </BoxDiv>
        </>
    )
}