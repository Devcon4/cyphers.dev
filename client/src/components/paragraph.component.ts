import { LitElement, customElement, property, html, css } from 'lit-element';

@customElement('dev-paragraph')
export default class ParagraphComponent extends LitElement {
    @property() content: string;

    static styles = css`
    ::selection {
        background: var(--DarkAccent) /* WebKit/Blink Browsers */
      }
      ::-moz-selection {
        background: var(--DarkAccent); /* Gecko Browsers */
      }
        p {
            font-size: 24px;
            padding-left: 32px;
            margin-left: var(--GutterWidth);
            margin-right: var(--GutterWidth);
        }
    `;

    render() {
        return html`<p>${this.content}</p>`;
    }

}