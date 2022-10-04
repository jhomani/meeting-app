import {AppProps} from 'next/app';
import {AnyAction, Store} from 'redux';

declare interface IAppProps extends AppProps {
  reduxStore: Store<MainStorage, AnyAction>;
}
