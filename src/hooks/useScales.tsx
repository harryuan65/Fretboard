import { useState } from 'react';
import { NoteName } from '../utils/Notes';
import Scale, { ScaleName } from '../utils/Scale';

const useScales = () => {
  const [key, setKey] = useState<NoteName | null>();
  const [scaleType, setScaleType] = useState<ScaleName | null>();
  let scaleNotes = null;

  if (key && scaleType) {
    const defaultScale = new Scale(key, scaleType);
    defaultScale.calculateList();
    scaleNotes = defaultScale.scaleNotes;
  }

  return {
    key,
    setKey,
    scaleType,
    setScaleType,
    scaleNotes,
  };
};

export default useScales;
