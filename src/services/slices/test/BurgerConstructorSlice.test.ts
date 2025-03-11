import {
  addIngredient,
  removeIngredient,
  moveUpIngredient,
  moveDownIngredient,
  clearOrder
} from './BurgerConstructorSlice';

import burgerConstructorSlice from './BurgerConstructorSlice';
import { TConstructorIngredient } from '@utils-types';

describe('BurgerConstructorSlice tests', () => {
  const testIngredients = {
    ingredient1: {
      id: '1', _id: '1', name: 'Соус Spicy-X', type: 'sauce',
      proteins: 30, fat: 20, carbohydrates: 40, calories: 30, price: 90,
      image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png'
    },
    ingredient2: {
      id: '2', _id: '2', name: 'Биокотлета из марсианской Магнолии', type: 'main',
      proteins: 420, fat: 142, carbohydrates: 242, calories: 4242, price: 424,
      image: 'https://code.s3.yandex.net/react/code/meat-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
    },
    bun: {
      id: '3', _id: '3', name: 'Краторная булка N-200i', type: 'bun',
      proteins: 80, fat: 24, carbohydrates: 53, calories: 420, price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
    }
  };

  const getInitialState = (bun: TConstructorIngredient | null = null, ingredients: TConstructorIngredient[] = []) => ({
    constructorItems: { bun, ingredients },
    orderRequest: false,
    orderModalData: null,
    loading: false,
    error: null
  });

  it('should add an ingredient', () => {
    const newState = burgerConstructorSlice.reducer(
      getInitialState(), addIngredient(testIngredients.ingredient1)
    );
    expect(newState.constructorItems.ingredients).toHaveLength(1);
    expect(newState.constructorItems.ingredients[0]).toEqual({
      ...testIngredients.ingredient1, id: expect.any(String)
    });
  });

  it('should add a bun', () => {
    const newState = burgerConstructorSlice.reducer(
      getInitialState(), addIngredient(testIngredients.bun)
    );
    expect(newState.constructorItems.bun).toEqual({
      ...testIngredients.bun, id: expect.any(String)
    });
  });

  it('should remove an ingredient', () => {
    const newState = burgerConstructorSlice.reducer(
      getInitialState(testIngredients.bun, [testIngredients.ingredient1, testIngredients.ingredient2]),
      removeIngredient(testIngredients.ingredient1)
    );
    expect(newState.constructorItems.ingredients).toHaveLength(1);
    expect(newState.constructorItems.ingredients[0]).toEqual({
      ...testIngredients.ingredient2, id: expect.any(String)
    });
  });

  it('should move an ingredient up', () => {
    const newState = burgerConstructorSlice.reducer(
      getInitialState(testIngredients.bun, [testIngredients.ingredient1, testIngredients.ingredient2]),
      moveUpIngredient(1)
    );
    expect(newState.constructorItems.ingredients).toEqual([
      { ...testIngredients.ingredient2, id: expect.any(String) },
      { ...testIngredients.ingredient1, id: expect.any(String) }
    ]);
  });

  it('should move an ingredient down', () => {
    const newState = burgerConstructorSlice.reducer(
      getInitialState(testIngredients.bun, [testIngredients.ingredient1, testIngredients.ingredient2]),
      moveDownIngredient(0)
    );
    expect(newState.constructorItems.ingredients).toEqual([
      { ...testIngredients.ingredient2, id: expect.any(String) },
      { ...testIngredients.ingredient1, id: expect.any(String) }
    ]);
  });

  it('should clear the order', () => {
    const newState = burgerConstructorSlice.reducer(
      getInitialState(testIngredients.bun, [testIngredients.ingredient1, testIngredients.ingredient2]),
      clearOrder()
    );
    expect(newState.constructorItems).toEqual({ bun: null, ingredients: [] });
  });
});