import Color from "@arcgis/core/Color";
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
