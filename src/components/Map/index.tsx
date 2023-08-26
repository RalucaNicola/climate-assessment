import * as styles from './Map.module.css';
import { FC, ReactNode, useEffect, useRef } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { destroyView, initializeMapView } from '../../store/services/map/view';
import { removeEventListeners } from '../../store/services/map/eventListeners';
import { removeClimateLayerListeners } from '../../store/services/map/climateLayer';
import { removeGraphicsLayer } from '../../store/services/map/graphicsLayer';

interface Props {
  children?: ReactNode;
}

const Map: FC<Props> = () => {
  const mapDivRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  // initialize view
  useEffect(() => {
    if (mapDivRef.current) {
      dispatch(initializeMapView(mapDivRef.current));
      return () => {
        removeEventListeners();
        removeClimateLayerListeners();
        removeGraphicsLayer();
        destroyView();
      };
    }
  }, [mapDivRef.current]);

  return (
    <>
      <div className={styles.mapContainer} ref={mapDivRef}></div>
    </>
  );
};

export default Map;
