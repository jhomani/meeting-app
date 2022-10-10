import request, {
  deleteOptions,
  getOptions,
  patchOptions,
  postOptions
} from '../utils/request';

export default class MainService {

  public getMethod(endpoint: string, filter = {}) {
    const options = getOptions();
    const encodeFilter = encodeURI(JSON.stringify(filter));

    const url = `${endpoint}?filter=${encodeFilter}`;

    return request(url, options);
  }

  public postMethod(endpoint: string, body = {}) {
    const options = postOptions(body);

    return request(endpoint, options);
  }

  public deleteById(endpoint: string, body = {}) {
    const options = deleteOptions(body);
    const url = `${endpoint}`;

    return request(url, options);
  }

  public updateById(endpoint: string, id: num, body = {}) {
    const options = patchOptions(body);
    const url = `${endpoint}/${id}`;

    return request(url, options);
  }
}
