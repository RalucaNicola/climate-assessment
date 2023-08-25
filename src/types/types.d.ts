import Color from "@arcgis/core/Color";
import DimensionalDefinition from "@arcgis/core/layers/support/DimensionalDefinition";
import { ReactNode } from "react";

type ArrayWithColumnInfo<T> = T[] & { columns?: String[] };

export interface Variable {
  name: string;
  description: string;
  min: number;
  max: number;
  unit: string;
}

export type ColorStop = {
  color: Color;
  position: number;
};

export type LegendInfo = {
  min: number;
  max: number;
  unit: string;
  colorStops?: ColorStop[];
};

export interface LegendProps {
  legendInfo: LegendInfo;
  children?: ReactNode;
}

export type RasterSliceValue = {
  value: number[],
  multidimensionalDefinition: DimensionalDefinition[]
}

export type ChartDataItem = {
  period: string,
  scenario: string,
  values: number[]
}

export type DemographicData = {
  Carbon: number;
  MaxTemperatureC: number;
  Population: number;
}

export type DemographicDataKeys = {
  carbon: number;
  temperature: number;
  population: number;
}