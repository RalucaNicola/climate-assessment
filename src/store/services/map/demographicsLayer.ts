import MapView from "@arcgis/core/views/MapView";
import { dmgLayerConfig } from "../../../config";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import { AppDispatch } from "../../storeConfiguration";
import { Point } from "framer-motion";

let dmgLayer: FeatureLayer | null = null;

export const initializeDemographicsLayer = (view: MapView) => {
    dmgLayer = view.map.allLayers.find(layer => layer.title === dmgLayerConfig.title) as FeatureLayer;
}

export const getDemographicDetails = (mapPoint: Point) => {
    return new Promise((resolve, reject) => {

        const locationQuery = dmgLayer.createQuery();
        locationQuery.set({
            geometry: mapPoint,
            outFields: ["MaxTemperatureC", "Population", "Carbon"],
            returnGeometry: false
        });
        dmgLayer.queryFeatures(locationQuery).then((locationFS) => {
            const [feature] = locationFS.features;
            resolve(feature?.attributes || null);
        }).catch(reject);

    });

}