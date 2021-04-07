import React from 'react'
import Icon from '@ant-design/icons';

import DiscordSvg from '../../assets/svg/community/discord.svg'
import TelegramSvg from '../../assets/svg/community/telegram.svg'
import TwitterSvg from '../../assets/svg/community/twitter.svg'
import WechatSvg from '../../assets/svg/community/wechat.svg'


export function IconDiscord(props: object) {
  return <Icon component={() => <img src={DiscordSvg} alt={''} />} {...props} />
}

export function IconTelegram(props: object) {
  return <Icon component={() => <img src={TelegramSvg} alt={''} />} {...props} />
}

export function IconTwitter(props: object) {
  return <Icon component={() => <img src={TwitterSvg} alt={''} />} {...props} />
}

export function IconWechat(props: object) {
  return <Icon component={() => <img src={WechatSvg} alt={''} />} {...props} />
}

