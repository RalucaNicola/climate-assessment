import * as styles from './DemographicPanel.module.css';
import { CalciteIcon, CalciteLoader } from '@esri/calcite-components-react';
import '@esri/calcite-components/dist/components/calcite-icon';
import '@esri/calcite-components/dist/components/calcite-loader';
import { DemographicDataKeys } from '../../types/types';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/storeConfiguration';

type DemographicPanelProps = {
  demographicData: DemographicDataKeys;
};

const DemographicPanel = ({ demographicData }: DemographicPanelProps) => {
  const loadingDemographicData = useSelector((state: RootState) => state.popupInfo.loadingDemographicData);
  const { temperature, population, carbon } = demographicData;
  const renderData = (data: string) => {
    if (loadingDemographicData) {
      return <CalciteLoader label='Loading demographic data' scale='s'></CalciteLoader>;
    }
    return <>{data}</>;
  };
  return (
    <div className={styles.demographicContainer}>
      <div className={styles.demographicTile}>
        <div className={styles.value}>{renderData(`${population}`)}</div>
        <CalciteIcon icon='person' scale='m'></CalciteIcon>
        <header className={styles.demographicHeader}>Population</header>
      </div>
      <div className={styles.demographicTile}>
        <p className={styles.value}>{renderData(`${temperature}°C`)}</p>
        <CalciteIcon icon='brightness' scale='m'></CalciteIcon>
        <header className={styles.demographicHeader}>Max temperature</header>
      </div>
      <div className={styles.demographicTile}>
        <p className={styles.value}>{renderData(`${carbon}`)}</p>
        <CalciteIcon scale='m'></CalciteIcon>
        <header className={styles.demographicHeader}>Carbon</header>
      </div>
    </div>
  );
};

export default DemographicPanel;
