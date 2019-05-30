import { Guid } from 'guid-typescript';
import { BehaviorSubject } from 'rxjs';

export type UrlParamMap<T> = {[k in keyof T]: T[k]}

export class RouterNode {
    id: Guid = Guid.create();
    path: string;
    children: RouterNode[] = [];
    urlParms: UrlParamMap<unknown> = {};
    component: componentLike;
}

export type componentLike = {new()} & HTMLElement;

export type RouterOptions = {beforeRoute: (args: {activeRoute: RouterNode, previousActiveRoute: RouterNode, queryParams: UrlParamMap<unknown>}) => void};

export interface devOnInit {
    OnInit(): void;
}
export interface devOnDestroy {
    OnDestroy(): void;
}

export class Router {

    public tree: BehaviorSubject<RouterNode> = new BehaviorSubject(undefined);
    public activeRoute: BehaviorSubject<RouterNode> = new BehaviorSubject(undefined);

    public queryParams: BehaviorSubject<UrlParamMap<unknown>> = new BehaviorSubject(undefined);

    private _options: RouterOptions;

    constructor(options: RouterOptions = {} as RouterOptions) {
        this._options = options;
        window.addEventListener('popstate', this.onPopState);
    }

    cleanup() {
        window.removeEventListener('popstate', this.onPopState);
    }

    onPopState() {
        this.updateRoute(window.location.pathname);
    }

    updateRoute(url: string) {
        let results = this.parseUrl(url);
        
        if(this._options.beforeRoute) this._options.beforeRoute({
            activeRoute: results.activeRoute,
            previousActiveRoute: this.activeRoute.getValue(),
            queryParams: results.queryParamMap
        });

        this.activeRoute.next(results.activeRoute);
        this.queryParams.next(results.queryParamMap);
        console.log(results);
    }
    
    nav(path: string) {
        window.history.pushState(null,null, path);
        this.updateRoute(path);
    }

    parseQueryParams(params: string) {
        let results = new Map<string, string>();

        let parts = params.substring(1, params.length).split('&');

        for(let i = 0; i < parts.length; i++) {
            let prop = parts[i].split('=');
            if(prop.length > 1) break; // prop can't have = in the value!
            results.set(prop[0], prop[1]);
        }

        return results;
    }

    searchPathInTree(path: string, depthIndex: number) {
        let recurse = (index: number, node: RouterNode) => {
            if(node.children && node.children.length > 0) {
                if (index = depthIndex) {
                    if(node.path === path) {
                        return {node, index};
                    }
                };
                for(let n of node.children) {
                    if(index < depthIndex && n.children && n.children.length > 0) recurse(index++, n);
                }
            }
        }

        return recurse(0, this.tree.getValue());
    }

    parseUrl(url: string) {
        let parts = url.split('/');
        let urlParams = new Set<string>();
        let queryParams = new Map<string, string>();

        let activeRoute: RouterNode;

        let treeIndex = 0;

        for(let i = 0; i < parts.length; i++) {
            let isUrlParam = (/(:)\w+/).test(parts[i]); // This is wrong, urlParams will be like user/4/details not user/:4/details
            let isQueryParam = (/(\?)\w+=".*"/g).test(parts[i])
            if(isQueryParam) {
               queryParams = this.parseQueryParams(parts[i]);
            }

            let matchNode = this.searchPathInTree(parts[i], treeIndex);

            if(matchNode) {
                treeIndex++;
                if(!activeRoute) {
                    activeRoute = matchNode.node;
                } else {
                    let holder = matchNode.node;
                    holder.children.push(activeRoute);
                    activeRoute = holder;
                }

            } else {
                // failed to find path!
                return;
            }

        }

        return { urlParamMap: urlParams, queryParamMap: queryParams, activeRoute };
    }
}