import { configureStore } from '@reduxjs/toolkit';

import registerSlice from './slices/user/RegisterSlice';
import loginSlice from './slices/user/LoginSlice';
import getCategoriesSlice from './slices/category/GetCategoriesSlice';
import getProductsByCategoryIdSlice from './slices/product/GetProductsByCategoryIdSlice';
import getProductDetailSlice from './slices/product/GetProductDetailSlice';

export const store = configureStore({
  reducer: {
    registerReducer: registerSlice.reducer,
    loginReducer: loginSlice.reducer,
    getCategoriesReducer: getCategoriesSlice.reducer,
    getProductsByCategoryIdReducer: getProductsByCategoryIdSlice.reducer,
    getProductDetailReducer: getProductDetailSlice.reducer
  },
});



