import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOrdersApi } from '../../../utils/burger-api';
import { TOrder } from '../../../utils/types';

export type TStateOrdersHistory = {
  orders: TOrder[];
  loading: boolean;
  error: string | null | undefined;
};

const initialState: TStateOrdersHistory = {
  orders: [],
  loading: false,
  error: null
};

export const ordersHistory = createAsyncThunk('user/orderHistory', async () => {
  return await getOrdersApi();
});

export const userOrdersHistorySlice = createSlice({
  name: 'ordershistory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(ordersHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(ordersHistory.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(ordersHistory.rejected, (state, action) => {
        state.error = action.error.message ?? 'История заказов с ошибками';
        state.loading = false;
      });
  },
  selectors: {
    getUserOrdersHistory: (state) => state.orders,
    getUserOrdersHistoryError: (state) => state.error,
    getUserOrdersLoading: (state) => state.loading
  }
});

export default userOrdersHistorySlice;

export const { getUserOrdersHistory, getUserOrdersHistoryError, getUserOrdersLoading } =
  userOrdersHistorySlice.selectors;
export const { actions } = userOrdersHistorySlice;