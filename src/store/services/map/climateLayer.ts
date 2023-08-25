import MapView from "@arcgis/core/views/MapView";
import { AppDispatch, listenerMiddleware, store } from "../../storeConfiguration";
import { setClimateLayerLoaded } from "../app-loading/loadingSlice";
import ImageryTileLayer from "@arcgis/core/layers/ImageryTileLayer";
import { layerConfig } from "../../../config";
import { RasterSliceValue, Variable } from "../../../types/types";
import { ClimateSelection, setSelectedPeriod, setSelectedScenarioValue, setSelectedVariable } from "../climateSelectionSlice";
import { RasterStretchRenderer } from "@arcgis/core/rasterRenderers";
import MultipartColorRamp from "@arcgis/core/rest/support/MultipartColorRamp";
import Color from "@arcgis/core/Color";
import { Point } from "@arcgis/core/geometry";
import { PayloadAction, UnsubscribeListener } from "@reduxjs/toolkit";

export let climateLayer: ImageryTileLayer | null;
export let variables: Variable[];
export let colorRamp: Color[];
let unsubscribeListeners: UnsubscribeListener[];

export const initializeClimateLayer = (view: MapView) => async (dispatch: AppDispatch) => {
    colorRamp = [];
    variables = [];
    climateLayer = null;
    unsubscribeListeners = [];
    dispatch(setClimateLayerLoaded(false));

    // get climate layer
    climateLayer = view.map.allLayers.find(layer => layer.title === layerConfig.title) as ImageryTileLayer;
    await climateLayer.load();

    // get variables information
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
    const updateRenderer = (action: PayloadAction<ClimateSelection>) => {
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
    };

    const variableListener = { actionCreator: setSelectedVariable, effect: updateRenderer };
    unsubscribeListeners.push(listenerMiddleware.startListening(variableListener));

    // get value for scenario
    const scenarioDefinition = climateLayer.multidimensionalDefinition.find(def => def.dimensionName === layerConfig.dimensions.scenario.name);
    dispatch(setSelectedScenarioValue({ selectedScenarioValue: scenarioDefinition.values[0] }));

    const updateScenario = (action: PayloadAction<ClimateSelection>) => {
        const { selectedScenarioValue } = action.payload as ClimateSelection;
        const multidimensionalDefinition = climateLayer.multidimensionalDefinition.map((def) => {
            if (def.dimensionName === layerConfig.dimensions.scenario.name) {
                def.values = [selectedScenarioValue];
            }
            return def;
        });
        climateLayer.multidimensionalDefinition = multidimensionalDefinition;
    };

    const scenarioListener = { actionCreator: setSelectedScenarioValue, effect: updateScenario }
    unsubscribeListeners.push(listenerMiddleware.startListening(scenarioListener));

    // get value for period
    const periodDefinition = climateLayer.multidimensionalDefinition.find(def => def.dimensionName === layerConfig.dimensions.period.name);
    dispatch(setSelectedPeriod({ selectedPeriod: periodDefinition.values[0] }));

    const changePeriod = (action: PayloadAction<ClimateSelection>) => {
        const { selectedPeriod } = action.payload as ClimateSelection;
        const multidimensionalDefinition = climateLayer.multidimensionalDefinition.map((def) => {
            if (def.dimensionName === layerConfig.dimensions.period.name) {
                def.values = [selectedPeriod];
            }
            return def;
        });
        climateLayer.multidimensionalDefinition = multidimensionalDefinition;
    };

    const periodListener = {
        actionCreator: setSelectedPeriod, effect: changePeriod
    };
    unsubscribeListeners.push(listenerMiddleware.startListening(periodListener));

}

export const removeClimateLayerListeners = () => {
    unsubscribeListeners.forEach(unsubscribe => {
        unsubscribe({ cancelActive: true });
    });
}

export const getClimateDetails = (mapPoint: Point): Promise<Array<RasterSliceValue | null>> => {
    const state = store.getState();
    const currentVariable = state.climateSelection.selectedVariable;
    return new Promise((resolve, reject) => {
        climateLayer
            .identify(mapPoint, { transposedVariableName: currentVariable })
            .then(({ dataSeries }) => {
                const climateValues: Array<RasterSliceValue | null> = dataSeries || [null];
                resolve(climateValues);
            })
            .catch(reject);
    });
}