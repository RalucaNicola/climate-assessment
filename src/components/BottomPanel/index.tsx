import * as styles from './BottomPanel.module.css';
import '@esri/calcite-components/dist/components/calcite-action';
import { CalciteAction } from '@esri/calcite-components-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { setInfoModalOptions } from '../../store/services/modal-options/modalSlice';
import { RootState } from '../../store/storeConfiguration';
import { useSelector } from 'react-redux';
import IndicatorSelection from '../IndicatorSelection';
import Section from '../Section';
import { applicationTitle } from '../../config';
import ScenarioSelection from '../ScenarioSelection';
import PeriodSelection from '../PeriodSelection';

const BottomPanel = () => {
  const [visible, setVisible] = useState(true);
  const dispatch = useAppDispatch();
  const climateLayerLoaded = useSelector((state: RootState) => state.loading.climateLayerLoaded);

  const togglePanel = () => {
    setVisible(!visible);
  };

  const getHeader = () => {
    return (
      <div className={styles.actionsContainer}>
        <div className={styles.leftActionsContainer}>
          <button
            className={styles.applicationTitle}
            onClick={() => {
              window.location.href = window.location.pathname;
            }}
          >
            {applicationTitle}
          </button>
        </div>
        <div className={styles.rightActionsContainer}>
          <CalciteAction
            icon='information-f'
            scale='s'
            appearance='transparent'
            text=''
            onClick={() => dispatch(setInfoModalOptions({ visible: true }))}
          ></CalciteAction>
          <CalciteAction
            icon={visible ? 'chevronDown' : 'chevronUp'}
            scale='s'
            appearance='transparent'
            onClick={togglePanel}
            text=''
          ></CalciteAction>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      {getHeader()}
      <motion.div
        layout='size'
        animate={{
          height: visible ? 'min(300px, 30vh)' : 0
        }}
        style={{ overflow: 'auto' }}
      >
        {climateLayerLoaded ? (
          <div className={styles.climateContainer}>
            <div style={{ gridArea: 'indicator' }}>
              <Section title='indicator'>
                <IndicatorSelection />
              </Section>
            </div>
            <div style={{ gridArea: 'period' }}>
              <Section title='period'>
                <PeriodSelection />
              </Section>
            </div>
            <div style={{ gridArea: 'scenario' }}>
              <Section title='scenario'>
                <ScenarioSelection />
              </Section>
            </div>
          </div>
        ) : (
          <></>
        )}
      </motion.div>
    </div>
  );
};

export default BottomPanel;
