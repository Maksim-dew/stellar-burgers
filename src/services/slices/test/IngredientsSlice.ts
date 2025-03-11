import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { getIngredientsApi } from '../../../utils/burger-api';

export type TStateIngredients = {
<<<<<<< HEAD
  ingredients: TIngredient[];
  loading: boolean;
  error: string | null | undefined;
};

const defaultState: TStateIngredients = {
=======
  ingredients: Array<TIngredient>;
  loading: boolean;
  error: null | string | undefined;
};

const initialState: TStateIngredients = {
>>>>>>> b1550ba21a3a343648788eac2ed2e78d96bbba64
  ingredients: [],
  loading: false,
  error: null
};

export const getIngredients = createAsyncThunk(
<<<<<<< HEAD
  'ingredients/fetchIngredients',
  async () => {
    return await getIngredientsApi();
=======
  'ingredients/getIngredients',
  async () => {
    const response = await getIngredientsApi();
    return response;
>>>>>>> b1550ba21a3a343648788eac2ed2e78d96bbba64
  }
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
<<<<<<< HEAD
  initialState: defaultState,
=======
  initialState,
>>>>>>> b1550ba21a3a343648788eac2ed2e78d96bbba64
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
<<<<<<< HEAD
        Object.assign(state, { loading: true, error: null });
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Неизвестная ошибка';
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = [...action.payload];
=======
        state.loading = true;
        state.error = null;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload;
>>>>>>> b1550ba21a3a343648788eac2ed2e78d96bbba64
      });
  },
  selectors: {
    getIngredientsWithSelector: (state) => state.ingredients,
    getLoadingStatus: (state) => state.loading
  }
});

export default ingredientsSlice;
export const { getIngredientsWithSelector, getLoadingStatus } =
  ingredientsSlice.selectors;
