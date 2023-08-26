import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DemographicDataKeys } from '../../../types/types';
import { Point } from '@arcgis/core/geometry';

export interface PopupInfo {
    demographicData?: DemographicDataKeys;
    loadingDemographicData?: boolean;
    mapPoint?: Point;
}

const initialState = {
    demographicData: null,
    loadingDemographicData: false,
    mapPoint: null
} as PopupInfo;

const popupInfoSlice = createSlice({
    name: 'popupInfo',
    initialState,
    reducers: {
        setDemographicData(state, param: PayloadAction<PopupInfo>) {
            state.demographicData = param.payload.demographicData;
        },
        setMapPoint(state, param: PayloadAction<PopupInfo>) {
            state.mapPoint = param.payload.mapPoint;
        },
        setLoadingDemographicData(state, param: PayloadAction<boolean>) {
            state.loadingDemographicData = param.payload;
        }
    }
});

export const { setDemographicData, setMapPoint, setLoadingDemographicData } = popupInfoSlice.actions;
export default popupInfoSlice.reducer;
