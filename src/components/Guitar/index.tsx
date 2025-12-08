import React from 'react';
import styles from './styles.module.css';
import { IScale } from '../../utils/Scale';
import GuitarString from '../GuitarString';
import { Note } from '../../utils/Notes';
interface GuitarProps {
  tuning: Note[];
  fretCount: number;
  scales: IScale[] | null;
}

const Guitar = ({ tuning = [], fretCount = 22, scales }: GuitarProps) => {
  let renderFretNumber = new Array(fretCount).fill(0).map((_fret, i) => {
    let fretNum = null;
    switch (i) {
      case 0:
      case 3:
      case 5:
      case 7:
      case 9:
      case 12:
      case 15:
      case 17:
        fretNum = i;
        break;
    }
    return <span className={styles.fretNum}>{fretNum}</span>;
  });

  return (
    <>
    <div className={styles.guitar}>
      {tuning.map((tuningNote, i) => (
        <GuitarString
          key={`string_${i}`}
          startingNote={tuningNote}
          fretCount={fretCount}
          scales={scales}
        />
      ))}
      {<div className={styles.fretNumWrap}>{renderFretNumber}</div>}
    </div>
    </>
  );
};

export default Guitar;
