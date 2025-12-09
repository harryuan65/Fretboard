import React from 'react';
import styles from './styles.module.css';
import { Note } from '../../utils/Notes';
import { slideStart, slideTo, slideEnd } from '../../audio/native';

interface FretProps {
  note: Note;
  ord?: number;
  ordNotation?: string;
}

type CriticalNotes = Record<number, string>;

const criticalNotes = {
  1: 'root',
  3: 'third',
  // 5: 'fifth',
  7: 'seventh',
} satisfies CriticalNotes;

const importantNote = (index: number) => {
  if (Object.keys(criticalNotes).includes(String(index))) {
    return criticalNotes[index as keyof typeof criticalNotes];
  } else {
    return '';
  }
};

const Fret = ({ note, ord = 0, ordNotation = '' }: FretProps) => {
  const hold = async () => {
    // Use slide voice for continuous note so we can glide to neighbors
    slideStart(note.freq);
  };

  const release = () => {
    slideEnd();
  };

  return (
    <button
      className={[
        styles.fret,
        ord && styles.highlight,
        ord && styles[importantNote(ord)],
      ].join(' ')}
      onMouseDown={hold}
      onMouseEnter={(e) => {
        if ((e.buttons & 1) === 1) {
          slideTo(note.freq);
        }
      }}
      onMouseUp={release}
      onMouseLeave={(e) => {
        // only end slide if not pressing mouse anymore; otherwise let next fret continue sliding
        if ((e.buttons & 1) === 0) {
          release();
        }
      }}
      onTouchStart={hold}
      onTouchMove={() => {
        // when moving over this fret while touching, slide here
        slideTo(note.freq);
      }}
      onTouchCancel={release}
      onTouchEnd={release}
    >
      {note.name}
      {ordNotation ? `(${ordNotation})` : ``}
    </button>
  );
};

export default Fret;
