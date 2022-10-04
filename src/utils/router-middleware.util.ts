import {NextPageContext} from 'next';

export const availableToAll = ['/', '/ingreso', '/registro'];
export const noRequireRequest = ['/registro', '/ingreso'];

const routerMiddleware = (ctx: NextPageContext) => {
  const {pathname} = ctx;

  console.log(pathname, '| Pathname from server');
  // const {tokenUser, dataUser: {type}} = store.getState().auth;
  // let urlByRole = role.getUrl(type);
  // console.log(pathname, type, tokenUser);
  // const auth = () => {
  //   if (!tokenUser) {
  //     redirectTo("/ingreso", { res: ctx.res, status: 301 });
  //   }
  // };
  // const authNoNeedLogin = () => {
  //   if (tokenUser) redirectTo(urlByRole, { res: ctx.res, status: 301 });
  // };
  // switch (pathname) {
  //   case "/registro":
  //     authNoNeedLogin();
  //     break;
  //   case "/ingreso":
  //     authNoNeedLogin();
  //     break;
  // }
  // if (availableToAll.includes(pathname)) return;
  // if (pathname.indexOf(urlByRole) !== -1) {
  //   auth();
  // } else {
  //   redirectTo(urlByRole, { res: ctx.res, status: 301 });
  // }
};

export default routerMiddleware;
