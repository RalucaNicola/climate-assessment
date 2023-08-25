import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DemographicDataKeys } from '../../../types/types';

export interface PopupInfo {
    visible?: boolean;
    demographicData?: DemographicDataKeys
}

const initialState = {
    visible: false,
    demographicData: null
} as PopupInfo;

const popupInfoSlice = createSlice({
    name: 'popupInfo',
    initialState,
    reducers: {
        setPopupVisibility(state, param: PayloadAction<PopupInfo>) {
            state.visible = param.payload.visible;
        },
        setDemographicData(state, param: PayloadAction<PopupInfo>) {
            state.demographicData = param.payload.demographicData;
        }
    }
});

export const { setPopupVisibility, setDemographicData } = popupInfoSlice.actions;
export default popupInfoSlice.reducer;
