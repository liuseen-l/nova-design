import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import style from './style'

@customElement('nova-button')
export class NovaButton extends LitElement {
  @property({ type: Number })
  count = 1

  constructor() {
    super()
  }

  render() {
    return html`
        <button @click=${this._onClick} part="button">
          count is ${this.count}
        </button>
    `
  }

  private _onClick() {
    this.count++
  }

  static styles = css`${style()}`
}
