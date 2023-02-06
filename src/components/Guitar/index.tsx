import React from 'react';
import GuitarString from '../GuitarString';
import * as freq from '../../contants/freq.json';

const Guitar = () => {
  const { string1, string2, string3, string4, string5, string6 } = freq;
  return (
    <div>
      <GuitarString frets={string1} />
      <GuitarString frets={string2} />
      <GuitarString frets={string3} />
      <GuitarString frets={string4} />
      <GuitarString frets={string5} />
      <GuitarString frets={string6} />
    </div>
  );
};

export default Guitar;
