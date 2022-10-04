import React, {useMemo, useEffect} from 'react';
import {AppContext} from 'next/app';

import {ReduxStore} from '../redux-config/reducer-store';
import {IAppProps} from 'src/types/next';
import {getCookie} from './middleware.util';

import routerMiddleware from './router-middleware.util';
import {Store} from 'redux';
// import {getEnableAuthData} from './general.util';
// import {saveState} from './persist-store';

const withReduxStore = (MyApp: (a: IAppProps) => JSX.Element) => {
  const Redux = (props: IAppProps) => {
    const reduxStore = ReduxStore.getInstance();

    useEffect(() => {
      const authCookie = getCookie(document.cookie, 'auth');
      console.log(authCookie, '<<< Cookies.....');
    }, []);

    useMemo(() => {
      console.log('into use memo root.....');
      reduxStore.configure();
    }, []);

    return <MyApp {...props} reduxStore={reduxStore.getStore() as Store} />;
  };

  Redux.getInitialProps = async (appCtx: AppContext) => {
    const {ctx /*, Component , router*/} = appCtx;

    routerMiddleware(ctx);
    // calls page's `getInitialProps` and fills `appProps.pageProps`
    // const appProps = await App.getInitialProps(appCtx);
    // const pageProps = await Component.getInitialProps(ctx);

    // don't use getInitialProps insted getServerSideProps or getStaticProps
    return {};
  };

  return Redux;
};

export default withReduxStore;
