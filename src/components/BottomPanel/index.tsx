import * as styles from './BottomPanel.module.css';
import '@esri/calcite-components/dist/components/calcite-action';
import '@esri/calcite-components/dist/components/calcite-label';
import '@esri/calcite-components/dist/components/calcite-switch';
import { CalciteAction, CalciteSelect, CalciteOption } from '@esri/calcite-components-react';
import '@esri/calcite-components/dist/components/calcite-select';
import '@esri/calcite-components/dist/components/calcite-option';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { setInfoModalOptions } from '../../store/services/modal-options/modalSlice';
import { RootState } from '../../store/storeConfiguration';
import { useSelector } from 'react-redux';
import { getVariables } from '../../store/services/map/climateLayer';
import { setSelectedVariable } from '../../store/services/climateSelectionSlice';

const BottomPanel = () => {
  const [visible, setVisible] = useState(true);
  const dispatch = useAppDispatch();
  const climateLayerLoaded = useSelector((state: RootState) => state.loading.climateLayerLoaded);
  const selectedVariable = useSelector((state: RootState) => state.climateSelection.selectedVariable)

  const togglePanel = () => {
    setVisible(!visible);
  };

  const getHeader = () => {
    return (
      <div className={styles.actionsContainer}>
        <div className={styles.leftActionsContainer}>
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

  const getIndicatorSelection = () => {
    const variables = getVariables();
    return <CalciteSelect scale={'m'}
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
  }

  return (
    <div className={styles.container}>
      {getHeader()}
      <motion.div layout='size' animate={{
        height: visible ? 'min(200px, 30vh)' : 0
      }} style={{ overflow: 'auto' }}>
        {climateLayerLoaded ? getIndicatorSelection() : <></>}
      </motion.div>
    </div>
  );
};

export default BottomPanel;
