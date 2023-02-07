import { Note } from './Notes';

type ChordMainQuality = '' | 'm' | 'M' | '△' | 'ø' | 'dim' | 'sus2' | 'sus4';
// type ChordSubQuality = '6' | '7' | '9' | '11' | '13' | 'b5' | '#9' | '#11';

class Chord {
  constructor(key: Note, qualities: ChordMainQuality[]) {}
}

export default Chord;
