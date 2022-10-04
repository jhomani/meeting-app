import {GET_STATISTICS} from './constants';

const initialState = {
  datas: [],
};

export type IState = typeof initialState;

export const statisticReducer = (state = initialState, action) => {
  let resp = state;

  switch (action.type) {
    case GET_STATISTICS: {
      resp = {
        ...state,
        datas: action.payload,
      };
      break;
    }
  }

  return resp;
};
