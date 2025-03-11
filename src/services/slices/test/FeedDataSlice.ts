import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi, getOrderByNumberApi } from '../../../utils/burger-api';
import { TOrder } from '@utils-types';

export type TStateFeed = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  error: string | null;
  loading: boolean;
  modalOrder: TOrder | null;
};

const initialFeedState: TStateFeed = {
  orders: [],
  total: 0,
  totalToday: 0,
  error: null,
  loading: false,
  modalOrder: null
};

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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeedData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFeedData.fulfilled, (state, action) => {
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
        state.error = action.error.message || 'Ошибка при выборке заказа';
      });
  },
  selectors: {
    selectFeedOrders: (state) => state.orders,
    selectTotalOrders: (state) => state.total,
    selectTotalToday: (state) => state.totalToday,
    selectLoadingStatus: (state) => state.loading,
    selectError: (state) => state.error,
    selectModalOrder: (state) => state.modalOrder
  }
});

export default feedDataSlice;
export const {
  selectFeedOrders,
  selectTotalOrders,
  selectTotalToday,
  selectLoadingStatus,
  selectError,
  selectModalOrder
} = feedDataSlice.selectors;
