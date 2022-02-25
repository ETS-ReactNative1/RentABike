import { configureStore } from '@reduxjs/toolkit';
import user from './slices/user';
import rent from './slices/rent';
import bike from './slices/bike';

export const store = configureStore({
  reducer: { user, rent, bike },
});
