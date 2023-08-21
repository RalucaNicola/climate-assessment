import { combineReducers, configureStore } from '@reduxjs/toolkit';
import loadingReducer from './services/app-loading/loadingSlice';
import errorReducer from './services/error-messaging/errorSlice';
import modalOptionsReducer from './services/modal-options/modalSlice';

const rootReducer = combineReducers({
  error: errorReducer,
  loading: loadingReducer,
  infoModal: modalOptionsReducer
});

export const store = configureStore({
  reducer: rootReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
