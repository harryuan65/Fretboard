import React, { useEffect, useState } from 'react';
import { Note, Notes } from '../../utils/Notes';
import Scale, { IScaleWithStep, ScaleName } from '../../utils/Scale';
import styles from './styles.module.css';
interface ScaleFinderProps {
  scaleMap: IScaleWithStep | null;
  setScaleMap: React.Dispatch<React.SetStateAction<IScaleWithStep | null>>;
}

const ScaleFinder = ({ scaleMap, setScaleMap }: ScaleFinderProps) => {
  const [key, setKey] = useState<Note | ''>('');
  const [scaleType, setScaleType] = useState<ScaleName | ''>('');
  const [scaleNotes, setScaleNotes] = useState<Note[]>([]);

  useEffect(() => {
    if (key && scaleType) {
      // Calculate scale map is both of them are present.
      const currentScale = new Scale(key, scaleType);
      currentScale.calculateList();
      setScaleNotes(currentScale.scaleNotes);
      setScaleMap(currentScale.scaleNotesMap);
    } else {
      // Clear all highlighting is either of key and scaleType is empty.
      setScaleMap(null);
    }
  }, [key, scaleType, setScaleMap]);

  const allNotes = ['', ...Notes.all];
  const allScaleNames = ['', ...Object.keys(Scale.available)];

  return (
    <div>
      <h1>Select a KEY and scale:</h1>
      <select
        onChange={(event) =>
          setKey((event.target as HTMLSelectElement).value as Note)
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
      >
        {allScaleNames.map((scaleName) => (
          <option key={`scale-${scaleName}`} value={scaleName}>
            {scaleName}
          </option>
        ))}
      </select>
      <div className={styles.notes}>
        {scaleNotes.map((note, i) => (
          <div key={`scale-note-${note}${i}`} className={styles.note}>
            <span>{note}</span>
            <span>{scaleMap && scaleMap[note]?.notation}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScaleFinder;
