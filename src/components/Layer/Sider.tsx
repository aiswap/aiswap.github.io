import React, { useState } from 'react'
import { Layout, Menu } from 'antd'
import { NavLink, withRouter } from 'react-router-dom'
import AccountAddress from './AccountAddress'
import { ExternalLink } from '../../theme'
import styled from 'styled-components'
import Logo from '../../assets/svg/logo/md.svg'
import LogoWhite from '../../assets/svg/logo/white_icon.svg'
import { useTranslation } from 'react-i18next'
import { ReactComponent as MenuIcon } from '../../assets/svg/base/menu.svg'
import { Drawer } from 'antd';

import {
  IconHome,
  // IconFarm,
  IconTrade,
  // IconIDO,
  IconMore
} from '../Icon/Base'

// import Icon from '@ant-design/icons';
import useToggle from '../../hooks/useToggle'
import ChangeLanguage from './ChangeLanguage.jsx'
import SiderCommunity from './SiderCommunity'

const { Sider } = Layout
const { SubMenu } = Menu

const StyleSider = styled(Sider)`
  ${({ theme }) => theme.mediaWidth.upToMedium`
    display: none;
  `};

  .ant-layout-sider-children {
    display: flex;
    flex-direction: column;

    a.logo {
      width: 113px;
      height: 32px;
      margin: 24px;
      display: inline-block;
    }
  }
`
const StyledWrapper = styled.div`
  display: flex;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    min-height: 56px;
  `};
  min-height: 100vh;
`

const StyledMenuIcon = styled(MenuIcon)`
  margin: 0 24px 0 0;
  width: 20px;
  height: 20px;

  :hover {
    cursor: pointer;
  }
`

const WrapperMenu = styled(Menu)`
  flex: 1;
`

const WrapperAssistance = styled.div`
  padding: 20px 0 0;
  box-shadow: inset 0px 1px 0px rgba(35, 40, 64, 0.07);
`

const StyledDrawer = styled(Drawer)`
  top: 56px !important;
  z-index: 1 !important;

  .ant-drawer-content-wrapper {
    box-shadow: inset -1px 0px 0px rgba(35, 40, 64, 0.07) !important;
  }
  .ant-drawer-mask {
    background: rgba(57, 57, 230, 0.4);
  }
  .ant-drawer-body {
    padding: 0 0 54px 0;
    display: flex;
    flex-direction: column;
  }
`

export default function LayerSide({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation()


  const [state, setState] = useState<{ visible: boolean }>({
    visible: false
  })

  // const currentViewName: (string)[] = ['home']
  // let stateCollapsed: boolean = false

  // const toggleCollapsed = () => {
  //   stateCollapsed = !stateCollapsed
  //   console.log('stateCollapsed', stateCollapsed)
  // };
  const StyledTopLayout = styled.div`
    display: none;
    ${({ theme }) => theme.mediaWidth.upToMedium`
      display: flex;
    `};
    background: #FFFFFF;
    height: 56px;
    padding: 12px 24px;
    width: 100%;
    box-shadow: inset 0px -1px 0px rgba(35, 40, 64, 0.07);
    align-items: center;
    justify-content: space-between;

    > div {
      padding: 0;
    }
    > div button {
      height: 32px;
    }
  `

  const StyledCommon = styled.div`
    ${({ theme }) => theme.mediaWidth.upToMedium`
      display: none;
    `};
  `

  const [collapsed, toggleCollapsed] = useToggle(false)

  // <StyleSider width={240} className="layer-side" collapsible collapsed={collapsed} onCollapse={toggleCollapsed}>

  const Sider = withRouter(({ history }) => {
    // const menuSub: object = {
    //   '/swap': 'transaction',
    //   '/pool': 'transaction',
    //   '/add/ETH': 'transaction',
    //   '/create': 'transaction',
    //   '/find': 'transaction'
    // };
    // function findMenuSubKey (key: string) {
    //   return menuSub[key] || ''
    // }
    // let openKeys: [string] = [findMenuSubKey(history.location.pathname)]

    const showDrawer = () => {
      setState(state => {
        return { visible: true }
      })
    }
    const onClose = () => {
      setState(state => {
        return { visible: false }
      })
    }

    const WrapperMenuDom = () => {
      return (
        <WrapperMenu onClick={onClose} selectedKeys={[history.location.pathname]} mode="inline">
          <Menu.Item key={'/home'} icon={<IconHome />}>
            <NavLink to={'/home'}>{t('sidenav.home')}</NavLink>
          </Menu.Item>
          <SubMenu key={'transaction'} icon={<IconTrade />} title={t('sidenav.exchange')}>
            <Menu.Item key={'/swap'}>
              <NavLink to={'/swap'}>{t('sidenav.swap')}</NavLink>
            </Menu.Item>
            <Menu.Item key="/pool">
              <NavLink to={'/pool'}>{t('sidenav.pool')}</NavLink>
            </Menu.Item>
          </SubMenu>
          {/* <SubMenu key="mining" disabled icon={<IconFarm />} title="农场">
            <Menu.Item key="transaction_mining">交易挖矿</Menu.Item>
            <Menu.Item key="stablecoin_mining">流动性挖矿</Menu.Item>
          </SubMenu> */}
          {/* <Menu.Item key="ido" disabled icon={<IconIDO />}>
            IDO
          </Menu.Item> */}
          <SubMenu key="sub1" icon={<IconMore />} title={t('sidenav.more')}>
            {/* <Menu.Item key="" disabled>投票</Menu.Item>
            <Menu.Item key="" disabled>图表</Menu.Item>
            <Menu.Item key="" disabled>新鲜事</Menu.Item>
            <Menu.Item key="" disabled>文档</Menu.Item> */}
            <Menu.Item key="github">
              <ExternalLink href={'https://github.com/aiswap/aiswap.github.io'}>GitHub</ExternalLink>
            </Menu.Item>
          </SubMenu>
        </WrapperMenu>
      )
    }

    return (
      <StyledWrapper>
        <StyleSider width={240} className="layer-side" onCollapse={toggleCollapsed}>
          <StyledCommon>
            <NavLink className="logo" to={'/home'}>
              {collapsed ? (
                <img
                  src={LogoWhite}
                  style={{
                    height: '32px',
                    marginRight: '10px'
                  }}
                  alt=""
                />
              ) : (
                <img src={Logo} alt="" />
              )}
            </NavLink>
            <AccountAddress />
          </StyledCommon>

          {/* openKeys={openKeys} */}
          <WrapperMenuDom />
          <WrapperAssistance>
            <SiderCommunity />
            <ChangeLanguage />
          </WrapperAssistance>
        </StyleSider>

        <StyledTopLayout>
          <div>
            <StyledMenuIcon onClick={showDrawer} />
            <NavLink className="logo" to={'/home'}>
              <img src={LogoWhite} alt="" style={{
                  height: '32px',
                  marginRight: '10px'
                }} />
            </NavLink>
          </div>
          <AccountAddress/>

        </StyledTopLayout>

        <StyledDrawer
          closable={false}
          onClose={onClose}
          placement='left'
          visible={state.visible}
        >
          <WrapperMenuDom />
          <WrapperAssistance>
            <SiderCommunity />
            <ChangeLanguage />
          </WrapperAssistance>
        </StyledDrawer>
      </StyledWrapper>
    )
  })

  return <Sider />
}
