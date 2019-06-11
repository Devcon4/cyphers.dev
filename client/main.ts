import { LitElement, html, customElement} from 'lit-element';
import { Ioc } from './Ioc';

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
          --line-swaps: '500,800,1850,1500';
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
  render() {
    return html`
      <style>
      .wrapper {
        height: 100%;
      }

      .LightShade {background-color: var(--LightShade); }
      .LightAccent {background-color: var(--LightAccent); }
      .Main {background-color: var(--Main); }
      .DarkAccent {background-color: var(--DarkAccent); }
      .DarkShade {background-color: var(--DarkShade); }
      </style>
      <div class="wrapper">
      </div>`;
  }
}

@customElement('dev-router-outlet')
export class RouterOutletComponent extends LitElement {

    render() {
        return html`<div class="dev-router-outlet">`;
    }
}
