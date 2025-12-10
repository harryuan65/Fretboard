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
  capo?: number;
}

const Guitar = ({ tuning = [], fretCount = 22, scales, chordTones, capo = 0 }: GuitarProps) => {
  const visibleFretCount = Math.max(0, fretCount - capo);
  // 定義需要標記的視覺位置（統一標記視覺上的第3,5,7,12,15,17格）
  const markedVisualPositions = [3, 5, 7, 12, 15, 17];
  let renderFretNumber = new Array(visibleFretCount).fill(0).map((_fret, i) => {
    // 檢查當前視覺位置 i 是否在需要標記的列表中，如果是就顯示視覺位置編號
    let fretNum = null;
    if (markedVisualPositions.includes(i)) {
      fretNum = i;
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
          capo={capo}
          visibleFretCount={visibleFretCount}
        />
      ))}
      {<div className={styles.fretNumWrap}>{renderFretNumber}</div>}
    </div>
    </>
  );
};

export default Guitar;
