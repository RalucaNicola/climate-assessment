import * as styles from './Section.module.css';
import { FC, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
  className: string;
  title: string;
}

const Section: FC<Props> = ({ title, children, className }) => {
  return (
    <div className={`${className}`}>
      <div className={styles.title}>
        <div className={styles.front}></div>
        <h3>{title}</h3>
        <div className={styles.back}></div>
      </div>

      {children}
    </div>
  );
};

export default Section;
