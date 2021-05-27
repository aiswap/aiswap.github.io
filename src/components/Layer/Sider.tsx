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
import { ReactComponent as ArrowDropUp } from '../../assets/svg/base/arrow_drop_up.svg'
import { ReactComponent as IconHome } from '../../assets/svg/base/home.svg'
import { ReactComponent as IconTrade } from '../../assets/svg/base/trade.svg'
import { ReactComponent as IconFarm } from '../../assets/svg/base/farm.svg'
import { ReactComponent as IconIDO } from '../../assets/svg/base/ido.svg'
import { ReactComponent as IconMore } from '../../assets/svg/base/more.svg'
import { Drawer } from 'antd';

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

  const StyledArrowDropUp = styled(ArrowDropUp)`
    transition: transform .3s cubic-bezier(.645,.045,.355,1);
    margin-left: auto;
  `

  const [collapsed, toggleCollapsed] = useToggle(false)

  // <StyleSider width={240} className="layer-side" collapsible collapsed={collapsed} onCollapse={toggleCollapsed}>

  const Sider = withRouter(({ history }) => {
    const menuSub: object = {
      '/add/ETH': 'transaction',
      '/create': 'transaction',
      '/find': 'transaction'
    };
    function findMenuSubKey (key: string) {
      return menuSub[key] || ''
    }
    let openKeys: [string] = [findMenuSubKey(history.location.pathname)]

    console.log('openKeys', openKeys, history.location.pathname)

    const WrapperMenuDom = () => {
      const menus: { key?: string, icon: any, to: string, text: string, childs?: { key?: string, keys?: string[], to?: string, href?: string, text: string }[] }[] = [
        { icon: IconHome, to: '/home', text: t('sidenav.home') },
        { key: 'exchange', icon: IconTrade, to: '', text: t('sidenav.exchange'),
          childs: [
            { to: '/swap', keys: ['/swap'], text: t('sidenav.swap') },
            { to: '/pool', keys: ['/pool', '/add', '/create', '/remove', '/find' ], text: t('sidenav.pool') }
          ]
        },
        { key: 'farm', icon: IconFarm, to: '', text: t('sidenav.farm'),
          childs: [
            { to: '/SFG', keys: ['/SFG'], text: t('sidenav.stablecoinMining') }
          ]
        },
        { icon: IconIDO, to: '/expect', text: t('sidenav.ido') },
        { key: 'more', icon: IconMore, to: '', text: t('sidenav.more'),
          childs: [
            // { key: 'vote', to: '/expect', text: t('sidenav.vote') },
            // { key: 'chart', to: '/expect', text: t('sidenav.chart') },
            // { key: 'announcements', to: '/expect', text: t('sidenav.announcements') },
            // { key: 'document', to: '/expect', text: t('sidenav.document') },
            { key: 'wiki', href: 'https://docs.aiswap.io/', text: t('sidenav.wiki') },
            { key: 'audit', href: '/images/AiSwap_audit.pdf', text: t('global.auditReport') },
            // { key: 'github', href: 'https://github.com/aiswap/aiswap.github.io', text: t('sidenav.github') }
        ] }
      ]

      let currentSubKey: string | undefined = ''
      let currentSelectedKey: string | undefined = history.location.pathname

      menus.some(item => {
        if (item.childs) {
          let a = false
          item.childs.some(subitem => {
            const b = subitem.to === history.location.pathname
              || (subitem.keys && subitem.keys.some(item => history.location.pathname.indexOf(item) === 0))
            if (b) {
              a = true
              currentSelectedKey = subitem.to
            }

              return b
          })

          if (a) {
            currentSubKey = item.key
          }
        }
        return currentSubKey
      })

      return (
        <WrapperMenu
          onClick={() => setState(state => ({ visible: false }))}
          selectedKeys={[currentSelectedKey]}
          defaultOpenKeys={[currentSubKey]}
          subMenuOpenDelay={0.2}
          subMenuCloseDelay={0.2}
          expandIcon={(e: any) => {
            return <StyledArrowDropUp style={{ transform: `rotate(${e.isOpen ? 0 : 180 }deg)` }} />
          }}
          mode="inline">
          {
            menus.map(item => {
              return (
                item.childs
                  ? (
                    <SubMenu key={item.key || item.to} icon={<item.icon className="mr-2" />} title={item.text}>
                      { item.childs.map(subitem => {
                          return (
                            <Menu.Item key={subitem.key || subitem.to || subitem.href}>
                              {
                                (subitem.to && (<NavLink to={subitem.to}>{subitem.text}</NavLink>))
                                || (subitem.href && (<ExternalLink href={subitem.href}>{subitem.text}</ExternalLink>))
                                || subitem.text
                              }
                            </Menu.Item>
                          )
                        })
                      }
                    </SubMenu>
                  )
                  : (
                    <Menu.Item key={item.key || item.to} icon={<item.icon className="mr-2" />}>
                      <NavLink to={item.to}>{item.text}</NavLink>
                    </Menu.Item>
                  )
              )
            })
          }
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
          <WrapperMenuDom />
          <WrapperAssistance>
            <SiderCommunity />
            <ChangeLanguage />
          </WrapperAssistance>
        </StyleSider>

        <StyledTopLayout>
          <div>
            <StyledMenuIcon onClick={() => setState(state => ({ visible: true }))} />
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
          onClose={() => setState(state => ({ visible: false }))}
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
