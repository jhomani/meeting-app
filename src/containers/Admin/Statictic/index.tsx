import React from 'react';

import {Button} from '@components/index';
import {useDispatch} from 'react-redux';
import {getStatisticsStart} from './redux/actions';

const StaticticModule = () => {
  const dispatch = useDispatch();

  return (
    <>
      <Button
        type="primary"
        content="Get Statictis"
        onPress={() => {
          dispatch(getStatisticsStart({datas: ['9999999', 'dsasfsfa']}));
        }}
      />
    </>
  );
};

export default StaticticModule;
