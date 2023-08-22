import { ColorStop, LegendProps } from '../../types/types';
import * as styles from './ContinuousLegend.module.css';

const createGradient = (colorStops: ColorStop[]) => {
  const gradientColors = colorStops.map((c) => {
    const { r, g, b, a } = c.color;
    return `rgba(${r} ${g} ${b} / ${a * 100}%) ${c.position * 100}%`;
  });
  return `linear-gradient(90deg, ${gradientColors.join(', ')})`;
};

const ContinuousLegend = ({ legendInfo }: LegendProps) => {
  return (
    <div>
      <div className={styles.gradientContainer}>
        <div style={{ background: createGradient(legendInfo.colorStops), height: '20px' }}></div>
      </div>
      <div className={styles.labels}>
        <div>&gt;{legendInfo.min.toFixed(2)} {legendInfo.unit}</div>
        <div>&lt;{legendInfo.max.toFixed(2)} {legendInfo.unit}</div>
      </div>
    </div>
  );
};

export default ContinuousLegend;
