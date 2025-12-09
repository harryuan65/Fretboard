import React, { useState } from 'react';
import { CHROMATIC_NOTES, Note, NoteName } from '../../utils/Notes';
import styles from './styles.module.css';

interface TuningSelectorProps {
  tuning: Note[];
  onChange: (index: number, name: NoteName, octave: number) => void;
}

const OCTAVES = Array.from({ length: 9 }, (_, i) => i); // 0..8
const PRESETS: {
  id: string;
  label: string;
  values: Array<{ name: NoteName; octave: number }>;
}[] = [
  {
    id: 'standard',
    label: 'Standard (E4 B3 G3 D3 A2 E2)',
    values: [
      { name: 'E', octave: 4 },
      { name: 'B', octave: 3 },
      { name: 'G', octave: 3 },
      { name: 'D', octave: 3 },
      { name: 'A', octave: 2 },
      { name: 'E', octave: 2 },
    ],
  },
  {
    id: 'drop_d',
    label: 'Drop D (E4 B3 G3 D3 A2 D2)',
    values: [
      { name: 'E', octave: 4 },
      { name: 'B', octave: 3 },
      { name: 'G', octave: 3 },
      { name: 'D', octave: 3 },
      { name: 'A', octave: 2 },
      { name: 'D', octave: 2 },
    ],
  },
  {
    id: 'dadgad',
    label: 'DADGAD (D4 A3 G3 D3 A2 D2)',
    values: [
      { name: 'D', octave: 4 },
      { name: 'A', octave: 3 },
      { name: 'G', octave: 3 },
      { name: 'D', octave: 3 },
      { name: 'A', octave: 2 },
      { name: 'D', octave: 2 },
    ],
  },
  {
    id: 'open_g',
    label: 'Open G (D4 B3 G3 D3 G2 D2)',
    values: [
      { name: 'D', octave: 4 },
      { name: 'B', octave: 3 },
      { name: 'G', octave: 3 },
      { name: 'D', octave: 3 },
      { name: 'G', octave: 2 },
      { name: 'D', octave: 2 },
    ],
  },
  {
    id: 'open_d',
    label: 'Open D (D4 A3 F#3 D3 A2 D2)',
    values: [
      { name: 'D', octave: 4 },
      { name: 'A', octave: 3 },
      { name: 'F#', octave: 3 },
      { name: 'D', octave: 3 },
      { name: 'A', octave: 2 },
      { name: 'D', octave: 2 },
    ],
  },
  {
    id: 'half_down',
    label: 'Half-step Down (Eb4 Bb3 Gb3 Db3 Ab2 Eb2)',
    values: [
      { name: 'Eb', octave: 4 },
      { name: 'Bb', octave: 3 },
      { name: 'F#', octave: 3 },
      { name: 'C#', octave: 3 },
      { name: 'Ab', octave: 2 },
      { name: 'Eb', octave: 2 },
    ],
  },
  {
    id: 'careless_whisper',
    label: 'Careless Whisper (Kent Nishimura)',
    values: [
      { name: 'Eb', octave: 4 },
      { name: 'B', octave: 3 },
      { name: 'F#', octave: 3 },
      { name: 'C#', octave: 3 },
      { name: 'F#', octave: 2 },
      { name: 'C#', octave: 2 },
    ],
  },
  {
    id: 'alan_gogoll',
    label: 'Alan Gogoll',
    values: [
      { name: 'E', octave: 4 },
      { name: 'B', octave: 3 },
      { name: 'E', octave: 3 },
      { name: 'C#', octave: 3 },
      { name: 'A', octave: 2 },
      { name: 'E', octave: 2 },
    ],
  },
  {
    id: 'fingerstyle_g_with_drop_c',
    label: 'Fingerstyle play G with Drop C',
    values: [
      { name: 'E', octave: 4 },
      { name: 'B', octave: 3 },
      { name: 'G', octave: 3 },
      { name: 'D', octave: 3 },
      { name: 'G', octave: 2 },
      { name: 'C', octave: 2 },
    ],
  },
];

const TuningSelector: React.FC<TuningSelectorProps> = ({ tuning, onChange }) => {
  const [presetId, setPresetId] = useState<string>(PRESETS[0].id);

  return (
    <div className={styles.wrap}>
      <div className={styles.row}>
        <span className={styles.label}>Preset</span>
        <select
          className={styles.select}
          value={presetId}
          onChange={(e) => {
            const id = (e.target as HTMLSelectElement).value;
            setPresetId(id);
            const preset = PRESETS.find((p) => p.id === id);
            if (preset) {
              // Apply to current string count, high-to-low order
              const count = Math.min(tuning.length, preset.values.length);
              for (let i = 0; i < count; i++) {
                const v = preset.values[i];
                onChange(i, v.name, v.octave);
              }
            }
          }}
        >
          <option value="">(none)</option>
          {PRESETS.map((p) => (
            <option key={p.id} value={p.id}>
              {p.label}
            </option>
          ))}
        </select>
      </div>
      {tuning.map((note, i) => (
        <div key={`tuning_row_${i}`} className={styles.row}>
          <span className={styles.label}>String {i + 1}</span>
          <select
            className={styles.select}
            value={note.name}
            onChange={(e) => {
              if (presetId) setPresetId('');
              onChange(i, e.target.value as NoteName, note.octave);
            }}
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
            onChange={(e) => {
              if (presetId) setPresetId('');
              onChange(i, note.name, Number(e.target.value));
            }}
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

