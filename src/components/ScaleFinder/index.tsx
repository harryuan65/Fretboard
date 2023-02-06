import React, { useEffect, useState } from 'react';
import { Note, Notes } from '../../utils/Notes';
import Scale, { IScaleWithStep, ScaleName } from '../../utils/Scale';

interface ScaleFinderProps {
  setScaleMap: React.Dispatch<React.SetStateAction<IScaleWithStep | null>>;
}

const ScaleFinder = ({ setScaleMap }: ScaleFinderProps) => {
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
  const allScaleNames = ['', ...Object.keys(Scale.scaleSteps)];

  return (
    <div>
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
      <h3>Notes: {scaleNotes.join(', ')}</h3>
    </div>
  );
};

export default ScaleFinder;
