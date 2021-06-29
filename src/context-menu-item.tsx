/* eslint-disable react/prop-types */
import { Spacer } from 'native-x-spacer'
import { Stack } from 'native-x-stack'
import { Text } from 'native-x-text'
import { COLOR } from 'native-x-theme'
import React from 'react'
import { MenuOption } from 'react-native-popup-menu'

interface Props {
  children: string
  disabled?: boolean
  icon?: (props: { color?: string }) => React.ReactElement
  onPress?: () => void
  backgroundColor?: string
  textColor?: string
  iconColor?: string
}

interface ContainerColor {
  textColor?: string
  iconColor?: string
  backgroundColor?: string
}

export interface ContextMenuItemPropsExtended {
  containerColors?: ContainerColor
}

export function ContextMenuItem({
  children,
  icon,
  disabled,
  backgroundColor,
  textColor,
  iconColor,
  onPress,
  ...props
}: Props) {
  const Icon = icon
  const { containerColors }: ContextMenuItemPropsExtended = props as any
  const contentColor = disabled
    ? COLOR.TERTIARY
    : textColor ?? containerColors?.textColor ?? COLOR.SECONDARY
  const iconContentColor = disabled
    ? COLOR.TERTIARY
    : iconColor ?? containerColors?.iconColor ?? COLOR.TERTIARY
  return (
    <MenuOption onSelect={onPress} disabled={disabled}>
      <Stack
        horizontal
        fillHorizontal
        padding={['horizontal:normal', 'vertical:small']}
        backgroundColor={backgroundColor ?? containerColors?.backgroundColor ?? COLOR.PRIMARY}
      >
        <Stack fill>
          <Text semiBold textColor={contentColor}>
            {children}
          </Text>
        </Stack>
        <Spacer size='x-small' />
        {Icon ? <Icon color={iconContentColor} /> : null}
      </Stack>
    </MenuOption>
  )
}
