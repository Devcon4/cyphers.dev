import { LitElement, html, customElement} from 'lit-element';
import { Router } from '../router/router';

@customElement('dev-app')
class AppComponent extends LitElement {
  render() {
    return html`
      <div>Hello world!</div>
    `;
  }
}

@customElement('dev-router-outlet')
class RouterOutletComponent extends LitElement {
    render() {
        return html`<div class="dev-router-outlet"></div>`;
    }
}

export class Ioc {
    static Router: Router = new Router({
        beforeRoute(args) {
            console.log(args);
        },
        routerOutlet: 'dev-router-outlet'
    });
}