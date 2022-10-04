import Router from 'next/router';

export default function redirectTo(destination: string, { res, status }) {
  if (res) {
    if (!res.headersSent) {
      if (typeof res.writeHead === 'function') {
        res.writeHead(status || 302, {Location: destination});
        res.end();
      }
    }
  } else {
    if (destination[0] === '/' && destination[1] !== '/') {
      Router.push(destination);
    } else {
      window.location.pathname = destination;
    }
  }
}