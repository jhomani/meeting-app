import React, {useEffect, useMemo, useRef} from 'react';
import {ShortArrow} from 'src/icons';
import {FixedPortal} from '../FixedPortal';
import globalEvents from '@utils/global-events';
import {useStatus} from '@src/utils/custom-hook';

interface OptionIn {
  key: string | number;
  label: string | JSX.Element;
}

interface SelectIn {
  options: OptionIn[];
  initial: string | number;
  type?: 'primary' | 'dynamic';
  onSelected(a: string | number): void;
}

function getIconColor(type: string) {
  let resp: string;

  switch (type) {
    case 'primary': {
      resp = 'primary-emphasis';
      break;
    }
    default: {
      resp = 'txt-emphasis';
      break;
    }
  }

  return resp;
}

const initialState = (initial: num | str = 0) => ({
  selected: initial,
  display: false,
  top: 0,
  left: 0,
  width: 0,
});

export const DropDown = (props: SelectIn) => {
  const {type = 'dynamic', initial, options, onSelected} = props;
  const container = useRef<HTMLDivElement>(null);
  const [state, setState] = useStatus(initialState(initial));

  const getDimentions = () => {
    const curr = container.current;

    if (curr) {
      const top = curr.offsetTop + curr.clientHeight + 8;
      const left = curr.offsetLeft;
      const width = curr.clientWidth;

      setState({top, left, width});
    }
  };

  useEffect(getDimentions, []);

  const optionsObj = useMemo(() => {
    const res: IterableObject = {};

    options.forEach(({key, label}) => (res[key] = label));

    globalEvents.addResizeHandle(getDimentions);

    return res;
  }, [options]);

  const toggleOptions = () => {
    if (state.display) closeOptions();
    else setState({display: true});
  };

  const handleSelected = (key: number | string) => {
    setState({selected: key});

    onSelected(key);
  };

  const closeOptions = () => {
    const node = container.current;
    console.log('times...');

    if (node) {
      const opts = document.querySelector('.drop-drown > ul.options');
      opts?.classList.add('closeAnimation');

      const input = node.querySelector<HTMLButtonElement>('button[role]');
      input?.blur(); // for close arrow

      setTimeout(() => setState({display: false}), 400);
    }
  };

  console.log(state.display);

  return (
    <div className={`select-container ${type}`} ref={container}>
      <div className="selected" onClick={toggleOptions}>
        <button role="switch" onBlur={() => state.display && closeOptions()}>
          {optionsObj[state.selected]}
        </button>
        <ShortArrow colorClass={getIconColor(type)} className="selectIcon" />
      </div>
      {state.display && (
        <FixedPortal top={state.top} left={state.left}>
          <ul className={'options ' + type} style={{width: state.width}}>
            {options.map((item, i) => (
              <li
                key={i}
                className={item.key === state.selected ? 'selected' : undefined}
                onMouseDown={handleSelected.bind(null, item.key)}
              >
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
        </FixedPortal>
      )}
    </div>
  );
};
