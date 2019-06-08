import { LitElement, html, customElement} from 'lit-element';
import { Router, RouterNode } from '../router/router';
import Theme from './Theme';

@customElement('dev-app')
class AppComponent extends LitElement {

  route(path: string) {
    return () => Ioc.Router.nav(path);
  }

  render() {
    return html`
      <style>
        * {height: 100%;}

        .background {
          background-color: var(--theme3);
        }
      </style>
      <div class="background">
        <dev-blog></dev-blog>
      </div>
    `;
  }
}

@customElement('dev-blog')
class BlogComponent extends LitElement {
  render() {
    return html`
      <style>
      .wrapper {
        height: 100%;
      }

      .theme1 {background-color: var(--theme1); }
      .theme2 {background-color: var(--theme2); }
      .theme3 {background-color: var(--theme3); }
      .theme4 {background-color: var(--theme4); }
      .theme5 {background-color: var(--theme5); }
      </style>
      <div class="wrapper">
        <div class="theme1">&nbsp</div>
        <div class="theme2">&nbsp</div>
        <div class="theme4">&nbsp</div>
        <div class="theme5">&nbsp</div>
      </div>`;
  }
}

@customElement('dev-router-outlet')
class RouterOutletComponent extends LitElement {

    render() {
        return html`<div class="dev-router-outlet">`;
    }
}

export class Ioc {
  static Theme: Theme = new Theme();
  static Router: Router = new Router({
      beforeRoute(args) {
          console.log(args);
      },
      routerOutlet: 'dev-router-outlet',
      tree: new RouterNode({
        component: AppComponent,
        path: '',
        children: [
          new RouterNode({path: 'blog', component: BlogComponent }),
        ]
      })
  });
}

