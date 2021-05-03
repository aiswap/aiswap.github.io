import React from 'react'
import { Layout, Menu } from 'antd'
import { NavLink, withRouter } from 'react-router-dom'
import AccountAddress from './AccountAddress'
import { ExternalLink } from '../../theme'
import styled from 'styled-components'
import Logo from '../../assets/svg/logo/md.svg'
import LogoWhite from '../../assets/svg/logo/white.svg'
import { useTranslation } from 'react-i18next'

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

const WrapperMenu = styled(Menu)`
  flex: 1;
`

const WrapperAssistance = styled.div`
  padding: 20px 0 0;
  box-shadow: inset 0px 1px 0px rgba(35, 40, 64, 0.07);
`

export default function LayerSide({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation()

  // const currentViewName: (string)[] = ['home']
  // let stateCollapsed: boolean = false

  // const toggleCollapsed = () => {
  //   stateCollapsed = !stateCollapsed
  //   console.log('stateCollapsed', stateCollapsed)
  // };

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

    return (
      <StyleSider width={240} className="layer-side" onCollapse={toggleCollapsed}>
        <NavLink className="logo" to={'/'}>
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

        {/* openKeys={openKeys} */}
        <WrapperMenu selectedKeys={[history.location.pathname]} mode="inline">
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
        <WrapperAssistance>
          <SiderCommunity />
          <ChangeLanguage />
        </WrapperAssistance>
      </StyleSider>
    )
  })

  return <Sider />
}
