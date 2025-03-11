import { createSlice, createAsyncThunk, PayloadAction, nanoid } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';
import { orderBurgerApi } from '../../../utils/burger-api';

type TStateBurgerConstructor = {
  constructorItems: {
    bun: TIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  orderRequest: boolean;
  orderModalData: TOrder | null;
  loading: boolean;
  error?: string | null;
};

const defaultState: TStateBurgerConstructor = {
  constructorItems: { bun: null, ingredients: [] },
  orderRequest: false,
  orderModalData: null,
  loading: false,
  error: null
};

export const createOrder = createAsyncThunk('order/createOrder', async (data: string[]) => {
  return await orderBurgerApi(data);
});

export const burgerConstructorSlice = createSlice({
  name: 'burgerconstructor',
  initialState: defaultState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        action.payload.type === 'bun' ? state.constructorItems.bun = action.payload : state.constructorItems.ingredients.push(action.payload);
      },
      prepare: (ingredient: TIngredient) => ({ payload: { ...ingredient, id: nanoid() } })
    },
    removeIngredient: (state, action: PayloadAction<TConstructorIngredient>) => {
      state.constructorItems.ingredients = state.constructorItems.ingredients.filter(({ id }) => id !== action.payload.id);
    },
    moveUpIngredient: (state, action: PayloadAction<number>) => {
      const i = action.payload;
      if (i > 0) [state.constructorItems.ingredients[i - 1], state.constructorItems.ingredients[i]] = [state.constructorItems.ingredients[i], state.constructorItems.ingredients[i - 1]];
    },
    moveDownIngredient: (state, action: PayloadAction<number>) => {
      const i = action.payload;
      if (i < state.constructorItems.ingredients.length - 1) [state.constructorItems.ingredients[i + 1], state.constructorItems.ingredients[i]] = [state.constructorItems.ingredients[i], state.constructorItems.ingredients[i + 1]];
    },
    clearOrder: () => defaultState
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => { state.orderRequest = true; state.error = null; })
      .addCase(createOrder.rejected, (state, action) => { state.orderRequest = false; state.error = action.error.message; })
      .addCase(createOrder.fulfilled, (state, action) => {
        Object.assign(state, { orderRequest: false, orderModalData: action.payload.order, constructorItems: { bun: null, ingredients: [] }, error: null });
      });
  },
  selectors: {
    getConstructorItems: (state) => state.constructorItems,
    getOrderRequest: (state) => state.orderRequest,
    getOrderModalData: (state) => state.orderModalData,
    getLoading: (state) => state.loading,
    getError: (state) => state.error
  }
});

export default burgerConstructorSlice;
export const { getConstructorItems, getOrderRequest, getOrderModalData, getLoading, getError } = burgerConstructorSlice.selectors;
export const { addIngredient, removeIngredient, moveUpIngredient, moveDownIngredient, clearOrder } = burgerConstructorSlice.actions;
export const { reducer: burgerConstructorReducer } = burgerConstructorSlice;