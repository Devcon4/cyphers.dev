import { LitElement, html, customElement } from 'lit-element';
@customElement('dev-router-outlet')
export default class RouterOutletComponent extends LitElement {
  render() {
    return html`<div class="dev-router-outlet">`;
  }
}
