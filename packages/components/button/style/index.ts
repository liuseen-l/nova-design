import { unsafeCSS } from 'lit'
import { genCssStyle } from '@nova-design/shared'
import styles from './index.scss?inline'

function style() {
  const cssText = genCssStyle(styles)
  return unsafeCSS(cssText)
}

export default style
