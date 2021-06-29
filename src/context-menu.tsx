import { EllipsisHorizontalIcon } from 'native-x-icon'
import { COLOR, THEME, useTheme } from 'native-x-theme'
import React from 'react'
import { Menu, MenuOptions, MenuTrigger } from 'react-native-popup-menu'
import { ContextMenuItemPropsExtended } from './context-menu-item'
import { ContextMenuRenderer } from './context-menu-renderer'

const styles = {
  optionsContainer: { paddingVertical: 8, borderRadius: 8 },
}

interface Props {
  backgroundColor?: string
  textColor?: string
  iconColor?: string
  children?: React.ReactElement | React.ReactElement[]
  triggerRenderer?: () => React.ReactElement
}

export function ContextMenu({
  backgroundColor,
  children,
  textColor,
  triggerRenderer,
  iconColor = COLOR.TERTIARY,
}: Props) {
  const { getBackgroundColor, themeName } = useTheme()
  const isLightTheme = themeName === THEME.LIGHT
  const bgColor = backgroundColor ?? isLightTheme ? COLOR.PRIMARY : COLOR.DIVIDER
  const containerStyle = getBackgroundColor(bgColor)
  const contextMenuItemProps: ContextMenuItemPropsExtended = {
    containerColors: {
      backgroundColor: bgColor,
      textColor,
      iconColor,
    },
  }
  return (
    <Menu renderer={ContextMenuRenderer}>
      <MenuTrigger>
        {triggerRenderer ? triggerRenderer() : <EllipsisHorizontalIcon color={iconColor} />}
      </MenuTrigger>
      <MenuOptions
        optionsContainerStyle={containerStyle}
        customStyles={{
          optionsContainer: styles.optionsContainer,
          optionWrapper: { padding: 0, ...containerStyle },
        }}
      >
        {React.Children.map(children, (item: any) =>
          React.cloneElement(item, contextMenuItemProps),
        )}
      </MenuOptions>
    </Menu>
  )
}
