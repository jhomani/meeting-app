import React, {useRef, UIEvent, useEffect, useState, MouseEvent} from 'react';

interface IAutoComplete {
  children?: JSX.Element | string | Array<JSX.Element | string>;
  maxHeight?: number | string;
}

export const ScrollBar = (props: IAutoComplete) => {
  const {children, maxHeight = 150} = props;
  const [showPointer, setShowPointer] = useState(false);
  const scrollPointer = useRef<HTMLSpanElement>(null);
  const scrollBox = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let resp = false;
    const curr = scrollBox.current;

    if (curr && curr.scrollHeight > curr.clientHeight) resp = true;

    setShowPointer(resp);
  }, [scrollBox.current]);

  const handleScroll = (ev: UIEvent<HTMLDivElement>) => {
    const pointer = scrollPointer.current;
    const boxHeight = ev.currentTarget.clientHeight;

    const total = ev.currentTarget.scrollHeight - boxHeight;
    const current = ev.currentTarget.scrollTop;

    if (pointer) {
      const realRange = boxHeight - pointer.clientHeight;
      const moveToPosition = (current / total) * realRange;

      pointer.style.top = moveToPosition + 'px';
    }
  };

  const handleMouseDown = (ev: MouseEvent<HTMLSpanElement>) => {
    ev.preventDefault();
    if (scrollPointer.current)
      scrollPointer.current.style.backgroundColor = '#444';
    let lastPosition = -1;

    document.onselectstart = () => false;
    document.onmousemove = (ev) => {
      ev.preventDefault();
      const box = scrollBox.current;
      if (lastPosition === -1) lastPosition = ev.clientY;

      const factor = box.scrollHeight / box.clientHeight - 1;
      const difference = (ev.clientY - lastPosition) * factor;
      const rounded = Math.round(difference);

      if (rounded !== 0 && box) {
        box.scrollTop += rounded;

        lastPosition = ev.clientY;
      }
    };

    document.onmouseup = () => {
      document.onmousemove = null;
      document.onselectstart = null;
      if (scrollPointer.current)
        scrollPointer.current.style.backgroundColor = '#555';

      document.onmouseup = null;
    };
  };

  return (
    <>
      <div
        style={{maxHeight}}
        className="custom-scrollbar"
        onScroll={handleScroll}
        ref={scrollBox}
      >
        {children}
      </div>
      {showPointer && (
        <span
          ref={scrollPointer}
          className="scrollbar-pointer"
          onMouseDown={handleMouseDown}
        />
      )}
    </>
  );
};
