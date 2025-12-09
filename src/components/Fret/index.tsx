import React, { useState } from 'react';
import styles from './styles.module.css';
import { Note } from '../../utils/Notes';
import { slideStart, slideTo, slideEnd, toneAttack, toneRelease } from '../../audio/native';

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
  const [playing, setPlaying] = useState(false);
  const hold = async () => {
    // Use slide voice for continuous note so we can glide to neighbors
    slideStart(note.freq);
    setPlaying(true);
  };

  const release = () => {
    slideEnd();
    setPlaying(false);
  };

  return (
    <span
      className={[
        styles.fret,
        ord && styles.highlight,
        ord && styles[importantNote(ord)],
        playing && styles.playing,
      ].join(' ')}
      onMouseDown={hold}
      onMouseEnter={(e) => {
        if ((e.buttons & 1) === 1) {
          slideTo(note.freq);
          setPlaying(true);
        }
      }}
      onMouseUp={release}
      onMouseLeave={(e) => {
        // only end slide if not pressing mouse anymore; otherwise let next fret continue sliding
        if ((e.buttons & 1) === 0) {
          release();
        }
        // 無論是否還在按，都將本格的「播放中」樣式移除
        setPlaying(false);
      }}
      onTouchStart={() => {
        // Mobile: only tap (no slide)
        toneAttack(note.freq);
        setPlaying(true);
      }}
      onTouchMove={() => {
        // do nothing on move for mobile to avoid slide
      }}
      onTouchCancel={() => {
        toneRelease(note.freq);
        setPlaying(false);
      }}
      onTouchEnd={() => {
        toneRelease(note.freq);
        setPlaying(false);
      }}
    >
      {note.name}
      {ordNotation ? `(${ordNotation})` : ``}
    </span>
  );
};

export default Fret;
