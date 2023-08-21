import MapView from "@arcgis/core/views/MapView";
import { AppDispatch, listenerMiddleware } from "../../storeConfiguration";
import { setClimateLayerLoaded } from "../app-loading/loadingSlice";
import ImageryTileLayer from "@arcgis/core/layers/ImageryTileLayer";
import { layerConfig } from "../../../config";
import { Variable } from "../../../types/types";
import { ClimateSelection, setSelectedVariable } from "../climateSelectionSlice";
import { RasterStretchRenderer } from "@arcgis/core/rasterRenderers";


let climateLayer: ImageryTileLayer | null = null;
let variables: Variable[] = [];

export const initializeClimateLayer = (view: MapView) => async (dispatch: AppDispatch) => {
    climateLayer = view.map.allLayers.find(layer => layer.title === layerConfig.title) as ImageryTileLayer;
    await climateLayer.load();
    variables = climateLayer.rasterInfo.multidimensionalInfo.variables.map(variable => {
        const { name, description } = variable;
        return {
            name,
            description
        }
    });
    dispatch(setClimateLayerLoaded(true));
    const selectedVariable = climateLayer.multidimensionalDefinition[0].variableName;
    dispatch(setSelectedVariable({ selectedVariable }));
    listenerMiddleware.startListening({
        actionCreator: setSelectedVariable, effect: (action) => {
            const { selectedVariable } = action.payload as ClimateSelection;
            const multidimensionalDefinition = climateLayer.multidimensionalDefinition.map((def) => {
                def.variableName = selectedVariable;
                return def;
            });
            climateLayer.multidimensionalDefinition = multidimensionalDefinition;
            const variableInfo = climateLayer.rasterInfo.multidimensionalInfo.variables.filter(
                (variable) => variable.name === selectedVariable
            )[0];
            const renderer = climateLayer.renderer.clone() as RasterStretchRenderer;
            renderer.statistics = variableInfo.statistics;
            climateLayer.renderer = renderer;
        }
    })
}

export const getClimateLayer = () => {
    if (climateLayer) {
        return climateLayer;
    }
}

export const getVariables = () => {
    return variables;
}