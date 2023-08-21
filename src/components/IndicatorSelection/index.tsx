
import { CalciteSelect, CalciteOption } from '@esri/calcite-components-react';
import '@esri/calcite-components/dist/components/calcite-select';
import '@esri/calcite-components/dist/components/calcite-option';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { RootState } from '../../store/storeConfiguration';
import { useSelector } from 'react-redux';
import { colorRamp, variables } from '../../store/services/map/climateLayer';
import { setSelectedVariable } from '../../store/services/climateSelectionSlice';
import ContinuousLegend from '../Legend/ContinuousLegend';

const IndicatorSelection = () => {
  const dispatch = useAppDispatch();
  const selectedVariable = useSelector((state: RootState) => state.climateSelection.selectedVariable);
  const selectedVariableInfo = variables.find(variable => variable.name === selectedVariable);
  let legendInfo = null;
  if (selectedVariableInfo) {
    const { min, max, unit } = selectedVariableInfo;
    const colorStops = colorRamp.map((color, index) => {
      return {
        color,
        position: index / (colorRamp.length - 1)
      }
    })
    legendInfo = {
      min,
      max,
      unit,
      colorStops
    }
  }
  return (
    <><CalciteSelect scale={'s'}
      label={'Select a variable'}
      onCalciteSelectChange={(event) => {
        const selectedVariable = event.target.selectedOption.value;
        dispatch(setSelectedVariable({ selectedVariable }));
      }}>
      {variables.map((variable, index) =>
        <CalciteOption
          key={index}
          selected={selectedVariable === variable.name ? true : null}
          value={variable.name}
        >
          {variable.description}
        </CalciteOption>)
      }
    </CalciteSelect>
      {legendInfo ? <ContinuousLegend legendInfo={legendInfo}></ContinuousLegend> : <></>}
    </>
  );
};

export default IndicatorSelection;
