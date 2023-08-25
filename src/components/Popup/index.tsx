import { CalciteAction } from '@esri/calcite-components-react';
import * as styles from './Popup.module.css';
import { motion } from 'framer-motion';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/storeConfiguration';
import { setPopupVisibility } from '../../store/services/popup/popupInfo';
import ClimateChart from '../ClimateChart';
import Section from '../Section';
import { variables } from '../../store/services/map/climateLayer';
import DemographicPanel from '../DemographicPanel';

const Popup = () => {
  const dispatch = useAppDispatch();
  const isOpen = useSelector((state: RootState) => state.popupInfo.visible);
  const selectedVariable = useSelector((state: RootState) => state.climateSelection.selectedVariable);
  const selectedVariableInfo = variables ? variables.find((variable) => variable.name === selectedVariable) : null;
  const demographicData = useSelector((state: RootState) => state.popupInfo.demographicData);
  return (
    <motion.div
      initial={false}
      className={styles.container}
      style={{ pointerEvents: isOpen ? 'all' : 'none' }}
      animate={isOpen ? 'visible' : 'hidden'}
      variants={{
        visible: {
          clipPath: 'inset(0% 0% 0% 0%)',
          transition: {
            type: 'spring',
            bounce: 0,
            duration: 0.4,
            delayChildren: 0.3,
            staggerChildren: 0.05
          }
        },
        hidden: {
          clipPath: 'inset(0% 100% 100% 0%)',
          transition: {
            type: 'spring',
            bounce: 0,
            duration: 0.2
          }
        }
      }}
    >
      <div className={styles.header}>
        <h1>Popup</h1>
        <div className={styles.close}>
          <CalciteAction
            appearance='transparent'
            icon='x'
            onClick={() => {
              dispatch(setPopupVisibility({ visible: false }));
            }}
            scale='m'
            text={'Close modal window'}
          ></CalciteAction>
        </div>
      </div>
      <div className={styles.content}>
        {demographicData ? (
          <Section title='Demographic data'>
            <DemographicPanel demographicData={demographicData}></DemographicPanel>
          </Section>
        ) : (
          <></>
        )}

        {selectedVariableInfo ? (
          <>
            <Section title={selectedVariableInfo.description}></Section>
            <div className={styles.chartContainer}>
              <ClimateChart></ClimateChart>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </motion.div>
  );
};

export default Popup;
