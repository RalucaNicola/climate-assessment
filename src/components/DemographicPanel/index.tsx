import * as styles from './DemographicPanel.module.css';
import { CalciteIcon } from '@esri/calcite-components-react';
import '@esri/calcite-components/dist/components/calcite-icon';
import { DemographicDataKeys } from '../../types/types';

type DemographicPanelProps = {
  demographicData: DemographicDataKeys;
};

const DemographicPanel = ({ demographicData }: DemographicPanelProps) => {
  const { temperature, population, carbon } = demographicData;
  return (
    <div className={styles.demographicContainer}>
      <div className={styles.demographicTile}>
        <p className={styles.value}>{population}</p>
        <CalciteIcon icon='person' scale='m'></CalciteIcon>
        <header className={styles.demographicHeader}>Population</header>
      </div>
      <div className={styles.demographicTile}>
        <p className={styles.value}>{temperature}°C</p>
        <CalciteIcon icon='brightness' scale='m'></CalciteIcon>
        <header className={styles.demographicHeader}>Max temperature</header>
      </div>
      <div className={styles.demographicTile}>
        <p className={styles.value}>{carbon}</p>
        <CalciteIcon scale='m'></CalciteIcon>
        <header className={styles.demographicHeader}>Carbon</header>
      </div>
    </div>
  );
};

export default DemographicPanel;
