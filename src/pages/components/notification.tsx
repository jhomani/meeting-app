import React, {memo} from 'react';

import {Button} from '@components/index';

const NotificationPage = () => {
  console.log('refesh this component << NotificationPage');

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: 20,
        maxWidth: 700,
        margin: '50px auto',
      }}
    >
      <Button type="primary" content="Open Modal" />
      <Button type="primary" content="Open Modal 2" />
    </div>
  );
};

export default memo(NotificationPage);
