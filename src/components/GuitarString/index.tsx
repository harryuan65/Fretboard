import React, { useMemo } from 'react';
import { IScale } from '../../utils/Scale';
import Fret from '../Fret';
import styles from './styles.module.css';
import { Note } from '../../utils/Notes';
interface GuitarStringProps {
  startingNote: Note;
  fretCount: number;
  scales: IScale[] | null;
}

const renderFret = (note: Note, scales: IScale[] | null) => {
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
const GuitarString = ({ startingNote, fretCount, scales }: GuitarStringProps) => {
  const notes = useMemo(() => {
    return new Array(fretCount).fill(0).map((_fret, i) => startingNote.move(i));
  }, [startingNote, fretCount]);

  return (
    <div>
      <div className={styles.stringFrets}>
        {notes.map((note) => renderFret(note, scales))}
      </div>
    </div>
  );
};

export default GuitarString;
