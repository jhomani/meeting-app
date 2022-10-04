import React, {memo} from 'react';

import {Button} from '@components/index';
import {DarkMode, LightMode, Whatsapp} from 'src/icons';

const ButtonComponent = () => {
  console.log('refesh this component');

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
      <Button type="secondary" content="Open Modal" />
      <Button type="secondary" icon={<DarkMode />} content="Open Modal" />
      <Button type="secondary" shape="round" icon={<DarkMode />} />
      <Button type="secondary" icon={<DarkMode />} />
      <Button type="primary" content="Open Modal" />
      <Button type="primary" icon={<LightMode />} content="Open Modal" />
      <Button type="primary" shape="round" icon={<Whatsapp size={18} />} />
      <Button type="error" content="Open Modal" />
      <Button type="error" icon={<LightMode />} content="Open Modal" />
      <Button type="error" shape="round" icon={<Whatsapp size={18} />} />
      <Button type="error" text={true} content="Open Modal" />
      <Button text={true} content="Open Modal" />
      <Button type="secondary" text={true} content="Open Modal" />
      <Button type="gradient" icon={<Whatsapp />} content="Open Modal" />
      <Button shape="round" type="gradient" icon={<LightMode />} />
    </div>
  );
};

export default memo(ButtonComponent);
