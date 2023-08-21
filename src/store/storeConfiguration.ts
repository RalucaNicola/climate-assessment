import { combineReducers, configureStore, createListenerMiddleware } from '@reduxjs/toolkit';
import loadingReducer from './services/app-loading/loadingSlice';
import errorReducer from './services/error-messaging/errorSlice';
import modalOptionsReducer from './services/modal-options/modalSlice';
import climateSelectionReducer, { setSelectedVariable } from './services/climateSelectionSlice';

const rootReducer = combineReducers({
  error: errorReducer,
  loading: loadingReducer,
  infoModal: modalOptionsReducer,
  climateSelection: climateSelectionReducer
});

export const listenerMiddleware = createListenerMiddleware();



export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(listenerMiddleware.middleware)
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
