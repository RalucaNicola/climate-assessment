import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChartDataItem } from '../../../types/types';

interface ChartData {
    data: ChartDataItem[]
}

const initialState = {
    data: null
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
