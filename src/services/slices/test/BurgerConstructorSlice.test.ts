<<<<<<< HEAD
=======
//These tests check the burger constructor reducers

>>>>>>> b1550ba21a3a343648788eac2ed2e78d96bbba64
import {
  addIngredient,
  removeIngredient,
  moveUpIngredient,
  moveDownIngredient,
  clearOrder
} from './BurgerConstructorSlice';

import burgerConstructorSlice from './BurgerConstructorSlice';
<<<<<<< HEAD
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
=======

import { TConstructorIngredient } from '@utils-types';

describe('Constructor slice tests ', () => {
  const ingredient1: TConstructorIngredient = {
    id: '1',
    _id: '1',
    name: 'Соус Spicy-X',
    type: 'sauce',
    proteins: 30,
    fat: 20,
    carbohydrates: 40,
    calories: 30,
    price: 90,
    image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png'
  };

  const ingredient2: TConstructorIngredient = {
    id: '2',
    _id: '2',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
  };

  const bun: TConstructorIngredient = {
    id: '3',
    _id: '3',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
  };
  //тест добавление ингредиента в конструктор
  it('addIngredient should add ingredient into constructor', () => {
    const initialState = {
      constructorItems: {
        bun: null,
        ingredients: []
      },
      orderRequest: false,
      orderModalData: null,
      loading: false,
      error: null
    };

    const newState = burgerConstructorSlice.reducer(
      initialState,
      addIngredient(ingredient1)
    );

    expect(newState.constructorItems.ingredients).toHaveLength(1);
    expect(newState.constructorItems.ingredients[0]).toEqual({
      ...ingredient1,
      id: expect.any(String) //проверка, что значение id - тип данных строка
    });
  });
  //тест добавления булки в конструктор
  it('addIngredient should add bun into constructor', () => {
    const initialState = {
      constructorItems: {
        bun: null,
        ingredients: []
      },
      orderRequest: false,
      orderModalData: null,
      loading: false,
      error: null
    };

    const newState = burgerConstructorSlice.reducer(
      initialState,
      addIngredient(bun)
    );

    expect(newState.constructorItems.bun).toEqual({
      ...bun,
      id: expect.any(String)
    });
  });

  //тест удаления ингредиента
  it('removeIngredient should remove ingredient from constructor', () => {
    const initialState = {
      constructorItems: {
        bun: bun,
        ingredients: [ingredient1, ingredient2]
      },
      orderRequest: false,
      orderModalData: null,
      loading: false,
      error: null
    };

    const newState = burgerConstructorSlice.reducer(
      initialState,
      removeIngredient(ingredient1)
    );

    expect(newState.constructorItems.ingredients).toHaveLength(1);
    expect(newState.constructorItems.ingredients[0]).toEqual({
      ...ingredient2,
      id: expect.any(String)
    });
  });

  //тест изменения порядка ингредиентов в конструкторе - перемещение инг-та вверх
  it('moveUpIngredient should MOVE UP ingredient within constructor', () => {
    const initialState = {
      constructorItems: {
        bun: bun,
        ingredients: [ingredient1, ingredient2]
      },
      orderRequest: false,
      orderModalData: null,
      loading: false,
      error: null
    };

    const newState = burgerConstructorSlice.reducer(
      initialState,
      moveUpIngredient(1) //передаем индекс элемента в массиве, который нужно переместить вверх. Негативный тест - индекс == 0, в этом случае тест == failed, так как элемент с 0 индексом двигать вверх нельзя
    );
    // Ожидаем, что ingredient2 переместится на позицию ingredient1
    expect(newState.constructorItems.ingredients[0]).toEqual({
      ...ingredient2,
      id: expect.any(String)
    });
    // Ожидаем, что ingredient1 переместится на позицию ingredient2
    expect(newState.constructorItems.ingredients[1]).toEqual({
      ...ingredient1,
      id: expect.any(String)
    });
  });

  //тест на перемещение ингредиента вниз
  it('moveDownIngredient should MOVE DOWN ingredient within constructor', () => {
    const initialState = {
      constructorItems: {
        bun: bun,
        ingredients: [ingredient1, ingredient2]
      },
      orderRequest: false,
      orderModalData: null,
      loading: false,
      error: null
    };

    const newState = burgerConstructorSlice.reducer(
      initialState,
      moveDownIngredient(0) //передаем индекс элемента в массиве, который нужно переместить вниз.
    );
    // Ожидаем, что ingredient1 переместится на позицию ingredient2
    expect(newState.constructorItems.ingredients[1]).toEqual({
      ...ingredient1,
      id: expect.any(String)
    });
    // Ожидаем, что ingredient2 переместится на позицию ingredient1
    expect(newState.constructorItems.ingredients[0]).toEqual({
      ...ingredient2,
      id: expect.any(String)
    });
  });

  //тест очищения конструктора
  it('clearOrder should clear constructor', () => {
    const initialState = {
      constructorItems: {
        bun: bun,
        ingredients: [ingredient1, ingredient2]
      },
      orderRequest: false,
      orderModalData: null,
      loading: false,
      error: null
    };

    const newState = burgerConstructorSlice.reducer(initialState, clearOrder());

    expect(newState.constructorItems).toEqual({
      bun: null,
      ingredients: []
    });
  });
});
>>>>>>> b1550ba21a3a343648788eac2ed2e78d96bbba64
