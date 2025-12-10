import React, { useEffect, useState } from 'react';
import { CHROMATIC_NOTES, NoteName } from '../../utils/Notes';
import Scale, { IScale, ScaleName } from '../../utils/Scale';
import styles from './styles.module.css';
interface ScaleFinderProps {
  scales: IScale[] | null;
  setScales: React.Dispatch<React.SetStateAction<IScale[] | null>>;
  onKeyChange?: (key: NoteName | null) => void;
  onScaleTypeChange?: (scale: ScaleName | null) => void;
}

const ScaleFinder = ({ scales = [], setScales, onKeyChange, onScaleTypeChange }: ScaleFinderProps) => {
  const [key, setKey] = useState<NoteName | ''>('');
  const [scaleType, setScaleType] = useState<ScaleName | ''>('');

  useEffect(() => {
    if (key && scaleType) {
      // Calculate scale map is both of them are present.
      const currentScale = new Scale(key, scaleType);
      currentScale.calculateList();
      setScales(currentScale.scaleNotes);
      onKeyChange?.(key);
      onScaleTypeChange?.(scaleType);
    } else {
      // Clear all highlighting is either of key and scaleType is empty.
      setScales(null);
      onKeyChange?.(null);
      onScaleTypeChange?.(null);
    }
  }, [key, scaleType, setScales, onKeyChange, onScaleTypeChange]);

  const allNotes = ['', ...CHROMATIC_NOTES];
  
  // 分類 scale 和 mode
  const scaleTypes = ['major', 'minor', 'diminished'] as ScaleName[];
  const modeTypes = ['ionian', 'dorian', 'phrygian', 'lydian', 'mixolydian', 'aeolian', 'locrian'] as ScaleName[];

  return (
    <div>
      <h1>Select a Key, Scale / Mode:</h1>
      <select
        onChange={(event) =>
          setKey((event.target as HTMLSelectElement).value as NoteName)
        }
      >
        {allNotes.map((note) => (
          <option key={`note-${note}`} value={note}>
            {note}
          </option>
        ))}
      </select>

      <select
        onChange={(event) =>
          setScaleType((event.target as HTMLSelectElement).value as ScaleName)
        }
        value={scaleType}
      >
        <option value="">-- Select --</option>
        <optgroup label="Scales">
          {scaleTypes.map((scaleName) => (
            <option key={`scale-${scaleName}`} value={scaleName}>
              {scaleName}
            </option>
          ))}
        </optgroup>
        <optgroup label="Modes">
          {modeTypes.map((scaleName) => (
            <option key={`scale-${scaleName}`} value={scaleName}>
              {scaleName.charAt(0).toUpperCase() + scaleName.slice(1)}
            </option>
          ))}
        </optgroup>
      </select>
      <div className={styles.notes}>
        {scales?.map((scaleNote, i) => (
          <div key={`scale-note-${scaleNote.note.name}${i}`} className={styles.note}>
            <span>{scaleNote.note.name}</span>
            <span>{scaleNote.ordNotation}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScaleFinder;
