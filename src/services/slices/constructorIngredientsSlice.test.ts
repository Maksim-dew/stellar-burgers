import {
  constructorIngredientsReducer,
  addIngredient,
  removeIngredient,
  moveUpIngredient,
  moveDownIngredient,
  clearConstructor
} from './constructorIngredientsSlice';
import { TConstructorIngredient } from '@utils-types';

describe('constructorIngredientsSlice', () => {
  const initialState = {
    addedIngredients: [],
    bun: {
      _id: '',
      bunDetails: null
    }
  };

  it('Начальное состояние', () => {
    expect(
      constructorIngredientsReducer(undefined, { type: 'unknown' })
    ).toEqual(initialState);
  });

  it('Игредиент булки', () => {
    const bun: TConstructorIngredient = {
      id: '1', _id: '1', name: 'Соус Spicy-X', type: 'bun',
      proteins: 30, fat: 20, carbohydrates: 40, calories: 30, price: 90,
      image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png'
    };
    const actual = constructorIngredientsReducer(
      initialState,
      addIngredient(bun)
    );
    expect(actual.bun._id).toEqual(bun._id);
    expect(actual.bun.bunDetails).toEqual(expect.objectContaining({
      _id: bun._id,
      name: bun.name,
      type: bun.type,
      proteins: bun.proteins,
      fat: bun.fat,
      carbohydrates: bun.carbohydrates,
      calories: bun.calories,
      price: bun.price,
      image: bun.image,
      image_mobile: bun.image_mobile,
      image_large: bun.image_large
    }));
  });

  it('Добавление ингредиента для не-булочки', () => {
    const ingredient: TConstructorIngredient = {
      id: '2', _id: '2', name: 'Биокотлета из марсианской Магнолии', type: 'main',
      proteins: 420, fat: 142, carbohydrates: 242, calories: 4242, price: 424,
      image: 'https://code.s3.yandex.net/react/code/meat-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
    };
    const actual = constructorIngredientsReducer(
      initialState,
      addIngredient(ingredient)
    );
    expect(actual.addedIngredients).toHaveLength(1);
    expect(actual.addedIngredients[0]).toEqual(
      expect.objectContaining({
        _id: ingredient._id,
        name: ingredient.name,
        type: ingredient.type,
        proteins: ingredient.proteins,
        fat: ingredient.fat,
        carbohydrates: ingredient.carbohydrates,
        calories: ingredient.calories,
        price: ingredient.price,
        image: ingredient.image,
        image_mobile: ingredient.image_mobile,
        image_large: ingredient.image_large
      })
    );
  });

  it('removeIngredient', () => {
    const ingredient: TConstructorIngredient = {
      id: '3', _id: '3', name: 'Краторная булка N-200i', type: 'bun',
      proteins: 80, fat: 24, carbohydrates: 53, calories: 420, price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
    };
    const stateWithIngredient = {
      ...initialState,
      addedIngredients: [ingredient]
    };
    const actual = constructorIngredientsReducer(
      stateWithIngredient,
      removeIngredient({ id: '3' })
    );
    expect(actual.addedIngredients).toHaveLength(0);
  });

  it('moveUpIngredient', () => {
    const ingredient1: TConstructorIngredient = {
      id: '1', _id: '1', name: 'Соус Spicy-X', type: 'sauce',
      proteins: 30, fat: 20, carbohydrates: 40, calories: 30, price: 90,
      image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png'
    };
    const ingredient2: TConstructorIngredient = {
      id: '2', _id: '2', name: 'Биокотлета из марсианской Магнолии', type: 'main',
      proteins: 420, fat: 142, carbohydrates: 242, calories: 4242, price: 424,
      image: 'https://code.s3.yandex.net/react/code/meat-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
    };
    const stateWithIngredients = {
      ...initialState,
      addedIngredients: [ingredient1, ingredient2]
    };
    const actual = constructorIngredientsReducer(
      stateWithIngredients,
      moveUpIngredient({ id: '2' })
    );
    expect(actual.addedIngredients[0].id).toEqual('2');
    expect(actual.addedIngredients[1].id).toEqual('1');
  });

  it('moveDownIngredient', () => {
    const ingredient1: TConstructorIngredient = {
      id: '3', _id: '3', name: 'Краторная булка N-200i', type: 'bun',
      proteins: 80, fat: 24, carbohydrates: 53, calories: 420, price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
    };
    const ingredient2: TConstructorIngredient = {
      id: '2', _id: '2', name: 'Биокотлета из марсианской Магнолии', type: 'main',
      proteins: 420, fat: 142, carbohydrates: 242, calories: 4242, price: 424,
      image: 'https://code.s3.yandex.net/react/code/meat-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
    };
    const stateWithIngredients = {
      ...initialState,
      addedIngredients: [ingredient1, ingredient2]
    };
    const actual = constructorIngredientsReducer(
      stateWithIngredients,
      moveDownIngredient({ id: '3' })
    );
    expect(actual.addedIngredients[0].id).toEqual('2');
    expect(actual.addedIngredients[1].id).toEqual('3');
  });

  it('clearConstructor', () => {
    const ingredient: TConstructorIngredient = {
      id: '1', _id: '1', name: 'Соус Spicy-X', type: 'sauce',
      proteins: 30, fat: 20, carbohydrates: 40, calories: 30, price: 90,
      image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png'
    };
    const stateWithIngredient = {
      ...initialState,
      addedIngredients: [ingredient],
      bun: {
        _id: '1',
        bunDetails: {
        id: '2', _id: '2', name: 'Биокотлета из марсианской Магнолии', type: 'main',
      proteins: 420, fat: 142, carbohydrates: 242, calories: 4242, price: 424,
      image: 'https://code.s3.yandex.net/react/code/meat-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
        }
      }
    };
    const actual = constructorIngredientsReducer(
      stateWithIngredient,
      clearConstructor()
    );
    expect(actual).toEqual(initialState);
  });
});
