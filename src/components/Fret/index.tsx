import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { Note } from '../../utils/Notes';

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
  const [holding, setHolding] = useState(false);
  const [oscillator, setOscillator] = useState<OscillatorNode | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (holding && !playing) {
      const context = new AudioContext();
      const gainNode = context.createGain();
      const oscillator = context.createOscillator();
      oscillator.frequency.value = note.freq;
      oscillator.connect(gainNode);
      gainNode.connect(context.destination);
      setOscillator(oscillator);
      oscillator?.start(0);
      setPlaying(true);
    } else if (!holding && playing) {
      oscillator?.stop();
      setPlaying(false);
    }
  }, [note.freq, note.octave, oscillator, holding, playing]);

  const hold = () => {
    if (!holding) {
      setHolding(true);
    }
  };

  const release = () => {
    setHolding(false);
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
