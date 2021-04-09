import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import UniBalanceContent from '../Header/UniBalanceContent'
import Modal from '../Modal'
import logo from '../../assets/aiswap/logo.svg'
import homepng from '../../assets/aiswap/home.svg';
import arrow_drop_up from '../../assets/aiswap/arrow_drop_up.svg';
import keyboard_arrow_down from '../../assets/aiswap/keyboard_arrow_down_24px.svg';
import trade from '../../assets/aiswap/trade.svg';
import ido from '../../assets/aiswap/ido.svg';
import telegram from '../../assets/aiswap/telegram.svg';
import twitter from '../../assets/aiswap/twitter.svg';
import readis from '../../assets/aiswap/readis.svg';
import wechat from '../../assets/aiswap/wechat.svg';
import language from '../../assets/aiswap/language.png';
// import { Route } from 'react-router-dom'
import styled from 'styled-components'

const LeftDiv = styled.div`
font-family: PingFang SC;
font-style: normal;
font-weight: 500;
font-size: 14px;
line-height: 22px;
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
    "route":"/home",
    "isSub":"1",
    "subMenu":[]
  },{
    "id":"2",
    "name":"交易",
    "icon":trade,
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
    "id":"4",
    "name":"IDO",
    "icon":ido,
    "route":"/ido",
    "isSub":"1",
    "subMenu":[]
  }
]

// {
//     "id":"3",
//     "name":"农场",
//     "icon":trade,
//     "route":"",
//     "isSub":"2",
//     "subMenu":[
//       {
//         "name":"交易挖矿",
//         "route":'/farmtrade'
//       },
//       {
//         "name":"流动性挖矿",
//         "route":'/farmlp'
//       },
//     ]
//   },

export default function SideMenu(){
    const [isOpenSubMe,setisOpenSubMe] = useState(false);
    const [showUniBalanceModal, setShowUniBalanceModal] = useState(false)
    function openorcloseSubMe(){
        setisOpenSubMe(!isOpenSubMe);
    }
    return(
        <>
            <div style={{width:'18%',backgroundColor:'white'}}  className="h-screen">

                <Modal isOpen={showUniBalanceModal} onDismiss={() => setShowUniBalanceModal(false)}>
                    <UniBalanceContent setShowUniBalanceModal={setShowUniBalanceModal} />
                </Modal>
                <LeftDiv>
                    <div style={{display:'flex',justifyContent:'center',height:'18%'}}>
                        <div style={{width:'90%'}}>
                            <div style={{display:'flex',justifyContent:'center',padding:'22px'}}>
                                <img src={logo}/>
                            </div>
                            <AddressDiv>
                                <span>&nbsp;</span>0x3kdkggdgg999
                            </AddressDiv>
                        </div>
                        
                    </div>
                    
                    <div style={{height:'69%'}} >
                        {MenuArr && MenuArr.map((item,index)=>{
                        
                        return(
                            
                            <div>
                                {item.isSub=="2"?(
                                <div>
                                    <div style={{display:'flex',justifyContent:'space-between'}}  className="hover:bg-gray-100 hover:text-blue-600 pr-3">
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
                    <div style={{height:'13%', position:'absolute',bottom:'0',justifyContent:'center',width:'18%',borderTop:'1px solid #e6e0e0'}}>
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
            </div>
        </>
    )
}