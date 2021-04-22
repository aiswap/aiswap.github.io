import React ,{useState,useEffect}from 'react';
import styled from 'styled-components'
import aiido from '../../assets/aiswap/ai-ido.svg'
import aisvg from '../../assets/aiswap/ai.svg'
import { getStarterContract,getContract } from '../../utils'
import { useActiveWeb3React } from '../../hooks'
import erc20 from '../../constants/abis/erc20.json';
import {STAETER_ADDRESS} from '../../constants'
// import info_outline_24px from '../../assets/aiswap/info_outline_24px.png'

const LeftDe = styled.div`
display:flex;
justify-content:space-between;
padding:4px 0 4px 0;
`

const Header2D = styled.div`
background: #FFFFFF;
/* Card/Stroke */
padding:24px;
border: 1px solid rgba(35, 40, 64, 0.07);
box-sizing: border-box;
/* Card Shadow */

box-shadow: 0px 2px 2px rgba(35, 40, 64, 0.04);
border-radius: 16px;
`
const Box1Div = styled.div`
flex: 1;
background: #FFFFFF;
border: 1px solid rgba(35, 40, 64, 0.07);
box-sizing: border-box;
box-shadow: 0px 2px 2px rgb(35 40 64 / 4%);
border-radius: 16px;
padding: 20px 24px;
`
const Box1DldDiv = styled.div`
background: #FFFFFF;
/* Divider/Default */

border: 1px solid rgba(21, 21, 38, 0.06);
box-sizing: border-box;
border-radius: 8px;
padding: 16px 24px;
margin-top:16px;
`
const Fontdis = styled.span`

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
const Inputsdd = styled.div`
background: #FFFFFF;
/* Divider/Default */

border: 1px solid rgba(21, 21, 38, 0.06);
box-sizing: border-box;
border-radius: 8px;
display:flex;
align-items:center;
`
const Depositddd = styled.div`
cursor:pointer;
background: #00BFA0;
box-shadow: 0px 2px 4px rgba(0, 191, 159, 0.25);
border-radius: 8px;
margin:20px 0 20px 0;
display: flex;
justify-content: center;
align-items: center;
color: white;
font-size: 20px;
font-weight: 600;
`
const Dyadds = styled.div`
background: #FFFFFF;
/* Divider/Default */
display: flex;
justify-content: space-around;
border: 1px solid rgba(21, 21, 38, 0.06);
box-sizing: border-box;
border-radius: 8px;
`
const Clamdsd= styled.div`
cursor:pointer;
justify-content: center;
    display: flex;
    align-items: center;
    border: 1px solid #00BFA0;
    margin-top: 20px;
    color: #00BFA0;
    font-weight: bold;
box-shadow: 0px 2px 4px rgba(0, 191, 159, 0.25);
border-radius: 8px;
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
const Validdd = styled.span`
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
const Dese1 = styled.div`
height: 24px;
background: #E3E7FF;
box-shadow: inset 0px 1px 0px rgb(0 0 0 / 10%);
border-radius:  8px;
div{
    background: #3939E6;
    box-shadow: 0px 2px 4px rgb(57 57 229 / 25%);
    border-radius:  8px;
    height:24px;
}
`
export default function IDO(){
    const { account, chainId, library } = useActiveWeb3React()
    const [isOver,setIsOver] = useState(false);
    const [rateNs,setRateNs] = useState(0);
    const [waitSellAmount,setwaitSellAmount] = useState("0")
    const [totalPurchasedCurrency,settotalPurchasedCurrency] = useState("0")
    // const [timeSettle,settimeSettle] = useState("")
    const [overTime,setOverTime] = useState(0);
    const [currencySymbol,setcurrencySymbol] = useState("OKT")
    const [IDOSymbol,setIDOSYmbol] = useState("AI")
    const [chadyAr,setChadyArr] = useState<Array<number>>();
    const [willGet,setWiilGet] = useState("0")

    useEffect(()=>{
        if(account){
            getDatasStarter();
        }
        
    },[account])


    function setTimeLoad(overTime:any){
        let curTime = new Date().getTime();
        let startTime = new Date("2021-04-12 17:30:00").getTime();
        console.log("overTime---",overTime)
        if(overTime>startTime){
            let total = overTime-startTime;
            let rateN = (curTime-startTime)/total*100;
            if(rateN>=100){
                setRateNs(100);
            }else{
                console.log("rateN--",rateN)
                setRateNs(rateN);
            }
            if(curTime >= overTime){
                setIsOver(true);
            }
        }
    }
    function interValTime(overTime:any){
        setTimeLoad(overTime)
        let timeInterval = setInterval(()=>{
            setTimeLoad(overTime)
            if(isOver){
                clearInterval(timeInterval)
            }
        },10000);
    }

    async function getDatasStarter(){
        if (!chainId || !library || !account ) throw new Error('missing dependencies')
        let starter = getStarterContract(chainId, library, account);
        let overTimess = await starter.time();
        setOverTime(overTimess*1000);
        interValTime(overTimess*1000)
        let timeSettle = await starter.timeSettle();
        getDaysHours(timeSettle*1000)
        let currency = await starter.currency();
        let idoToken = await starter.underlying();
        let tokenConIDO = getContract(idoToken,erc20,library,account);
        let currencyToken = getContract(currency,erc20,library,account);
        let symbol = await currencyToken.symbol()
        setcurrencySymbol(symbol)
        let symbolIDO = await tokenConIDO.symbol();
        setIDOSYmbol(symbolIDO)
        let waitSellAmount = await tokenConIDO.balanceOf(STAETER_ADDRESS)
        setwaitSellAmount(parseEth(waitSellAmount));
        let totalPurchasedCurrency = await starter.totalPurchasedCurrency();
        settotalPurchasedCurrency(totalPurchasedCurrency+"");
        let willGet = await starter.settledUnderlyingOf(account)
        setWiilGet(parseEth(willGet))
    }
    async function purchaseHTTodo(){
        if (!chainId || !library || !account ) throw new Error('missing dependencies')
        let starter = getStarterContract(chainId, library, account);
        await starter.purchaseHT();
    }
    async function settleTodo(){
        if (!chainId || !library || !account ) throw new Error('missing dependencies')
        let starter = getStarterContract(chainId, library, account);
        await starter.settle();
    }
    function parseEth(amount:any){
        return Number(amount/10**18).toFixed(4)
    }
    function formatTime(time:any){
        let date = new Date(time);
        return date.getFullYear()+"/"+(date.getMonth()+1)+"/"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()
    }

    function getDaysHours(time:any){
        let curTime = new Date().getTime();
        let chaTime = time-curTime
        let days = chaTime/86400000;
        let hours = chaTime%86400000/3600000;
        let minuts = chaTime%86400000%3600000/60000;
        let seconds = chaTime%86400000%3600000%60000/1000
        console.log(days,hours,minuts,seconds)
        let arss =[]
        arss.push(parseInt(String(days)))
        arss.push(parseInt(String(hours)))
        arss.push(parseInt(String(minuts)))
        arss.push(parseInt(String(seconds)))
        setChadyArr(arss)
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
                
                <div className="p-3 md:p-8" style={{background:'#afeada'}}>
                <Header2D className="md:flex">
                    <img style={{width:'24%'}} className="pr-5" src={aisvg}/>
                    <div>
                        <div style={{fontSize:'20px',fontWeight:'bold',fontFamily:'Cairo'}}>AIswap </div>
                        <div style={{color:'#00BFA0'}}>https://s.finance</div>
                        <div style={{fontSize:'14px',fontFamily:'Cairo'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
                    </div>
                </Header2D>

                <div style={{marginTop:'24px'}} className="md:flex ">
                    <div className="w-full md:w-1/2 md:pr-3">
                    <Box1Div style={{height:'330px'}}>
                        <LeftDe >
                            <Fontdis>待售总量</Fontdis>
                            <Validdd>{waitSellAmount} {IDOSymbol}</Validdd>
                        </LeftDe>
                        <LeftDe >
                            <Fontdis>存入资产</Fontdis>
                            <Validdd>{currencySymbol}</Validdd>
                        </LeftDe>
                        <LeftDe >
                            <Fontdis>募集资金</Fontdis>
                            <Validdd>{totalPurchasedCurrency}</Validdd>
                        </LeftDe>
                        <LeftDe >
                            <Fontdis>存入时限</Fontdis>
                            <Validdd>25 minutes</Validdd>
                        </LeftDe>
                        <LeftDe >
                            <Fontdis>存入总量</Fontdis>
                            <Validdd> {totalPurchasedCurrency}</Validdd>
                        </LeftDe>
                        <Box1DldDiv>
                            <LeftDe>
                                <Fontdis>开始时间</Fontdis>
                                <Fontdis>结束时间</Fontdis>
                            </LeftDe>
                            <LeftDe>
                                <span style={{fontFamily:'Cairo',fontWeight:'bold',fontSize:'14px'}}>23-03-2021 10:00 UTC</span>
                                <span style={{fontFamily:'Cairo',fontWeight:'bold',fontSize:'14px'}}>{formatTime(overTime)} UTC</span>
                            </LeftDe>
                            <Dese1>
                                <div style={{width:rateNs+"%"}}></div>
                            </Dese1>
                        </Box1DldDiv>
                    </Box1Div>
                    </div>
                    <div className="w-full md:w-1/2  mt-5 md:mt-0 md:pl-3">
                    <Box1Div>
                        <div style={{fontSize:'16px',fontWeight:'bold',color:'#151526'}}>存入&nbsp;{currencySymbol}&nbsp;认购</div>
                        <div style={{marginTop:'20px'}} className="md:flex">
                            <div className="md:w-1/2 pr-3">
                                <div style={{fontSize:'12px'}} className="pt-3 pb-2">你的存入</div>
                                <Inputsdd className="w-full p-4 ">
                                    <input className="w-5/6" style={{fontSize:'20px',outline:'none',border:'none'}} type="text"/>
                                    <div>{currencySymbol}</div>
                                </Inputsdd>
                            </div>
                            <div className="md:w-1/2 pl-3">
                                <div style={{fontSize:'12px'}} className="pt-3 pb-2">你的存入</div>
                                <Inputsdd  className="w-full p-4">
                                    <input style={{fontSize:'20px',outline:'none',border:'none'}} type="text"/>
                                </Inputsdd>
                            </div>
                        </div>
                        <Depositddd className="p-4" onClick={purchaseHTTodo}>Deposit</Depositddd>
                        <hr style={{border:'1px solid rgba(21, 21, 38, 0.06)'}}/>
                        <div style={{fontSize:'12px',color:'#606080',padding: '10px 0 4px 0'}}>
                            奖励预计可领取时间
                        </div>
                        <Dyadds  style={{fontSize:'12px',color:'#606080',paddingTop:'16px',paddingBottom:'16px',textAlign:'center'}}>
                            <div>
                                <div>DAYS</div>
                                <div   style={{fontSize:'14px',color:'black',fontWeight:'bold',paddingTop:'4px'}}>{chadyAr&&chadyAr[0]}</div>
                            </div>
                            <div>
                                <div>HOURS</div>
                                <div style={{fontSize:'14px',color:'black',fontWeight:'bold',paddingTop:'4px'}}>{chadyAr&&chadyAr[1]}</div>
                            </div>
                            <div>
                                <div>MINUTE</div>
                                <div style={{fontSize:'14px',color:'black',fontWeight:'bold',paddingTop:'4px'}}>{chadyAr&&chadyAr[2]}</div>
                            </div>
                            <div>
                                <div>SECONDS</div>
                                <div style={{fontSize:'14px',color:'black',fontWeight:'bold',paddingTop:'4px'}}>{chadyAr&&chadyAr[3]}</div>
                            </div>
                        </Dyadds>
                        <div style={{fontSize:'12px',color:'#606080',marginTop:'20px',paddingBottom:'4px'}}>预计获得奖励</div>
                        <div style={{fontSize:'20px',fontWeight:'bold',border:'1px solid rgba(21, 21, 38, 0.06)',borderRadius:'8px',padding:'16px 24px'}}>
                            {willGet} <span style={{fontSize:'12px',fontWeight:'normal'}}>{IDOSymbol}</span>
                        </div>
                        <Clamdsd className="p-4" onClick={settleTodo}>
                            Claim
                        </Clamdsd>
                    </Box1Div>
                    </div>
                </div>
                </div>
                
            </div>
        </>
    )
}