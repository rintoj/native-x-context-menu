# native-x-context-menu

[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

Component that providers context menu capabilities

## Install

### Yarn

```sh
yarn add native-x-context-menu
```

### NPM

```sh
npm install native-x-context-menu
```

## Usage

```tsx
import { ContextMenu, ContextMenuItem, ContextMenuSeparator } from 'native-x-context-menu'

function MyComponent() {
  return (
    <ContextMenu>
      <ContextMenuItem icon={CheckmarkIcon}>Approve</ContextMenuItem>
      <ContextMenuItem icon={CloseIcon} onPress={() => Alert.alert('Reject')}>
        Reject
      </ContextMenuItem>
      <ContextMenuSeparator />
      <ContextMenuItem icon={CopyOutlineIcon} disabled>
        Copy Link
      </ContextMenuItem>
      <ContextMenuSeparator />
      <ContextMenuItem textColor={COLOR.ERROR} icon={TrashOutlineIcon}>
        Delete
      </ContextMenuItem>
    </ContextMenu>
  )
}
```

## API ContextMenu

| Property                  | Default Value   | Usage                                  |
| ------------------------- | --------------- | -------------------------------------- |
| backgroundColor?: string  | COLOR.PRIMARY   | Container color                        |
| textColor?: string        | COLOR.SECONDARY | Default color for ContextMenuItem      |
| iconColor?: string        | COLOR.TERTIARY  | Default icon color for ContextMenuItem |
| children?: ReactElement[] |                 | List of ContextMenuItem                |

## API ContextMenuItem

| Property                  | Default Value   | Usage                                                                 |
| ------------------------- | --------------- | --------------------------------------------------------------------- |
| children: string          |                 | Menu text                                                             |
| icon?: () => ReactElement |                 | Icon. Eg: icon={CloseIcon}                                            |
| disabled?: boolean        |                 | Disabled if true                                                      |
| backgroundColor?: string  | COLOR.PRIMARY   | Background color                                                      |
| textColor?: string        | COLOR.SECONDARY | Text color for ContextMenuItem - overrides textColor from ContextMenu |
| iconColor?: string        | COLOR.TERTIARY  | Text color for ContextMenuItem - overrides iconColor from ContextMenu |
| onPress?: () => void      |                 | Callback handler for onPress                                          |

## Automatic Release

Here is an example of the release type that will be done based on a commit messages:

| Commit message      | Release type          |
| ------------------- | --------------------- |
| fix: [comment]      | Patch Release         |
| feat: [comment]     | Minor Feature Release |
| perf: [comment]     | Major Feature Release |
| doc: [comment]      | No Release            |
| refactor: [comment] | No Release            |
| chore: [comment]    | No Release            |
