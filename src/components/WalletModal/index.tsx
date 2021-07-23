import { AbstractConnector } from '@web3-react/abstract-connector'
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import React, { useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'
import ReactGA from 'react-ga'
import styled from 'styled-components'
// import MetamaskIcon from '../../assets/images/metamask.png'
import { fortmatic, injected, okexwallet, portis } from '../../connectors'
import { OVERLAY_READY } from '../../connectors/Fortmatic'
import { SUPPORTED_WALLETS } from '../../constants'
import usePrevious from '../../hooks/usePrevious'
import { ApplicationModal } from '../../state/application/actions'
import { useModalOpen, useWalletModalToggle } from '../../state/application/hooks'
import { ExternalLink } from '../../theme'
import AccountDetails from '../AccountDetails'
import { useTranslation } from 'react-i18next'
import { notification } from 'antd';
import { ReactComponent as NotifyWarningIcon } from '../../assets/svg/base/notify_warning.svg'
import { ReactComponent as NotifyCloseIcon } from '../../assets/svg/base/close.svg'

import Modal from '../Modal'
import Option from './Option'
import PendingView from './PendingView'

import ChevronLeft from '../../assets/svg/base/chevron_left.svg'
import CloseSVG from '../../assets/svg/base/close.svg'

const CloseIcon = styled.div`
  position: absolute;
  right: 26px;
  top: 19px;
  &:hover {
    cursor: pointer;
    opacity: 0.6;
  }
`

const Wrapper = styled.div`
  ${({ theme }) => theme.flexColumnNoWrap}
  margin: 0;
  padding: 0;
  width: 100%;
`

const HeaderRow = styled.div`
  ${({ theme }) => theme.flexRowNoWrap};
  padding: 20px 24px;
  font-weight: 500;
  color: ${props => (props.color === 'blue' ? ({ theme }) => theme.primary1 : 'inherit')};
`

const ContentWrapper = styled.div`
  background-color: ${({ theme }) => '#FFF'};
  padding: 0 24px 24px;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
`

const UpperSection = styled.div`
  position: relative;

  h5 {
    margin: 0;
    margin-bottom: 0.5rem;
    font-size: 1rem;
    font-weight: 400;
  }

  h5:last-child {
    margin-bottom: 0px;
  }

  h4 {
    margin-top: 0;
    font-weight: 500;
  }
`

const Blurb = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  color: #606080;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 20px;
`

const StyledOption = styled(Option)`
background-color: red !important;
  > div {
    font-weight: bold;
  }
`

const OptionGrid = styled.div`
  display: grid;
  grid-gap: 20px;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    grid-template-columns: 1fr;
    grid-gap: 20px;
  `};
`

const HoverText = styled.div`
  align-items: center;
  display: flex;
  color: #00BFA0;
  font-weight: normal;
  :hover {
    cursor: pointer;
    color: #009985;
  }
`

const HoverTextB = styled.div`
  align-items: center;
  display: flex;
  font-weight: normal;

  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #151526;

  :hover {
    cursor: pointer;
    color: #151526;
  }
`

const WALLET_VIEWS = {
  OPTIONS: 'options',
  OPTIONS_SECONDARY: 'options_secondary',
  ACCOUNT: 'account',
  PENDING: 'pending'
}

export default function WalletModal({
  pendingTransactions,
  confirmedTransactions,
  ENSName
}: {
  pendingTransactions: string[] // hashes of pending
  confirmedTransactions: string[] // hashes of confirmed
  ENSName?: string
}) {
  const { t } = useTranslation()

  // important that these are destructed from the account-specific web3-react context
  const { active, account, connector, activate, error } = useWeb3React()

  if (error instanceof UnsupportedChainIdError) {
    notification.open({
      key: 'unsupportNewworkNotify',
      duration: 4,
      className: 'unsupportNewworkNotify',
      message: t('wallet.errUnsupportChain'),
      description: t('wallet.errUnsupportChainInfo'),
      icon: <NotifyWarningIcon />,
      closeIcon: <NotifyCloseIcon />
    });
  }

  const [walletView, setWalletView] = useState(WALLET_VIEWS.ACCOUNT)

  const [pendingWallet, setPendingWallet] = useState<AbstractConnector | undefined>()

  const [pendingError, setPendingError] = useState<boolean>()

  const walletModalOpen = useModalOpen(ApplicationModal.WALLET)
  const toggleWalletModal = useWalletModalToggle()

  const previousAccount = usePrevious(account)

  // close on connection, when logged out before
  useEffect(() => {
    if (account && !previousAccount && walletModalOpen) {
      toggleWalletModal()
    }
  }, [account, previousAccount, toggleWalletModal, walletModalOpen])

  // always reset to account view
  useEffect(() => {
    if (walletModalOpen) {
      setPendingError(false)
      setWalletView(WALLET_VIEWS.ACCOUNT)
    }
  }, [walletModalOpen])

  // close modal when a connection is successful
  const activePrevious = usePrevious(active)
  const connectorPrevious = usePrevious(connector)
  useEffect(() => {
    if (walletModalOpen && ((active && !activePrevious) || (connector && connector !== connectorPrevious && !error))) {
      setWalletView(WALLET_VIEWS.ACCOUNT)
    }
  }, [setWalletView, active, error, connector, walletModalOpen, activePrevious, connectorPrevious])

  const tryActivation = async (connector: AbstractConnector | undefined) => {
    let name = ''
    Object.keys(SUPPORTED_WALLETS).map(key => {
      if (connector === SUPPORTED_WALLETS[key].connector) {
        console.log(SUPPORTED_WALLETS[key].name, key)
        return (name = SUPPORTED_WALLETS[key].name)
      }
      return true
    })
    // log selected wallet
    ReactGA.event({
      category: 'Wallet',
      action: 'Change Wallet',
      label: name
    })
    setPendingWallet(connector) // set wallet for pending view
    setWalletView(WALLET_VIEWS.PENDING)

    // if the connector is walletconnect and the user has already tried to connect, manually reset the connector
    if (connector instanceof WalletConnectConnector && connector.walletConnectProvider?.wc?.uri) {
      connector.walletConnectProvider = undefined
    }

    connector &&
      activate(connector, undefined, true).catch(error => {
        if (error instanceof UnsupportedChainIdError) {
          activate(connector) // a little janky...can't use setError because the connector isn't set
        } else {
          setPendingError(true)
        }
      })
  }

  // close wallet modal if fortmatic modal is active
  useEffect(() => {
    fortmatic.on(OVERLAY_READY, () => {
      toggleWalletModal()
    })
  }, [toggleWalletModal])

  // get wallets user can switch too, depending on device/browser
  function getOptions() {
    const isMetamask = window.ethereum && window.ethereum.isMetaMask

    // const isOKExWallet = window.okexchain && window.okexchain.isOKExWallet
    return Object.keys(SUPPORTED_WALLETS)
      .filter(key => SUPPORTED_WALLETS[key].show)
      .map(key => {
        const option = SUPPORTED_WALLETS[key]
        // check for mobile options
        if (isMobile) {
          //disable portis on mobile for now
          if (option.connector === portis) {
            return null
          }

          if (!window.web3 && !window.ethereum && option.mobile) {
            return (
              <StyledOption
                onClick={() => {
                  option.connector !== connector && !option.href && tryActivation(option.connector)
                }}
                id={`connect-${key}`}
                key={key}
                active={option.connector && option.connector === connector}
                color={option.color}
                link={option.href}
                header={option.name}
                subheader={null}
                icon={require('../../assets/svg/wallet/' + option.iconName)}
              />
            )
          }
          return null
        }

        // overwrite injected when needed
        if (option.connector === injected || option.connector === okexwallet) {
          // don't show injected if there's no injected provider

          if ((!(window.ethereum && window.ethereum.isMetaMask) && option.name === 'MetaMask')
            || (!(window.okexchain && window.okexchain.isOKExWallet) && option.name === 'OKEx Wallet')) {
              return (
                <StyledOption
                  id={`connect-${key}`}
                  key={key}
                  color={'#151526'}
                  header={t('wallet.installWallet', { walletName: option.name })}
                  subheader={null}
                  link={option.installLink}
                  icon={require('../../assets/svg/wallet/' + option.iconName)}
                />
              )
          }
          // don't return metamask if injected provider isn't metamask
          else if (option.name === 'MetaMask' && !isMetamask) {
            return null
          }
          // likewise for generic
          else if (option.name === 'Injected' && isMetamask) {
            return null
          }
        }

        // return rest of options
        return (
          !isMobile &&
          !option.mobileOnly && (
            <StyledOption
              id={`connect-${key}`}
              onClick={() => {
                option.connector === connector
                  ? setWalletView(WALLET_VIEWS.ACCOUNT)
                  : !option.href && tryActivation(option.connector)
              }}
              key={key}
              active={option.connector === connector}
              color={option.color}
              link={option.href}
              header={option.name}
              subheader={null} //use option.descriptio to bring back multi-line
              icon={require('../../assets/svg/wallet/' + option.iconName)}
            />
          )
        )}
    )
  }

  function getModalContent() {
    // if (error) {
    //   return (
    //     <UpperSection>
    //       <CloseIcon onClick={toggleWalletModal}>
    //         <img src={CloseSVG} alt="close" />
    //       </CloseIcon>
    //       <HeaderRow>{error instanceof UnsupportedChainIdError ? t('wallet.wrongNetwork') : t('wallet.errorConnecting')}</HeaderRow>
    //       <ContentWrapper>
    //         {error instanceof UnsupportedChainIdError ? (
    //           <h5>{t('wallet.connectAppropriateOKExNetwork')}</h5>
    //         ) : (
    //           t('wallet.errorConnectingTry')
    //         )}
    //       </ContentWrapper>
    //     </UpperSection>
    //   )
    // }
    if (account && walletView === WALLET_VIEWS.ACCOUNT) {
      return (
        <AccountDetails
          toggleWalletModal={toggleWalletModal}
          pendingTransactions={pendingTransactions}
          confirmedTransactions={confirmedTransactions}
          ENSName={ENSName}
          openOptions={() => setWalletView(WALLET_VIEWS.OPTIONS)}
        />
      )
    }
    return (
      <UpperSection>
        <CloseIcon onClick={toggleWalletModal}>
          <img src={CloseSVG} alt="close" />
        </CloseIcon>
        {walletView !== WALLET_VIEWS.ACCOUNT ? (
          <HeaderRow>
            <HoverText
              onClick={() => {
                setPendingError(false)
                setWalletView(WALLET_VIEWS.ACCOUNT)
              }}
            >
              <img src={ChevronLeft} alt={t('global.back')} />
              {t('global.back')}
            </HoverText>
          </HeaderRow>
        ) : (
          <HeaderRow>
            <HoverTextB>{t('wallet.submitConnect')}</HoverTextB>
          </HeaderRow>
        )}
        <ContentWrapper>
          {walletView === WALLET_VIEWS.PENDING ? (
            <PendingView
              connector={pendingWallet}
              error={pendingError}
              setPendingError={setPendingError}
              tryActivation={tryActivation}
            />
          ) : (
            <OptionGrid>{getOptions()}</OptionGrid>
          )}
          {walletView !== WALLET_VIEWS.PENDING && (
            <Blurb>
              <span className="mr-2">{t('wallet.newUser_')}</span>
              <ExternalLink href="https://ethereum.org/wallets/">{t('wallet.learnAboutWallets')}</ExternalLink>
            </Blurb>
          )}
        </ContentWrapper>
      </UpperSection>
    )
  }

  return (
    <Modal isOpen={walletModalOpen} onDismiss={toggleWalletModal} minHeight={false} maxHeight={90}>
      <Wrapper>{getModalContent()}</Wrapper>
    </Modal>
  )
}
