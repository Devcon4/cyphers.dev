import { Router, RouterNode } from '../router/router';
import Theme from './Theme';
// import { AppComponent, BlogComponent } from './main';
import bootstrap from './BootstrapHoudini';

export class Ioc {

    static init = (() => {
        bootstrap();
    })();

  static Theme: Theme = new Theme();
  static Router: Router = undefined;
//   new Router({
//     beforeRoute(args) {
//       console.log(args);
//     },
//     routerOutlet: 'dev-router-outlet',
//     tree: new RouterNode({
//       component: AppComponent,
//       path: '',
//       children: [
//         new RouterNode({ path: 'blog', component: BlogComponent }),
//       ]
//     })
//   });
}
