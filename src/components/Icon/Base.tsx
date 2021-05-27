import React from 'react'
import Icon from '@ant-design/icons';

import LanguageSvg from '../../assets/svg/base/language.svg'
import HelpOutlineSvg from '../../assets/svg/base/help_outline.svg'
import HistorySvg from '../../assets/svg/base/history.svg'
import SettingsSvg from '../../assets/svg/base/settings.svg'

export function IconLanguage(props: object) {
  return <Icon component={() => <img src={LanguageSvg} alt={''} />} {...props} />
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