import React from 'react';
// import {useSelector} from 'react-redux';
import {GetServerSidePropsContext} from 'next';
import {getCookie} from '@utils/middleware.util';

import StatisticModule from '@admin/Statictic';
import {useInjector} from '@utils/custom-hook';

import {
  statisticReducer as reducer,
  staticticSaga as saga,
} from '@admin/Statictic/redux';

const PricesPage = () => {
  useInjector('statictic', {reducer, saga});

  // const currentStore = useSelector((store) => store);
  // console.log(currentStore);

  return <StatisticModule />;
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const auth = getCookie(ctx.req.cookies, 'auth');

  console.log(ctx.req.headers['accept-language']);
  console.log(auth);

  return {
    props: {
      vote: {id: 'id', content: 'content'},
      id: 'this is an ID',
    },
  };
};

export default PricesPage;
