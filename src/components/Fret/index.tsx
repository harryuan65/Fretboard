import React from 'react';
import styles from './styles.module.css';
import { Note } from '../../utils/Notes';
import { toneAttack, toneRelease } from '../../audio/native';

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
    await toneAttack(note.freq);
  };

  const release = () => {
    toneRelease(note.freq);
  };

  return (
    <button
      className={[
        styles.fret,
        ord && styles.highlight,
        ord && styles[importantNote(ord)],
      ].join(' ')}
      onMouseDown={hold}
      onMouseUp={release}
      onMouseLeave={release}
      onTouchStart={hold}
      onTouchCancel={release}
      onTouchEnd={release}
    >
      {note.name}
      {ordNotation ? `(${ordNotation})` : ``}
    </button>
  );
};

export default Fret;
