import * as styles from "./PeriodSelection.module.css";
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { RootState } from '../../store/storeConfiguration';
import { useSelector } from 'react-redux';
import { setSelectedPeriod } from '../../store/services/climateSelectionSlice';
import { layerConfig } from '../../config';
import { CalciteButton } from "@esri/calcite-components-react";

import '@esri/calcite-components/dist/components/calcite-button';

const PeriodSelection = () => {
  const dispatch = useAppDispatch();
  const selectedPeriod = useSelector((state: RootState) => state.climateSelection.selectedPeriod);
  const periods = layerConfig.dimensions.period.values;
  return (
    <div className={styles.container}>
      {periods.map((period, index) =>
        <CalciteButton
          key={index}
          data-value={period.value}
          appearance={selectedPeriod === period.value ? `solid` : "outline"}
          onClick={(evt) => {
            const value = parseInt((evt.currentTarget.getAttribute('data-value')));
            dispatch(setSelectedPeriod({ selectedPeriod: value }));
          }}>
          <span className={styles.periodName}>{period.name}</span>
          <span className={styles.periodYears}>{period.years}</span>
        </CalciteButton>)
      }

    </div>
  );
};

export default PeriodSelection;
