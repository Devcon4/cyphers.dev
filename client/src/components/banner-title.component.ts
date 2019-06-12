import { LitElement, html, customElement, property } from 'lit-element';

@customElement('dev-banner-title')
export default class BannerTitleComponent extends LitElement {
  @property()
  text: string;
  render() {
    return html`
    <style>
      ::selection {
      background: var(--DarkAccent) /* WebKit/Blink Browsers */
    }
    ::-moz-selection {
      background: var(--DarkAccent); /* Gecko Browsers */
    }
      .banner {
        position: sticky;
        top: 0;
        z-index: 1000;
        background-color: var(--DarkAccent);
        filter: drop-shadow(0px 3px 6px black);
        padding-top: 12px;
        padding-bottom: 12px;
        font-size: 42px;
        font-family: voltage,sans-serif;
        font-weight: 400;
        font-style: normal;
        padding-left: var(--GutterWidth);
        text-decoration: underline solid var(--Main);
        color: var(--LightShade);
      }
    </style>
    <div class="banner">${this.text}</div>`;
  }
}
