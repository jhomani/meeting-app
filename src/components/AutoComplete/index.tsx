import {useStatus} from '@src/utils/custom-hook';
import React, {useMemo, useRef, ChangeEvent} from 'react';
import {ShortArrow} from 'src/icons';
import {ScrollBar} from '../ScrollBar';
import {FixedPortal} from '../FixedPortal';

interface OptionIn {
  key: str | number;
  label: str;
}

interface IAutoComplete {
  options: OptionIn[];
  initial?: str | number;
  type?: 'primary' | 'dynamic';
  onSelect?: (a: str | number) => void;
  onStopTyped?: (a: str) => void;
}

interface IInitialState {
  selectedKey: num | str;
  lastChanged: num;
  inputValue: str;
  display: bool;
}

function getIconColor(type: str) {
  let resp: str;

  if (type === 'primary') resp = 'primary-emphasis';
  else resp = 'txt-emphasis';

  return resp;
}

const initialState: IInitialState = {
  selectedKey: 0,
  inputValue: '',
  lastChanged: 0,
  display: false,
};

const DELAY_TIME = 1000;
let lastTime: NodeJS.Timeout;
export const AutoComplete = (props: IAutoComplete) => {
  const {type = 'dynamic', initial, options, onSelect, onStopTyped} = props;
  const [state, setState] = useStatus(initialState);
  const container = useRef<HTMLDivElement>(null);

  useMemo(() => {
    const innit = options.find(({key}) => key === initial);

    setState({inputValue: innit?.label ?? ''});
  }, [options]);

  const openOptions = () => {
    setState({display: true});
  };

  const handleSelected = (key: number | string) => {
    const found = options.find((item) => key === item.key) as OptionIn;

    setState({
      inputValue: found.label,
      selectedKey: key,
    });

    onSelect?.(key);
    if (state.display) closeOptions();
  };

  const closeOptions = () => {
    const opts = document.querySelector('.drop-drown > ul.options');

    opts?.classList.add('closeAnimation');
    setTimeout(() => setState({display: false}), 400);
  };

  const handleInput = (ev: ChangeEvent<HTMLInputElement>) => {
    setState({inputValue: ev.target.value, lastChanged: Date.now()});

    clearTimeout(lastTime);
    lastTime = setTimeout(verifyUpdate, DELAY_TIME);
  };

  const verifyUpdate = () => {
    const timeDiff = Date.now() - state.lastChanged;

    if (timeDiff >= DELAY_TIME) onStopTyped?.(state.inputValue);
  };

  return (
    <div className={`autocomplete-container ${type}`} ref={container}>
      <div className="autocomplete">
        <input
          type="text"
          placeholder="Programmer"
          value={state.inputValue}
          onInput={handleInput}
          onFocus={openOptions}
          role="switch"
          onBlur={closeOptions}
        />
        <ShortArrow colorClass={getIconColor(type)} className="selectIcon" />
      </div>

      {state.display && (
        <FixedPortal top={50} left={50}>
          <ul className="options">
            <ScrollBar>
              {options.map((item, i) => (
                <li
                  key={i}
                  className={
                    item.key === state.selectedKey ? 'selected' : undefined
                  }
                  onMouseDown={handleSelected.bind(null, item.key)}
                >
                  <span>{item.label}</span>
                </li>
              ))}
            </ScrollBar>
          </ul>
        </FixedPortal>
      )}
    </div>
  );
};
