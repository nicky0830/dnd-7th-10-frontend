import React, { PropsWithChildren } from 'react'
import styled from '@emotion/native'
import { backgroundWithColor } from '../../styles/backgrounds'
import { fontWithColorFamily } from '../../styles/fonts'
import { flexWithAlign } from '../../styles/flexbox'

function getToastBackground({ variant }: Props) {
  if (variant === 'red') {
    return backgroundWithColor('system_red')
  }

  return backgroundWithColor('system_blue')
}

const ToastView = styled.View<Props>`
  ${flexWithAlign('flex-start', 'flex-start')}
  background: ${getToastBackground};
  flex-direction: row;
  height: 38px;
  border-radius: 4px;
  padding: 0 16px;
  max-width: ${props => (props.short ? '66%' : '100%')};
  position: absolute;
  left: 0;
  right: 0;
  bottom: ${props => props.offset + 'px'};
`

const ToastImage = styled.Image`
  top: 7px;
  width: 24px;
  height: 24px;
  margin-right: 8px;
`

const ToastText = styled.Text`
  ${fontWithColorFamily('gray_1', 'SemiBold')}
  flex: 1;
  height: 38px;
  line-height: 38px;
`

export type VariantType = 'red' | 'blue'

interface Props {
  warn?: boolean
  check?: boolean
  short?: boolean
  variant: VariantType
  offset: number
}

const Toast = ({
  children,
  variant,
  warn,
  check,
  short,
  offset
}: PropsWithChildren<Props>) => {
  return (
    <ToastView variant={variant} offset={offset} short={short}>
      {warn && (
        <ToastImage source={require('../../assets/images/warning.png')} />
      )}
      {check && (
        <ToastImage source={require('../../assets/images/check.png')} />
      )}
      <ToastText numberOfLines={1}>{children}</ToastText>
    </ToastView>
  )
}

Toast.defaultProps = {
  variant: 'blue'
}

export default Toast
