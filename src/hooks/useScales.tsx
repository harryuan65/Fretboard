import { useState } from 'react';
import { Note } from '../utils/Notes';
import Scale, { ScaleName } from '../utils/Scale';

const useScales = () => {
  const [key, setKey] = useState<Note | null>();
  const [scaleType, setScaleType] = useState<ScaleName | null>();
  let scaleNotes = null;
  let scaleNotesMap = null;

  if (key && scaleType) {
    const defaultScale = new Scale(key, scaleType);
    defaultScale.calculateList();
    scaleNotes = defaultScale.scaleNotes;
    scaleNotesMap = defaultScale.scaleNotesMap;
  }

  return {
    key,
    setKey,
    scaleType,
    setScaleType,
    scaleNotes,
    scaleNotesMap,
  };
};

export default useScales;
