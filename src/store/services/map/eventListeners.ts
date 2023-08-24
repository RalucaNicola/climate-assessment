import * as reactiveUtils from "@arcgis/core/core/reactiveUtils";
import { setMapCenterToHashParams } from "../../../utils/URLHashParams";
import { AppDispatch } from "../../storeConfiguration";
import { getClimateDetails } from "./climateLayer";
import MapView from "@arcgis/core/views/MapView";
import { setPopupVisibility } from "../popup/popupInfo";

const listeners: IHandle[] = [];

export const initializeViewEventListeners = (view: MapView) => (dispatch: AppDispatch) => {
    if (view) {
        const listener = reactiveUtils.when(
            () => view.stationary,
            () => {
                const lon = +view.center.longitude.toFixed(3);
                const lat = +view.center.latitude.toFixed(3);
                const zoom = view.zoom;
                setMapCenterToHashParams({ lon, lat }, zoom);
            }
        );

        listeners.push(listener);
        const listenerClick = view.on('click', async (event) => {
            const mapPoint = view.toMap(event);
            const results = await getClimateDetails(mapPoint);
            console.log(results);
            dispatch(setPopupVisibility({ visible: true }));
        });

        listeners.push(listenerClick);
    }
}

export const removeEventListeners = () => {
    listeners.forEach(listener => listener.remove());
}

