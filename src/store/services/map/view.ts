import PortalItem from '@arcgis/core/portal/PortalItem';
import WebMap from '@arcgis/core/WebMap';
import { mapConfig } from '../../../config';
import MapView from '@arcgis/core/views/MapView';
import { AppDispatch } from '../../storeConfiguration';
import { setViewLoaded } from '../app-loading/loadingSlice';
import { getMapCenterFromHashParams } from '../../../utils/URLHashParams';
import { setError } from '../error-messaging/errorSlice';
import { initializeViewEventListeners } from './eventListeners';
import { initializeClimateLayer } from './climateLayer';

let view: MapView = null;

export function getGlobalView() {
    return view;
}

export function destroyView() {
    if (view) {
        view.destroy();
        view = null;
    }
}

export const initializeMapView = (divRef: HTMLDivElement) => async (dispatch: AppDispatch) => {

    try {
        const portalItem = new PortalItem({
            id: mapConfig['web-map-id']
        });

        await portalItem.load();
        const webmap = new WebMap({
            portalItem: portalItem
        });
        await webmap.load();
        const mapView = new MapView({
            container: divRef,
            map: webmap,
            padding: {
                top: 50,
                bottom: 0
            },
            ui: {
                components: []
            },
            constraints: {
                minZoom: 1
            },
            popup: {
                dockEnabled: true,
                dockOptions: {
                    buttonEnabled: false,
                    breakpoint: false
                },
                highlightEnabled: false,
                defaultPopupTemplateEnabled: false,
                autoOpenEnabled: false
            }
        });

        await mapView.when(() => {
            view = mapView;
            dispatch(setViewLoaded(true));
            const mapCenter = getMapCenterFromHashParams();
            if (mapCenter) {
                mapView.goTo({ zoom: mapCenter.zoom, center: [mapCenter.center.lon, mapCenter.center.lat] });
            }
            dispatch(initializeClimateLayer(mapView));
            dispatch(initializeViewEventListeners(mapView));
            //@ts-ignore
            window.view = mapView;
        });
    } catch (error) {
        const { message } = error;
        dispatch(setError({ name: 'Error on map', message: message }));
    }
};