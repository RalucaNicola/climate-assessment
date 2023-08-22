import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ClimateSelection {
  selectedVariable?: string | null;
  selectedScenarioValue?: number | null;
  selectedPeriod?: number | null;
}

const initialState = {
  selectedVariable: null,
  selectedScenarioValue: null,
  selectedPeriod: null
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
    },
    setSelectedPeriod(state, param: PayloadAction<ClimateSelection>) {
      state.selectedPeriod = param.payload.selectedPeriod;
    }
  }
});

export const { setSelectedVariable, setSelectedScenarioValue, setSelectedPeriod } = climateSelectionSlice.actions;
export default climateSelectionSlice.reducer;
