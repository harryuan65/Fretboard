import React from 'react';
import { CHROMATIC_NOTES, Note, NoteName } from '../../utils/Notes';
import styles from './styles.module.css';

interface TuningSelectorProps {
  tuning: Note[];
  onChange: (index: number, name: NoteName, octave: number) => void;
}

const OCTAVES = Array.from({ length: 9 }, (_, i) => i); // 0..8

const TuningSelector: React.FC<TuningSelectorProps> = ({ tuning, onChange }) => {
  return (
    <div className={styles.wrap}>
      {tuning.map((note, i) => (
        <div key={`tuning_row_${i}`} className={styles.row}>
          <span className={styles.label}>String {i + 1}</span>
          <select
            className={styles.select}
            value={note.name}
            onChange={(e) => onChange(i, e.target.value as NoteName, note.octave)}
          >
            {CHROMATIC_NOTES.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
          <select
            className={styles.select}
            value={note.octave}
            onChange={(e) => onChange(i, note.name, Number(e.target.value))}
          >
            {OCTAVES.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
};

export default TuningSelector;

