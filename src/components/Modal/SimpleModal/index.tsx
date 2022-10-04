import {useForceUpdate} from '@utils/custom-hook';
import React, {useEffect} from 'react';
import {createPortal} from 'react-dom';
import {Button} from 'src/components';
import {Clear} from 'src/icons';

interface InSimpleModal {
  children: str | JSX.Element | JSX.Element[];
  header?: str | JSX.Element;
  visible: bool;
  onCancel?: Function;
  closer?: bool;
  xPosition?: 'center' | 'top';
}

let bodyNode: HTMLBodyElement | null;
let parentNode: HTMLElement | null;

export const SimpleModal = (props: InSimpleModal) => {
  const {
    xPosition = 'center',
    header,
    children,
    visible,
    onCancel,
    closer = true,
  } = props;
  let resp = <></>;

  const forceUpdate = useForceUpdate();

  useEffect(() => {
    if (!bodyNode) bodyNode = document.querySelector('body');

    if (!parentNode) {
      parentNode = document.createElement('div');
      parentNode.classList.add('modal');
      bodyNode?.appendChild(parentNode);
    }

    if (visible) bodyNode?.classList.add('hide-scrollbar');
    else bodyNode?.classList.remove('hide-scrollbar');

    forceUpdate();

    return () => {
      bodyNode?.classList.remove('hide-scrollbar');
      if (parentNode) bodyNode?.removeChild(parentNode);
      parentNode = null;
    };
  }, [visible]);

  const BaseModal = (
    <div className="overlay" onClick={() => onCancel?.()}>
      <div
        className={`modal-box ${xPosition}`}
        onClick={(ev) => ev.stopPropagation()}
      >
        {header && (
          <div className="modal-header">
            {typeof header === 'string' ? <h5>{header}</h5> : header}
          </div>
        )}
        {children}
        {closer && (
          <Button
            className="closerTopRight"
            type="secondary"
            text={true}
            onPress={onCancel}
            shape="round"
            content={<Clear size={12} />}
          />
        )}
      </div>
    </div>
  );

  if (visible && parentNode) resp = createPortal(BaseModal, parentNode);

  return resp;
};
