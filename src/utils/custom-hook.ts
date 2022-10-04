import {useState, useRef, useMemo, useEffect} from 'react';
import {Reducer} from 'redux';
import {SagaGenerator, SagaManager} from '../redux-config/saga-manager';
import {ReduxStore} from '../redux-config/reducer-store';

type StateFn<T> = (a: T) => T;
type SetStateFn<T> = (a: Partial<T> | StateFn<T>) => void;

type IjectOptions = {
  reducer?: Reducer;
  saga?: SagaGenerator;
  keepSaga?: boolean;
  keepReducer?: boolean;
};

export const useInjector = (key: string, opts: IjectOptions) => {
  useMemo(() => {
    if (opts.reducer) {
      const storeManager = ReduxStore.getInstance();
      storeManager.injectReducer(key, opts.reducer);
    }

    if (opts.saga) {
      const sagaManager = SagaManager.getInstance();
      sagaManager.injectSaga(key, opts.saga);
    }
  }, []);

  // prettier-ignore
  useEffect(() => () => {
    if (!opts.keepReducer) {
      const storeManager = ReduxStore.getInstance();
      storeManager.removeReducer(key);
    }

    if (!opts.keepSaga) {
      const sagaManager = SagaManager.getInstance();
      sagaManager.removeSaga(key);
    }
  }, []);
};

export const useStatus = <T>(initialState: T): [T, SetStateFn<T>] => {
  const [state, setState] = useState(initialState);

  const isSame = (prev: T, updateValue: Partial<T>) => {
    let sameState = true,
      key: keyof T;

    for (key in updateValue) {
      if (updateValue[key] !== prev[key]) {
        sameState = false;
        break;
      }
    }

    return sameState;
  };

  const updateState = (updateValue: StateFn<T> | Partial<T>): void => {
    if (typeof updateValue === 'function') {
      setState((prev) => {
        let resp: T;
        const newState = updateValue(prev);

        if (isSame(prev, newState)) resp = prev;
        else resp = newState;

        return resp;
      });
    } else {
      setState((prev) =>
        !isSame(prev, updateValue) ? {...prev, ...updateValue} : prev
      );
    }
  };

  return [state, updateState];
};

export const useDidUpdate = (fn: Function, watchers = []) => {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) fn();
    else didMount.current = true;
  }, watchers);
};

export const useForceUpdate = () => {
  const [value, setValue] = useState(false);

  const refreshComponent = () => {
    setValue(!value);
  };

  return refreshComponent;
};
