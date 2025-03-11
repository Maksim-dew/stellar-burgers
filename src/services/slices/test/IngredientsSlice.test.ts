<<<<<<< HEAD
=======
//These tests check the request ingredients reducers

import { error } from 'console';
>>>>>>> b1550ba21a3a343648788eac2ed2e78d96bbba64
import ingredientsSlice, {
  getIngredients,
  TStateIngredients
} from './IngredientsSlice';

<<<<<<< HEAD
const defaultState: TStateIngredients = {
=======
//инициализация начального состояния,  будет использоваться редьюсером перед применением экшена. Вынесли в глобальную переменную для удобства использования во всех блоках it
const initialState: TStateIngredients = {
>>>>>>> b1550ba21a3a343648788eac2ed2e78d96bbba64
  ingredients: [],
  loading: false,
  error: null
};

<<<<<<< HEAD
const sampleIngredient = [
=======
//глобальная переменная с тестовым ингредиентом для удобства использования во всех блоках it
const testIngredient = [
>>>>>>> b1550ba21a3a343648788eac2ed2e78d96bbba64
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

<<<<<<< HEAD
describe('Редуктор для тестирования ингредиентов', () => {
  it('Следует установить загрузку в значение true и сбросить ошибку в режиме ожидания', () => {
    const newState = ingredientsSlice.reducer(
      { ...defaultState, error: 'Ошибка выборки' },
      getIngredients.pending('')
    );

    expect(newState).toEqual({
=======
describe('Ingredients slice tests', () => {
  it('Test should set loading to true and err to null during pending status', () => {
    const actualState = ingredientsSlice.reducer(
      {
        ...initialState,
        // намеренно добавляем тестовую ошибку в начальное состояние, чтобы проверить её сброс редьюсером
        error: 'Test err'
      },
      //эмулируем вызов action pending, который моделирует начало асинхронной операции, ожидаемой редьюсером
      getIngredients.pending('')
    );

    //проверка, что что редьюсер правильно обновит состояние: загрузка началась (loading: true), ошибка сброшена (error: null), и список ингредиентов по-прежнему пуст
    expect(actualState).toEqual({
>>>>>>> b1550ba21a3a343648788eac2ed2e78d96bbba64
      ingredients: [],
      loading: true,
      error: null
    });
  });

<<<<<<< HEAD
  it('Обновить ингредиенты и прекратить загрузку в случае успеха', () => {
    const newState = ingredientsSlice.reducer(
      { ...defaultState, loading: true },
      getIngredients.fulfilled(sampleIngredient, '')
    );

    expect(newState).toEqual({
      ingredients: sampleIngredient,
=======
  //проверяем, как редьюсер обрабатывает успешное завершение асинхронного запроса на получение ингредиентов
  it('Test should set loading to false and upd ingredients', () => {
    const actualState = ingredientsSlice.reducer(
      {
        ...initialState,
        loading: true //Устанавливаем `loading` в `true`, имитируя активную загрузку данных
      },
      getIngredients.fulfilled(testIngredient, '')
    );

    expect(actualState).toEqual({
      ingredients: testIngredient,
>>>>>>> b1550ba21a3a343648788eac2ed2e78d96bbba64
      loading: false,
      error: null
    });
  });

<<<<<<< HEAD
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
=======
  //тест проверяет как редьюсер обрабатывает неуспешное завершение асинхронного запроса на получение ингредиентов
  it('Test should set loading to false and err to err message', () => {
    //создаем тестовый объект ошибки, который будет использоваться для эмуляции неудачного запроса
    const testErr = new Error('Test err');

    const actualState = ingredientsSlice.reducer(
      {
        ...initialState,
        loading: true //Устанавливаем `loading` в `true`, имитируя активную загрузку данных
      },
      //эмулируем неуспешное завершение запроса с созданной ранее тестовой ошибкой
      getIngredients.rejected(testErr, '')
    );

    //Проверка ОР:
    // - `loading` будет установлено в `false`, так как загрузка завершилась с ошибкой.
    // - `ingredients` останется пустым массивом, так как данные не были загружены.
    // - `error` будет содержать сообщение об ошибке, полученное из объекта ошибки.
    expect(actualState).toEqual({
      ingredients: [],
      loading: false,
      error: 'Test err'
>>>>>>> b1550ba21a3a343648788eac2ed2e78d96bbba64
    });
  });
});
