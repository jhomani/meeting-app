import global from '@main/redux/reducer';
import app from '@redux/reducers/app';
import auth from '@redux/reducers/auth';

export default function createReducer() {
  return {
    auth,
    app,
    global,
  };
}
