import * as styles from './DemographicPanel.module.css';
import { CalciteIcon } from '@esri/calcite-components-react';
import '@esri/calcite-components/dist/components/calcite-icon';

const DemographicPanel = () => {
  return (
    <div className={styles.demographicContainer}>
      <div className={styles.demographicTile}>
        <p className={styles.value}>3891</p>
        <CalciteIcon icon='person' scale='m'></CalciteIcon>
        <header className={styles.demographicHeader}>Population</header>
      </div>
    </div>
  );
};

export default DemographicPanel;
