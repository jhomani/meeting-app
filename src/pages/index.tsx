import {Button} from '@src/components';
import {MeetRoomService} from '@src/services/room-service';
import {useState} from 'react';

const Home = () => {
  const [roomCode, setCode] = useState();
  const [roomName, setName] = useState('');

  const onPressHandler = async () => {
    const service = new MeetRoomService();

    try {
      const resp = await service.createRoom(roomName);
      setCode(resp.roomCode);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h2 className='txt-center mt-5'>Create New Room</h2>
      <div className='create-room'>
        {roomCode
          ? <h6>{roomCode}</h6>
          : <div className="input-group">
              <label>Room Name:</label>
              <input
                type="text"
                placeholder="clase"
                name="name"
                value={roomName}
                onChange={(event) => setName(event.target.value)}
              />
          </div>
        }
        {!roomCode && <Button
          content="Creat Room"
          onPress={onPressHandler}
        /> }
      </div>
    </>
  );
};

export default Home;
