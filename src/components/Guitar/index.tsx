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
  let renderFretNumber = strings[0].map((_fret, i) => {
    let fretNum = null;
    switch (i + 1) {
      case 3:
      case 5:
      case 7:
      case 9:
      case 12:
      case 15:
      case 17:
        fretNum = i + 1;
        break;
    }
    return <span className={styles.fretNum}>{fretNum}</span>;
  });
  return (
    <div className={styles.guitar}>
      {strings.map((stringFrets, i) => (
        <GuitarString
          key={`string_${i}`}
          frets={stringFrets}
          scaleMap={scaleMap}
        />
      ))}
      {<div className={styles.fretNumWrap}>{renderFretNumber}</div>}
    </div>
  );
};

export default Guitar;
