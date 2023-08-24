import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PopupInfo {
    visible?: boolean;
}

const initialState = {
    visible: false
};

const popupInfoSlice = createSlice({
    name: 'popupInfo',
    initialState,
    reducers: {
        setPopupVisibility(state, param: PayloadAction<PopupInfo>) {
            state.visible = param.payload.visible;
        }
    }
});

export const { setPopupVisibility } = popupInfoSlice.actions;
export default popupInfoSlice.reducer;
