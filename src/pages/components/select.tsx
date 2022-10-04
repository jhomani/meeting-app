import React, {memo} from 'react';

import {AutoComplete, DropDown} from '@components/index';

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
    label: 'Antonio 2',
  },
  {
    key: 4,
    label: 'Antonio 3',
  },
  {
    key: 5,
    label: 'Antonio 4',
  },
  {
    key: 6,
    label: 'Mamani',
  },
];

const SelectPage = () => {
  console.log('refesh this component');

  const handleSelected = (selected: number) => {
    console.log(selected, 'in used');
  };

  const handleStopTyped = (selected: string) => {
    console.log(selected, 'in typed');
  };

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
      <DropDown
        type="primary"
        options={options}
        initial={0}
        onSelected={handleSelected}
      />
      {/* <DropDown
        type="dynamic"
        options={options}
        initial={0}
        onSelected={handleSelected}
      /> */}

      <AutoComplete
        type="dynamic"
        options={options}
        onStopTyped={handleStopTyped}
      />
      <AutoComplete
        type="dynamic"
        options={options}
        onStopTyped={handleStopTyped}
        initial={0}
      />
    </div>
  );
};

export default memo(SelectPage);
