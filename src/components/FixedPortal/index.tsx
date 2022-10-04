import React, {useEffect, useState} from 'react';
import {createPortal} from 'react-dom';

interface InSimpleModal {
  children: str | JSX.Element | JSX.Element[];
  top: number;
  left: number;
}

let bodyNode: HTMLBodyElement | null;

export const FixedPortal = (props: InSimpleModal) => {
  const {children, top, left} = props;
  const [patter, setPatter] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const parentNode = document.createElement('div');

    parentNode.classList.add('fixed-box');

    if (!bodyNode) bodyNode = document.querySelector('body');

    bodyNode?.appendChild(parentNode);

    setPatter(parentNode);

    return () => {
      bodyNode?.removeChild(parentNode);
    };
  }, []);

  const BaseModal = (
    <div
      style={{
        position: 'absolute',
        top,
        left,
      }}
      className="drop-drown"
      onClick={(ev) => ev.stopPropagation()}
    >
      {children}
    </div>
  );

  return patter ? createPortal(BaseModal, patter) : null;
};
