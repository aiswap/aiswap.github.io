import React from 'react'
import Icon from '@ant-design/icons';

import HpmeSvg from '../../assets/svg/base/home.svg'
import FarmSvg from '../../assets/svg/base/farm.svg'
import IDOSvg from '../../assets/svg/base/ido.svg'
import LanguageSvg from '../../assets/svg/base/language.svg'
import MoreSvg from '../../assets/svg/base/more.svg'
import TradeSvg from '../../assets/svg/base/trade.svg'
import HelpOutlineSvg from '../../assets/svg/base/help_outline.svg'
import HistorySvg from '../../assets/svg/base/history.svg'
import SettingsSvg from '../../assets/svg/base/settings.svg'

export function IconHome(props: object) {
  return <Icon component={() => <img src={HpmeSvg} alt={''} />} {...props} />
}

export function IconFarm(props: object) {
  return <Icon component={() => <img src={FarmSvg} alt={''} />} {...props} />
}

export function IconIDO(props: object) {
  return <Icon component={() => <img src={IDOSvg} alt={''} />} {...props} />
}

export function IconLanguage(props: object) {
  return <Icon component={() => <img src={LanguageSvg} alt={''} />} {...props} />
}

export function IconMore(props: object) {
  return <Icon component={() => <img src={MoreSvg} alt={''} />} {...props} />
}

export function IconTrade(props: object) {
  return <Icon component={() => <img src={TradeSvg} alt={''} />} {...props} />
}

export function IconHelpOutline(props: object) {
  return <Icon component={() => <img src={HelpOutlineSvg} alt={''} />} {...props} />
}

export function IconHistory(props: object) {
  return <Icon component={() => <img src={HistorySvg} alt={''} />} {...props} />
}

export function IconSettings(props: object) {
  return <Icon component={() => <img src={SettingsSvg} alt={''} />} {...props} />
}