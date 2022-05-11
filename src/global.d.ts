import { SxProps } from '@theme-ui/core'

declare global {
  namespace JSX {
    // tslint:disable-next-line: no-empty-interface
    interface IntrinsicAttributes extends SxProps {}
  }
}
