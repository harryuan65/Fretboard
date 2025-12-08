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
}

const renderFret = (note: Note, scales: IScale[] | null, chordTones: ChordTone[] | null | undefined) => {
  // Chord tones take precedence for highlighting and ordinal coloring
  if (chordTones && chordTones.length > 0) {
    const ct = chordTones.find((t) => t.note.name === note.name);
    if (ct) {
      const ord = ct.degree;
      return (
        <Fret
          key={String(note.freq)}
          note={note}
          ord={ord}
          ordNotation={ord === 1 ? 'R' : String(ord)}
        />
      );
    }
  }

  const highlightNote = scales && scales.find((scale) => scale.note.name === note.name);
  if (!highlightNote) {
    return <Fret key={String(note.freq)} note={note} />;
  }

  const { ord, ordNotation } = highlightNote;
  return (
    <Fret
      key={String(note.freq)}
      note={note}
      ord={ord}
      ordNotation={ordNotation}
    />
  );
};
const GuitarString = ({ startingNote, fretCount, scales, chordTones }: GuitarStringProps) => {
  const notes = useMemo(() => {
    return new Array(fretCount).fill(0).map((_fret, i) => startingNote.move(i));
  }, [startingNote, fretCount]);

  return (
    <div>
      <div className={styles.stringFrets}>
        {notes.map((note) => renderFret(note, scales, chordTones))}
      </div>
    </div>
  );
};

export default GuitarString;
