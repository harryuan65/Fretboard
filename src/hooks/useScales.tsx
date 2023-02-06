import { useState } from 'react';
import { Note } from '../utils/Notes';
import Scale, { ScaleName } from '../utils/Scale';

const useScales = () => {
  const [key, setKey] = useState<Note | null>();
  const [scaleType, setScaleType] = useState<ScaleName | null>();
  if (key && scaleType) {
    const defaultScale = new Scale(key, scaleType);
    defaultScale.calculateList();
    const scaleNotes = defaultScale.scaleNotes;
    const scaleNotesMap = defaultScale.scaleNotesMap;
    return {
      key,
      setKey,
      scaleType,
      setScaleType,
      scaleNotes,
      scaleNotesMap,
    };
  } else {
    return {
      key,
      setKey,
      scaleType,
      setScaleType,
      scaleNotes: null,
      scaleNotesMap: null,
    };
  }
};

export default useScales;
