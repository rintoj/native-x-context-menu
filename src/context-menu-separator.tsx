import { Stack } from 'native-x-stack'
import { COLOR } from 'native-x-theme'
import React from 'react'

export function ContextMenuSeparator() {
  return (
    <Stack fillHorizontal alignCenter padding='vertical:x-small' opacity={'low'}>
      <Stack backgroundColor={COLOR.SECONDARY} height={2} fillHorizontal opacity={'low'} />
    </Stack>
  )
}
