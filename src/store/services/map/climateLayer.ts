import MapView from "@arcgis/core/views/MapView";
import { AppDispatch, listenerMiddleware } from "../../storeConfiguration";
import { setClimateLayerLoaded } from "../app-loading/loadingSlice";
import ImageryTileLayer from "@arcgis/core/layers/ImageryTileLayer";
import { layerConfig } from "../../../config";
import { Variable } from "../../../types/types";
import { ClimateSelection, setSelectedVariable } from "../climateSelectionSlice";
import { RasterStretchRenderer } from "@arcgis/core/rasterRenderers";
import MultipartColorRamp from "@arcgis/core/rest/support/MultipartColorRamp";
import Color from "@arcgis/core/Color";


export let climateLayer: ImageryTileLayer | null = null;
export let variables: Variable[] = [];
export let colorRamp: Color[] = [];

export const initializeClimateLayer = (view: MapView) => async (dispatch: AppDispatch) => {

    // get climate layer
    climateLayer = view.map.allLayers.find(layer => layer.title === layerConfig.title) as ImageryTileLayer;
    await climateLayer.load();

    // get variable information
    variables = climateLayer.rasterInfo.multidimensionalInfo.variables.map(variable => {
        const { name, description, statistics, unit } = variable;
        return {
            name,
            description,
            min: statistics[0].min,
            max: statistics[0].max,
            unit
        }
    });
    dispatch(setClimateLayerLoaded(true));

    // get selected variable
    const selectedVariable = climateLayer.multidimensionalDefinition[0].variableName;
    dispatch(setSelectedVariable({ selectedVariable }));

    // get color stops for the legend
    const { colorRamps } = (climateLayer.renderer as RasterStretchRenderer).colorRamp as MultipartColorRamp;
    colorRamps.forEach((ramp, index) => {
        colorRamp.push(ramp.fromColor);
        if (index === colorRamps.length - 1) {
            colorRamp.push(ramp.toColor);
        }
    });

    // update renderer when selected variable changes
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
