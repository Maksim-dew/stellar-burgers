import {
  feedReducer,
  clearFeed,
  getFeedThunk,
  selectFeed,
  selectTotal,
  selectTotalToday,
  selectData
} from './feedSlice';
import { TOrder } from '@utils-types';
import { getFeedsApi } from '../../utils/burger-api';
import { AnyAction } from 'redux';

jest.mock('../../utils/burger-api');

describe('feedSlice', () => {
  const initialState = {
    orders: [] as TOrder[],
    total: 0,
    totalToday: 0
  };

  it('Должно быть возвращено исходное состояние', () => {
    expect(feedReducer(undefined, {} as AnyAction)).toEqual(initialState);
  });

  it('clearFeed', () => {
    const previousState = {
      orders: [{ id: '1', name: 'Burger', status: 'done', _id: '1', createdAt: '2023-01-01T00:00:00.000Z', updatedAt: '2023-01-01T00:00:00.000Z', number: 1, ingredients: ['ingredient1', 'ingredient2'] }],
      total: 100,
      totalToday: 10
    };
    expect(feedReducer(previousState, clearFeed())).toEqual(initialState);
  });

  it('getFeedThunk fulfilled', async () => {
    const mockData = {
      orders: [{ id: '1', name: 'Burger', status: 'done', _id: '1', createdAt: '2023-01-01T00:00:00.000Z', updatedAt: '2023-01-01T00:00:00.000Z', number: 1, ingredients: ['ingredient1', 'ingredient2'] }],
      total: 100,
      totalToday: 10
    };
    (getFeedsApi as jest.Mock).mockResolvedValue(mockData);

    const dispatch = jest.fn();
    const getState = jest.fn(() => ({ feed: initialState }));

    await getFeedThunk()(dispatch, getState, undefined);

    expect(dispatch).toHaveBeenCalledWith({
      type: getFeedThunk.pending.type,
      meta: expect.any(Object)
    });

    expect(dispatch).toHaveBeenCalledWith({
      type: getFeedThunk.fulfilled.type,
      payload: mockData,
      meta: expect.any(Object)
    });
  });

  it('feed data', () => {
    const state = { feed: initialState };
    expect(selectFeed(state)).toEqual(initialState.orders);
    expect(selectTotal(state)).toEqual(initialState.total);
    expect(selectTotalToday(state)).toEqual(initialState.totalToday);
    expect(selectData(state)).toEqual(initialState);
  });
});
