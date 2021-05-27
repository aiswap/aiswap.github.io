import React from 'react'
import styled from 'styled-components'
import { darken, 
  // lighten
} from 'polished'

import { RowBetween, RowCenter } from '../Row'
import { ChevronDown } from 'react-feather'
import { Button as RebassButton, ButtonProps } from 'rebass/styled-components'

const Base = styled(RebassButton)<{
  padding?: string
  width?: string
  borderRadius?: string
  altDisabledStyle?: boolean
}>`
  padding: ${({ padding }) => (padding ? padding : '14px')};
  width: ${({ width }) => (width ? width : '100%')};
  font-weight: bold;
  text-align: center;
  border-radius: 8px;
  border-radius: ${({ borderRadius }) => borderRadius && borderRadius};
  outline: none;
  // border: 1px solid transparent;
  border: 0px;
  color: white;
  text-decoration: none;
  display: flex;
  justify-content: center;
  flex-wrap: nowrap;
  align-items: center;
  cursor: pointer;
  position: relative;
  z-index: 1;
  line-height: 24px;

  &:disabled {
    cursor: auto;
  }

  > * {
    user-select: none;
  }
`

export const ButtonPrimary = styled(Base)`
  background-color: #00BFA0;
  color: white;
  box-shadow: 0px 2px 4px rgba(0, 191, 159, 0.25);
  border-radius: 8px;
  font-size: 16px;
  line-height: 20px;
  font-weight: bold;

  &:focus {
    background-color: #00BFA0;
  }
  &:hover {
    color: white;
    background-color: #45D9B6;
  }
  &:active {
    background-color: #00BFA0;
  }
  &:disabled {
    background-color: #D4D4D9;
    cursor: auto;
    box-shadow: none;
    border: 1px solid transparent;
    outline: none;
  }
`


export const ButtonSubmit = styled(Base)`
  background-color: #00BFA0 !important;
  color: white;
  &:focus {
    box-shadow: 0 0 0 1pt ${({ theme }) => darken(0.05, '#00BFA0')};
    background-color: ${({ theme }) => darken(0.05, '#00BFA0')};
  }
  &:hover {
    background-color: ${({ theme }) => darken(0.05, '#00BFA0')};
  }
  &:active {
    box-shadow: 0 0 0 1pt ${({ theme }) => darken(0.1, '#00BFA0')};
    background-color: ${({ theme }) => darken(0.1, '#00BFA0')};
  }
  &:disabled {
    background-color: ${({ theme, altDisabledStyle, disabled }) =>
      altDisabledStyle ? (disabled ? theme.bg3 : '#00BFA0') : theme.bg3};
    color: ${({ theme, altDisabledStyle, disabled }) =>
      altDisabledStyle ? (disabled ? theme.text3 : 'white') : theme.text3};
    cursor: auto;
    box-shadow: none;
    border: 1px solid transparent;
    outline: none;
    opacity: ${({ altDisabledStyle }) => (altDisabledStyle ? '0.5' : '1')};
  }
`

export const ButtonLight = styled(Base)`
  background-color: ${({ theme }) => theme.primary5};
  color: ${({ theme }) => theme.primaryText1};
  font-size: 16px;
  font-weight: 500;
  &:focus {
    box-shadow: 0 0 0 1pt ${({ theme, disabled }) => !disabled && darken(0.03, theme.primary5)};
    background-color: ${({ theme, disabled }) => !disabled && darken(0.03, theme.primary5)};
  }
  &:hover {
    background-color: ${({ theme, disabled }) => !disabled && darken(0.03, theme.primary5)};
  }
  &:active {
    box-shadow: 0 0 0 1pt ${({ theme, disabled }) => !disabled && darken(0.05, theme.primary5)};
    background-color: ${({ theme, disabled }) => !disabled && darken(0.05, theme.primary5)};
  }
  :disabled {
    opacity: 0.4;
    :hover {
      cursor: auto;
      background-color: ${({ theme }) => theme.primary5};
      box-shadow: none;
      border: 1px solid transparent;
      outline: none;
    }
  }
`

export const ButtonGray = styled(Base)`
  background-color: ${({ theme }) => theme.bg3};
  color: ${({ theme }) => theme.text2};
  font-size: 16px;
  font-weight: 500;
  &:focus {
    background-color: ${({ theme, disabled }) => !disabled && darken(0.05, theme.bg4)};
  }
  &:hover {
    background-color: ${({ theme, disabled }) => !disabled && darken(0.05, theme.bg4)};
  }
  &:active {
    background-color: ${({ theme, disabled }) => !disabled && darken(0.1, theme.bg4)};
  }
`

export const ButtonSecondary = styled(Base)`
  border: 1px solid #00BFA0;
  color: #00BFA0;
  background-color: transparent;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  border-radius: 8px;
  padding: ${({ padding }) => (padding ? padding : '12px 24px')};

  &:focus,
  &:hover {
    color: #45D9B6;
    border: 1px solid #45D9B6;
  }
  &:active {
    color: #00BFA0;
    border: 1px solid #00BFA0;
  }
  &:disabled {
    color: #B6B6BF;
    border: 1px solid #B6B6BF;
    cursor: auto;
  }
  a:hover {
    text-decoration: none;
  }
`

export const ButtonPink = styled(Base)`
  background-color: #00BFA0;
  color: white;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 191, 159, 0.25);
  padding: ${({ padding }) => (padding ? padding : '12px 24px')};

  &:focus,
  &:hover {
    background-color: #45D9B6;
    color: white;
  }
  &:active {
    background-color: #00BFA0;
    color: white;
  }
  &:disabled {
    background-color: #D4D4D9;
    box-shadow: none;
    cursor: auto;
  }
`

export const ButtonUNIGradient = styled(ButtonPrimary)`
  color: white;
  padding: 4px 8px;
  height: 36px;
  font-weight: 500;
  background-color: ${({ theme }) => theme.bg3};
  background: radial-gradient(174.47% 188.91% at 1.84% 0%, #ff007a 0%, #2172e5 100%), #edeef2;
  width: fit-content;
  position: relative;
  cursor: pointer;
  border: none;
  white-space: no-wrap;
  :hover {
    opacity: 0.8;
  }
  :active {
    opacity: 0.9;
  }
`

export const ButtonOutlined = styled(Base)`
  border: 1px solid ${({ theme }) => theme.bg2};
  background-color: transparent;
  color: ${({ theme }) => theme.text1};

  &:focus {
    box-shadow: 0 0 0 1px ${({ theme }) => theme.bg4};
  }
  &:hover {
    box-shadow: 0 0 0 1px ${({ theme }) => theme.bg4};
  }
  &:active {
    box-shadow: 0 0 0 1px ${({ theme }) => theme.bg4};
  }
  &:disabled {
    opacity: 50%;
    cursor: auto;
  }
`

export const ButtonGreen = styled(Base)`
  align-items: center;
  padding: 12px 24px;
  display: flex;
  background-color: #00BFA0;
  box-shadow: 0px 2px 4px rgba(0, 191, 159, 0.25);
  border-radius: 8px;

  &:focus {
    box-shadow: 0 0 0 1px ${({ theme }) => theme.bg4};
  }
  &:hover {
    box-shadow: 0 0 0 1px ${({ theme }) => theme.bg4};
  }
  &:active {
    box-shadow: 0 0 0 1px ${({ theme }) => theme.bg4};
  }
  &:disabled {
    opacity: 50%;
    cursor: auto;
  }
  svg {
    margin-left: 12px;
  }
`

export const ButtonEmpty = styled(Base)`
  background-color: transparent;
  color: ${({ theme }) => theme.primary1};
  display: flex;
  justify-content: center;
  align-items: center;

  &:focus {
    text-decoration: underline;
  }
  &:hover {
    text-decoration: none;
  }
  &:active {
    text-decoration: none;
  }
  &:disabled {
    opacity: 50%;
    cursor: auto;
  }
`

export const ButtonWhite = styled(Base)`
  border: 1px solid #edeef2;
  background-color: ${({ theme }) => theme.bg1};
  color: black;

  &:focus {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    box-shadow: 0 0 0 1pt ${darken(0.05, '#edeef2')};
  }
  &:hover {
    box-shadow: 0 0 0 1pt ${darken(0.1, '#edeef2')};
  }
  &:active {
    box-shadow: 0 0 0 1pt ${darken(0.1, '#edeef2')};
  }
  &:disabled {
    opacity: 50%;
    cursor: auto;
  }
`

const ButtonConfirmedStyle = styled(Base)`
  background-color: #00BFA0;
  color: white;
  box-shadow: 0px 2px 4px rgba(0, 191, 159, 0.25);
  border-radius: 8px;
  font-size: 16px;
  line-height: 20px;
  font-weight: bold;

  &:focus {
    background-color: #00BFA0;
  }
  &:hover {
    color: white;
    background-color: #45D9B6;
  }
  &:active {
    background-color: #00BFA0;
  }
  &:disabled {
    background-color: #D4D4D9;
    cursor: auto;
    box-shadow: none;
    border: 1px solid transparent;
    outline: none;
  }
`

const ButtonErrorStyle = styled(Base)`
  background-color: ${({ theme }) => theme.red1};
  border: 1px solid ${({ theme }) => theme.red1};

  &:focus {
    box-shadow: 0 0 0 1pt ${({ theme }) => darken(0.05, theme.red1)};
    background-color: ${({ theme }) => darken(0.05, theme.red1)};
  }
  &:hover {
    background-color: ${({ theme }) => darken(0.05, theme.red1)};
  }
  &:active {
    box-shadow: 0 0 0 1pt ${({ theme }) => darken(0.1, theme.red1)};
    background-color: ${({ theme }) => darken(0.1, theme.red1)};
  }
  &:disabled {
    opacity: 50%;
    cursor: auto;
    box-shadow: none;
    background-color: ${({ theme }) => theme.red1};
    border: 1px solid ${({ theme }) => theme.red1};
  }
`

export function ButtonConfirmed({
  confirmed,
  altDisabledStyle,
  ...rest
}: { confirmed?: boolean; altDisabledStyle?: boolean } & ButtonProps) {
  if (confirmed) {
    return <ButtonConfirmedStyle {...rest} />
  } else {
    return <ButtonPrimary {...rest} altDisabledStyle={altDisabledStyle} />
  }
}

export function ButtonError({ error, ...rest }: { error?: boolean } & ButtonProps) {
  if (error) {
    return <ButtonErrorStyle {...rest} />
  } else {
    return <ButtonPrimary {...rest} />
  }
}

export function ButtonDropdown({ disabled = false, children, ...rest }: { disabled?: boolean } & ButtonProps) {
  return (
    <ButtonPrimary {...rest} disabled={disabled}>
      <RowBetween>
        <div style={{ display: 'flex', alignItems: 'center' }}>{children}</div>
        <ChevronDown size={24} />
      </RowBetween>
    </ButtonPrimary>
  )
}

export function ButtonDropdownGrey({ disabled = false, children, ...rest }: { disabled?: boolean } & ButtonProps) {
  return (
    <ButtonGray {...rest} disabled={disabled} style={{ borderRadius: '20px' }}>
      <RowBetween>
        <div style={{ display: 'flex', alignItems: 'center' }}>{children}</div>
        <ChevronDown size={24} />
      </RowBetween>
    </ButtonGray>
  )
}

export function ButtonDropdownLight({ disabled = false, children, ...rest }: { disabled?: boolean } & ButtonProps) {
  return (
    <ButtonOutlined {...rest} disabled={disabled}>
      <RowBetween>
        <div style={{ display: 'flex', alignItems: 'center' }}>{children}</div>
        <ChevronDown size={24} />
      </RowBetween>
    </ButtonOutlined>
  )
}

export function ButtonDropdownGreen({ disabled = false, children, ...rest }: { disabled?: boolean } & ButtonProps) {
  return (
    <ButtonGreen {...rest} disabled={disabled}>
      <RowCenter>
        <div style={{ display: 'flex', alignItems: 'center' }}>{children}</div>
        <ChevronDown size={20} />
      </RowCenter>
    </ButtonGreen>
  )
}

export function ButtonRadio({ active, ...rest }: { active?: boolean } & ButtonProps) {
  if (!active) {
    return <ButtonWhite {...rest} />
  } else {
    return <ButtonPrimary {...rest} />
  }
}
