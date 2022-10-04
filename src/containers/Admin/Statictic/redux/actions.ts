import {GET_STATISTICS, GET_STATISTICS_START} from './constants';
import {IState} from './reducer';

export const getStatistics = (payload: Partial<IState>) => ({
  type: GET_STATISTICS,
  payload,
});

export const getStatisticsStart = (payload: Partial<IState>) => ({
  type: GET_STATISTICS_START,
  payload,
});
