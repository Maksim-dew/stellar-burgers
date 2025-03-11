import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { getIngredientsApi } from '../../../utils/burger-api';

export type TStateIngredients = {
  ingredients: TIngredient[];
  loading: boolean;
  error: string | null | undefined;
};

const defaultState: TStateIngredients = {
  ingredients: [],
  loading: false,
  error: null
};

export const getIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async () => {
    return await getIngredientsApi();
  }
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState: defaultState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        Object.assign(state, { loading: true, error: null });
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Неизвестная ошибка';
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = [...action.payload];
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
