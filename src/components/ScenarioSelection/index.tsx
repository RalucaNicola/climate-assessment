import * as styles from "./ScenarioSelection.module.css";
import { CalciteRadioButtonGroup, CalciteLabel, CalciteRadioButton } from '@esri/calcite-components-react';
import '@esri/calcite-components/dist/components/calcite-radio-button-group';
import '@esri/calcite-components/dist/components/calcite-radio-button';
import '@esri/calcite-components/dist/components/calcite-label';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { RootState } from '../../store/storeConfiguration';
import { useSelector } from 'react-redux';
import { setSelectedScenarioValue } from '../../store/services/climateSelectionSlice';
import { layerConfig } from '../../config';

const ScenarioSelection = () => {
  const dispatch = useAppDispatch();
  const selectedScenarioValue = useSelector((state: RootState) => state.climateSelection.selectedScenarioValue);
  const scenarioValues = layerConfig.dimensions.scenario.values;
  return (
    <>
      <CalciteRadioButtonGroup scale={'s'} name="scenario">
        {scenarioValues.map((scenarioValue, index) =>
          <div key={index} className={styles.scenarioSelectionItem}>
            <CalciteLabel layout="inline" style={{ cursor: "pointer" }}>
              <CalciteRadioButton
                checked={selectedScenarioValue === scenarioValue.value ? true : null}
                value={scenarioValue.value}
                onCalciteRadioButtonChange={(event) => {
                  dispatch(setSelectedScenarioValue({ selectedScenarioValue: event.target.value }));
                }}
              />
              {scenarioValue.name}
            </CalciteLabel>
            <p>{scenarioValue.description}</p>
          </div>

        )
        }
      </CalciteRadioButtonGroup>

    </>
  );
};

export default ScenarioSelection;
