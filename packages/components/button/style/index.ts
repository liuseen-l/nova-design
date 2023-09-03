import { unsafeCSS } from 'lit'
import { genCssStyle } from '@nova-desigin/shared'
import styles from './index.css?inline'

function style() {
  const cssText = genCssStyle(styles)
  return unsafeCSS(cssText)
}

export default style
