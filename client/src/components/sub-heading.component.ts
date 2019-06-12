import { customElement, LitElement, html, css, property } from 'lit-element';

@customElement('dev-sub-heading')
export default class SubHeadingComponent extends LitElement {
    @property() title: string;

    static styles = css`
    ::selection {
        background: var(--DarkAccent) /* WebKit/Blink Browsers */
      }
      ::-moz-selection {
        background: var(--DarkAccent); /* Gecko Browsers */
      }
        .heading {
            font-size: 32px;
            padding: 24px;
            color: var(--LightShade);
            background-color: var(--DarkShade);

            padding-left: var(--GutterWidth);
        }
        .wrapper {
            display: flex;
            filter: drop-shadow(0px 2px 3px black);
        }

        .triangle {
            margin-left: -0.5px;
            -webkit-clip-path: polygon(100% 50%, 0 0, 0 100%);
            clip-path: polygon(100% 50%, 0 0, 0 100%);
            background-color: var(--DarkShade);
            width: 70px;
        }
    `;

    render() {
        return html`
            <div class="wrapper">
                <div class="heading">${this.title}</div>
                <div class="triangle"></div>
            </div>`;
    }
}