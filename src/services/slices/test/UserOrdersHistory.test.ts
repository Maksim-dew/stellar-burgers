<<<<<<< HEAD
=======
//tests checks user order history slice reducers

>>>>>>> b1550ba21a3a343648788eac2ed2e78d96bbba64
import {
  TStateOrdersHistory,
  ordersHistory,
  userOrdersHistorySlice
} from './UserOrdersHistory';

<<<<<<< HEAD
=======
// Начальное состояние для тестов, вынесенное в глобальную переменную для общего доступа

>>>>>>> b1550ba21a3a343648788eac2ed2e78d96bbba64
const initialState: TStateOrdersHistory = {
  orders: [],
  loading: false,
  error: null
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

describe('Order history tests', () => {
<<<<<<< HEAD
=======
  // Тест на установку флага загрузки в true и сброс ошибки при статусе pending
>>>>>>> b1550ba21a3a343648788eac2ed2e78d96bbba64
  it('test should set load to true and err to null during pending status', () => {
    const actualState = userOrdersHistorySlice.reducer(
      {
        ...initialState,
        error: 'Test err'
      },
      ordersHistory.pending('')
    );
    expect(actualState).toEqual({
<<<<<<< HEAD
      orders: [],
      error: null,
      loading: true 
    });
  });

=======
      orders: [], // Заказы остаются пустыми
      error: null, // Ошибка сбрасывается
      loading: true //загрузка происходит
    });
  });

  // Тест на установку флага загрузки в false и обновление данных при успешном выполнении
>>>>>>> b1550ba21a3a343648788eac2ed2e78d96bbba64
  it('test should set load to false and upd feed data', () => {
    const actualState = userOrdersHistorySlice.reducer(
      {
        ...initialState,
        loading: true
      },
      ordersHistory.fulfilled(testOrders.orders, '')
    );
<<<<<<< HEAD
=======

    //проверяем, что  данные корректно сохраняются в состояние, а флаг загрузки (loading) сбрасывается.
>>>>>>> b1550ba21a3a343648788eac2ed2e78d96bbba64
    expect(actualState).toEqual({
      orders: testOrders.orders,
      error: null,
      loading: false
    });
  });

<<<<<<< HEAD
=======
  // Тест на установку сообщения об ошибке и сброс флага загрузки при неудаче
>>>>>>> b1550ba21a3a343648788eac2ed2e78d96bbba64
  it('test should set err to err message and loading to false', () => {
    const testErr = new Error('Test err');
    const actualState = userOrdersHistorySlice.reducer(
      {
        ...initialState,
        loading: true
      },
      ordersHistory.rejected(testErr, '')
    );
<<<<<<< HEAD
=======

    // Проверяем, что ошибка корректно сохраняется в состояние, а флаг загрузки (loading) сбрасывается.
>>>>>>> b1550ba21a3a343648788eac2ed2e78d96bbba64
    expect(actualState).toEqual({
      orders: [],
      loading: false,
      error: 'Test err'
    });
  });
});
