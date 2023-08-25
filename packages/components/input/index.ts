import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('nova-input')
export class NovaInput extends LitElement {
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
}
