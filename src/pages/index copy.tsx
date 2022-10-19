import {useEffect, useState} from 'react';
import io from 'socket.io-client';
let socket: any;

const Home = () => {
  const [input, setInput] = useState('');

  useEffect(() => {
    socketInitializer();
  }, []);

  const socketInitializer = async () => {
    await fetch('/api/socker-handler');

    socket = io();

    socket.on('connect', () => {
      console.log('connected from FRONT....');
    });
  };

  const onChangeHandler = (e: any) => {
    setInput(e.target.value);
    socket.emit('input-change', e.target.value);
  };

  return (
    <div className='whiteboard'>
      <input
        type="text"
        placeholder="Type something"
        value={input}
        onChange={onChangeHandler}
      />
    </div>
  );
};

export default Home;
