import React from 'react'
import { I18nManager, Animated, Easing, StyleSheet, PixelRatio } from 'react-native'
import { Platform } from 'react-native'

const OPEN_ANIM_DURATION = 225
const CLOSE_ANIM_DURATION = 195
const USE_NATIVE_DRIVER = Platform.OS !== 'web'
type Position = { left?: number; top?: number; right?: number; bottom?: number }
type Layout = { x: number; y: number; width: number; height: number }
type Layouts = { windowLayout: Layout; safeAreaLayout: Layout; optionsLayout: Layout }

const axisPosition = (oDim: number, wDim: number, tPos: number, tDim: number) => {
  // if options are bigger than window dimension, then render at 0
  if (oDim > wDim) {
    return 0
  }
  // render at trigger position if possible
  if (tPos + oDim <= wDim) {
    return tPos
  }
  // aligned to the trigger from the bottom (right)
  if (tPos + tDim - oDim >= 0) {
    return tPos + tDim - oDim
  }
  // compute center position
  const pos = Math.round(tPos + tDim / 2 - oDim / 2)
  // check top boundary
  if (pos < 0) {
    return 0
  }
  // check bottom boundary
  if (pos + oDim > wDim) {
    return wDim - oDim
  }
  // if everything ok, render in center position
  return pos
}

function fit(pos: number, len: number, minPos: number, maxPos: number) {
  if (pos === undefined) {
    return undefined
  }
  if (pos + len > maxPos) {
    pos = maxPos - len
  }
  if (pos < minPos) {
    pos = minPos
  }
  return pos
}

// fits options (position) into safeArea
const fitPositionIntoSafeArea = (position: Position, layouts: Layouts) => {
  const { windowLayout, safeAreaLayout, optionsLayout } = layouts
  if (!safeAreaLayout) {
    return position
  }
  const { x: saX, y: saY, height: saHeight, width: saWidth } = safeAreaLayout
  const { height: oHeight, width: oWidth } = optionsLayout
  const { width: wWidth } = windowLayout
  let { top, left, right } = position
  top = fit(top as number, oHeight, saY, saY + saHeight)
  left = fit(left as number, oWidth, saX, saX + saWidth)
  right = fit(right as number, oWidth, wWidth - saX - saWidth, saX)
  return { top, left, right }
}

const computePosition = (layouts: any, isRTL: boolean) => {
  const { windowLayout, triggerLayout, optionsLayout } = layouts
  const { x: wX, y: wY, height: wHeight } = windowLayout
  const { x: tX, y: tY, height: tHeight, width: tWidth } = triggerLayout
  const { height: oHeight, width: oWidth } = optionsLayout
  const top = axisPosition(oHeight, wHeight, tY - wY, tHeight)
  const left = axisPosition(oWidth, oWidth, tX - wX, tWidth)
  const start = isRTL ? 'right' : 'left'
  const position = { top, [start]: left }
  return fitPositionIntoSafeArea(position, layouts)
}

interface Props {
  style: any
  layouts: Layouts
}

export class ContextMenuRenderer extends React.Component<Props, any> {
  constructor(props: Props) {
    super(props)
    this.state = {
      scaleAnim: new Animated.Value(0.1),
    }
  }

  componentDidMount() {
    Animated.timing(this.state.scaleAnim, {
      duration: OPEN_ANIM_DURATION,
      toValue: 1,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: USE_NATIVE_DRIVER,
    }).start()
  }

  close() {
    return new Promise(resolve => {
      Animated.timing(this.state.scaleAnim, {
        duration: CLOSE_ANIM_DURATION,
        toValue: 0,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: USE_NATIVE_DRIVER,
      }).start(resolve)
    })
  }

  render() {
    const { style, children, layouts, ...other } = this.props
    const animation = {
      transform: [{ scale: this.state.scaleAnim }],
      opacity: this.state.scaleAnim,
    }
    const position = computePosition(layouts, I18nManager.isRTL)
    return (
      <Animated.View {...other} style={[styles.options, style, animation, position]}>
        {children}
      </Animated.View>
    )
  }
}

export const styles = StyleSheet.create({
  options: {
    position: 'absolute',
    borderRadius: 2,
    backgroundColor: 'white',
    width: PixelRatio.roundToNearestPixel(200),

    // Shadow only works on iOS.
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowOffset: { width: 3, height: 3 },
    shadowRadius: 4,

    // This will elevate the view on Android, causing shadow to be drawn.
    elevation: 5,
  },
})
