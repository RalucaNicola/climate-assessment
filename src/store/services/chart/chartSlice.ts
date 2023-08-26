import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChartDataItem } from '../../../types/types';

interface ChartData {
    data: ChartDataItem[];
    loading: boolean;
}

const initialState = {
    data: null,
    loading: false
} as ChartData

const chartSlice = createSlice({
    name: 'chart',
    initialState,
    reducers: {
        setChartData(state, param: PayloadAction<ChartDataItem[]>) {
            state.data = param.payload;
        },
        setLoadingChartData(state, param: PayloadAction<boolean>) {
            state.loading = param.payload;
        }
    }
});

export const { setChartData, setLoadingChartData } = chartSlice.actions;
export default chartSlice.reducer;
