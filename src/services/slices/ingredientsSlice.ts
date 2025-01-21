import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '../../utils/burger-api'; // Ваш API-запрос
import { TIngredient } from '../../utils/types';

import { RootState } from 'src/services/store';

interface IngredientsState {
  ingredients: TIngredient[];
  isLoading: boolean;
}

const initialState: IngredientsState = {
  ingredients: [],
  isLoading: true
};

export const fetchIngredients = createAsyncThunk(
  'ingredients/getAll',
  async () => getIngredientsApi()
);

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    selectIngredients: (state) => state.ingredients,
    selectIngredientsLoading: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder.addCase(fetchIngredients.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchIngredients.fulfilled, (state, action) => {
      state.isLoading = false;
      state.ingredients = action.payload;
    });
  }
});

export const { selectIngredients, selectIngredientsLoading } =
  ingredientsSlice.selectors;

export const ingredientsReducer = ingredientsSlice.reducer;

//НЕ ФАКТ ЧТО НАДО
export const getIngredients = (state: RootState) => state.ingredients;
