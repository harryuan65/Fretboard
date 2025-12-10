import React, { useMemo } from 'react';
import { IScale } from '../../utils/Scale';
import Fret from '../Fret';
import styles from './styles.module.css';
import { Note } from '../../utils/Notes';
import { ChordTone } from '../../utils/Chord';
interface GuitarStringProps {
  startingNote: Note;
  fretCount: number;
  scales: IScale[] | null;
  chordTones?: ChordTone[] | null;
  capo?: number;
  visibleFretCount?: number;
}

const renderFret = (i:number, note: Note, scales: IScale[] | null, chordTones: ChordTone[] | null | undefined) => {
  // 1) Chord tones take precedence and should not be overridden by scale/default
  if (chordTones && chordTones.length > 0) {
    const ct = chordTones.find((t) => t.note.name === note.name);
    if (ct) {
      const ord = ct.degree;
      const fretEl = (
        <Fret
          key={String(note.freq)}
          note={note}
          ord={ord}
          ordNotation={ord === 1 ? 'R' : String(ord)}
          isFirstFret={i === 0}
        />
      );
      return i === 0 ? (
        <>
          {fretEl}
          <span className={styles.nut} />
        </>
      ) : fretEl;
    }
  }

  // 2) Scale highlighting (if any)
  if (scales) {
    const highlightNote = scales.find((scale) => scale.note.name === note.name);
    if (highlightNote) {
      const { ord, ordNotation } = highlightNote;
      const fretEl = (
        <Fret
          key={String(note.freq)}
          note={note}
          ord={ord}
          ordNotation={ordNotation}
          isFirstFret={i === 0}
        />
      );
      return i === 0 ? (
        <>
          {fretEl}
          <span className={styles.nut} />
        </>
      ) : fretEl;
    }
  }

  // 3) Default (no highlight)
  const fretEl = <Fret key={String(note.freq)} note={note} isFirstFret={i === 0} />;
  return i === 0 ? (
    <>
      {fretEl}
      <span className={styles.nut} />
    </>
  ) : fretEl;
};
const GuitarString = ({ startingNote, fretCount, scales, chordTones, capo = 0, visibleFretCount }: GuitarStringProps) => {
  const actualVisibleFretCount = visibleFretCount ?? Math.max(0, fretCount - capo);
  const notes = useMemo(() => {
    // 從 capo 位置開始計算音階，只顯示 capo 之後的琴格
    return new Array(actualVisibleFretCount).fill(0).map((_fret, i) => startingNote.move(capo + i));
  }, [startingNote, capo, actualVisibleFretCount]);

  return (
    <div>
      <div className={styles.stringFrets}>
        {notes.map((note, i) => renderFret(i, note, scales, chordTones))}
      </div>
    </div>
  );
};

export default GuitarString;
