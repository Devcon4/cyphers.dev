import { LitElement, html, customElement} from 'lit-element';
import { Ioc } from './services/Ioc';

import './components/blog.component';

@customElement('dev-app')
export class AppComponent extends LitElement {

  constructor() {
    super();

    document.body.style.setProperty('--GutterWidth', 50 + (64 * 2) + (12 * 3) + 'px' );
  }

  route(path: string) {
    return () => Ioc.Router.nav(path);
  }

  render() {
    return html`
      <style>

        .background {
          --line-count: 6;
          --line-colors: '';
          --line-swaps: '150,1850';
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
