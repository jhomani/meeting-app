import React from 'react';
import ReactDOM from 'react-dom';
import {Button} from '@components/index';

type Options = {
  message: str;
  icon?: HTMLElement | JSX.Element;
  cancel?: str | JSX.Element;
  ok?: str;
  danger?: boolean;
};

interface IDialog {
  resolve: (a: boolean) => void;
  options: Options;
}

const Dialog = ({resolve, options}: IDialog) => {
  const {
    danger,
    message,
    icon = <span />,
    ok = 'Seguro(a)',
    cancel = 'Calcelar',
  } = options;

  return (
    <div className="modal confirm">
      <div className="overlay" onClick={resolve.bind(null, false)}>
        <div
          className="modal-box center"
          onClick={(ev) => ev.stopPropagation()}
        >
          <div className="confirm-message">
            {icon}
            <p className="sub-title">{message}</p>
          </div>
          <div className="modal-footer">
            <Button
              type="secondary"
              text={true}
              onPress={resolve.bind(null, false)}
            >
              {cancel}
            </Button>
            <Button
              type={danger ? 'error' : 'primary'}
              text={true}
              onPress={resolve.bind(null, true)}
            >
              {ok}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export async function confirm(opts: Options) {
  const div = document.createElement('div');
  const body = document.querySelector('body');

  body.appendChild(div);

  const result = await new Promise((resolve) => {
    ReactDOM.render(<Dialog resolve={resolve} options={opts} />, div);
  });

  ReactDOM.unmountComponentAtNode(div);
  body.removeChild(div);

  return result;
}
