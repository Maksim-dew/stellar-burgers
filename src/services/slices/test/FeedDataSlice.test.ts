
import {
  getFeedData,
  getOrderByNum,
  TStateFeed,
  feedDataSlice
} from './FeedDataSlice';

const initialState: TStateFeed = {
  orders: [],
  total: 0,
  totalToday: 0,
  error: null,
  loading: false,
  modalOrder: null
};

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

describe('Тесты срезов', () => {
  it('тест должен установить значение load равным true, а значение err равным null во время состояния ожидания', () => {
    const actualState = feedDataSlice.reducer(
      {
        ...initialState,
        error: "Test err"
      },
      getFeedData.pending('')
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

  it('тест должен установить значение load равным false и обновить данные подачи', () => {
    const actualState = feedDataSlice.reducer(
      {
        ...initialState,
        loading: true
      },
      getFeedData.fulfilled(testOrders, '')
    );

    expect(actualState).toEqual({
      orders: testOrders.orders,
      total: testOrders.total,
      totalToday: testOrders.totalToday,
      error: null,
      loading: false,
      modalOrder: null
    });
  });

  it('тест должен установить для err значение err message, а для loading - значение false', () => {
    const testErr = new Error('Test err');
    const actualState = feedDataSlice.reducer(
      {
        ...initialState,
        loading: true
      },
      getFeedData.rejected(testErr, '')
    );

    expect(actualState).toEqual({
      orders: [],
      total: 0,
      totalToday: 0,
      modalOrder: null,
      loading: false,
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

  it('при тестировании получения заказа по номеру для параметра загрузка должно быть установлено значение false', () => {
    const actualState = feedDataSlice.reducer(
      {
        ...initialState,
        loading: true
      },
      getOrderByNum.fulfilled(testOrders, '1', 1)
    );

    expect(actualState).toEqual({
      orders: [],
      total: 0,
      totalToday: 0,
      error: null,
      loading: false,
      modalOrder: testOrders.orders[0]
    });
  });

  it('тест get order by number должен установить значение loading равным false и установить значение err', () => {
    const testErr = new Error('Test err');
    const actualState = feedDataSlice.reducer(
      {
        ...initialState,
        loading: true
      },
      getOrderByNum.rejected(testErr, '1', 1)
    );
    expect(actualState).toEqual({
      orders: [],
      total: 0,
      totalToday: 0,
      modalOrder: null,
      loading: false,
      error: "Test err"
    });
  });
});
