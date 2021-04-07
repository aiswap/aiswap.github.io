import React, { Suspense,useState } from 'react'
import { Route, Switch,NavLink } from 'react-router-dom'
// import { Route } from 'react-router-dom'
import styled from 'styled-components'
import GoogleAnalyticsReporter from '../components/analytics/GoogleAnalyticsReporter'
import logo from '../assets/aiswap/logo.svg'
import homepng from '../assets/aiswap/home.svg';
import arrow_drop_up from '../assets/aiswap/arrow_drop_up.svg';
import keyboard_arrow_down from '../assets/aiswap/keyboard_arrow_down_24px.svg';
import UniBalanceContent from '../components/Header/UniBalanceContent'
import Modal from '../components/Modal'
import trade from '../assets/aiswap/trade.svg';
import ido from '../assets/aiswap/ido.svg';
import telegram from '../assets/aiswap/telegram.svg';
import twitter from '../assets/aiswap/twitter.svg';
import readis from '../assets/aiswap/readis.svg';
import wechat from '../assets/aiswap/wechat.svg';
import language from '../assets/aiswap/language.png';

import AddressClaimModal from '../components/claim/AddressClaimModal'
// import Header from '../components/Header'
import Polling from '../components/Header/Polling'
import URLWarning from '../components/Header/URLWarning'
import Popups from '../components/Popups'
import Web3ReactManager from '../components/Web3ReactManager'
import { ApplicationModal } from '../state/application/actions'
import { useModalOpen, useToggleModal } from '../state/application/hooks'
import DarkModeQueryParamReader from '../theme/DarkModeQueryParamReader'
import AddLiquidity from './AddLiquidity'
import {
  RedirectDuplicateTokenIds,
  RedirectOldAddLiquidityPathStructure,
  RedirectToAddLiquidity
} from './AddLiquidity/redirects'
import Earn from './Earn'
import Manage from './Earn/Manage'
import MigrateV1 from './MigrateV1'
import MigrateV1Exchange from './MigrateV1/MigrateV1Exchange'
import RemoveV1Exchange from './MigrateV1/RemoveV1Exchange'
import Pool from './Pool'
import PoolFinder from './PoolFinder'
import RemoveLiquidity from './RemoveLiquidity'
import { RedirectOldRemoveLiquidityPathStructure } from './RemoveLiquidity/redirects'
import Swap from './Swap'
import Home from './Home'
import IDODetail from './IDODetail'
import IDO from './IDO'
import { OpenClaimAddressModalAndRedirectToSwap, RedirectPathToSwapOnly, RedirectToSwap } from './Swap/redirects'
import Vote from './Vote'
import VotePage from './Vote/VotePage'
import Web3Status from '../components/Web3Status'

const AppWrapper = styled.div`
  display: flex;
  height:100%;
//   flex-flow: column;
//   align-items: flex-start;
//   overflow-x: hidden;
`

// const HeaderWrapper = styled.div`
//   ${({ theme }) => theme.flexRowNoWrap}
//   width: 100%;
//   justify-content: space-between;
// `

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 82%;
  align-items: center;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 10;
  background-color:#f0f2ff;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding: 16px;
    padding-top: 2rem;
  `};

  z-index: 1;
`

// const Marginer = styled.div`
//   margin-top: 5rem;
// `

function TopLevelModals() {
  const open = useModalOpen(ApplicationModal.ADDRESS_CLAIM)
  const toggle = useToggleModal(ApplicationModal.ADDRESS_CLAIM)
  return <AddressClaimModal isOpen={open} onDismiss={toggle} />
}
const LeftDiv = styled.div`
font-family: PingFang SC;
font-style: normal;
font-weight: 500;
font-size: 14px;
line-height: 22px;
width:18%;
letter-spacing: -0.005em;
color: #606080;
background: #FFFFFF;
box-shadow: inset -1px 0px 0px rgba(35, 40, 64, 0.07);
z-index:200;
`
const AddressDiv = styled.div`
    border: 1px solid #00BFA0;
    box-sizing: border-box;
    box-shadow: 0px 2px 4px rgba(0, 191, 159, 0.25);
    border-radius: 8px;
    text-align:left;
    width:100%;
    padding:10px 0;
    display: flex;
    align-items: center;
    font-size: 16px;
    color: #00BFA0;
    font-weight: bold;
    span{
      display: inline-block;
    width: 15px;
    height: 15px;
    background: #00BFA0;
    border-radius: 100%;
    margin: 0 10px;
    }
`
const MenuIcon = styled.div`
    display:flex;
    justify-content: center;
    cursor:pointer;
`

const MenuDiv = styled(NavLink)`
display:flex;
justify-content: space-between;
cursor:pointer;
padding: 15px 30px;
color:gray;
&.active{
    color:blue;
    font-weight: bold;
    background-color: rgba(243, 244, 246, 0.1);
    border-right:2px solid blue;
}
`

const MenuArr = [
  {
    "id":"1",
    "name":"首页",
    "icon":homepng,
    "isChoosen":"1",
    "route":"/home",
    "isSub":"1",
    "subMenu":[]
  },{
    "id":"2",
    "name":"交易",
    "icon":trade,
    "isChoosen":"1",
    "route":"",
    "isSub":"2",
    "subMenu":[
      {
        "name":"兑换",
        "route":'/swap'
      },
      {
        "name":"资金池",
        "route":'/pool'
      },
    ]
  },{
    "id":"3",
    "name":"IDO",
    "icon":ido,
    "isChoosen":"1",
    "route":"/ido",
    "isSub":"1",
    "subMenu":[]
  }
]
export default function App() {
  const [isOpenSubMe,setisOpenSubMe] = useState(false);
  const [showUniBalanceModal, setShowUniBalanceModal] = useState(false)
  function openorcloseSubMe(){
    setisOpenSubMe(!isOpenSubMe);
  }

  return (
    <Suspense fallback={null}>
      <div style={{display:'hidden'}}>
            <Web3Status/>
        </div>
      <Route component={GoogleAnalyticsReporter} />
      <Route component={DarkModeQueryParamReader} />
      <AppWrapper>
        <URLWarning />
        
        <Modal isOpen={showUniBalanceModal} onDismiss={() => setShowUniBalanceModal(false)}>
            <UniBalanceContent setShowUniBalanceModal={setShowUniBalanceModal} />
        </Modal>
        <LeftDiv className="hidden md:block">
            <div style={{display:'flex',justifyContent:'center',height:'18%'}}>
                <div style={{width:'90%'}}>
                    <div style={{display:'flex',justifyContent:'center',padding:'22px'}}>
                        <img src={logo}/>
                    </div>
                    <AddressDiv>
                        <span>&nbsp;</span>0x3kdkggdgg
                    </AddressDiv>
                </div>
                
            </div>
            
            <div style={{height:'69%',borderBottom:'1px solid #e6e0e0'}} >
                {MenuArr && MenuArr.map((item,index)=>{
                  
                  return(
                    
                    <div>
                          {item.isSub=="2"?(
                          <div>
                            <div style={{display:'flex',justifyContent:'space-between'}}  className="hover:bg-gray-100 hover:text-blue-600">
                              <div onClick={openorcloseSubMe} style={{padding: '15px 30px',cursor:'pointer',color:'gray',display:'flex',alignItems:'center'}}>
                                  <img src={item.icon}/>
                                  <span>&nbsp;&nbsp;&nbsp;{item.name}</span>
                              </div>
                              <img src={isOpenSubMe?keyboard_arrow_down:arrow_drop_up}/>
                            </div>
                            
                            {isOpenSubMe && (
                                <>
                                {item.subMenu.map((itemss,index)=>{
                                  return(
                                    <MenuDiv style={{padding: '15px 65px',textAlign:'left'}}  exact activeClassName="active" to={itemss.route}  className="hover:bg-gray-100 hover:text-indigo-600">
                                      {itemss.name}
                                      </MenuDiv>
                                  )
                                })}
                                </>
                              )}
                            </div>
                          ):(
                            <MenuDiv  exact activeClassName="active" to={item.route} className="hover:bg-gray-100">
                              <MenuIcon>
                                  <img src={item.icon}/>
                                  <span>&nbsp;&nbsp;&nbsp;{item.name}</span>
                              </MenuIcon>
                                <div>&nbsp;</div>
                            </MenuDiv>
                          )}
                    </div>
                  )
                })}
                
            </div>
            <div style={{height:'13%', display:'flex',justifyContent:'center',width:'100%'}}>
                <div style={{width:'100%'}}>
                    <div style={{display:'flex',justifyContent:'space-between',cursor:'pointer',padding: '15px 30px'}}>
                        <img src={telegram}/>
                        <img src={twitter}/>
                        <img src={readis}/>
                        <img src={wechat}/>
                    </div>
                    <div style={{textAlign:'center',marginTop:'5px',display:'flex',justifyContent:'left',paddingLeft:'12%'}}>
                        <img src={language} width="22px" height="22px"/>
                        <span>&nbsp;&nbsp;&nbsp;简体中文</span>
                    </div>
                </div>
            </div>
        </LeftDiv>
        <BodyWrapper>
          <Popups />
          <Polling />
          <TopLevelModals />
          <Web3ReactManager>
            <Switch>
              <Route exact strict path="/home" component={Home}/>
              <Route exact strict path="/ido" component={IDO}/>
              <Route exact strict path="/detail_ido" component={IDODetail}/>
              
              <Route exact strict path="/swap" component={Swap} />
              <Route exact strict path="/claim" component={OpenClaimAddressModalAndRedirectToSwap} />
              <Route exact strict path="/swap/:outputCurrency" component={RedirectToSwap} />
              <Route exact strict path="/send" component={RedirectPathToSwapOnly} />
              <Route exact strict path="/find" component={PoolFinder} />
              <Route exact strict path="/pool" component={Pool} />
              <Route exact strict path="/uni" component={Earn} />
              <Route exact strict path="/vote" component={Vote} />
              <Route exact strict path="/create" component={RedirectToAddLiquidity} />
              <Route exact path="/add" component={AddLiquidity} />
              <Route exact path="/add/:currencyIdA" component={RedirectOldAddLiquidityPathStructure} />
              <Route exact path="/add/:currencyIdA/:currencyIdB" component={RedirectDuplicateTokenIds} />
              <Route exact path="/create" component={AddLiquidity} />
              <Route exact path="/create/:currencyIdA" component={RedirectOldAddLiquidityPathStructure} />
              <Route exact path="/create/:currencyIdA/:currencyIdB" component={RedirectDuplicateTokenIds} />
              <Route exact strict path="/remove/v1/:address" component={RemoveV1Exchange} />
              <Route exact strict path="/remove/:tokens" component={RedirectOldRemoveLiquidityPathStructure} />
              <Route exact strict path="/remove/:currencyIdA/:currencyIdB" component={RemoveLiquidity} />
              <Route exact strict path="/migrate/v1" component={MigrateV1} />
              <Route exact strict path="/migrate/v1/:address" component={MigrateV1Exchange} />
              <Route exact strict path="/uni/:currencyIdA/:currencyIdB" component={Manage} />
              <Route exact strict path="/vote/:id" component={VotePage} />
              <Route component={RedirectPathToSwapOnly} />
            </Switch>
          </Web3ReactManager>
          {/* <Marginer /> */}
        </BodyWrapper> 
      </AppWrapper>
    </Suspense>
  )
}
