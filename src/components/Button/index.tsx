import {useRouter} from 'next/router';
import React, {useRef} from 'react';

type ToEnherit = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLBaseElement>,
  HTMLBaseElement
>;

interface InButton extends ToEnherit {
  shadow?: 'primary' | 'normal';
  icon?: JSX.Element;
  shape?: 'round';
  text?: boolean;
  to?: string;
  align?: 'flex-bottom';
  type?: 'error' | 'primary' | 'secondary' | 'gradient';
  children?: JSX.Element | string;
  content?: JSX.Element | string;
  onPress?: Function;
  inBlank?: string;
  className?: string;
}

export const Button = (props: InButton) => {
  const btn = useRef(null);
  const router = useRouter();
  const {
    type = 'primary',
    shape = '',
    align = '',
    className = '',
    text = false,
    children,
    content,
    icon,
    onPress,
    inBlank,
    to,
    ...others
  } = props;

  // https://api.whatsapp.com/send?phone=59172289152&text=Hola!%20estoy%20interesado%20en%20tus%20servicios.

  const handleClick = () => {
    const node: HTMLElement = btn.current;
    const openOutRef = inBlank && node.getAttribute('href');

    node.classList.add('onpressed');
    setTimeout(() => node.classList.remove('onpressed'), 350);

    if (onPress) onPress();
    if (openOutRef) {
      node.setAttribute('href', inBlank);
      node.setAttribute('target', '_blank');
    } else if (to) {
      router.push(to);
    }
  };

  const plain = text ? 'plain' : '';

  return (
    <a
      {...others}
      onClick={handleClick}
      ref={btn}
      className={`btn-${type} ${plain} ${shape} ${align} ${className}`}
    >
      {icon}

      {(children || content) && <span>{content ?? children}</span>}
    </a>
  );
};
