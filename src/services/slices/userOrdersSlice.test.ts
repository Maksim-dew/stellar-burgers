import { configureStore } from '@reduxjs/toolkit';
import { userOrdersReducer, getUserOrdersThunk } from './userOrdersSlice';

import { getOrdersApi } from '../../utils/burger-api';
import { Store } from 'redux';

jest.mock('../../utils/burger-api');

const mockOrders = [
  { id: '1', name: 'Burger 1', status: 'done' },
  { id: '2', name: 'Burger 2', status: 'pending' }
];

describe('userOrdersSlice', () => {
  let store : Store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        userOrders: userOrdersReducer
      }
    });
  });

  it('should return the initial state', () => {
    const state = store.getState().userOrders;
    expect(state.orders).toEqual([]);
  });

  it('should handle getUserOrdersThunk.fulfilled', async () => {
    (getOrdersApi as jest.Mock).mockResolvedValue(mockOrders);

    await store.dispatch(getUserOrdersThunk() as any);

    const state = store.getState().userOrders;
    expect(state.orders).toEqual(mockOrders);
  });

  it('should select user orders', () => {
    const state = {
      userOrders: {
        orders: mockOrders
      }
    };
    const selectedOrders = state.userOrders.orders;
    expect(selectedOrders).toEqual(mockOrders);
  });
});
