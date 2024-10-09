import { configureStore } from '@reduxjs/toolkit';
<<<<<<< HEAD
=======

>>>>>>> 7837fcc238be675b0eae11776801ea2e4c180f5c
export const store = configureStore({
  reducer: {
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
<<<<<<< HEAD
export type AppDispatch = typeof store.dispatch;
=======
export type AppDispatch = typeof store.dispatch;
>>>>>>> 7837fcc238be675b0eae11776801ea2e4c180f5c
