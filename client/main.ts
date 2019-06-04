import { LitElement, html, customElement} from 'lit-element';
import { Router, RouterNode } from '../router/router';

@customElement('dev-app')
class AppComponent extends LitElement {
  route(path: string) {
    return () => Ioc.Router.nav(path);
  }

  render() {
    return html`
      <div>Hello world!</div>
      <button @click="${this.route('/main')}">main</button>
      <button @click="${this.route('/about')}">about</button>
      <button @click="${this.route('/other')}">other</button>
      <dev-router-outlet></dev-router-outlet>
      <div>Tailing!</div>
    `;
  }
}

@customElement('dev-main')
class MainComponent extends LitElement {
  render() {
    return html`<div>Main!</div>`;
  }
}

@customElement('dev-about')
class AboutComponent extends LitElement {
  render() {
    return html`<div>About!<dev-main></dev-main></div>`;
  }
}

@customElement('dev-other')
class OtherComponent extends LitElement {
  render() {
    return html`<div>Other!</div>`
  }
}

@customElement('dev-router-outlet')
class RouterOutletComponent extends LitElement {
    render() {
        return html`<div class="dev-router-outlet">`;
    }
}

export class Ioc {
    static Router: Router = new Router({
        beforeRoute(args) {
            console.log(args);
        },
        routerOutlet: 'dev-router-outlet',
        tree: new RouterNode({
          component: AppComponent,
          path: '',
          children: [
            new RouterNode({path: 'main', component: MainComponent }),
            new RouterNode({path: 'about', component: AboutComponent}),
            new RouterNode({path: 'other', component: OtherComponent})
          ]
        })
    });
}