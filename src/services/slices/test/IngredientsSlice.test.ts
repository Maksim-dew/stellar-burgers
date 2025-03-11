import ingredientsSlice, {
  getIngredients,
  TStateIngredients
} from './IngredientsSlice';

const defaultState: TStateIngredients = {
  ingredients: [],
  loading: false,
  error: null
};

const sampleIngredient = [
  {
    _id: '1',
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
  }
];

describe('Редуктор для тестирования ингредиентов', () => {
  it('Следует установить загрузку в значение true и сбросить ошибку в режиме ожидания', () => {
    const newState = ingredientsSlice.reducer(
      { ...defaultState, error: 'Ошибка выборки' },
      getIngredients.pending('')
    );

    expect(newState).toEqual({
      ingredients: [],
      loading: true,
      error: null
    });
  });

  it('Обновить ингредиенты и прекратить загрузку в случае успеха', () => {
    const newState = ingredientsSlice.reducer(
      { ...defaultState, loading: true },
      getIngredients.fulfilled(sampleIngredient, '')
    );

    expect(newState).toEqual({
      ingredients: sampleIngredient,
      loading: false,
      error: null
    });
  });

  it('Прекратить загрузку и сохранить ошибку при сбое', () => {
    const sampleError = new Error('Ошибка выборки');

    const newState = ingredientsSlice.reducer(
      { ...defaultState, loading: true },
      getIngredients.rejected(sampleError, '')
    );

    expect(newState).toEqual({
      ingredients: [],
      loading: false,
      error: 'Ошибка выборки'
    });
  });
});
