import { configureStore } from '@reduxjs/toolkit';
import { ingredientsReducer, fetchIngredients } from './ingredientsSlice';
import { TIngredient } from '../../utils/types';
import { getIngredientsApi } from '../../utils/burger-api';
import { Store } from 'redux';

jest.mock('../../utils/burger-api');

const mockIngredients: TIngredient[] = [
    {
        _id: '1', name: 'Соус Spicy-X', type: 'sauce',
        proteins: 30, fat: 20, carbohydrates: 40, calories: 30, price: 90,
        image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png'
      },
      {
        _id: '2', name: 'Биокотлета из марсианской Магнолии', type: 'main',
        proteins: 420, fat: 142, carbohydrates: 242, calories: 4242, price: 424,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
      },
      {
        _id: '3', name: 'Краторная булка N-200i', type: 'bun',
        proteins: 80, fat: 24, carbohydrates: 53, calories: 420, price: 1255,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
      }
];

describe('ingredientsSlice', () => {
  let store: Store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        ingredients: ingredientsReducer
      }
    });
  });

  it('initial state', () => {
    const state = store.getState().ingredients;
    expect(state).toEqual({
      ingredients: [],
      isLoading: true
    });
  });

  it('fetchIngredients.pending', () => {
    store.dispatch(fetchIngredients.pending('fetchIngredients'));
    const state = store.getState().ingredients;
    expect(state.isLoading).toBe(true);
  });

  it('fetchIngredients.fulfilled', async () => {
    (getIngredientsApi as jest.Mock).mockResolvedValue(mockIngredients);
    await store.dispatch(fetchIngredients() as any); 
    const state = store.getState().ingredients;
    expect(state.isLoading).toBe(false);
    expect(state.ingredients).toEqual(mockIngredients);
  });
});
