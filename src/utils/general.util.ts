/**
 * @param text Target text to capitalize
 * @returns Capitalized text
 */
export const capitalize = (text = '') => {
  let capitalized = '';
  let lastWasSpace = false;

  for (let i = 0; i < text.length; i++) {
    if (i === 0 || lastWasSpace) {
      capitalized += text[i].toUpperCase();
      lastWasSpace = false;
    } else capitalized += text[i].toLowerCase();

    if (text[i] === ' ') lastWasSpace = true;
  }

  return capitalized;
};

/**
 * @param time time in milleseconts to delay
 */
export const delay = async (time: number) => {
  await new Promise((resolve) => {
    setTimeout(resolve, time);
  });
};

export const cleanObject = (object: AnyObject = {}) => {
  for (const propName in object) {
    if (object[propName] === null || object[propName] === undefined) {
      delete object[propName];
    }
  }
};

export const downloadFile = (file: Blob, name: string) => {
  const link = document.createElement('a');

  const url = URL.createObjectURL(file);

  link.setAttribute('href', url);
  link.setAttribute('download', name);
  link.style.visibility = 'hidden';

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getHostname = (req: any, trueHost = false) => {
  let hostname = 'localhost';
  if (req) {
    const host = req ? req.headers['x-forwarded-host'] ?? req.headers.host : '';
    hostname =
      host?.indexOf('localhost') !== -1 && !trueHost ? 'localhost' : host;
  }
  return hostname;
};

export const getCookieName = (name = 'auth') => {
  let cookieNameFinished: string;
  const fullName = `${name}-${name}`;

  if (typeof btoa !== 'undefined') cookieNameFinished = btoa(fullName);
  else cookieNameFinished = Buffer.from(fullName, 'utf-8').toString('base64');

  return cookieNameFinished.slice(0, 10);
};

export const getAbbreviation = (text = '') => {
  let abbr = '';

  for (let i = 0; i < text.length; i++) {
    if (text[i].match(/[A-Z]/)) abbr += text[i] + '.';
  }

  return abbr;
};

export const getEnableAuthData = (auth: AnyObject) => {
  if (!auth) return {};
  const enableKey = ['userToken', 'dataUser', 'userType'];
  return Object.keys(auth).reduce(
    (accumulator, currentValue) => ({
      ...accumulator,
      ...(enableKey.includes(currentValue)
        ? {[currentValue]: auth[currentValue]}
        : {}),
    }),
    {}
  );
};

export const getRndInteger = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min)) + min;

export const setDefaultColorMode = (): 'dark' | 'light' => {
  let mode: 'light' | 'dark' = 'light';

  if (matchMedia && matchMedia('(prefers-color-scheme: dark)').matches) {
    const html = document.getElementsByTagName('html')[0];
    html.classList.add('dark-mode');

    mode = 'dark';
  }

  return mode;
};

export const getNavigatorLocale = (): 'EN' | 'ES' => {
  let locale: 'EN' | 'ES' = 'EN';

  if (window) {
    const browserLocale = navigator.language.slice(0, 2);
    locale = browserLocale.toUpperCase() == 'EN' ? 'EN' : 'ES';
  }

  return locale;
};

export const toggleColorMode = () => {
  if (window) {
    const html = document.getElementsByTagName('html')[0].classList;
    html.toggle('dark-mode');
  }
};
