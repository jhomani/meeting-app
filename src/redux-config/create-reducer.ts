import global from '@main/redux/reducer';
import app from '@redux/reducers/app';
import auth from '@redux/reducers/auth';
import tags from '@redux/tags/reducer';

export default function createReducer() {
  return {
    auth,
    app,
    global,
    tags,
  };
}
