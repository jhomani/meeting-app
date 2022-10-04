import {useStatus} from '@utils/custom-hook';
import globalEvents from '@utils/global-events';
import Link from 'next/link';
import {useRouter} from 'next/router';
import React, {memo, useEffect, useMemo, useRef, useState} from 'react';
import {Button} from '@components/index';
import {Menu, Clear} from 'src/icons';
import {delay} from '@src/utils/general.util';

interface ItemIn {
  path?: str;
  label: str | JSX.Element;
}

interface NavbarIn {
  items: ItemIn[];
}

const initialState = {
  bgNavbar: 'clean-navbar',
  visible: false,
  sideAnimation: 'openSidebar',
  screenWidth: 1337,
};

const Navbar = ({items}: NavbarIn) => {
  const [state, setState] = useStatus(initialState);
  const navBar = useRef(null);
  const router = useRouter();

  const currentNav = useMemo(() => {
    let resp = [];

    if (state.screenWidth < 577) {
      resp = items.slice(-1);
      resp.push({
        label: (
          <Button
            type="secondary"
            onPress={() =>
              setState({visible: true, sideAnimation: 'openSidebar'})
            }
            icon={<Menu size="20" />}
            shape="round"
          />
        ),
      });
    } else resp = items;

    return resp;
  }, [state.screenWidth]);

  useEffect(() => {
    if (window?.scrollY > 31) setState({bgNavbar: ''});
    if (window?.innerWidth) setState({screenWidth: window.innerWidth});

    if (navBar.current) {
      const items = navBar.current.querySelectorAll('a.nav-item');

      for (const i of items) {
        const itemRef = i.getAttribute('href');

        if (itemRef === router.pathname) i.classList.add('primary-selected');

        i.onclick = (e) => {
          const target: HTMLElement = e.target;

          items.forEach((j) => j.classList.remove('primary-selected'));
          target.classList.add('primary-selected');
        };
      }
    }

    globalEvents.addResizeHandle(handleResize);
    globalEvents.addScrollHandle(handleScroll);
  }, []);

  const handleResize = (screenWidth: number) => {
    setState({screenWidth});
  };

  const handleScroll = (scrolled: number) => {
    if (scrolled < 31) setState({bgNavbar: 'clean-navbar'});
    else setState({bgNavbar: ''});
  };

  return (
    <>
      <nav className={`navbar-component ${state.bgNavbar}`}>
        <div className="navbar-container" ref={navBar}>
          <ul className="navbar-left">
            <li>
              <Link href="/">
                <a href="/" className="nav-item">
                  <b>Tagger</b>&nbsp;Exercise
                </a>
              </Link>
            </li>
          </ul>
          <ul className="navbar-right">
            {currentNav.map((item, i) =>
              item.path ? (
                <li key={i}>
                  <Link href={item.path}>
                    <a href={item.path} className="nav-item">
                      {item.label}
                    </a>
                  </Link>
                </li>
              ) : (
                <li key={i} className="nav-item">
                  {item.label}
                </li>
              )
            )}
          </ul>
        </div>
      </nav>
      {state.visible && (
        <Sidebar onCancel={() => setState({visible: false})}>
          <li>a</li>
          <li>b</li>
          <li>c</li>
          <li>d</li>
          <li>f</li>
        </Sidebar>
      )}
    </>
  );
};

interface InSidebar {
  children: str | JSX.Element | JSX.Element[];
  onCancel?: Function;
}

const Sidebar = ({children, onCancel}: InSidebar) => {
  const [sideAnimation, setSideAnimation] = useState('openSidebar');

  const handleCloseSidebar = async () => {
    setSideAnimation('closeSidebar');
    await delay(500);

    if (onCancel) onCancel();
  };

  return (
    <nav className="sidebar overlay" onClick={handleCloseSidebar}>
      <ul className={sideAnimation} onClick={(e) => e.stopPropagation()}>
        {children}
        <Button
          className="closerTopRight"
          type="secondary"
          text={true}
          onPress={handleCloseSidebar}
          shape="round"
          content={<Clear size={12} />}
        />
      </ul>
    </nav>
  );
};

export default memo(Navbar);
