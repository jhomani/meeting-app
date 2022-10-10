import React, {memo, useEffect} from 'react';
import {useDispatch} from 'react-redux';

import Layout from '@landing/Layout';
import {setDefaultValues} from '@redux/actions/app';
import {getNavigatorLocale, setDefaultColorMode} from '@utils/general.util';

export const IndexPage = ({Component, pageProps}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const locale = getNavigatorLocale();
    // const mode = setDefaultColorMode();

    dispatch(
      setDefaultValues({
        locale,
        // mode,
      })
    );
  }, []);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default memo(IndexPage);
