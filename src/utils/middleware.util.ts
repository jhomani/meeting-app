/*
 * all this code run to Edge Run time
 */
export const getCookie = (cookies: object | string, name = 'default') => {
  let parsedCookies = cookies;
  const cookieName = getCookieName(name);

  if (typeof cookies === 'string') parsedCookies = parseCookie(cookies);

  return jsonParse(parsedCookies[cookieName]);
};

export const getCookieName = (name = 'auth') => {
  let cookieNameFinished: string;
  const fullName = `${name}-${name}`;

  // For _middleware.ts remove Butter.from line.
  if (typeof btoa !== 'undefined') cookieNameFinished = btoa(fullName);
  else cookieNameFinished = Buffer.from(fullName, 'utf-8').toString('base64');

  return cookieNameFinished.slice(0, 10);
};

export const jsonParse = (objText: string) => {
  let parsed = {};

  try {
    parsed = JSON.parse(objText);
  } catch {
    console.log('Error while parsing JSON text!!');
  }

  return parsed;
};

const parseCookie = (cookies = '') => {
  let key = '';
  let acumulator = '';

  const coockiesPased: IterableObject = {};

  for (let i = 0; i < cookies.length; i++) {
    if (!key && cookies[i] === '=') {
      key = acumulator;
      acumulator = '';
    } else if (key && cookies[i] === ';' && cookies[i + 1] === ' ') {
      coockiesPased[key] = acumulator;
      acumulator = '';
      key = '';
      i++;
    } else acumulator += cookies[i];
  }

  if (key) coockiesPased[key] = acumulator;

  return coockiesPased;
};
