import { Guid } from 'guid-typescript';
import { BehaviorSubject, range } from 'rxjs';
import { tap, filter } from 'rxjs/operators';

export type UrlParamMap<T> = {[k in keyof T]: T[k]}

export class RouterNode {
    id: Guid = Guid.create();
    path: string;
    children: RouterNode[] = [];
    urlParms: UrlParamMap<unknown> = {};
    component: componentLike<any>;

    constructor(args: Partial<RouterNode>) {
        Object.assign(this, args);
    }
}

export type componentLike<T extends {new(): T} & HTMLElement> = T;

export type RouterOptions = {
    tree: RouterNode,
    beforeRoute: (args: {activeRoute: RouterNode, previousActiveRoute: RouterNode, queryParams: UrlParamMap<unknown>}) => void,
    routerOutlet: string
};

export interface devOnInit {
    OnInit(): Promise<void>;
}
export interface devOnDestroy {
    OnDestroy(): Promise<void>;
}

export interface devOnChanges {
    OnChanges<T>(data: T): Promise<void>;
}

export class Router {

    public tree: BehaviorSubject<RouterNode> = new BehaviorSubject(undefined);
    public activeRoute: BehaviorSubject<RouterNode> = new BehaviorSubject(undefined);

    public queryParams: BehaviorSubject<UrlParamMap<unknown>> = new BehaviorSubject(undefined);

    private _componentMap = new Map<number, {fragment: DocumentFragment, guid: Guid}>();
    private _options: RouterOptions;

    private _rootFragment: Element;

    constructor(options: RouterOptions = {} as RouterOptions) {
        this._options = options;

        this.tree.next(this._options.tree);
        window.addEventListener('popstate', this.onPopState);

        this.activeRoute.pipe(filter(v => !!v), tap(this.onActiveRouteChange.bind(this))).subscribe();
        setTimeout(() => {
            this.updateRoute(window.location.pathname);
        });
    }

    async onActiveRouteChange(v: RouterNode) {
        let depthIndex = 0;
        let newMap = new Map<number, {fragment: DocumentFragment, guid: Guid}>();
        this._componentMap.clear();
        if(this._rootFragment) {
            this._rootFragment.removeChild(this._rootFragment.firstElementChild)
        }

        let recurse = async (node: RouterNode) => {
            if(node.children && node.children.length > 0) {
                let frag = new DocumentFragment();
                frag.appendChild(new node.component());

                newMap.set(depthIndex, {fragment: frag, guid: node.id});

                for(let i = 0; i < node.children.length; i++) {
                    let currNode = node.children[i];
                    // console.log(currNode.component);
                    // let elm = currNode.component.querySelector(this._options.routerOutlet);
                    // if(elm) {
                    //     let comp = this._componentMap.get(depthIndex);
                    //     if (!comp) {
                    //         let frag = new DocumentFragment();
                    //         let compElm = frag.appendChild(new currNode.component());
                    //         comp = {
                    //             component: compElm,
                    //             fragment: frag,
                    //             guid: currNode.id
                    //         };
                    //         this._componentMap.set(depthIndex, comp);
                    //     }
                    //     elm.appendChild(comp.fragment);

                    //     if(isDevOnChanges(comp.component)) {
                    //         await comp.component.OnChanges({}/**figure this out later! */);
                    //     }
                        // setup frag here (I think).
                    // }

                    await recurse(currNode);
                }

                depthIndex += 1;
            }
        }

        recurse(v);

        // let newMapArr = Array.from(newMap);
        // let oldFrags = Array.from(this._componentMap).filter(([i, c]) => newMapArr.some(([vi, vc]) => vc.guid === c.guid)).sort((a, b) => (a[0] > b[0] ? 1 : -1));

        // if(oldFrags && oldFrags.length > 0) {
        //     for(let [i, f] of oldFrags) {
        //         console.log(f.fragment);
        //         f.fragment.removeChild(f.fragment.firstElementChild);
        //     }
        // }

        this._componentMap = newMap;

        let rootComp = this._componentMap.get(0);

        this._rootFragment = document.body.firstElementChild.shadowRoot.querySelector(this._options.routerOutlet).shadowRoot.firstElementChild;
        this._rootFragment.appendChild(rootComp.fragment);

    }

    cleanup() {
        window.removeEventListener('popstate', this.onPopState);
    }

    onPopState() {
        console.log('pop state!');
        this.updateRoute(window.location.pathname);
    }

    updateRoute(url: string) {
        let results = this.parseUrl(url);
        console.log('update Route!');
        console.log(url);
        console.log(results);
        if(!results) return;
        
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
        console.log(`nav! ${path}`);
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
        let recurse = function(index: number, node: RouterNode): {node: RouterNode, index: number} {
            console.log('searchPathInTree! i: ' + index);
            console.log(path);
            console.log(node);
            if (index === depthIndex) {
                console.log('correct depth!');
                if(node.path === path) {
                    console.log('Path match!');
                    console.log(node);

                    return {node, index};
                }
            };

            let newIndex = index + 1;
            if(node.children && node.children.length > 0) {
                for(let n of node.children) {
                    if(index < depthIndex) {
                        let res = recurse(newIndex, n);
                        if(res) return res;
                    }
                }
            }
        }
        let res = recurse(0, this.tree.getValue());
        return res;
    }

    parseUrl(url: string) {
        console.group('parseUrl!');
        let parts = url.split('/');
        console.log(parts);
        console.log()
        let urlParams = new Set<string>();
        let queryParams = new Map<string, string>();

        let activeRoute: RouterNode;

        let treeIndex = 0;

        for(let i = 0; i < parts.length; i++) {
            console.log('part: ' + parts[i]);
            let isUrlParam = (/(:)\w+/).test(parts[i]); // This is wrong, urlParams will be like user/4/details not user/:4/details
            let isQueryParam = (/(\?)\w+=".*"/g).test(parts[i])
            if(isQueryParam) {
               queryParams = this.parseQueryParams(parts[i]);
            }

            let matchNode = this.searchPathInTree(parts[i], treeIndex);
            if(matchNode) {
                console.log(matchNode);
                treeIndex++;
                if(!activeRoute) {
                    activeRoute = { ...matchNode.node, children: [] };
                } else {
                    let holder = {...matchNode.node};
                    holder.children.push(activeRoute);
                    activeRoute = holder;
                }

            } else {
                // failed to find path!
                return;
            }

        }

        console.log(activeRoute);
        let newRoot: RouterNode;

        let invertTree = (node: RouterNode) => {
            if(node.children && node.children.length > 0) {
                for(let n of node.children) {
                    invertTree(n);
                }
            }

            if(!newRoot) {
                newRoot = node;
            } else {
                let holder = {...node};
                holder.children.push(newRoot);
                newRoot = holder;
            }
        }

        invertTree(activeRoute);
        console.groupEnd();
        return { urlParamMap: urlParams, queryParamMap: queryParams, activeRoute: newRoot };
    }
}

export function isDevOnDestroy(comp: any): comp is devOnDestroy {
    return !!comp.OnDestroy;
}

export function isDevOnInit(comp: any): comp is devOnInit {
    return !!comp.OnInit;
}

export function isDevOnChanges(comp: any): comp is devOnChanges {
    return !!comp.OnChanges;
}