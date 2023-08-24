import { CalciteAction } from '@esri/calcite-components-react';
import * as styles from './Popup.module.css';
import { motion } from 'framer-motion';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/storeConfiguration';
import { setPopupVisibility } from '../../store/services/popup/popupInfo';

const Popup = () => {
  const dispatch = useAppDispatch();
  const isOpen = useSelector((state: RootState) => state.popupInfo.visible);
  return (
    <motion.div
      initial={false}
      className={styles.container}
      style={{ pointerEvents: isOpen ? 'all' : 'none' }}
      animate={isOpen ? 'visible' : 'hidden'}
      variants={{
        visible: {
          clipPath: 'inset(0% 0% 0% 0% round 0)',
          transition: {
            type: 'spring',
            bounce: 0,
            duration: 0.7,
            delayChildren: 0.3,
            staggerChildren: 0.05
          }
        },
        hidden: {
          clipPath: 'inset(10% 50% 90% 50% round 0)',
          transition: {
            type: 'spring',
            bounce: 0,
            duration: 0.3
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
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
        laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
        dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
        laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
        dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
        laborum.
      </div>
    </motion.div>
  );
};

export default Popup;
