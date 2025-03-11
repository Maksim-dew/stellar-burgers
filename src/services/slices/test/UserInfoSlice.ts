import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { getCookie, setCookie, deleteCookie } from '../../../utils/cookie';
import {
<<<<<<< HEAD
=======
  refreshToken,
  fetchWithRefresh,
>>>>>>> b1550ba21a3a343648788eac2ed2e78d96bbba64
  registerUserApi,
  loginUserApi,
  getUserApi,
  updateUserApi,
  logoutApi,
<<<<<<< HEAD
=======
  forgotPasswordApi,
  resetPasswordApi
>>>>>>> b1550ba21a3a343648788eac2ed2e78d96bbba64
} from '../../../utils/burger-api';

import { TRegisterData } from '../../../utils/burger-api';

export type TStateUser = {
<<<<<<< HEAD
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  user: TUser | null; 
  loginUserError: null | string;
  loginUserRequest: boolean;
=======
  isAuthChecked: boolean; //флаг для статуса проверки токена пользователя
  isAuthenticated: boolean;
  user: TUser | null; //null, если пользователь не авторизован
  loginUserError: null | string; // Ошибка логина, если есть
  loginUserRequest: boolean; // Флаг для состояния запроса логина
>>>>>>> b1550ba21a3a343648788eac2ed2e78d96bbba64
};

const initialState: TStateUser = {
  isAuthChecked: false,
  isAuthenticated: false,
  user: null,
  loginUserError: null,
  loginUserRequest: false
};

export const userApi = createAsyncThunk('user/userApi', getUserApi);

export const toRegisterUser = createAsyncThunk(
  'user/register',
  async ({ email, password, name }: TRegisterData) => {
    const data = await registerUserApi({ email, password, name });

    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);

    return data.user;
  }
);

export const logInUser = createAsyncThunk(
  'user/login',
  async ({ email, password }: Omit<TRegisterData, 'name'>) => {
    const data = await loginUserApi({ email, password });

    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);

    return data.user;
  }
);

export const logOutUser = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      await logoutApi();
      deleteCookie('accessToken');
      localStorage.clear();
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateUser = createAsyncThunk('user/update', updateUserApi);

export const userStateSlice = createSlice({
  name: 'userstate',
  initialState,
  reducers: {
    authChecked: (state) => {
      state.isAuthChecked = true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(userApi.pending, (state) => {
        state.isAuthenticated = false;
        state.loginUserError = null;
        state.user = null;
        state.loginUserRequest = true;
      })
      .addCase(userApi.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.isAuthChecked = true;
        state.loginUserRequest = false;
      })
      .addCase(userApi.rejected, (state, action) => {
        state.loginUserError =
<<<<<<< HEAD
          action.error.message || 'Не удалось получить пользовательские данные';
=======
          action.error.message || 'Failed to fetch user data';
>>>>>>> b1550ba21a3a343648788eac2ed2e78d96bbba64
        state.isAuthenticated = false;
        state.user = null;
        state.isAuthChecked = true;
        state.loginUserRequest = false;
      })
      .addCase(toRegisterUser.pending, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.loginUserRequest = true;
      })
      .addCase(toRegisterUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
        state.loginUserRequest = false;
      })
      .addCase(toRegisterUser.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.loginUserError =
<<<<<<< HEAD
          action.error.message || 'Не удалось найти зарегистрированного пользователя';
=======
          action.error.message || 'Failed to fetch register user ';
>>>>>>> b1550ba21a3a343648788eac2ed2e78d96bbba64
        state.loginUserRequest = false;
      })
      .addCase(logInUser.pending, (state) => {
        state.loginUserError = null;
        state.loginUserRequest = true;
      })
      .addCase(logInUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
        state.loginUserRequest = false;
        state.isAuthChecked = true;
      })
      .addCase(logInUser.rejected, (state, action) => {
        state.loginUserRequest = false;
        state.loginUserError =
<<<<<<< HEAD
          action.error.message || 'Не удалось найти пользователя, вошедшего в систему';
=======
          action.error.message || 'Failed to fetch Log in user ';
>>>>>>> b1550ba21a3a343648788eac2ed2e78d96bbba64
        state.isAuthChecked = true;
      })
      .addCase(logOutUser.pending, (state) => {
        state.isAuthenticated = true;
        state.loginUserRequest = true;
      })
      .addCase(logOutUser.fulfilled, (state, action) => {
        state.isAuthenticated = false;
        state.loginUserRequest = false;
        state.user = null;
        deleteCookie('accessToken');
        localStorage.removeItem('refreshToken');
      })
      .addCase(logOutUser.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.loginUserRequest = false;
        state.loginUserError =
<<<<<<< HEAD
          action.error.message || 'Не удалось найти пользователя, вышедшего из системы';
=======
          action.error.message || 'Failed to fetch Log Out user ';
>>>>>>> b1550ba21a3a343648788eac2ed2e78d96bbba64
      })
      .addCase(updateUser.pending, (state) => {
        state.isAuthenticated = true;
        state.loginUserRequest = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.loginUserRequest = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loginUserError =
<<<<<<< HEAD
          action.error.message || 'Не удалось получить обновление пользователя';
=======
          action.error.message || 'Failed to fetch update user';
>>>>>>> b1550ba21a3a343648788eac2ed2e78d96bbba64
        state.loginUserRequest = false;
      });
  },
  selectors: {
    selectUser: (state) => state.user,
    selectIsAuthenticated: (state) => state.isAuthenticated,
    selectLoginUserError: (state) => state.loginUserError,
    selectIsAuthChecked: (state) => state.isAuthChecked,
    selectloginUserRequest: (state) => state.loginUserRequest
  }
});

export const checkUserAuth = createAsyncThunk(
  'user/checkUser',
  (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      dispatch(userApi()).finally(() => {
        dispatch(authChecked());
      });
    } else {
      dispatch(authChecked());
    }
  }
);

export const { authChecked } = userStateSlice.actions;
export default userStateSlice;

export const {
  selectUser,
  selectIsAuthenticated,
  selectLoginUserError,
  selectIsAuthChecked,
  selectloginUserRequest
} = userStateSlice.selectors;
