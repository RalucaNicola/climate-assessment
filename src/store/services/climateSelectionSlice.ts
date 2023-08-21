import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ClimateSelection {
  selectedVariable?: string | null;
  selectedScenarioValue?: string | null;
}

const initialState = {
  selectedVariable: null,
  selectedScenarioValue: null
} as ClimateSelection | null;

const climateSelectionSlice = createSlice({
  name: 'climateSelection',
  initialState,
  reducers: {
    setSelectedVariable(state, param: PayloadAction<ClimateSelection>) {
      state.selectedVariable = param.payload.selectedVariable;
    }
  }
});

export const { setSelectedVariable } = climateSelectionSlice.actions;
export default climateSelectionSlice.reducer;
