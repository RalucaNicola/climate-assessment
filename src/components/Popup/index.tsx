import { CalciteAction } from '@esri/calcite-components-react';
import * as styles from './Popup.module.css';
import { motion } from 'framer-motion';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/storeConfiguration';
import { setPopupVisibility } from '../../store/services/popup/popupInfo';
import ClimateChart from '../ClimateChart';
import { layerConfig } from '../../config';
import Section from '../Section';
import { variables } from '../../store/services/map/climateLayer';

const Popup = () => {
  const dispatch = useAppDispatch();
  const isOpen = useSelector((state: RootState) => state.popupInfo.visible);
  const selectedVariable = useSelector((state: RootState) => state.climateSelection.selectedVariable);
  const selectedVariableInfo = variables.find((variable) => variable.name === selectedVariable);
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
        <Section title='Demographic data' className=''></Section>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
          standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
          make a type specimen book. It has survived not only five centuries, but also the leap into electronic
          typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset
          sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
          PageMaker including versions of Lorem Ipsum.
        </p>
        {selectedVariableInfo ? <Section title={selectedVariableInfo.description} className=''></Section> : <></>}
        <div className={styles.chartContainer}>
          <ClimateChart></ClimateChart>
        </div>
      </div>
    </motion.div>
  );
};

export default Popup;
