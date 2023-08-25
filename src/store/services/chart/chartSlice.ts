import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChartDataItem } from '../../../types/types';

export interface ChartData {
    data: ChartDataItem[]
}

const initialState = {
    data: []
} as ChartData

const chartSlice = createSlice({
    name: 'chart',
    initialState,
    reducers: {
        setChartData(state, param: PayloadAction<ChartDataItem[]>) {
            state.data = param.payload;
        }
    }
});

export const { setChartData } = chartSlice.actions;
export default chartSlice.reducer;
