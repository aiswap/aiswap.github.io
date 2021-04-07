import React from 'react'
import { Menu, Dropdown } from 'antd';

// import { NextPage } from 'next'
// import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { IconLanguage } from '../Icon/Base'
import styled from 'styled-components'

const StyleDropdown = styled.div `
  margin: 0 20px 20px;
  display: flex;
  align-items: center;
  color: #3939E5;

  .ant-dropdown-trigger {
    padding-left: 12px;
    cursor: pointer;
  }
`

export default function ChangeLanguage() {
  const { i18n } = useTranslation()
  const supportedI18n = {
    'en': 'English',
    'zh-CN': '中文（简体）',
    'zh-TW': '中文（繁體）'
  }
  let selectedLocaleName = supportedI18n[i18n.language]

  function onChangeLanguage(e) {
    i18n.changeLanguage(e.key)
    selectedLocaleName = supportedI18n[e.key]
  }

  return (
    <StyleDropdown>
      <IconLanguage />
      <Dropdown placement="topLeft"
        overlay={(
        <Menu>
          {Object.keys(supportedI18n).map(key => <Menu.Item onClick={onChangeLanguage} key={key}>{supportedI18n[key]}</Menu.Item>)}
          {/* {supportedI18n.map(item => <Menu.Item onClick={onChangeLanguage} key={item.id}>{item.name}</Menu.Item>)} */}
        </Menu>
      )}>
        <span>
          { selectedLocaleName }
        </span>
      </Dropdown>
    </StyleDropdown>
  )
}