<<<<<<< HEAD
=======
//These tests are cheking reducers and actions statuses user info slice

>>>>>>> b1550ba21a3a343648788eac2ed2e78d96bbba64
import {
  TStateUser,
  toRegisterUser,
  logInUser,
  logOutUser,
  updateUser,
  userStateSlice,
  authChecked
} from './UserInfoSlice';

const initialState: TStateUser = {
  isAuthChecked: false,
  isAuthenticated: false,
  user: null,
  loginUserError: null,
  loginUserRequest: false
};

const testUser = {
  success: true,
  user: {
<<<<<<< HEAD
    email: 'test12312@yandex.ru',
    name: 'tdfdf123@yandex.ru'
=======
    email: 'test35@mail.ru',
    name: 'test'
>>>>>>> b1550ba21a3a343648788eac2ed2e78d96bbba64
  },
  accessToken: 'test',
  refreshToken: 'test'
};

const testLogIn = {
<<<<<<< HEAD
  email: 'tdfdf123@yandex.ru',
  password: 'tdfdf123@yandex.ru'
};

const testRegisterUser = {
  email: 'yandex35w@mail.ru',
  name: 'test',
  password: 'tdfdf123@yandex.ru'
=======
  email: 'test35@mail.ru',
  password: 'password'
};

const testRegisterUser = {
  email: 'test35@mail.ru',
  name: 'test',
  password: 'password'
>>>>>>> b1550ba21a3a343648788eac2ed2e78d96bbba64
};

const updatedUser = {
  success: true,
  user: {
<<<<<<< HEAD
    email: 'yandex234@mail.ru',
    name: 'test'
=======
    email: 'test35@mail.ru',
    name: 'test35'
>>>>>>> b1550ba21a3a343648788eac2ed2e78d96bbba64
  }
};

describe('User state slice reducers tests', () => {
  it('should handle authChecked', () => {
<<<<<<< HEAD
    const previousState = {
      ...initialState,
      isAuthChecked: false 
    };
    const actualState = userStateSlice.reducer(previousState, authChecked());
    const expectedState = {
      ...previousState,
      isAuthChecked: true
    };
=======
    // Задаем начальное состояние
    const previousState = {
      ...initialState,
      isAuthChecked: false // Предполагаем, что проверка аутентификации еще не завершена
    };

    // Вызываем редьюсер с предыдущим состоянием и экшеном authChecked
    const actualState = userStateSlice.reducer(previousState, authChecked());

    // Ожидаемое состояние после вызова редьюсера
    const expectedState = {
      ...previousState,
      isAuthChecked: true // Ожидаем, что флаг isAuthChecked станет true
    };

    // Сравниваем фактическое состояние с ожидаемым
>>>>>>> b1550ba21a3a343648788eac2ed2e78d96bbba64
    expect(actualState).toEqual(expectedState);
  });
});

describe('User state slice extrareducers tests', () => {
  it('should handle toRegisterUser into pending status', () => {
    const actualState = userStateSlice.reducer(
      initialState,
      toRegisterUser.pending('', testRegisterUser)
    );

    expect(actualState).toEqual({
      ...initialState,
      isAuthenticated: false,
      user: null,
      loginUserRequest: true
    });
  });

  it('should handle toRegisterUser into fulfilled status', () => {
    const actualState = userStateSlice.reducer(
      initialState,
      toRegisterUser.fulfilled(testUser.user, '', testRegisterUser)
    );

    expect(actualState).toEqual({
      ...initialState,
      isAuthenticated: true,
      user: testUser.user,
      loginUserRequest: false
    });
  });

  it('should handle toRegisterUser into rejected status', () => {
    const error = new Error('User register error');
    const actualState = userStateSlice.reducer(
      initialState,
      toRegisterUser.rejected(error, '', testRegisterUser)
    );

    expect(actualState).toEqual({
      ...initialState,
      isAuthenticated: false,
      loginUserError: 'User register error',
      loginUserRequest: false
    });
  });

  it('should handle logInUser into pending status', () => {
    const actualState = userStateSlice.reducer(
      initialState,
      logInUser.pending('', testLogIn)
    );

    expect(actualState).toEqual({
      ...initialState,
      loginUserError: null,
      loginUserRequest: true
    });
  });

  it('should handle logInUser into fulfilled status', () => {
    const actualState = userStateSlice.reducer(
      initialState,
      logInUser.fulfilled(testUser.user, '', testRegisterUser)
    );

    expect(actualState).toEqual({
      ...initialState,
      user: testUser.user,
      isAuthenticated: true,
      isAuthChecked: true,
      loginUserRequest: false
    });
  });

  it('should handle logInUser into rejected status', () => {
    const error = new Error('User Log in Error');
    const actualState = userStateSlice.reducer(
      initialState,
      logInUser.rejected(error, '', testLogIn)
    );

    expect(actualState).toEqual({
      ...initialState,
      isAuthChecked: true,
      loginUserRequest: false,
      isAuthenticated: false,
      loginUserError: 'User Log in Error'
    });
  });

  it('should handle logOutUser into pending status', () => {
    const previousState = {
      ...initialState,
      isAuthenticated: true,
      user: testUser.user
    };

    const actualState = userStateSlice.reducer(
      previousState,
      logOutUser.pending('')
    );

    expect(actualState).toEqual({
      ...previousState,
      loginUserRequest: true
    });
  });

  it('should handle logOutUser into fulfilled status', () => {
    const actualState = userStateSlice.reducer(
      initialState,
      logOutUser.fulfilled(undefined, '')
    );

    expect(actualState).toEqual({
      isAuthenticated: false,
      user: null,
      loginUserRequest: false,
      isAuthChecked: false,
      loginUserError: null
    });
  });

  it('should handle logOutUser into rejected status', () => {
    const error = new Error('Failed to log out');
    const previousState = {
      ...initialState,
      isAuthenticated: true,
      user: testUser.user
    };

    const actualState = userStateSlice.reducer(
      previousState,
      logOutUser.rejected(error, '')
    );

    expect(actualState).toEqual({
      ...previousState,
      isAuthenticated: false,
      loginUserError: 'Failed to log out',
      loginUserRequest: false
    });
  });

  it('should handle updateUser into pending status', () => {
    const actualState = userStateSlice.reducer(
      initialState,
      updateUser.pending('', updatedUser.user)
    );

    expect(actualState).toEqual({
      ...initialState,
      isAuthenticated: true,
      loginUserRequest: true
    });
  });

  it('should handle updateUser into fulfilled status', () => {
    const actualState = userStateSlice.reducer(
      initialState,
      updateUser.fulfilled(updatedUser, '', testUser.user)
    );
    expect(actualState).toEqual({
      isAuthenticated: true,
      user: updatedUser.user,
      loginUserRequest: false,
      isAuthChecked: false,
      loginUserError: null
    });
  });

  it('should handle updateUser into rejected status', () => {
    const error = new Error('Failed to fetch update user');
    const actualState = userStateSlice.reducer(
      initialState,
      updateUser.rejected(error, '', testUser.user)
    );

    expect(actualState).toEqual({
      ...initialState,
      loginUserError: error.message,
      loginUserRequest: false
    });
  });
});
