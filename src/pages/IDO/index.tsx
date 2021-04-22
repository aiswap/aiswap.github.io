import React ,{useState,useEffect}from 'react';
import styled from 'styled-components'
import aiido from '../../assets/aiswap/ai-ido.svg'
import aisvg from '../../assets/aiswap/ai.svg'
import Sfgsvg from '../../assets/aiswap/sfg.svg';
import {Link } from 'react-router-dom'
import { getStarterContract,getContract } from '../../utils'
import { useActiveWeb3React } from '../../hooks'
import erc20 from '../../constants/abis/erc20.json';
import {STAETER_ADDRESS} from '../../constants'

const Logo1 = styled.div`
display: flex;
    align-items: center;
    margin-bottom:20px;
`
const Logcon1 = styled.div`
display: flex;
    justify-content: space-between;
    font-family: PingFang SC;
font-style: normal;
font-weight: normal;
font-size: 14px;
line-height: 22px;
/* identical to box height, or 157% */

letter-spacing: -0.005em;

/* Text/Caption */

color: #606080;
padding:4px 0 4px 0;
`
const Butchoose = styled.div`
text-align:center;
background: #00BFA0;
/* Button-Shadow/Green */
margin-top:20px;
box-shadow: 0px 2px 4px rgba(0, 191, 159, 0.25);
border-radius: 8px;
font-family: PingFang SC;
font-style: normal;
font-weight: 600;
font-size: 20px;
line-height: 24px;
/* identical to box height, or 120% */
padding:12px;
letter-spacing: -0.005em;

color: #FFFFFF;
`

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
const BoxSdi = styled.div`
background: #FFFFFF;
/* Card/Stroke */
padding:24px;
border: 1px solid rgba(35, 40, 64, 0.07);
box-sizing: border-box;
/* Card Shadow */

box-shadow: 0px 2px 2px rgba(35, 40, 64, 0.04);
border-radius: 16px;
`
const ValuFon = styled.span`
font-family: Cairo;
font-style: normal;
font-weight: bold;
font-size: 14px;
line-height: 22px;
/* identical to box height, or 157% */

text-align: right;
letter-spacing: -0.005em;

/* Text/Caption */

color: #606080;
`

export default function IDO(){
    const { account, chainId, library } = useActiveWeb3React()
    const [waitSellAmount,setwaitSellAmount] = useState("0")
    const [totalPurchasedCurrency,settotalPurchasedCurrency] = useState("0")
    const [completed,setcompleted]= useState(false)
    const [currencySymbol,setcurrencySymbol] = useState("OKT")
    const [IDOSymbol,setIDOSYmbol] = useState("AI")

    useEffect(()=>{
        if(account){
            getDatas()
        }
        
    },[account])

    async function getDatas(){
        if (!chainId || !library || !account ) throw new Error('missing dependencies')
        let starter = getStarterContract(chainId, library, account);
        let currency = await starter.currency();
        let idoToken = await starter.underlying();
        let tokenConIDO = getContract(idoToken,erc20,library,account);
        let currencyToken = getContract(currency,erc20,library,account);
        let symbolCurrency = await currencyToken.symbol()
        setcurrencySymbol(symbolCurrency)
        let symbolIDO = await tokenConIDO.symbol();
        setIDOSYmbol(symbolIDO)

        let waitSellAmount = await tokenConIDO.balanceOf(STAETER_ADDRESS)
        setwaitSellAmount(parseEth(waitSellAmount));
        let totalPurchasedCurrency = await starter.totalPurchasedCurrency();
        settotalPurchasedCurrency(totalPurchasedCurrency+"");
        let completed = await starter.completed();
        setcompleted(completed)
    }
    function parseEth(amount:any){
        return Number(amount/10**18).toFixed(4)
    }
    

    return(
        <>
            <div style={{color:'black',width:'100%'}} className="mt-14 md:mt-0">
                <HeaderD className="pb-5 md:p-8">
                    <div>
                        <HeadFon>IDO : 去中心化新币发行平台</HeadFon>
                        <Head2Fon>使用全新的代币销售模型购买新代币</Head2Fon>
                    </div>
                    <img src={aiido}/>
                </HeaderD>
                <div style={{background:'linear-gradient(180deg, #9FF5E7 0%, #ABEFF5 100%)'}} className="pt-7 pr-3 pl-3 md:pr-8 md:pl-8 pb-6 ">
                    <div>即将到来的IDO</div>
                    <div style={{marginTop:'20px'}} className="md:pl-20 md:pr-20 md:flex md:justify-center">
                        <BoxSdi className="w-full md:w-2/5">
                            <div>
                                <Logo1>
                                    <img style={{width:'24%',marginRight:'20px'}} src={aisvg}/>
                                    <div>
                                        <div style={{fontSize:'20px',color:'#151526'}}>AIswap</div>
                                        <div style={{fontSize:'14px',color:'#606080'}}>AMM protocol incorporating multi-strategy yield optimization</div>
                                    </div>
                                </Logo1>
                                <div>
                                    <Logcon1>
                                        <span>方式</span>
                                        <ValuFon>公开</ValuFon>
                                    </Logcon1>
                                    <Logcon1>
                                        <span>存入</span>
                                        <ValuFon>{currencySymbol}</ValuFon>
                                    </Logcon1>
                                    <Logcon1>
                                        <span>获得</span>
                                        <ValuFon>{IDOSymbol}</ValuFon>
                                    </Logcon1>
                                    <Logcon1>
                                        <span>待售</span>
                                        <ValuFon>{waitSellAmount} {IDOSymbol}</ValuFon>
                                    </Logcon1>
                                    <Logcon1>
                                        <span>募集资金</span>
                                        <ValuFon>{totalPurchasedCurrency}</ValuFon>
                                    </Logcon1>
                                    <Logcon1>
                                        <span>兑换占比</span>
                                        <ValuFon>0.00%</ValuFon>
                                    </Logcon1>
                                    <Logcon1>
                                        <span>状态</span>
                                        <ValuFon>{completed ?("结束"):("进行中")}</ValuFon>
                                    </Logcon1>
                                    <Link style={{textDecoration:'none',color:'#606080'}} to="/detail_ido_starter">
                                    <Butchoose>选择</Butchoose>
                                    </Link>
                                    
                                </div>
                            </div>
                        </BoxSdi>
                        <div style={{width:'24px'}}></div>
                        <BoxSdi className="w-full md:w-2/5  mt-5 md:mt-0">
                            <div>
                                <Logo1>
                                    <img style={{width:'24%',marginRight:'20px'}} src={aisvg}/>
                                    <div>
                                        <div style={{fontSize:'20px',color:'#151526'}}>AIswap</div>
                                        <div style={{fontSize:'14px',color:'#606080'}}>AMM protocol incorporating multi-strategy yield optimization</div>
                                    </div>
                                </Logo1>
                                <div>
                                    <Logcon1>
                                        <span>方式</span>
                                        <ValuFon>白名单</ValuFon>
                                    </Logcon1>
                                    <Logcon1>
                                        <span>存入</span>
                                        <ValuFon>OKT</ValuFon>
                                    </Logcon1>
                                    <Logcon1>
                                        <span>获得</span>
                                        <ValuFon>AI</ValuFon>
                                    </Logcon1>
                                    <Logcon1>
                                        <span>待售</span>
                                        <ValuFon>15,000,000 AI</ValuFon>
                                    </Logcon1>
                                    <Logcon1>
                                        <span>募集资金</span>
                                        <ValuFon>$3,000</ValuFon>
                                    </Logcon1>
                                    <Logcon1>
                                        <span>你的认购占比</span>
                                        <ValuFon>0.00%</ValuFon>
                                    </Logcon1>
                                    <Logcon1>
                                        <span>状态</span>
                                        <ValuFon>02:04:03</ValuFon>
                                    </Logcon1>
                                    
                                        <Link style={{textDecoration:'none',color:'#606080'}} to="/detail_ido_offering">
                                        <Butchoose>选择</Butchoose>
                                        </Link>
                                    
                                </div>
                            </div>
                        </BoxSdi>
                    </div>
                </div>

                <div style={{backgroundColor:'#D4D4D9'}} className="pt-7 pr-3 pl-3 md:pr-8 md:pl-8 pb-6 ">
                    <div>已结束的IDO</div>
                    <div style={{marginTop:'20px'}} className="md:flex md:justify-center md:pl-20 md:pr-20" >
                        <BoxSdi className="w-full md:w-2/5">
                            <div>
                                <Logo1>
                                    <img style={{width:'25%',marginRight:'16px'}} src={Sfgsvg}/>
                                    <div>
                                        <div style={{fontWeight:'bold'}}>S.Finance &nbsp;&nbsp;<span style={{color:'#3939E6',backgroundColor:'#F0F2FF',borderRadius:'2px',fontWeight:'normal',fontSize:'12px',padding:'4px 2px'}}>SFG</span></div>
                                        <div style={{fontFamily:'Cairo',fontSize:'14px',color:'#606080'}}>AMM protocol incorporating multi-strategy yield optimization</div>
                                    </div>
                                </Logo1>
                                <div>
                                    <Logcon1>
                                        <span>存入</span>
                                        <ValuFon>AI-OKT LP</ValuFon>
                                    </Logcon1>
                                    <Logcon1>
                                        <span>获得</span>
                                        <ValuFon>SFG</ValuFon>
                                    </Logcon1>
                                    <Logcon1>
                                        <span>待售</span>
                                        <ValuFon>15,000</ValuFon>
                                    </Logcon1>
                                    <Logcon1>
                                        <span>To raise</span>
                                        <ValuFon>$3,000</ValuFon>
                                    </Logcon1>
                                    <Logcon1>
                                        <span>焚毁 AI</span>
                                        <ValuFon>$1,500</ValuFon>
                                    </Logcon1>
                                    <Logcon1>
                                        <span>你待认购占比</span>
                                        <ValuFon>0.00%</ValuFon>
                                    </Logcon1>
                                    <Logcon1>
                                        <span>状态</span>
                                        <span style={{color:'#E60000',fontWeight:'bold'}}>已结束</span>
                                    </Logcon1>
                                    <Butchoose>选择</Butchoose>
                                </div>
                            </div>
                        </BoxSdi>
                        <div style={{width:'24px'}}></div>
                        <BoxSdi  className="w-full md:w-2/5 mt-5 md:mt-0">
                            <div>
                                <Logo1>
                                    <img style={{width:'25%',marginRight:'16px'}} src={Sfgsvg}/>
                                    <div>
                                        <div style={{fontWeight:'bold'}}>S.Finance <span  style={{color:'#3939E6',backgroundColor:'#F0F2FF',borderRadius:'2px',fontWeight:'normal',fontSize:'12px',padding:'4px 2px'}}>SFG</span></div>
                                        <div style={{fontFamily:'Cairo',fontSize:'14px',color:'#606080'}}>AMM protocol incorporating multi-strategy yield optimization</div>
                                    </div>
                                </Logo1>
                                <div>
                                    
                                <Logcon1>
                                        <span>存入</span>
                                        <ValuFon>AI-OKT LP</ValuFon>
                                    </Logcon1>
                                    <Logcon1>
                                        <span>获得</span>
                                        <ValuFon>SFG</ValuFon>
                                    </Logcon1>
                                    <Logcon1>
                                        <span>待售</span>
                                        <ValuFon>15,000</ValuFon>
                                    </Logcon1>
                                    <Logcon1>
                                        <span>To raise (USD)</span>
                                        <ValuFon>$3,000</ValuFon>
                                    </Logcon1>
                                    <Logcon1>
                                        <span>焚毁 AI (USD)</span>
                                        <ValuFon>$1,500</ValuFon>
                                    </Logcon1>
                                    <Logcon1>
                                        <span>你待认购占比</span>
                                        <ValuFon>0.00%</ValuFon>
                                    </Logcon1>
                                    <Logcon1>
                                        <span>状态</span>
                                        <span style={{color:'#E60000',fontWeight:'bold'}}>已结束</span>
                                    </Logcon1>
                                    <Butchoose>选择</Butchoose>
                                </div>
                            </div>
                        </BoxSdi>
                    </div>
                </div>
            </div>
        </>
    )
}