import { NovaButton } from "./button"
import * as React from 'react'

declare global {
  interface HTMLElementTagNameMap {
    'nova-button': NovaButton
  }

  namespace JSX {
    interface IntrinsicElements {
      'nova-button': React.DOMElement<NovaButton>;
    }
  }
}

