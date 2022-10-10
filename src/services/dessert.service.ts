import MainService from './main.service';

interface IDessert {
  name: string;
  detail: string;
  price: number;
}

export class DessertService extends MainService {
  constructor() {
    super();
  }

  async createDessert(dessert: IDessert) {
    try {
      const resp = await this.postMethod(`/api/desserts`, dessert);

      return resp;
    } catch (err: Any) {
      throw new Error(err);
    }
  }
}
