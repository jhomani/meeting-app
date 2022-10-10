import React, {memo} from 'react';

import {Button, DropDown, Language} from '@components/index';
import {login} from '@redux/actions/auth';
import {useDispatch} from 'react-redux';

import {getStatisticsStart} from '@admin/Statictic/redux/actions';

const options = [
  {
    key: 0,
    label: 'Carlos',
  },
  {
    key: 1,
    label: 'Juan',
  },
  {
    key: 2,
    label: 'Antonio',
  },
  {
    key: 3,
    label: 'Mamani',
  },
];

const IndexPage = () => {
  const dispatch = useDispatch();
  console.log('refesh this component');

  const handleSelected = (selected: number) => {
    console.log(selected, 'in used');
  };

  return (
    <>
      <div className="landing">
        <h2 className="landing-title g-my-4">
          <Language langKey="landingTitle" />
        </h2>

        <DropDown options={options} initial={0} onSelected={handleSelected} />

        <DropDown
          type="primary"
          options={options}
          initial={0}
          onSelected={handleSelected}
        />

        <Button
          type="primary"
          content="Login Production"
          onPress={() => {
            dispatch(login({user: '9999999'}));
          }}
        />

        <Button
          onPress={() => {
            dispatch(getStatisticsStart({datas: ['11111111', '0000000']}));
          }}
          type="primary"
          className="mt-2"
          content="get staticitis"
        />
      </div>
    </>
  );
};

export default memo(IndexPage);
