import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import {Clear} from 'src/icons';
import {Button} from '@components/index';
import {delay} from '@src/utils/general.util';

type Options = {
  message: str;
  type?: 'success' | 'error' | 'info' | 'undo';
};

interface IDialog {
  resolve: (a: boolean) => void;
  options: Options;
}

const Dialog = ({resolve, options}: IDialog) => {
  const [closed, setClosed] = useState(false);
  const {message, type = 'undo'} = options;

  const handleClean = async (undo: bool) => {
    setClosed(true);
    await delay(300);

    resolve(undo);
  };

  useEffect(() => {
    notUndoAction();
  }, []);

  const notUndoAction = async () => {
    await delay(5000);

    if (!closed) await handleClean(false);
  };

  return (
    <div className={`undo-action ${closed ? 'clean-undo-action' : ''}`}>
      <p className="sub-title">{message}</p>
      {type === 'undo' ? (
        <Button
          type="primary"
          text={true}
          onPress={handleClean.bind(null, true)}
          content="Undo"
        />
      ) : (
        <Button
          type="secondary"
          text={true}
          onPress={handleClean.bind(null, true)}
          shape="round"
          content={<Clear size={12} />}
        />
      )}
    </div>
  );
};

export async function undoAction(opts: Options) {
  let stackBox = document.querySelector('.bottom-top-stack');

  if (!stackBox) {
    stackBox = document.createElement('div');
    stackBox.classList.add('bottom-top-stack');

    document.querySelector('body').appendChild(stackBox);
  }

  const div = document.createElement('div');
  stackBox.insertBefore(div, stackBox.firstChild);

  const result = await new Promise((resolve) => {
    ReactDOM.render(<Dialog resolve={resolve} options={opts} />, div);
  });

  stackBox.removeChild(div);

  return result;
}
