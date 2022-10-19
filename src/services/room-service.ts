import MainService from './main.service';

interface IDessert {
  name: string;
  detail: string;
  price: number;
}

export class MeetRoomService extends MainService {
  constructor() {
    super();
  }

  async createRoom(roomName: string) {
    try {
      const resp = await this.postMethod(`/api/create-room`, {roomName});

      return resp;
    } catch (err: Any) {
      throw new Error(err);
    }
  }
}
