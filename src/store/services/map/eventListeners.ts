import * as reactiveUtils from "@arcgis/core/core/reactiveUtils";
import { setMapCenterToHashParams } from "../../../utils/URLHashParams";
import { AppDispatch } from "../../storeConfiguration";
import { getClimateDetails } from "./climateLayer";
import MapView from "@arcgis/core/views/MapView";
import { setDemographicData, setMapPoint } from "../popup/popupInfo";
import { processChartData } from "../chart/chartData";
import { getDemographicDetails } from "./demographicsLayer";
import { DemographicData } from "../../../types/types";

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
            const { longitude, latitude, x, y, spatialReference } = mapPoint
            dispatch(setMapPoint({ mapPoint: { longitude, latitude, x, y, spatialReference: { wkid: spatialReference.wkid } } }));
            try {
                const climateValues = await getClimateDetails(mapPoint);
                dispatch(processChartData(climateValues));
            } catch (error) {
                console.log(error);
            }

            try {
                const results = await getDemographicDetails(mapPoint) as DemographicData;
                if (results) {
                    const { MaxTemperatureC: temperature, Population: population, Carbon: carbon } = results;
                    dispatch(setDemographicData({ demographicData: { temperature, population, carbon } }))
                }
            } catch (error) { console.log(error) };

        });

        listeners.push(listenerClick);
    }
}

export const removeEventListeners = () => {
    listeners.forEach(listener => listener.remove());
}

