import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {Button, DropDown, getRawMessage, Navbar} from '@components/index';
import {switchLanguage} from '@redux/actions/app';
import {toggleColorMode} from '@utils/general.util';
import {LightMode} from 'src/icons';

interface InLandingLayout {
  authenticated?: boolean;
  children: JSX.Element | string;
}

const LandingLayout = ({children}: InLandingLayout) => {
  const {locale} = useSelector((store: MainStorage) => store.app);
  const dispatch = useDispatch();

  const handleSelected = (selected: 'EN' | 'ES') => {
    dispatch(switchLanguage(selected));
  };

  const options = [
    {
      key: 'EN',
      label: getRawMessage('english'),
    },
    {
      key: 'ES',
      label: getRawMessage('spanish'),
    },
  ];

  const items = [
    {
      label: (
        <DropDown
          options={options}
          initial={locale}
          onSelected={handleSelected}
        />
      ),
    },
    {
      path: '/handle-tags',
      label: 'Contact me',
    },
    {
      path: '/components/notification',
      label: 'Notification',
    },
    {
      path: '/components/button',
      label: 'Buttons',
    },
    {
      path: '/components/select',
      label: 'Select',
    },
    {
      path: '/components/modal',
      label: 'Modals',
    },
    {
      label: (
        <Button
          type="secondary"
          onPress={toggleColorMode}
          icon={<LightMode size="20" />}
          shape="round"
        />
      ),
    },
  ];

  return (
    <>
      <Navbar items={items} />
      {children}
      <h6 className="txt-center g-my-3"> this is footer </h6>
    </>
  );
};

export default LandingLayout;
