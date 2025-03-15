import { configureStore } from '@reduxjs/toolkit';
import {
  userReducer,
  authCheck,
  clearErrors,
  getUserThunk,
  loginUserThunk,
  registerUserThunk,
  logoutUserThunk,
  updateUserDataThunk
} from './userSlice';

import { TRegisterData, TLoginData } from '@api';

import { Store } from 'redux';

const initialState = {
  isAuthChecked: false,
  isAuthenticated: false,
  isLoading: false,
  data: null,
  loginUserError: '',
  loginUserRequest: false,
  registerUserError: ''
};

const testUser = {
  email: 'test@test.com',
  name: 'Test User'
};

const testLoginData: TLoginData = {
  email: 'test@test.com',
  password: 'password'
};

const testRegisterData: TRegisterData = {
  email: 'test@register.com',
  name: 'Register User',
  password: 'password'
};

const updatedUser: TRegisterData = {
  email: 'updated@test.com',
  name: 'Updated User',
  password: 'newpassword'
};

const testAuthResponse = {
  success: true,
  user: testUser,
  refreshToken: 'testRefreshToken',
  accessToken: 'testAccessToken'
};

describe('userSlice reducers tests', () => {
  let store: Store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        user: userReducer
      }
    });
  });

  it('should handle initial state', () => {
    expect(store.getState().user).toEqual(initialState);
  });

  it('should handle authCheck', () => {
    store.dispatch(authCheck());
    expect(store.getState().user.isAuthChecked).toBe(true);
  });

  it('should handle clearErrors', () => {
    store.dispatch(clearErrors());
    expect(store.getState().user.loginUserError).toBe('');
    expect(store.getState().user.registerUserError).toBe('');
  });
});

describe('userSlice extraReducers tests', () => {
  it('should handle loginUserThunk pending', () => {
    const actualState = userReducer(
      initialState,
      loginUserThunk.pending('', testLoginData)
    );
    expect(actualState).toEqual({
      ...initialState,
      isLoading: true,
      loginUserRequest: true,
      loginUserError: ''
    });
  });

  it('should handle loginUserThunk rejected', () => {
    const error = new Error('Login failed');
    const actualState = userReducer(
      initialState,
      loginUserThunk.rejected(error, '', testLoginData)
    );
    expect(actualState).toEqual({
      ...initialState,
      loginUserError: error.message,
      loginUserRequest: false,
      isAuthChecked: true
    });
  });

  it('should handle registerUserThunk pending', () => {
    const actualState = userReducer(
      initialState,
      registerUserThunk.pending('', testRegisterData)
    );
    expect(actualState).toEqual({
      ...initialState,
      isLoading: true
    });
  });

  it('should handle registerUserThunk fulfilled', () => {
    const actualState = userReducer(
      initialState,
      registerUserThunk.fulfilled(
        testAuthResponse,
        '',
        testRegisterData
      )
    );
    expect(actualState).toEqual({
      ...initialState,
      isLoading: false,
      data: testAuthResponse.user,
      registerUserError: ''
    });
  });

  it('should handle registerUserThunk rejected', () => {
    const error = new Error('Registration failed');
    const actualState = userReducer(
      initialState,
      registerUserThunk.rejected(error, '', testRegisterData)
    );
    expect(actualState).toEqual({
      ...initialState,
      registerUserError: 'Ошибка регистрации',
      data: null
    });
  });

  it('should handle getUserThunk fulfilled', () => {
    const actualState = userReducer(
      initialState,
      getUserThunk.fulfilled(testAuthResponse, '') 
    );
    expect(actualState).toEqual({
      ...initialState,
      data: testAuthResponse.user,
      isLoading: false,
      loginUserRequest: false,
      isAuthChecked: true,
      isAuthenticated: true
    });
  });

  it('should handle logoutUserThunk fulfilled', () => {
    const actualState = userReducer(
      initialState,
      logoutUserThunk.fulfilled({ success: true }, '')
    );
    expect(actualState).toEqual({
      ...initialState,
      data: null,
      isAuthenticated: false,
      loginUserRequest: false
    });
  });

  it('should handle updateUserDataThunk pending', () => {
    const actualState = userReducer(
      initialState,
      updateUserDataThunk.pending('', updatedUser)
    );
    expect(actualState).toEqual({
      ...initialState,
      isLoading: true
    });
  });

  it('should handle updateUserDataThunk fulfilled', () => {
    const actualState = userReducer(
      initialState,
      updateUserDataThunk.fulfilled(updatedUser, '', updatedUser)
    );
    expect(actualState).toEqual({
      ...initialState,
      data: updatedUser,
      isLoading: false
    });
  });

  it('should handle updateUserDataThunk rejected', () => {
    const error = new Error('Update failed');
    const actualState = userReducer(
      initialState,
      updateUserDataThunk.rejected(error, '', updatedUser)
    );
    expect(actualState).toEqual({
      ...initialState,
      isLoading: false
    });
  });
});
