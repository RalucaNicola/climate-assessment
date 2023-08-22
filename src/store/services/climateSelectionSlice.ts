import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ClimateSelection {
  selectedVariable?: string | null;
  selectedScenarioValue?: number | null;
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
    },
    setSelectedScenarioValue(state, param: PayloadAction<ClimateSelection>) {
      state.selectedScenarioValue = param.payload.selectedScenarioValue;
    }
  }
});

export const { setSelectedVariable, setSelectedScenarioValue } = climateSelectionSlice.actions;
export default climateSelectionSlice.reducer;
