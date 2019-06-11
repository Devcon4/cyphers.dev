import { LitElement, html, css, customElement, property} from 'lit-element';
import { Ioc } from './Ioc';
import './assets/styles/prismTheme.css';

@customElement('dev-app')
export class AppComponent extends LitElement {

  route(path: string) {
    return () => Ioc.Router.nav(path);
  }

  render() {
    return html`
      <style>
        * {height: 100%;}

        .background {
          --line-count: 6;
          --line-colors: '';
          --line-swaps: '100,1850,1500';
          --animation-tick: 0;
          background-image: paint(linePattern);
        }
      </style>
      <div class="background">
        <dev-blog></dev-blog>
      </div>
    `;
  }
}

@customElement('dev-blog')
export class BlogComponent extends LitElement {

  snippet = `
    let func = () => {
      console.log('I work!');
    }

    funct();

    console.log('And Im styled!');
  `;

  render() {
    return html`
      <style>
      .wrapper {
        height: 100%;
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
          <dev-banner-title text="About this blog"></dev-banner-title>
          <dev-code-block code="${this.snippet}" language="${'javascript'}"></dev-code-block>
        </div>
      </div>`;
  }
}

import { highlight } from "reprism";

@customElement('dev-code-block')
export class CodeBlock extends LitElement {
  @property() code: string;
  @property() language: string;

  render() {
    // @ts-ignore
    return html([highlight(this.code, this.language)]);
  }
}

@customElement('dev-banner-title')
export class BannerTitle extends LitElement {
  @property() text: string;

  render() {
    return html`
    <style>
      .banner {
        background-color: var(--DarkAccent);
        filter: drop-shadow(0px 4px 6px gray);
        padding-top: 24px;
        padding-bottom: 12px;
        font-size: 32px;
        font-family: voltage,sans-serif;
        font-weight: 400;
        font-style: normal;
        padding-left: 20%;
        color: var(--LightShade);
      }
    </style>
    <div class="banner">${this.text}</div>`;
  }
}

@customElement('dev-router-outlet')
export class RouterOutletComponent extends LitElement {

    render() {
        return html`<div class="dev-router-outlet">`;
    }
}
