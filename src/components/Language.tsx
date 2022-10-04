import React from 'react';
import {useSelector} from 'react-redux';
import languages from 'locales';
import {ReduxStore} from '../redux-config/reducer-store';

interface InLagCom {
  langKey: str;
}

export const Language = ({langKey}: InLagCom) => {
  const {locale} = useSelector((storage: MainStorage) => storage.app);
  const message = languages[locale][langKey] ?? 'no fout message';

  return <>{message}</>;
};

export const getRawMessage = (key: str): str => {
  const reduxStore = ReduxStore.getInstance();
  const {locale} = reduxStore.getState().app;

  const message = languages[locale][key] ?? 'no fout message';

  return message;
};
