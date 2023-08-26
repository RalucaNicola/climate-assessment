import { CalciteAction } from '@esri/calcite-components-react';
import * as styles from './Popup.module.css';
import { motion } from 'framer-motion';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/storeConfiguration';
import { setMapPoint } from '../../store/services/popup/popupInfo';
import ClimateChart from '../ClimateChart';
import Section from '../Section';
import { variables } from '../../store/services/map/climateLayer';
import DemographicPanel from '../DemographicPanel';
import { roundNumber } from '../../utils/utilities';
import { Point } from '@arcgis/core/geometry';

const getHeaderForMapPoint = (mapPoint: Point): string => {
  const hemisphereStringLng =
    mapPoint.longitude < 0 ? `${roundNumber(-mapPoint.longitude, 2)}°E` : `${roundNumber(mapPoint.longitude, 2)}°W`;
  const hemisphereStringLat =
    mapPoint.latitude < 0 ? `${roundNumber(-mapPoint.latitude, 2)}°S` : `${roundNumber(mapPoint.latitude, 2)}°N`;
  return `Estimations for ${hemisphereStringLng}, ${hemisphereStringLat}`;
};

const Popup = () => {
  const dispatch = useAppDispatch();
  const mapPoint = useSelector((state: RootState) => state.popupInfo.mapPoint);
  const isOpen = mapPoint ? true : false;
  const selectedVariable = useSelector((state: RootState) => state.climateSelection.selectedVariable);
  const selectedVariableInfo = variables ? variables.find((variable) => variable.name === selectedVariable) : null;
  const demographicData = useSelector((state: RootState) => state.popupInfo.demographicData);
  const chartData = useSelector((state: RootState) => state.chartData.data);
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
        {mapPoint ? <h1>{getHeaderForMapPoint(mapPoint)}</h1> : <></>}
        <div className={styles.close}>
          <CalciteAction
            appearance='transparent'
            icon='x'
            onClick={() => {
              dispatch(setMapPoint({ mapPoint: null }));
            }}
            scale='m'
            text={'Close modal window'}
          ></CalciteAction>
        </div>
      </div>
      <div className={styles.content}>
        <Section title='Demographic data'>
          {demographicData ? (
            <DemographicPanel demographicData={demographicData}></DemographicPanel>
          ) : (
            <div>No demographic data for this location</div>
          )}
        </Section>

        {selectedVariableInfo ? (
          <>
            <Section title={selectedVariableInfo.description}></Section>
            {chartData ? (
              <div className={styles.chartContainer}>
                <ClimateChart data={chartData}></ClimateChart>
              </div>
            ) : (
              <div>No climate data to display for this location</div>
            )}
          </>
        ) : (
          <></>
        )}
      </div>
    </motion.div>
  );
};

export default Popup;
