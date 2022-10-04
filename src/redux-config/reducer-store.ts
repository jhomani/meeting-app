import {
  AnyAction,
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
  Reducer,
  Store,
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import createReducer from './create-reducer';
import {SagaManager} from './saga-manager';

export class ReduxStore {
  private static instance: ReduxStore;
  private store?: Store;
  private reducers: {[a: string]: Reducer};
  private combinedReducer?: Reducer;
  private keysToRemove: str[] = [];

  public static getInstance(): ReduxStore {
    if (!ReduxStore.instance) ReduxStore.instance = new ReduxStore();

    return ReduxStore.instance;
  }

  constructor() {
    this.reducers = createReducer();
  }

  public reduce(state: Any, action: AnyAction) {
    if (this.keysToRemove.length > 0) {
      for (const key of this.keysToRemove) {
        delete state[key];
      }

      this.keysToRemove = [];
    }

    return this.combinedReducer?.(state, action);
  }

  public configure(initialState: Any = {}) {
    const sagaMiddleware = createSagaMiddleware();
    const middlewares = [sagaMiddleware];
    const enhancers = [applyMiddleware(...middlewares)];
    const composeEnhancers = this.getComposeEnhancers();

    if (this.store) initialState = this.store.getState();

    this.combinedReducer = combineReducers(this.reducers);
    this.store = createStore(
      this.reduce.bind(this),
      initialState,
      composeEnhancers(...enhancers)
    );
    SagaManager.getInstance(sagaMiddleware.run);

    return this.store;
  }

  private getComposeEnhancers() {
    let composeEnhancers = compose;

    if (process.env.NODE_ENV !== 'production' && typeof window === 'object') {
      //@ts-expect-error it's no posible to change Window type
      if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
        //@ts-expect-error it's no posible to change Window type
        composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
          shouldHotReload: false,
        });
    }

    return composeEnhancers;
  }

  public getStore() {
    return this.store;
  }

  public getState(): MainStorage {
    return this.store?.getState() as MainStorage;
  }

  public removeReducer = (key: string) => {
    if (this.reducers[key]) {
      delete this.reducers[key];

      this.keysToRemove.push(key);
      this.combinedReducer = combineReducers(this.reducers);
    }
  };

  public injectReducer(key: string, asyncReducer: Reducer) {
    if (!this.reducers[key]) {
      this.reducers[key] = asyncReducer;

      this.combinedReducer = combineReducers(this.reducers);
      this.store?.dispatch({type: '@@UPDATE'});
    }
  }
}
