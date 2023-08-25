import { AppDispatch } from "../../storeConfiguration";
import { layerConfig } from "../../../config";
import { ChartDataItem, RasterSliceValue } from "../../../types/types";
import { setChartData } from "./chartSlice";
import { roundNumber } from '../../../utils/utilities';

const sortChartDataByPeriod = (data: ChartDataItem[]) => {
    const order = layerConfig.dimensions.period.values.map(value => value.name);
    return data.sort((item1, item2) => {
        return order.indexOf(item1.period) - order.indexOf(item2.period);
    })
}

export const processChartData = (dataSlices: RasterSliceValue[]) => async (dispatch: AppDispatch) => {
    let chartData: ChartDataItem[] = [];
    dataSlices.forEach(slice => {
        let scenario = null;
        let period = null;
        let value = roundNumber(slice.value[0], 2);
        const [scenarioInfo, periodInfo] = slice.multidimensionalDefinition;
        layerConfig.dimensions.period.values.forEach(periodValue => {
            if (periodValue.value === periodInfo.values[0]) {
                period = periodValue.name;
            }
        });
        if (!period) {
            return;
        }
        layerConfig.dimensions.scenario.values.forEach(scenarioValue => {
            if (scenarioValue.value === scenarioInfo.values[0]) {
                scenario = scenarioValue.name;
            }
        });
        if (scenario && period) {
            chartData.push({
                scenario,
                period,
                values: [value]
            })
        }
    });

    sortChartDataByPeriod(chartData);
    dispatch(setChartData(chartData));
}