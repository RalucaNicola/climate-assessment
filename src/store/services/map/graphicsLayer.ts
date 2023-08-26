import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import { getGlobalView } from "./view";
import { PayloadAction, UnsubscribeListener } from "@reduxjs/toolkit";
import { PopupInfo, setMapPoint } from "../popup/popupInfo";
import Graphic from "@arcgis/core/Graphic";
import { SimpleMarkerSymbol } from "@arcgis/core/symbols";
import { listenerMiddleware } from "../../storeConfiguration";
import { Point } from "@arcgis/core/geometry";

const symbol = new SimpleMarkerSymbol({
    color: [255, 255, 255, 0.25],
    size: 12,
    style: "circle",
    outline: {
        width: 1,
        color: [255, 255, 255, 1]
    }
});

let graphicsLayer: GraphicsLayer | null = null;
let unsubscribeListeners: UnsubscribeListener[];

export const initializeGraphicsLayer = () => {
    unsubscribeListeners = [];
    const view = getGlobalView();
    graphicsLayer = new GraphicsLayer({ effect: "drop-shadow(1px, 1px, 2px)" });
    view.map.layers.add(graphicsLayer);

    const updateMapPointGraphic = (action: PayloadAction<PopupInfo>) => {
        const { mapPoint } = action.payload as PopupInfo;
        // logic for creating graphic
        graphicsLayer.removeAll();
        if (mapPoint) {
            const graphic = new Graphic({
                geometry: new Point(mapPoint),
                symbol
            });
            graphicsLayer.add(graphic);
        }

    };

    const mapPointListener = { actionCreator: setMapPoint, effect: updateMapPointGraphic }
    unsubscribeListeners.push(listenerMiddleware.startListening(mapPointListener));
}

export const removeGraphicsLayer = () => {
    unsubscribeListeners.forEach(unsubscribe => {
        unsubscribe({ cancelActive: true });
    });
    const view = getGlobalView();
    view.map.layers.remove(graphicsLayer);
    graphicsLayer = null;
}