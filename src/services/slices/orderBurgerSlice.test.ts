import { configureStore } from '@reduxjs/toolkit';
import { orderBurgerReducer, orderBurgerThunk, cleanOrderData, cleanConstructor } from './orderBurgerSlice';
import { orderBurgerApi } from '../../utils/burger-api';
import { TOrder } from '@utils-types';
import { RootState } from '../store'; 
import { Store } from 'redux'; 

jest.mock('../../utils/burger-api');

const mockOrder = {
    success: true,
    orders: [
      {
        _id: '1',
        ingredients: [
          '643d69a5c3f7b9001cfa093c',
          '643d69a5c3f7b9001cfa093c',
          '643d69a5c3f7b9001cfa093e'
        ],
        status: 'done',
        name: 'Краторный люминесцентный бургер',
        createdAt: '2024-09-02T13:46:25.234Z',
        updatedAt: '2024-09-02T13:46:25.914Z',
        number: 1
      },
      {
        _id: '2',
        ingredients: [
          '643d69a5c3f7b9001cfa0941',
          '643d69a5c3f7b9001cfa093f',
          '643d69a5c3f7b9001cfa0946',
          '643d69a5c3f7b9001cfa0949',
          '643d69a5c3f7b9001cfa0945',
          '643d69a5c3f7b9001cfa093c'
        ],
        status: 'done',
        name: 'Антарианский краторный бессмертный минеральный экзо-плантаго био-марсианский бургер',
        createdAt: '2024-09-02T07:36:55.648Z',
        updatedAt: '2024-09-02T07:36:56.126Z',
        number: 2
      },
      {
        _id: '3',
        ingredients: [
          '643d69a5c3f7b9001cfa093c',
          '643d69a5c3f7b9001cfa0943',
          '643d69a5c3f7b9001cfa093c'
        ],
        status: 'done',
        name: 'Краторный space бургер',
        createdAt: '2024-09-02T07:34:44.831Z',
        updatedAt: '2024-09-02T07:34:45.280Z',
        number: 3
      }
    ],
    total: 3,
    totalToday: 3
  };

describe('orderBurgerSlice', () => {
  let store: Store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        orderBurger: orderBurgerReducer
      }
    });
  });

  it('should handle initial state', () => {
    const state = store.getState() as RootState;
    expect(state.orderBurger).toEqual({
      ingredients: [],
      orderData: null,
      orderRequest: false
    });
  });

  it('should handle cleanOrderData', () => {
    store.dispatch(cleanOrderData());
    const state = store.getState() as RootState; 
    expect(state.orderBurger.orderData).toBeNull();
  });

  it('should handle cleanConstructor', () => {
    store.dispatch(cleanConstructor());
    const state = store.getState() as RootState; 
    expect(state.orderBurger.ingredients).toEqual([]);
  });

  it('should handle orderBurgerThunk.pending', () => {
    store.dispatch(orderBurgerThunk.pending('requestId', []));
    const state = store.getState() as RootState; 
    expect(state.orderBurger.orderRequest).toBe(true);
  });
});
