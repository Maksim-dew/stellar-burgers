import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
<<<<<<< HEAD
import { getFeedsApi, getOrderByNumberApi } from '../../../utils/burger-api';
import { TOrder } from '@utils-types';
=======
import { getFeedsApi } from '../../../utils/burger-api';
import { TOrder } from '@utils-types';
import { getOrderByNumberApi } from '../../../utils/burger-api';
import { act } from 'react-dom/test-utils';
>>>>>>> b1550ba21a3a343648788eac2ed2e78d96bbba64

export type TStateFeed = {
  orders: TOrder[];
  total: number;
  totalToday: number;
<<<<<<< HEAD
  error: string | null;
=======
  error: null | string;
>>>>>>> b1550ba21a3a343648788eac2ed2e78d96bbba64
  loading: boolean;
  modalOrder: TOrder | null;
};

<<<<<<< HEAD
const initialFeedState: TStateFeed = {
=======
const initialState: TStateFeed = {
>>>>>>> b1550ba21a3a343648788eac2ed2e78d96bbba64
  orders: [],
  total: 0,
  totalToday: 0,
  error: null,
  loading: false,
  modalOrder: null
};

<<<<<<< HEAD
export const getFeedData = createAsyncThunk('feed/fetchData', async () => {
  return await getFeedsApi();
});

export const getOrderByNum = createAsyncThunk('feed/fetchOrder', async (orderNumber: number, { rejectWithValue }) => {
  try {
    return await getOrderByNumberApi(orderNumber);
  } catch {
    return rejectWithValue('Ошибка при получении данных заказа');
  }
});

export const feedDataSlice = createSlice({
  name: 'feedData',
  initialState: initialFeedState,
=======
export const getFeedData = createAsyncThunk('feed/data', getFeedsApi);

export const getOrderByNum = createAsyncThunk(
  'feed/getOrder',
  async (number: number, { rejectWithValue }) => {
    try {
      const response = await getOrderByNumberApi(number);
      return response;
    } catch (error) {
      return rejectWithValue('Error feed data');
    }
  }
);

export const feedDataSlice = createSlice({
  name: 'feeddata',
  initialState,
>>>>>>> b1550ba21a3a343648788eac2ed2e78d96bbba64
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeedData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFeedData.fulfilled, (state, action) => {
<<<<<<< HEAD
        Object.assign(state, {
          orders: action.payload.orders,
          total: action.payload.total,
          totalToday: action.payload.totalToday,
          loading: false
        });
      })
      .addCase(getFeedData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка при поиске ленты';
=======
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.loading = false;
      })
      .addCase(getFeedData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Feed error';
>>>>>>> b1550ba21a3a343648788eac2ed2e78d96bbba64
      })
      .addCase(getOrderByNum.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderByNum.fulfilled, (state, action) => {
        state.loading = false;
        state.modalOrder = action.payload.orders[0];
      })
      .addCase(getOrderByNum.rejected, (state, action) => {
        state.loading = false;
<<<<<<< HEAD
        state.error = action.error.message || 'Ошибка при выборке заказа';
      });
  },
  selectors: {
    selectFeedOrders: (state) => state.orders,
    selectTotalOrders: (state) => state.total,
    selectTotalToday: (state) => state.totalToday,
    selectLoadingStatus: (state) => state.loading,
    selectError: (state) => state.error,
=======
        state.error = action.error.message || 'Feed error';
      });
  },
  selectors: {
    getFeedOrders: (state) => state.orders,
    getTotalEmountOrders: (state) => state.total,
    getTotalEmountToday: (state) => state.totalToday,
    getLoading: (state) => state.loading,
    getError: (state) => state.error,
>>>>>>> b1550ba21a3a343648788eac2ed2e78d96bbba64
    selectModalOrder: (state) => state.modalOrder
  }
});

export default feedDataSlice;
export const {
<<<<<<< HEAD
  selectFeedOrders,
  selectTotalOrders,
  selectTotalToday,
  selectLoadingStatus,
  selectError,
  selectModalOrder
=======
  getFeedOrders,
  getTotalEmountOrders,
  getTotalEmountToday,
  getLoading,
  getError
>>>>>>> b1550ba21a3a343648788eac2ed2e78d96bbba64
} = feedDataSlice.selectors;
