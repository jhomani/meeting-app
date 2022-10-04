import {ReduxStore} from '../redux-config/reducer-store';

async function parseJSON(response) {
  return response.status === 204 ? '' : await response.json();
}

function checkStatus(status) {
  if (status >= 200 && status < 300) return;

  // if (response.status == 401) {
  //   return Router.replace(`/ingreso?goBack=${btoa(Router.asPath)}`);
  // }

  throw new Error(status);
}

export default async function request(url, options) {
  try {
    const encode = await fetch(url, options);
    checkStatus(encode.status);

    return parseJSON(encode);
  } catch (err) {
    throw new Error(err);
  }
}

export function postOptionsFormData(body = {}, method = 'POST') {
  const {userToken} = ReduxStore.getInstance().getState().auth;
  return {
    method,
    headers: {Authorization: `Bearer ${userToken}`},
    body,
  };
}

export function getOptions(method = 'GET') {
  const {userToken} = ReduxStore.getInstance().getState().auth;
  return {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userToken}`,
    },
  };
}

export function getOptionsGivenToken(token = '', method = 'GET') {
  return {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
}

export function getOptionsWithToken(token = '', method = 'GET') {
  return {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
}

export function postOptions(body = {}, method = 'POST') {
  const {userToken} = ReduxStore.getInstance().getState().auth;
  return {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userToken}`,
    },
    body: JSON.stringify(body),
  };
}

export function putOptions(body = {}, method = 'PUT') {
  const {userToken} = ReduxStore.getInstance().getState().auth;
  return {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userToken}`,
    },
    body: JSON.stringify(body),
  };
}

export function patchOptions(body = {}, method = 'PATCH') {
  const {userToken} = ReduxStore.getInstance().getState().auth;
  return {
    method,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${userToken}`,
    },
    body: JSON.stringify(body),
  };
}

export function deleteOptions(body, method = 'DELETE') {
  const {userToken} = ReduxStore.getInstance().getState().auth;
  return {
    method,
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${userToken}`,
    },
    body: JSON.stringify(body),
  };
}
