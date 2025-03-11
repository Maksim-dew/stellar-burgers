<<<<<<< HEAD

=======
//These tests check the Feed data slice reducers

import { error } from 'console';
>>>>>>> b1550ba21a3a343648788eac2ed2e78d96bbba64
import {
  getFeedData,
  getOrderByNum,
  TStateFeed,
  feedDataSlice
} from './FeedDataSlice';

<<<<<<< HEAD
=======
// Начальное состояние для тестов, вынесенное в глобальную переменную для общего доступа
>>>>>>> b1550ba21a3a343648788eac2ed2e78d96bbba64
const initialState: TStateFeed = {
  orders: [],
  total: 0,
  totalToday: 0,
  error: null,
  loading: false,
  modalOrder: null
};

<<<<<<< HEAD
=======
//Тестовые данные заказов для использования в тестах, в глобальной переменной для общего доступа
>>>>>>> b1550ba21a3a343648788eac2ed2e78d96bbba64
const testOrders = {
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

<<<<<<< HEAD
describe('Тесты срезов', () => {
  it('тест должен установить значение load равным true, а значение err равным null во время состояния ожидания', () => {
    const actualState = feedDataSlice.reducer(
      {
        ...initialState,
        error: "Test err"
=======
describe('Feed data slice tests', () => {
  // Проверка на установку loading в true и сброс ошибки (error) при состоянии pending
  it('test should set load to true and err to null during pending status', () => {
    const actualState = feedDataSlice.reducer(
      {
        ...initialState,
        error: 'Test err'
>>>>>>> b1550ba21a3a343648788eac2ed2e78d96bbba64
      },
      getFeedData.pending('')
    );
    expect(actualState).toEqual({
      orders: [],
      total: 0,
      totalToday: 0,
      error: null,
<<<<<<< HEAD
      loading: true, 
      modalOrder: null
    });
  });

  it('тест должен установить значение load равным false и обновить данные подачи', () => {
=======
      loading: true, // Ошибка сбрасывается
      modalOrder: null // Загрузка начинается
    });
  });

  // Проверка на установку данных после успешной загрузки
  it('test should set load to false and upd feed data', () => {
>>>>>>> b1550ba21a3a343648788eac2ed2e78d96bbba64
    const actualState = feedDataSlice.reducer(
      {
        ...initialState,
        loading: true
      },
      getFeedData.fulfilled(testOrders, '')
    );

<<<<<<< HEAD
=======
    //проверяем, что  данные корректно сохраняются в состояние, а флаг загрузки (loading) сбрасывается.
>>>>>>> b1550ba21a3a343648788eac2ed2e78d96bbba64
    expect(actualState).toEqual({
      orders: testOrders.orders,
      total: testOrders.total,
      totalToday: testOrders.totalToday,
      error: null,
      loading: false,
      modalOrder: null
    });
  });

<<<<<<< HEAD
  it('тест должен установить для err значение err message, а для loading - значение false', () => {
=======
  // Проверка на установку ошибки (error) при отклонении загрузки данных
  it('test should set err to err message and loading to false', () => {
>>>>>>> b1550ba21a3a343648788eac2ed2e78d96bbba64
    const testErr = new Error('Test err');
    const actualState = feedDataSlice.reducer(
      {
        ...initialState,
        loading: true
      },
      getFeedData.rejected(testErr, '')
    );

<<<<<<< HEAD
=======
    // Проверяем, что ошибка корректно сохраняется в состояние, а флаг загрузки (loading) сбрасывается.
>>>>>>> b1550ba21a3a343648788eac2ed2e78d96bbba64
    expect(actualState).toEqual({
      orders: [],
      total: 0,
      totalToday: 0,
      modalOrder: null,
      loading: false,
<<<<<<< HEAD
      error: "Test err"
    });
  });

  it('при тестировании получения заказа по номеру для параметра загрузка должно быть установлено значение true', () => {
    const actualState = feedDataSlice.reducer(
      {
        ...initialState,
        error: "Test err"
      },
      getOrderByNum.pending('1', 1) 
=======
      error: 'Test err'
    });
  });

  // Проверка на установку loading в true при запросе заказа по номеру (pending)
  it('test get order by number should set loading to true', () => {
    const actualState = feedDataSlice.reducer(
      {
        ...initialState,
        error: 'Test err'
      },
      getOrderByNum.pending('1', 1) //аргументы (номер заказа и идентификатор запроса) не используются непосредственно в тесте, но необходимы для соответствия сигнатуре запроса
>>>>>>> b1550ba21a3a343648788eac2ed2e78d96bbba64
    );
    expect(actualState).toEqual({
      orders: [],
      total: 0,
      totalToday: 0,
      error: null,
      loading: true,
      modalOrder: null
    });
  });

<<<<<<< HEAD
  it('при тестировании получения заказа по номеру для параметра загрузка должно быть установлено значение false', () => {
=======
  // Проверка на установку заказа в modalOrder и завершение загрузки (fulfilled)
  it('test get order by number should set loading to false', () => {
>>>>>>> b1550ba21a3a343648788eac2ed2e78d96bbba64
    const actualState = feedDataSlice.reducer(
      {
        ...initialState,
        loading: true
      },
      getOrderByNum.fulfilled(testOrders, '1', 1)
    );

<<<<<<< HEAD
=======
    //проверяем, что modalOrder обновился, а loading завершена
>>>>>>> b1550ba21a3a343648788eac2ed2e78d96bbba64
    expect(actualState).toEqual({
      orders: [],
      total: 0,
      totalToday: 0,
      error: null,
      loading: false,
      modalOrder: testOrders.orders[0]
    });
  });

<<<<<<< HEAD
  it('тест get order by number должен установить значение loading равным false и установить значение err', () => {
=======
  // Проверка на установку ошибки и завершение загрузки при отказе в получении заказа (rejected)
  it('test get order by number should set loading to false and set err', () => {
>>>>>>> b1550ba21a3a343648788eac2ed2e78d96bbba64
    const testErr = new Error('Test err');
    const actualState = feedDataSlice.reducer(
      {
        ...initialState,
        loading: true
      },
      getOrderByNum.rejected(testErr, '1', 1)
    );
<<<<<<< HEAD
=======
    // Проверяем, что ошибка сохраняется, а флаг загрузки (loading) сбрасывается.
>>>>>>> b1550ba21a3a343648788eac2ed2e78d96bbba64
    expect(actualState).toEqual({
      orders: [],
      total: 0,
      totalToday: 0,
      modalOrder: null,
      loading: false,
<<<<<<< HEAD
      error: "Test err"
=======
      error: 'Test err'
>>>>>>> b1550ba21a3a343648788eac2ed2e78d96bbba64
    });
  });
});
