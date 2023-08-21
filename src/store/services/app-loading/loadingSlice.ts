import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AppLoadingStatus {
  viewLoaded?: boolean;
  climateLayerLoaded?: boolean;
}

const initialState = {
  viewLoaded: false,
  climateLayerLoaded: false
} as AppLoadingStatus;

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setViewLoaded(state, param: PayloadAction<boolean>) {
      state.viewLoaded = param.payload;
    },
    setClimateLayerLoaded(state, param: PayloadAction<boolean>) {
      state.climateLayerLoaded = param.payload;
    }
  }
});

export const { setViewLoaded, setClimateLayerLoaded } = loadingSlice.actions;
export default loadingSlice.reducer;
