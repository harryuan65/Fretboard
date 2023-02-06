import React from 'react';
import freq from '../../contants/freq.json';
import { IFret } from '../../types/IFret';
import styles from './styles.module.css';
import { IScaleWithStep } from '../../utils/Scale';
import GuitarString from '../GuitarString';
interface GuitarProps {
  scaleMap: IScaleWithStep | null;
}

const Guitar = ({ scaleMap }: GuitarProps) => {
  const strings = freq.strings as IFret[][];
  return (
    <div className={styles.guitar}>
      {strings.map((stringFrets, i) => (
        <GuitarString
          key={`string_${i}`}
          frets={stringFrets}
          scaleMap={scaleMap}
        />
      ))}
    </div>
  );
};

export default Guitar;
