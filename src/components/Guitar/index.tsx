import React from 'react';
import styles from './styles.module.css';
import { IScale } from '../../utils/Scale';
import GuitarString from '../GuitarString';
import { Note } from '../../utils/Notes';
import { ChordTone } from '../../utils/Chord';
interface GuitarProps {
  tuning: Note[];
  fretCount: number;
  scales: IScale[] | null;
  chordTones?: ChordTone[] | null;
}

const Guitar = ({ tuning = [], fretCount = 22, scales, chordTones }: GuitarProps) => {
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
    return <span key={i} className={`${styles.fretNum} ${i === 0 ? styles.firstFretNum : ''}`}>{fretNum}</span>;
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
          chordTones={chordTones ?? null}
        />
      ))}
      {<div className={styles.fretNumWrap}>{renderFretNumber}</div>}
    </div>
    </>
  );
};

export default Guitar;
