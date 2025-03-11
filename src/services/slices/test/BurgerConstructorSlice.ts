<<<<<<< HEAD
import { createSlice, createAsyncThunk, PayloadAction, nanoid } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';
import { orderBurgerApi } from '../../../utils/burger-api';
=======
import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  nanoid
} from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';
import { orderBurgerApi, getIngredientsApi } from '../../../utils/burger-api';
import { getLoadingStatus } from './IngredientsSlice';
>>>>>>> b1550ba21a3a343648788eac2ed2e78d96bbba64

type TStateBurgerConstructor = {
  constructorItems: {
    bun: TIngredient | null;
<<<<<<< HEAD
    ingredients: TConstructorIngredient[];
=======
    ingredients: Array<TConstructorIngredient>;
>>>>>>> b1550ba21a3a343648788eac2ed2e78d96bbba64
  };
  orderRequest: boolean;
  orderModalData: TOrder | null;
  loading: boolean;
<<<<<<< HEAD
  error?: string | null;
};

const defaultState: TStateBurgerConstructor = {
  constructorItems: { bun: null, ingredients: [] },
=======
  error: null | string | undefined;
};

const initialState: TStateBurgerConstructor = {
  constructorItems: {
    bun: null,
    ingredients: []
  },
>>>>>>> b1550ba21a3a343648788eac2ed2e78d96bbba64
  orderRequest: false,
  orderModalData: null,
  loading: false,
  error: null
};

<<<<<<< HEAD
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
=======
type IngredientWithKey = TIngredient & {
  key: string;
};

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (data: string[]) => {
    const response = await orderBurgerApi(data);
    return response;
  }
);

export const burgerConstructorSlice = createSlice({
  name: 'burgerconstructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.constructorItems.bun = action.payload;
        } else {
          state.constructorItems.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => {
        const key = nanoid();
        return { payload: { ...ingredient, id: key } };
      }
    },
    removeIngredient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (item) => item.id !== action.payload.id
        );
    },
    moveUpIngredient: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index > 0) {
        const ingredients = state.constructorItems.ingredients;
        [ingredients[index - 1], ingredients[index]] = [
          ingredients[index],
          ingredients[index - 1]
        ];
      }
    },
    moveDownIngredient: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index < state.constructorItems.ingredients.length - 1) {
        const ingredients = state.constructorItems.ingredients;
        [ingredients[index + 1], ingredients[index]] = [
          ingredients[index],
          ingredients[index + 1]
        ];
      }
    },
    clearOrder: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.error.message;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
        state.constructorItems.bun = null;
        state.constructorItems.ingredients = [];
        state.error = null;
>>>>>>> b1550ba21a3a343648788eac2ed2e78d96bbba64
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
<<<<<<< HEAD
export const { getConstructorItems, getOrderRequest, getOrderModalData, getLoading, getError } = burgerConstructorSlice.selectors;
export const { addIngredient, removeIngredient, moveUpIngredient, moveDownIngredient, clearOrder } = burgerConstructorSlice.actions;
export const { reducer: burgerConstructorReducer } = burgerConstructorSlice;
=======
export const {
  getConstructorItems,
  getOrderRequest,
  getOrderModalData,
  getLoading,
  getError
} = burgerConstructorSlice.selectors;

export const {
  addIngredient,
  removeIngredient,
  moveUpIngredient,
  moveDownIngredient,
  clearOrder
} = burgerConstructorSlice.actions;
>>>>>>> b1550ba21a3a343648788eac2ed2e78d96bbba64
