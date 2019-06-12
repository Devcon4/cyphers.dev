import { LitElement, html, customElement } from 'lit-element';

import './banner-title.component';
import './paragraph.component';
import './sub-heading.component';
import './code-block.component';

@customElement('dev-blog')
export default class BlogComponent extends LitElement {

  intro = `
    This is a small blog to help be more through and public about the stuff I learn from time to time. Right now is is a simple app just to get some sort of blog up and running. It was timeboxed to two weeks so that it actually was small enough scope to be completed. Eventually there will be future code challenges and blogs posted on here.
  `;

  stackIntro = `
    The core framework I am using for this site is Lit-Element. It's a super cool lightweight web component wrapper around lit-html. This is an example component.
  `;

  snippet = `
  import { LitElement, customElement, property, html, css } from 'lit-element';

  @customElement('dev-paragraph')
  export default class ParagraphComponent extends LitElement {
      @property() content: string;
  
      render() {
          return html\`<p>\${this.content}</p>\`;
      }
  
  }
  `

  render() {
    return html`
      <style>
      .wrapper {
        height: 100%;
      }

      .banner:host {
        position: sticky;
      }

      .spacer {
        content: '&nbsp';
        margin-bottom: 150px;
      }

      .background {
        padding-top:5vh;
      }

      .LightShade {background-color: var(--LightShade); }
      .LightAccent {background-color: var(--LightAccent); }
      .Main {background-color: var(--Main); }
      .DarkAccent {background-color: var(--DarkAccent); }
      .DarkShade {background-color: var(--DarkShade); }

      

      </style>
      <div class="background">
        <div class="wrapper">
          <dev-banner-title class="banner" text="About this blog"></dev-banner-title>
          <div class="spacer"></div>
          <dev-sub-heading title="Introduction"></dev-sub-heading>
          <dev-paragraph content="${this.intro}"></dev-paragraph>
          <dev-sub-heading title="The stack"></dev-sub-heading>
          <dev-paragraph content="${this.stackIntro}"></dev-paragraph>
          <dev-code-block code="${this.snippet}" language="${'javascript'}"></dev-code-block>
        </div>
      </div>`;
  }
}
