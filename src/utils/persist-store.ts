import {getCookieName} from './general.util';

export const saveState = (name: string, state = {}) => {
  try {
    const serializedState = JSON.stringify(state);
    const cookieName = getCookieName(name);

    addCookies(cookieName, serializedState);
  } catch (err) {
    console.log('Error saving to Cookies', err);
  }
};

export const addCookies = (nameCookies: string, valueCookies: string) => {
  document.cookie = `${nameCookies}=${valueCookies}; path=/; samesite=strict; `;
};

export const removeCookies = (nameCookies: string) => {
  document.cookie = `${nameCookies}=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT`;
};
