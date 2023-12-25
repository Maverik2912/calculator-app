export interface IModule<T, R, C, S, RE> {
    [key: string]: IModuleInside<T, R, C, S, RE>
}

interface IModuleInside<T, R, C, S, RE> {
    state?: T;
    Routers: R;
    Controllers: C;
    Services: S;
    Repositories?: RE;
}