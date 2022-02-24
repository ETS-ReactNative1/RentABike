import { configureStore } from '@reduxjs/toolkit';
import user from './slices/user';
import rent from './slices/rent';

export const store = configureStore({
  reducer: { user, rent },
});
